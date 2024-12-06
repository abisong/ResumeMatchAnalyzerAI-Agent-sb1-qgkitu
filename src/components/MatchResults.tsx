import React from 'react';
import { ResumeMatch } from '../types';
import { CheckCircle, XCircle, Code } from 'lucide-react';

interface MatchResultsProps {
  results: ResumeMatch | null;
}

export function MatchResults({ results }: MatchResultsProps) {
  if (!results) return null;

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Code className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-gray-900">Technical Skills Analysis</h2>
      </div>

      <div className="text-center">
        <div className="text-6xl font-bold text-indigo-600 mb-2">
          {results.percentage}%
        </div>
        <p className="text-gray-600">Technical Match Score</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            Matched Technical Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {results.matchedKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-mono"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-red-600">
            <XCircle className="w-5 h-5" />
            Missing Technical Requirements
          </h3>
          <div className="flex flex-wrap gap-2">
            {results.missingKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-mono"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}