import React from 'react';
import { FormData } from '../types';
import { FileUpload } from './FileUpload';

interface InputFormProps {
  formData: FormData;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFileUpload: (field: keyof FormData, content: string) => void;
}

export function InputForm({ formData, onSubmit, onChange, onFileUpload }: InputFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 w-full max-w-4xl">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
            Job Description
          </label>
          <FileUpload
            id="jobDescriptionFile"
            label="Job Description"
            onFileSelect={(content) => onFileUpload('jobDescription', content)}
          />
        </div>
        <textarea
          id="jobDescription"
          name="jobDescription"
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.jobDescription}
          onChange={onChange}
          placeholder="Paste the job description here or upload a file..."
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
            Resume
          </label>
          <FileUpload
            id="resumeFile"
            label="Resume"
            onFileSelect={(content) => onFileUpload('resume', content)}
          />
        </div>
        <textarea
          id="resume"
          name="resume"
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.resume}
          onChange={onChange}
          placeholder="Paste the resume content here or upload a file..."
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Analyze Match
      </button>
    </form>
  );
}