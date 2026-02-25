import { type InputHTMLAttributes, forwardRef, type ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      className = "",
      ...props
    },
    ref
  ) => (
    <div className="flex flex-col gap-2 w-full">

      {label ? (
        <label className="text-sm font-medium">
          {label}
        </label>
      ) : null}

      <input
        ref={ref}
        className={
          "px-2 py-1 rounded-xl border outline-none " +
          "focus:ring-2 focus:ring-blue-200 " +
          className
        }
        {...props}
      />

      {error ? (
        <span className="text-red-200 text-xs">
          {error}
        </span>
      ) : null}

    </div>
  )
);

Input.displayName = "Input";