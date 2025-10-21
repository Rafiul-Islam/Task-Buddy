import React from "react";
import FormErrorMessage from "@/components/FormErrorMessage";
import { FieldError } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface Props {
  title: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError;
  required?: boolean;
  className?: string;
}

const InputField = ({
  title,
  inputProps,
  error,
  required,
  className = "",
}: Props) => {
  return (
    <fieldset className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {title} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Input
        {...inputProps}
        className={`${
          error ? "border-red-500 ring-red-500/20" : ""
        } ${className} ${inputProps.className || ""}`}
      />
      <FormErrorMessage error={error} />
    </fieldset>
  );
};

export default InputField;
