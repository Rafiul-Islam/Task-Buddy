'use client';

import React, {ReactNode, useState} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FormErrorMessage from '@/components/FormErrorMessage';
import { FieldError } from 'react-hook-form';
import { Input } from '@/components/ui/input';

interface Props {
  title: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError;
  required?: boolean;
  className?: string;
  icon?: ReactNode
}

const PasswordInput = ({ title, inputProps, error, required, className = '', icon }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <fieldset className="space-y-2 mb-4">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
        {icon && icon} {title} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <Input
          {...inputProps}
          type={showPassword ? 'text' : 'password'}
          className={`${className} ${inputProps.className || ''} pr-10`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 px-3 flex items-center cursor-pointer"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <FaEyeSlash className="h-5 w-5 text-gray-500 cursor-pointer" />
          ) : (
            <FaEye className="h-5 w-5 text-gray-500 cursor-pointer" />
          )}
        </button>
      </div>
      <FormErrorMessage error={error} />
    </fieldset>
  );
};

export default PasswordInput;