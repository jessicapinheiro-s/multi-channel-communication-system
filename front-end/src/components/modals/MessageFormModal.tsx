import { useEffect, useRef, useState } from "react";

interface CampaignData {
  message: string;
  channel: string;
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
  initialValue = { message: "", channel: "sms" },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg mx-4 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ ...value, message: (value.message ?? "").trim() });
          }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Canal de Envio
          </label>
          <select
            name="canal"
            id="canal"
            title="Canal de Envio"
            value={value.channel}
            onChange={(e) => setValue({ ...value, channel: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="sms">SMS</option>
            <option value="email">Email</option>
          </select>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mensagem
          </label>
          <textarea
            ref={inputRef}
            value={value.message}
            onChange={(e) => setValue({ ...value, message: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite a mensagem da campanha"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
