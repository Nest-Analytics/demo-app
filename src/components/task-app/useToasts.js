import { useRef, useState } from "react";

// Transient, bottom-of-screen feedback. Toasts with an action (e.g. Undo)
// linger a little longer than plain ones before auto-dismissing.
export function useToasts() {
  const [toasts, setToasts] = useState([]);
  const seq = useRef(0);

  function dismiss(id) {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }

  function toast(message, options = {}) {
    const id = (seq.current += 1);
    setToasts((current) => [...current, { id, message, ...options }]);
    window.setTimeout(() => dismiss(id), options.actionLabel ? 6000 : 3500);
    return id;
  }

  return { toasts, toast, dismiss };
}
