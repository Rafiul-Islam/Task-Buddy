import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] text-xs font-semibold uppercase leading-none transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md pt-[2px]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus-visible:ring-blue-500 shadow-blue-500/25 hover:shadow-blue-500/40",
        secondary:
          "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 focus-visible:ring-gray-500 shadow-gray-500/25 hover:shadow-gray-500/40",
        success:
          "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 focus-visible:ring-green-500 shadow-green-500/25 hover:shadow-green-500/40",
        danger:
          "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus-visible:ring-red-500 shadow-red-500/25 hover:shadow-red-500/40",
        warning:
          "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 focus-visible:ring-yellow-300 shadow-yellow-400/25 hover:shadow-yellow-400/40",
        info: "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 focus-visible:ring-cyan-400 shadow-cyan-500/25 hover:shadow-cyan-500/40",
        light:
          "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 focus-visible:ring-gray-300 shadow-gray-200/25 hover:shadow-gray-200/40",
        dark: "bg-gradient-to-r from-gray-900 to-black text-white hover:from-black hover:to-gray-800 focus-visible:ring-gray-700 shadow-gray-900/25 hover:shadow-gray-900/40",
        link: "text-blue-600 underline-offset-4 hover:underline bg-transparent shadow-none hover:scale-100 active:scale-100",
        outline:
          "border-2 border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus-visible:ring-gray-400 shadow-gray-200/25 hover:shadow-gray-200/40",
        ghost:
          "bg-transparent hover:bg-gray-100 text-gray-700 shadow-none hover:shadow-sm",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus-visible:ring-red-500 shadow-red-500/25 hover:shadow-red-500/40",
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 text-xs",
        lg: "h-12 px-6 text-sm",
        xl: "h-14 px-8 text-sm",
        icon: "h-10 w-10 p-2",
        "icon-sm": "h-8 w-8 p-1.5",
        "icon-lg": "h-12 w-12 p-3",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
