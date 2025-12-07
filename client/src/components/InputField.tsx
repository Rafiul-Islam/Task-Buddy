import React from "react";
import FormErrorMessage from "@/components/FormErrorMessage";
import {FieldError} from "react-hook-form";
import {Input} from "@/components/ui/input";

interface Props {
  title: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: FieldError;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode
}

const InputField = (props: Props) => {
  const {title, inputProps, error, required, className = "", disabled = false, icon} = props;

  return (
    <fieldset className="space-y-1 mb-4">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
        {icon && icon} {title} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <Input
        {...inputProps}
        className={`${className} ${inputProps.className || ""}`}
        disabled={disabled}
      />
      <FormErrorMessage error={error}/>
    </fieldset>
  );
};

export default InputField;
