import { useState } from "react";
import { CATEGORY_STYLES } from "./data.js";
import { CheckMarkCircle, FlagIcon, PencilIcon, TrashIcon } from "./Icons.jsx";

export default function TaskRow({
  item,
  isLast,
  onToggleItem,
  onToggleFlag,
  onDeleteItem,
  onUpdateItem,
  categoryOptions,
  bucketOptions,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    text: item.text,
    category: item.category,
    due: item.due,
    bucket: item.bucket,
    flagged: item.flagged,
  });

  function submitEdit(event) {
    event.preventDefault();
    const text = draft.text.trim();
    if (!text) return;
    onUpdateItem(item.id, {
      text,
      category: draft.category,
      due: draft.due.trim(),
      bucket: draft.bucket,
      flagged: draft.flagged,
    });
    setIsEditing(false);
  }

  return (
    <article
      className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-3.5 transition hover:bg-slate-50/70 sm:px-5 ${
        isLast ? "" : "border-b border-slate-200"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggleItem(item.id)}
        className="text-slate-400 transition hover:text-sky-600"
        aria-label={item.done ? "Mark task as active" : "Mark task as done"}
      >
        <CheckMarkCircle checked={item.done} />
      </button>

      <div className="min-w-0 xl:grid xl:grid-cols-[minmax(0,1fr)_180px_80px] xl:items-center xl:gap-3">
        {isEditing ? (
          <form
            onSubmit={submitEdit}
            onKeyDown={(event) => {
              if (event.key === "Escape") setIsEditing(false);
            }}
          >
            <div className="grid gap-2 xl:grid-cols-[minmax(0,1fr)_180px_80px_120px]">
              <input
                type="text"
                value={draft.text}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, text: event.target.value }))
                }
                autoFocus
                className="w-full rounded-[10px] border border-slate-300 px-3 py-2 text-[14px] outline-none focus:border-[#2170eb]"
              />
              <select
                value={draft.category}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, category: event.target.value }))
                }
                className="rounded-[10px] border border-slate-300 px-3 py-2 text-[14px] outline-none focus:border-[#2170eb]"
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={draft.due}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, due: event.target.value }))
                }
                placeholder="Due"
                className="rounded-[10px] border border-slate-300 px-3 py-2 text-[14px] outline-none focus:border-[#2170eb]"
              />
              <select
                value={draft.bucket}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, bucket: event.target.value }))
                }
                className="rounded-[10px] border border-slate-300 px-3 py-2 text-[14px] outline-none focus:border-[#2170eb]"
              >
                {bucketOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </form>
        ) : (
          <p
            className={`min-w-0 truncate pr-2 text-[14px] font-medium ${
              item.done ? "text-slate-400 line-through" : "text-slate-950"
            }`}
          >
            {item.text}
          </p>
        )}

        <div className="mt-1.5 flex items-center gap-3 xl:mt-0 xl:contents">
          <span
            className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              CATEGORY_STYLES[item.category] || CATEGORY_STYLES.General
            }`}
          >
            {item.category}
          </span>

          <span className="text-[13px] text-slate-500 xl:text-[14px] xl:text-slate-700">
            {item.due || ""}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-slate-400 sm:gap-3">
        <button
          type="button"
          onClick={() => (isEditing ? setDraft((current) => ({ ...current, flagged: !current.flagged })) : onToggleFlag(item.id))}
          className="transition hover:text-red-500"
          aria-label="Toggle task flag"
        >
          <FlagIcon active={isEditing ? draft.flagged : item.flagged} />
        </button>
        <button
          type="button"
          onClick={() => {
            if (isEditing) {
              submitEdit({ preventDefault() {} });
              return;
            }
            setDraft({
              text: item.text,
              category: item.category,
              due: item.due,
              bucket: item.bucket,
              flagged: item.flagged,
            });
            setIsEditing(true);
          }}
          className="transition hover:text-slate-700"
          aria-label={isEditing ? "Save task" : "Edit task"}
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          onClick={() => onDeleteItem(item.id)}
          className="transition hover:text-slate-700"
          aria-label="Delete task"
        >
          <TrashIcon />
        </button>
      </div>
    </article>
  );
}
