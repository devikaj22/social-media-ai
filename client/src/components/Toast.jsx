import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const { type = 'info', message } = toast;

  const typeStyles = {
    success: 'bg-emerald-600 text-white shadow-emerald-500/20',
    error: 'bg-rose-600 text-white shadow-rose-500/20',
    info: 'bg-indigo-600 text-white shadow-indigo-500/20',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-100 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-100 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-100 shrink-0" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border border-white/10 ${typeStyles[type]} transition-all duration-300`}
      >
        {icons[type]}
        <p className="text-sm font-medium pr-2">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-lg transition-colors ml-auto"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
