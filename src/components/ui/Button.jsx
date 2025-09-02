import { h } from "preact";
import { cn } from "../../lib/utils"; // kalau belum ada, bikin helper cn

export function Button({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  class: className,
  onClick,
  ...props
}) {
  const base =
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed shadow-sm",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed",
    outline:
      "border border-gray-300 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed",
    danger:
      "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      class={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
