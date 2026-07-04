import { CalendarIcon, FlagIcon, FolderIcon } from "./Icons.jsx";

const DUE_PRESETS = ["Today", "Tomorrow", "This week"];
const FIELD =
  "w-full rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-slate-700 outline-none transition focus:border-[#2170eb] focus:bg-white";
const WRAP =
  "flex items-center gap-2 rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3 transition focus-within:border-[#2170eb] focus-within:bg-white";

function Label({ children }) {
  return <span className="mb-1.5 block text-[12px] font-medium text-slate-600">{children}</span>;
}

export default function TaskComposer({
  composer,
  categoryOptions,
  bucketOptions,
  onComposerChange,
  onSubmit,
  onClose,
}) {
  function update(field, value) {
    onComposerChange((current) => ({ ...current, [field]: value }));
  }

  const canSave = composer.text.trim().length > 0;
  const dueOptions = [...DUE_PRESETS, ""];

  return (
    <form className="mt-5 space-y-4" onSubmit={onSubmit}>
      <label className="block">
        <Label>Task</Label>
        <input
          autoFocus
          type="text"
          value={composer.text}
          onChange={(event) => update("text", event.target.value)}
          placeholder="What needs to be done?"
          className="w-full rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3.5 py-2.5 text-[15px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#2170eb] focus:bg-white"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <Label>Project</Label>
          <div className={WRAP}>
            <span className="text-slate-400"><FolderIcon /></span>
            <select
              value={composer.category}
              onChange={(event) => update("category", event.target.value)}
              className="w-full bg-transparent py-2.5 text-[14px] text-slate-700 outline-none"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </label>
        <label className="block">
          <Label>List</Label>
          <select
            value={composer.bucket}
            onChange={(event) => update("bucket", event.target.value)}
            className={FIELD}
          >
            {bucketOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <Label>Due</Label>
        <div className={WRAP}>
          <span className="text-slate-400"><CalendarIcon /></span>
          <input
            type="text"
            value={composer.due}
            onChange={(event) => update("due", event.target.value)}
            placeholder="e.g. Today, 4 PM, Oct 26"
            className="w-full bg-transparent py-2.5 text-[14px] text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {dueOptions.map((preset) => (
            <button
              key={preset || "none"}
              type="button"
              onClick={() => update("due", preset)}
              className={`rounded-full border px-3 py-1 text-[12px] font-medium transition ${
                composer.due === preset
                  ? "border-[#2170eb] bg-[#eaf1ff] text-[#2170eb]"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {preset || "No date"}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => update("flagged", !composer.flagged)}
        className={`flex w-full items-center justify-between rounded-[10px] border px-3.5 py-2.5 text-[13px] font-medium transition ${
          composer.flagged
            ? "border-red-200 bg-red-50 text-red-600"
            : "border-slate-200 text-slate-600 hover:border-slate-300"
        }`}
      >
        <span className="flex items-center gap-2"><FlagIcon active={composer.flagged} /> Flag as priority</span>
        <span className="text-[12px] text-slate-400">{composer.flagged ? "On" : "Off"}</span>
      </button>

      <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-[10px] border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!canSave}
          className="rounded-[10px] bg-[linear-gradient(180deg,#4492ff_0%,#2170eb_100%)] px-4 py-2 text-[13px] font-semibold text-white shadow-[0_6px_14px_rgba(32,112,235,0.16)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save task
        </button>
      </div>
    </form>
  );
}
