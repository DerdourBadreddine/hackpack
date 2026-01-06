import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
    "relative overflow-hidden px-6 py-3 rounded-full font-medium text-[15px] transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] dark:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.7)]";

  const variants = {
    primary:
      "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-600",
    secondary:
      "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700",
    glass:
      "bg-white/60 backdrop-blur-md border border-white/70 text-slate-800 hover:bg-white/80 dark:bg-white/10 dark:border-white/10 dark:text-slate-100 dark:hover:bg-white/15",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin h-4 w-4 border-2 border-white/50 border-t-white rounded-full block" />
      ) : (
        children
      )}
    </button>
  );
};

// Card Component
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = "", onClick }) => (
  <div
    onClick={onClick}
    className={`glass-panel p-6 rounded-3xl transition-all duration-300 ${
      onClick ? "cursor-pointer hover:-translate-y-1 hover:shadow-float" : ""
    } dark:bg-white/5 dark:border-white/10 ${className}`}
  >
    {children}
  </div>
);

// Badge Component
export const Badge: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <span className="px-2.5 py-0.5 rounded-md bg-slate-100/50 border border-slate-200/50 text-[11px] font-semibold text-slate-500 uppercase tracking-wide dark:bg-white/10 dark:border-white/10 dark:text-slate-200">
    {children}
  </span>
);

// Input Component
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => (
  <input
    className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all dark:bg-slate-900/60 dark:border-slate-700 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-900"
    {...props}
  />
);

// Pill Component for filters/tags
export const Pill: React.FC<{
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-sm font-medium transition-all border ${
      active
        ? "bg-slate-900 text-white border-slate-900 shadow-sm dark:bg-white dark:text-slate-900 dark:border-white"
        : "bg-white/60 text-slate-700 border-slate-200 hover:-translate-y-px hover:shadow-sm dark:bg-white/5 dark:text-slate-200 dark:border-white/10"
    }`}
  >
    {children}
  </button>
);

// Modal Container
export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, children }) => {
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

// Toast system to replace alert-based messaging
type ToastVariant = "default" | "success" | "error";

interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  push: (toast: Omit<ToastItem, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const push = (toast: Omit<ToastItem, "id">) => {
    const id = crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);
    const duration = toast.duration ?? 3200;
    setToasts((prev) => [...prev, { ...toast, id, duration }]);
  };

  useEffect(() => {
    const timers = toasts.map((toast) =>
      setTimeout(() => dismiss(toast.id), toast.duration ?? 3200)
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts]);

  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};

const ToastViewport: React.FC<{
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}> = ({ toasts, onDismiss }) => (
  <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-sm">
    {toasts.map((toast) => {
      const palette = {
        default:
          "bg-white/90 border-slate-200 text-slate-800 dark:bg-slate-900/80 dark:border-white/10 dark:text-slate-100",
        success:
          "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-100",
        error:
          "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-100",
      } as const;

      return (
        <div
          key={toast.id}
          className={`border rounded-2xl shadow-lg shadow-black/5 px-4 py-3 backdrop-blur-md animate-slide-up ${
            palette[toast.variant ?? "default"]
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <div className="text-sm font-semibold leading-tight">
                {toast.title}
              </div>
              {toast.description && (
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {toast.description}
                </div>
              )}
            </div>
            <button
              aria-label="Dismiss"
              className="text-xs text-slate-400 hover:text-slate-600"
              onClick={() => onDismiss(toast.id)}
            >
              ×
            </button>
          </div>
        </div>
      );
    })}
  </div>
);
