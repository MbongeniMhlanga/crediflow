import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "destructive";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)] shadow-[0_12px_24px_-14px_rgba(37,99,235,0.6)]",
    secondary: "bg-[var(--surface-soft)] text-[var(--text-h)] hover:bg-[var(--surface-accent)]",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-2xl border border-transparent px-4 py-2.5 text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${className ?? ""}`}
      ref={ref}
      {...props}
    />
  );
}
);
Button.displayName = "Button";

export { Button };
