"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label?: string;
  processingLabel?: string;
  icon?: LucideIcon;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "outline"
    | "ghost"
    | "destructive";
  size?: "xs" | "sm" | "default" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";
}

export default function SubmitButton({
  loading = false,
  label = "Submit",
  processingLabel = "Submitting...",
  icon: Icon,
  variant = "success",
  size = "default",
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading}
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {processingLabel}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-4 w-4" />}
          {label}
        </div>
      )}
    </Button>
  );
}
