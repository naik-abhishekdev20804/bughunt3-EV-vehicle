import { useEffect } from "react";

const ICONS = { success: "✅", error: "❌", info: "ℹ️" };

export function ToastStack({ toasts, onDismiss }) {
  return (
    <div className="toast-wrap" aria-live="polite">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className={`toast ${toast.type}`}>
      <span className="toast-icon">{ICONS[toast.type] ?? ICONS.info}</span>
      <span>{toast.message}</span>
    </div>
  );
}
