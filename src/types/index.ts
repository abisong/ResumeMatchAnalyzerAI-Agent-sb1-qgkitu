export interface ResumeMatch {
  percentage: number;
  matchedKeywords: string[];
  missingKeywords: string[];
}

export interface ResumeAnalysis {
  aiFeedback: string;
  timestamp: string;
  missingPoints: string[];
}

export interface FormData {
  jobDescription: string;
  resume: string;
}

export interface AnalysisResults {
  keywordMatch: ResumeMatch;
  aiAnalysis: ResumeAnalysis | null;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}