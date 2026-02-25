import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={
        "px-3 py-1 rounded-xl font-medium transition " +
        "bg-blue-200 text-white hover:opacity-60 disabled:opacity-30 " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}