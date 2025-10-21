"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "primary" | "secondary";
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = "md", variant = "default", ...props }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    };

    const variantClasses = {
      default: "bg-gray-600",
      primary: "bg-blue-600",
      secondary: "bg-gray-400",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center space-x-1",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "animate-bounce rounded-sm",
            variantClasses[variant],
            size === "sm" && "w-1 h-3",
            size === "md" && "w-1 h-4",
            size === "lg" && "w-1.5 h-6",
            size === "xl" && "w-2 h-8"
          )}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={cn(
            "animate-bounce rounded-sm",
            variantClasses[variant],
            size === "sm" && "w-1 h-3",
            size === "md" && "w-1 h-4",
            size === "lg" && "w-1.5 h-6",
            size === "xl" && "w-2 h-8"
          )}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={cn(
            "animate-bounce rounded-sm",
            variantClasses[variant],
            size === "sm" && "w-1 h-3",
            size === "md" && "w-1 h-4",
            size === "lg" && "w-1.5 h-6",
            size === "xl" && "w-2 h-8"
          )}
          style={{ animationDelay: "300ms" }}
        />
      </div>
    );
  }
);
Spinner.displayName = "Spinner";

export { Spinner };
