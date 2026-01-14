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
        className={`${bg} ${border} ${text} border rounded-lg shadow-lg max-w-sm w-80 p-4 flex gap-3 items-start`}
      >
        <div className="flex-shrink-0">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isSuccess ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isSuccess ? (
              <Check className="h-5 w-5 text-green-600" strokeWidth={2.5} />
            ) : (
              <X className="h-5 w-5 text-red-600" strokeWidth={2.5} />
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          {title && <div className="font-semibold">{title}</div>}
          {message && <div className="text-sm mt-1">{message}</div>}
        </div>

        <button
          onClick={() => onClose && onClose()}
          aria-label="Fechar alerta"
          className="ml-2 opacity-70 hover:opacity-100"
        >
          <X
            className={`h-5 w-5 ${
              isSuccess ? "text-green-700" : "text-red-700"
            }`}
            strokeWidth={2.5}
          />
        </button>
      </div>
    </div>
  );
}
