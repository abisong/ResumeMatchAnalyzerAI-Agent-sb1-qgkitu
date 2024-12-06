import { ResumeAnalysis } from '../types';
import { AI_CONFIG } from '../config/ai.config';
import { extractMissingPoints } from '../utils/analysisUtils';

export async function analyzeResume(jobDescription: string, resume: string): Promise<ResumeAnalysis> {
  try {
    const analysis = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [{
          role: "system",
          content: AI_CONFIG.systemPrompt
        }, {
          role: "user",
          content: `Job Description:\n${jobDescription}\n\nResume:\n${resume}\n\nPlease also provide a list of specific technical points from the job description that are missing from the resume.`
        }],
        temperature: AI_CONFIG.temperature,
        max_tokens: AI_CONFIG.maxTokens
      })
    });

    if (!analysis.ok) {
      const errorData = await analysis.json();
      throw new Error(errorData.error?.message || 'Failed to analyze resume');
    }

    const result = await analysis.json();
    const aiAnalysis = result.choices[0].message.content;

    return {
      aiFeedback: aiAnalysis,
      timestamp: new Date().toISOString(),
      missingPoints: extractMissingPoints(aiAnalysis)
    };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
}