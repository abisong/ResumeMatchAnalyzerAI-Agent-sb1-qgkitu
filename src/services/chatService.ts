import { AI_CONFIG } from '../config/ai.config';
import { createChatPrompt } from '../utils/promptUtils';

export async function askQuestion(
  question: string,
  jobDescription: string,
  resume: string
): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: createChatPrompt(jobDescription, resume)
          },
          {
            role: 'user',
            content: question
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get response from AI service');
    }

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error('Error in chat service:', error);
    throw error;
  }
}