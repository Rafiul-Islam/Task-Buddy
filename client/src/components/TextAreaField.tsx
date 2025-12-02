import React from "react";
import FormErrorMessage from "@/components/FormErrorMessage";
import { FieldError } from "react-hook-form";

interface Props {
  title: string;
  textareaProps: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  error?: FieldError;
  required?: boolean;
  className?: string;
}

const TextareaField = ({
  title,
  textareaProps,
  error,
  required,
  className = "",
}: Props) => {
  return (
    <fieldset className="mb-4 space-y-1">
      <label className="block text-sm font-semibold text-gray-700">
        {title} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        {...textareaProps}
        className={`flex h-24 w-full min-w-0 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-500 transition-all duration-200 hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 shadow-sm hover:shadow-md resize-none ${
          error ? "border-red-500 ring-red-500/20" : ""
        } ${className} ${textareaProps.className || ""}`}
      />
      <FormErrorMessage error={error} />
    </fieldset>
  );
};

export default TextareaField;
