import React from 'react';
import { ClipboardList } from 'lucide-react';

interface MissingPointsProps {
  missingPoints: string[];
}

export function MissingPoints({ missingPoints }: MissingPointsProps) {
  if (!missingPoints.length) return null;

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center gap-2">
        <ClipboardList className="w-6 h-6 text-orange-600" />
        <h2 className="text-xl font-semibold text-gray-900">Suggested Resume Updates</h2>
      </div>
      
      <p className="text-gray-600">
        Consider adding these missing points to your resume to better match the job requirements:
      </p>
      
      <ul className="list-disc pl-6 space-y-2">
        {missingPoints.map((point, index) => (
          <li key={index} className="text-gray-700">
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}