import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, placeholder, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          data-slot="select"
          className={cn(
            "flex h-12 w-full min-w-0 appearance-none rounded-lg border-2 border-gray-300 bg-white px-4 py-3 pr-10 text-sm font-medium text-gray-900 transition-all duration-200 hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 shadow-sm hover:shadow-md selection:bg-blue-100 selection:text-blue-900",
            "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
            className
          )}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
