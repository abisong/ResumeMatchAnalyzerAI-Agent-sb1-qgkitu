import React, { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import { InputForm } from './components/InputForm';
import { MatchResults } from './components/MatchResults';
import { AIFeedback } from './components/AIFeedback';
import { MissingPoints } from './components/MissingPoints';
import { ChatInterface } from './components/ChatInterface';
import { calculateMatch } from './utils/matchingAlgorithm';
import { analyzeResume } from './services/aiService';
import { FormData, AnalysisResults } from './types';

function App() {
  const [formData, setFormData] = useState<FormData>({
    jobDescription: '',
    resume: ''
  });
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (field: keyof FormData, content: string) => {
    setFormData(prev => ({ ...prev, [field]: content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError(null);

    try {
      const keywordMatch = calculateMatch(formData.jobDescription, formData.resume);
      const aiAnalysis = await analyzeResume(formData.jobDescription, formData.resume);
      
      setResults({
        keywordMatch,
        aiAnalysis
      });
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FileText className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resume Match Analyzer AI Agent
          </h1>
          <p className="text-lg text-gray-600">
            Get AI-powered insights and matching analysis for your resume
          </p>
        </div>

        <div className="space-y-12">
          <InputForm
            formData={formData}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onFileUpload={handleFileUpload}
          />
          
          {isAnalyzing && (
            <div className="flex items-center justify-center gap-2 text-indigo-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing resume...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-md">
              {error}
            </div>
          )}

          {results && (
            <div className="space-y-8">
              <MatchResults results={results.keywordMatch} />
              {results.aiAnalysis && (
                <>
                  <AIFeedback analysis={results.aiAnalysis} />
                  <MissingPoints missingPoints={results.aiAnalysis.missingPoints} />
                  <ChatInterface
                    jobDescription={formData.jobDescription}
                    resume={formData.resume}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;