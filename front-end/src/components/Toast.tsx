import { useEffect } from "react";
import { Check, X } from "lucide-react";

type ToastType = "success" | "error";

interface ToastProps {
  open: boolean;
  type?: ToastType;
  title?: string;
  message?: string;
  duration?: number; // ms
  onClose?: () => void;
}

export default function Toast({
  open,
  type = "success",
  title,
  message,
  duration = 500,
  onClose,
}: ToastProps) {

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  const isSuccess = type === "success";
  const bg = isSuccess ? "bg-green-50" : "bg-red-50";
  const border = isSuccess ? "border-green-200" : "border-red-200";
  const text = isSuccess ? "text-green-800" : "text-red-800";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        role="status"
        aria-live="polite"
        className={`
      relative overflow-hidden
      w-[380px]
      rounded-3xl
      border border-white/10
      bg-slate-900/90
      backdrop-blur-2xl
      shadow-2xl
      p-5
      flex gap-4 items-start
      animate-in slide-in-from-bottom-5 fade-in duration-300
    `}
      >
        {/* Glow */}
        <div
          className={`
        absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full
        ${isSuccess
              ? "bg-emerald-400/10"
              : "bg-red-400/10"
            }
      `}
        />

        {/* Icon */}
        <div className="relative z-10 flex-shrink-0">
          <div
            className={`
          w-12 h-12 rounded-2xl
          flex items-center justify-center
          border
          ${isSuccess
                ? "bg-emerald-500/10 border-emerald-500/20"
                : "bg-red-500/10 border-red-500/20"
              }
        `}
          >
            {isSuccess ? (
              <Check
                className="h-6 w-6 text-emerald-400"
                strokeWidth={2.5}
              />
            ) : (
              <X
                className="h-6 w-6 text-red-400"
                strokeWidth={2.5}
              />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 min-w-0">
          {title && (
            <h3 className="text-white font-semibold text-base">
              {title}
            </h3>
          )}

          {message && (
            <p className="text-sm text-slate-400 mt-1 leading-relaxed">
              {message}
            </p>
          )}
        </div>

        {/* Close */}
        <button
          onClick={() => onClose && onClose()}
          aria-label="Close alert"
          className="
        relative z-10
        opacity-60 hover:opacity-100
        transition-all
        rounded-xl
        p-1
        hover:bg-white/5
      "
        >
          <X
            className="h-5 w-5 text-slate-400"
            strokeWidth={2.5}
          />
        </button>
      </div>
    </div>
  );
}
