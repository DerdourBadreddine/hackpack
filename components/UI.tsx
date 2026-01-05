import React from "react";

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass";
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading,
  className = "",
  ...props
}) => {
  const baseStyle =
    "relative overflow-hidden px-6 py-3 rounded-full font-medium text-[15px] transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-600",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
    glass: "bg-white/40 backdrop-blur-md border border-white/50 text-slate-800 hover:bg-white/60",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {isLoading ? (
        <span className="animate-spin h-4 w-4 border-2 border-white/50 border-t-white rounded-full block" />
      ) : (
        children
      )}
    </button>
  );
};

// Card Component
export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({
  children,
  className = "",
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`glass-panel p-6 rounded-3xl transition-all duration-300 ${
      onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-float" : ""
    } ${className}`}
  >
    {children}
  </div>
);

// Badge Component
export const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="px-2.5 py-0.5 rounded-md bg-slate-100/50 border border-slate-200/50 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
    {children}
  </span>
);

// Input Component
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all"
    {...props}
  />
);

// Modal Container
export const Modal: React.FC<{ isOpen: boolean; onClose: () => void; children: React.ReactNode }> = ({
  isOpen,
  children,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm animate-fade-in" />
      <div className="relative z-10 w-full max-w-lg animate-slide-up">
        <Card>{children}</Card>
      </div>
    </div>
  );
};
