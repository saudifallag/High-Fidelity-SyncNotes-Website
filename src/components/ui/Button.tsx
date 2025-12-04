import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
}

export function Button({ variant = 'primary', children, className = '', disabled, ...props }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';
  
  const variantStyles = {
    primary: disabled
      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
      : 'bg-[#14b8a6] text-white hover:bg-[#0f9688] focus:ring-[#14b8a6]',
    secondary: disabled
      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-400',
    outline: disabled
      ? 'border-2 border-gray-300 text-gray-400 cursor-not-allowed'
      : 'border-2 border-[#14b8a6] text-[#14b8a6] hover:bg-[#14b8a6] hover:text-white focus:ring-[#14b8a6]',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
