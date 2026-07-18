import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-11 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-3.5 py-2.5 text-sm text-[var(--text-h)] shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[var(--muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ""}`}
      ref={ref}
      {...props}
    />
  );
}
);
Input.displayName = "Input";

export { Input };
