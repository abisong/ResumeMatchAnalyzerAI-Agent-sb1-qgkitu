import React from 'react';
import { MessageSquare } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-indigo-800">
      <div className="flex items-center gap-3">
        <MessageSquare className="w-6 h-6 text-white" />
        <h2 className="text-xl font-semibold text-white">
          AI Resume Assistant
        </h2>
      </div>
      <p className="mt-1 text-indigo-100 text-sm">
        Ask questions about the resume match or get advice on improvements
      </p>
    </div>
  );
}