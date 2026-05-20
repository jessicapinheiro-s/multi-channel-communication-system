import { useEffect, useRef, useState } from "react";

interface CampaignData {
  message: string;
  channel: string;
  name: string;
}

interface MessageFormModalProps {
  open: boolean;
  initialValue?: CampaignData;
  title?: string;
  submitLabel?: string;
  onClose: () => void;
  onSubmit: (value: CampaignData) => void;
}

export default function MessageFormModal({
  open,
  initialValue = { message: "", channel: "sms", name: "" },
  title = "Enviar mensagem",
  submitLabel = "Enviar",
  onClose,
  onSubmit,
}: MessageFormModalProps) {
  const [value, setValue] = useState<CampaignData>(initialValue);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
      // focus the input (textarea) when opening
      setTimeout(() => inputRef.current?.focus(), 0);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="
      absolute inset-0
      bg-black/70
      backdrop-blur-md
    "
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="
      relative overflow-hidden
      w-full max-w-xl
      rounded-3xl
      border border-white/10
      bg-slate-900/90
      backdrop-blur-2xl
      shadow-2xl shadow-cyan-500/10
      p-8
    "
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/10 blur-3xl rounded-full" />

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-black tracking-tight text-white">
              {title}
            </h2>

            <p className="text-slate-400 mt-2 text-sm">
              Configure and launch your multichannel campaign.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();

              onSubmit({
                ...value,
                message: (value.message ?? "").trim(),
              });
            }}
          >
            {/* Channel */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Channel
              </label>

              <select
                name="canal"
                id="canal"
                title="Channel"
                value={value.channel}
                onChange={(e) =>
                  setValue({
                    ...value,
                    channel: e.target.value,
                  })
                }
                className="
              w-full
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              px-4 py-3
              text-slate-200
              outline-none
              transition-all
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-400/20
            "
              >
                <option value="sms" className="bg-slate-900">
                  SMS
                </option>

                <option value="email" className="bg-slate-900">
                  Email
                </option>
              </select>
            </div>

            {/* Name */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Campaign Name
              </label>

              <input
                type="text"
                value={value.name}
                onChange={(e) =>
                  setValue({
                    ...value,
                    name: e.target.value,
                  })
                }
                className="
              w-full
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              px-4 py-3
              text-slate-200
              placeholder:text-slate-500
              outline-none
              transition-all
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-400/20
            "
                placeholder="Summer Promotion Campaign"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Message
              </label>

              <textarea
                ref={inputRef}
                value={value.message}
                onChange={(e) =>
                  setValue({
                    ...value,
                    message: e.target.value,
                  })
                }
                className="
              w-full min-h-[160px]
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              px-4 py-3
              text-slate-200
              placeholder:text-slate-500
              outline-none
              resize-none
              transition-all
              focus:border-cyan-400
              focus:ring-2
              focus:ring-cyan-400/20
            "
                placeholder="Write your campaign message..."
              />
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="
              px-5 py-3 rounded-2xl
              border border-white/10
              bg-white/[0.03]
              text-slate-300
              hover:bg-white/[0.06]
              transition-all
            "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
              px-6 py-3 rounded-2xl
              bg-gradient-to-r from-cyan-500 to-blue-500
              text-white font-semibold
              shadow-lg shadow-cyan-500/20
              hover:scale-[1.02]
              transition-all duration-300
            "
              >
                {submitLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
