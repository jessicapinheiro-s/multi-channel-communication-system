import React from "react";

interface LoadingModalProps {
    open: boolean;
    message?: string;
}

export default function LoadingModal({ open, message = "Loading..." }: LoadingModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />

            <div
                role="dialog"
                aria-modal="true"
                className="relative bg-[#0b1220] text-white rounded-lg p-6 flex flex-col items-center gap-4 w-11/12 max-w-sm shadow-lg"
            >
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                <p className="text-center text-sm">{message}</p>
            </div>
        </div>
    );
}

