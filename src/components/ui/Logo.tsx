import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "icon" | "text" | "full" | "mini" | "image";
  className?: string;
  isDark?: boolean;
  imageOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = "image",
  className = "",
  isDark = false,
  imageOnly = false,
}) => {
  // Image version (primary - use actual logo.png)
  if (variant === "image" || imageOnly) {
    return (
      <div className={cn("relative", className)}>
        <Image
          src="/logo.png"
          alt="NovaPay Logo"
          width={32}
          height={32}
          className={cn(
            "w-8 h-8 object-contain",
            variant === "mini" && "w-5 h-5",
            className
          )}
          priority
        />
      </div>
    );
  }

  // Icon-only version (fallback SVG, smallest, most compact)
  if (variant === "icon" || variant === "mini") {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "fill-blue-600 dark:fill-blue-400",
          variant === "mini" && "w-5 h-5",
          className
        )}
      >
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1 3h-2v8h2V5zm0 10h-2v2h2v-2z" />
      </svg>
    );
  }

  // Text-only version (lightweight)
  if (variant === "text") {
    return (
      <div className={cn("font-bold text-lg", className)}>
        <span className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
          Nova
        </span>
        <span className="text-slate-900 dark:text-white">Pay</span>
      </div>
    );
  }

  // Full version with icon + text
  if (variant === "full") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="relative w-7 h-7">
          <Image
            src="/logo.png"
            alt="NovaPay Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="font-bold text-lg hidden sm:block">
          <span className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
            Nova
          </span>
          <span className="text-slate-900 dark:text-white">Pay</span>
        </div>
      </div>
    );
  }

  return null;
};

export default Logo;
