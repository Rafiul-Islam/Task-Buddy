import React from "react";
import { Spinner } from "@/components/ui/spinner";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
  text?: string;
}

const Loader = ({ size = "lg", fullScreen = false }: LoaderProps) => {
  const sizeMap = {
    sm: "sm" as const,
    md: "md" as const,
    lg: "lg" as const,
    xl: "xl" as const,
  };

  const PageLoader = () => <Spinner size={sizeMap[size]} variant="primary" />;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/10 via-black/20 to-black/30 backdrop-blur-lg">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <PageLoader />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-4">
        <PageLoader />
      </div>
    </div>
  );
};

export default Loader;
