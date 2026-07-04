const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "open", label: "Open" },
  { value: "done", label: "Done" },
  { value: "flagged", label: "Flagged" },
];

const SELECT_CLASS =
  "rounded-[10px] border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 outline-none transition hover:border-slate-300 focus:border-[#2170eb]";

export default function TaskFilters({
  filters,
  categoryOptions,
  bucketOptions,
  onChange,
  onReset,
}) {
  function update(field, value) {
    onChange((current) => ({ ...current, [field]: value }));
  }

  return (
    <div className="flex shrink-0 flex-wrap items-center gap-2">
      <select
        value={filters.status}
        onChange={(event) => update("status", event.target.value)}
        className={SELECT_CLASS}
      >
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        value={filters.category}
        onChange={(event) => update("category", event.target.value)}
        className={SELECT_CLASS}
      >
        <option value="all">All projects</option>
        {categoryOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        value={filters.bucket}
        onChange={(event) => update("bucket", event.target.value)}
        className={SELECT_CLASS}
      >
        <option value="all">All lists</option>
        {bucketOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={onReset}
        className="rounded-[10px] px-3 py-1.5 text-[12px] font-medium text-[#2170eb] transition hover:bg-[#eaf1ff]"
      >
        Reset filters
      </button>
    </div>
  );
}
