import React from 'react';
import { Brain } from 'lucide-react';
import { ResumeAnalysis } from '../types';

interface AIFeedbackProps {
  analysis: ResumeAnalysis;
}

export function AIFeedback({ analysis }: AIFeedbackProps) {
  const sections = analysis.aiFeedback.split('\n\n');

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">AI Analysis</h2>
      </div>
      
      <div className="prose prose-sm max-w-none space-y-6">
        {sections.map((section, index) => {
          const [title, ...content] = section.split('\n');
          return (
            <div key={index} className="space-y-2">
              {title.trim() && (
                <h3 className="text-lg font-semibold text-gray-800">
                  {title.replace(':', '')}
                </h3>
              )}
              {content.map((line, lineIndex) => (
                <p key={lineIndex} className="text-gray-700">
                  {line.trim()}
                </p>
              ))}
            </div>
          );
        })}
      </div>
      
      <div className="text-xs text-gray-500 mt-4">
        Analysis generated at: {new Date(analysis.timestamp).toLocaleString()}
      </div>
    </div>
  );
}