import { useEffect } from "react";
import TaskComposer from "./TaskComposer.jsx";

export default function NewTaskModal({
  isOpen,
  composer,
  categoryOptions,
  bucketOptions,
  onComposerChange,
  onClose,
  onSubmit,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleSubmit(event) {
    onSubmit(event);
    if (composer.text.trim()) onClose();
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/35 px-4">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <section className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[18px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-slate-950">Add new task</h3>
            <p className="mt-1 text-[13px] text-slate-500">Fill in the details and save it to your list.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-[10px] p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <TaskComposer
          composer={composer}
          categoryOptions={categoryOptions}
          bucketOptions={bucketOptions}
          onComposerChange={onComposerChange}
          onSubmit={handleSubmit}
          onClose={onClose}
        />
      </section>
    </div>
  );
}
