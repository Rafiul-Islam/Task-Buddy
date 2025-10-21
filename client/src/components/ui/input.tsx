import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full min-w-0 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-500 transition-all duration-200 hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 shadow-sm hover:shadow-md file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-900 selection:bg-blue-100 selection:text-blue-900",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
        className
      )}
      {...props}
    />
  );
}

export { Input };
