import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-2">
      <label htmlFor={textareaId} className="block text-gray-700">
        {label}
      </label>
      <textarea
        id={textareaId}
        className={`w-full px-4 py-3 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-2">
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
}
