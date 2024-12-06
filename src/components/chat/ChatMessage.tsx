import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types';
import { formatMessage } from '../../utils/formatUtils';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 shadow-sm ${
          message.role === 'user'
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-gray-800 border border-gray-200'
        }`}
      >
        <div className={`text-sm mb-2 ${
          message.role === 'user' ? 'text-indigo-100' : 'text-gray-500'
        }`}>
          {message.role === 'user' ? 'You' : 'AI Assistant'}
        </div>
        <div className={`prose prose-sm max-w-none ${
          message.role === 'user' 
            ? 'prose-invert' 
            : 'prose-gray'
        }`}>
          {formatMessage(message.content)}
        </div>
      </div>
    </div>
  );
}