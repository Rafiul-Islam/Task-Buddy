"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormErrorMessage from "@/components/FormErrorMessage";
import {FieldError} from "react-hook-form";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownFieldProps {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  required?: boolean;
  error?: FieldError;
}

export const DropdownField = ({
  value,
  onChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  className = "w-full",
  label,
  required = false,
  error,
}: DropdownFieldProps) => {
  return (
    <div className="mb-4 space-y-1">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label} {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormErrorMessage error={error} />
    </div>
  );
};
