interface LoadingModalProps {
    open: boolean;
    message?: string;
}

export default function LoadingModal({ open, message = "Loading..." }: LoadingModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                role="dialog"
                aria-modal="true"
                className="
      relative overflow-hidden
      w-11/12 max-w-sm
      rounded-3xl
      border border-white/10
      bg-slate-900/90
      backdrop-blur-2xl
      p-8
      flex flex-col items-center gap-5
      shadow-2xl shadow-cyan-500/10
    "
            >
                {/* Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 blur-3xl rounded-full" />

                {/* Spinner */}
                <div
                    className="
        relative z-10
        w-14 h-14
        rounded-full
        border-[3px]
        border-white/10
        border-t-cyan-400
        animate-spin
      "
                />

                {/* Message */}
                <div className="relative z-10 text-center">
                    <h2 className="text-lg font-semibold text-white">
                        Processing
                    </h2>

                    <p className="text-sm text-slate-400 mt-2">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
}

