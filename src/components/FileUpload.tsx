import React, { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { parseFile } from '../utils/fileParser';

interface FileUploadProps {
  id: string;
  label: string;
  onFileSelect: (content: string) => void;
}

export function FileUpload({ id, label, onFileSelect }: FileUploadProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const content = await parseFile(file);
      onFileSelect(content);
    } catch (error) {
      console.error('Error reading file:', error);
      alert('Error reading file. Please ensure the file is in PDF, DOC, DOCX, or TXT format.');
    } finally {
      setIsLoading(false);
      e.target.value = ''; // Reset file input
    }
  };

  return (
    <div className="flex items-center gap-4">
      <label
        htmlFor={id}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 text-gray-500 animate-spin" />
        ) : (
          <Upload className="w-4 h-4 text-gray-500" />
        )}
        <span className="text-sm text-gray-600">
          {isLoading ? 'Processing...' : `Upload ${label}`}
        </span>
      </label>
      <input
        type="file"
        id={id}
        className="hidden"
        accept=".txt,.pdf,.doc,.docx"
        onChange={handleFileChange}
        disabled={isLoading}
      />
    </div>
  );
}