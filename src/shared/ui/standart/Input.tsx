import { FC, InputHTMLAttributes } from "react";
import { cn } from "../../lib/format/cn";
import React from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: FC<InputProps> = ({
  className,
  error = false,
  ...props
}) => {
  return (
    <input
      className={cn(
        "w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors",
        error
          ? "border-red-500 focus:ring-red-200"
          : "border-gray-300  dark:focus:border-blue-500 focus:ring-blue-300",
        className
      )}
      {...props}
    />
  );
};
