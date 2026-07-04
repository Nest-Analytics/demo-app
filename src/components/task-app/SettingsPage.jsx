function TextField({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium text-slate-700">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-slate-700 outline-none transition focus:border-[#2170eb] focus:bg-white"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium text-slate-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3.5 py-2.5 text-[14px] text-slate-700 outline-none transition focus:border-[#2170eb] focus:bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function SettingsPage({
  settings,
  categoryOptions,
  bucketOptions,
  onChange,
  onClose,
  onResetDemo,
  onClearCompleted,
}) {
  function update(field, value) {
    onChange((current) => ({ ...current, [field]: value }));
  }

  const categoryOpts = categoryOptions.map((option) => ({ value: option, label: option }));

  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-6 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-[1.7rem] font-semibold tracking-[-0.03em] text-slate-950">Settings</h1>
          <p className="mt-1 text-[13px] text-slate-500">Workspace preferences and defaults</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-[10px] border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        >
          Back to tasks
        </button>
      </div>

      <section className="mt-5 space-y-5 rounded-[16px] border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-6">
        <TextField label="Workspace name" value={settings.workspaceName} onChange={(v) => update("workspaceName", v)} />
        <TextField label="Owner name" value={settings.ownerName} onChange={(v) => update("ownerName", v)} />
        <SelectField label="Default category" value={settings.defaultCategory} onChange={(v) => update("defaultCategory", v)} options={categoryOpts} />
        <SelectField label="Default list" value={settings.defaultBucket} onChange={(v) => update("defaultBucket", v)} options={bucketOptions} />
        <TextField label="Default due" value={settings.defaultDue} onChange={(v) => update("defaultDue", v)} />
      </section>

      <section className="mt-4 rounded-[16px] border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-6">
        <h2 className="text-[1rem] font-semibold tracking-[-0.02em] text-slate-950">Utilities</h2>
        <p className="mt-1 text-[13px] text-slate-500">Manage your demo task data.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onClearCompleted}
            className="rounded-[10px] border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Clear completed
          </button>
          <button
            type="button"
            onClick={onResetDemo}
            className="rounded-[10px] border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Restore demo tasks
          </button>
        </div>
      </section>
    </div>
  );
}
