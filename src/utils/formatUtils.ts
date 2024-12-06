import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function formatMessage(content: string) {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({node, ...props}) => <h1 className="text-2xl font-bold mb-4" {...props} />,
        h2: ({node, ...props}) => <h2 className="text-xl font-bold mb-3" {...props} />,
        h3: ({node, ...props}) => <h3 className="text-lg font-bold mb-2" {...props} />,
        p: ({node, ...props}) => <p className="mb-4" {...props} />,
        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-1" {...props} />,
        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-1" {...props} />,
        li: ({node, ...props}) => <li className="mb-1" {...props} />,
        strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
        em: ({node, ...props}) => <em className="italic" {...props} />,
        code: ({node, inline, ...props}) => 
          inline ? 
            <code className="bg-gray-100 px-1 rounded" {...props} /> :
            <code className="block bg-gray-100 p-2 rounded mb-4" {...props} />,
        blockquote: ({node, ...props}) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4" {...props} />
        ),
        hr: ({node, ...props}) => <hr className="my-4 border-gray-300" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}