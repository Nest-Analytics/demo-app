function ProgressRing({ percent }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  return (
    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
      <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="#e6edf5" strokeWidth="8" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="#2170eb"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="absolute text-[1.35rem] font-semibold text-slate-950">{percent}%</span>
    </div>
  );
}

function StatPill({ label, value, tone = "slate", onClick }) {
  const tones = {
    slate: "text-slate-900",
    blue: "text-[#2170eb]",
    green: "text-[#16a34a]",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-[12px] border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-left transition hover:border-slate-300 hover:bg-slate-50"
    >
      <p className="text-[12px] text-slate-500">{label}</p>
      <p className={`text-[1.25rem] font-semibold ${tones[tone]}`}>{value}</p>
    </button>
  );
}

export default function InsightsPanel({
  totalCount,
  doneCount,
  openCount,
  overdueCount,
  streakDays,
  onOpenOverdue,
  onOpenCompleted,
}) {
  const completionRate = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

  return (
    <aside className="space-y-4">
      <section className="rounded-[16px] border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
        <h3 className="text-[1rem] font-semibold tracking-[-0.02em] text-slate-950">Progress</h3>
        <div className="mt-4 flex items-center gap-4">
          <ProgressRing percent={completionRate} />
          <div className="space-y-1">
            <p className="text-[13px] text-slate-500">Completion</p>
            <p className="text-[1.05rem] font-semibold text-slate-900">
              {doneCount} of {totalCount} done
            </p>
            <p className="text-[12px] text-slate-500">🔥 {streakDays}-day streak</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <StatPill label="Open" value={openCount} tone="blue" />
          <StatPill label="Done" value={doneCount} tone="green" onClick={onOpenCompleted} />
        </div>
      </section>

      <section className="rounded-[16px] border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
        <h3 className="text-[1rem] font-semibold tracking-[-0.02em] text-slate-950">Quick Links</h3>
        <button
          type="button"
          onClick={onOpenOverdue}
          className="mt-3 flex w-full items-center justify-between rounded-[12px] border border-slate-200 px-3 py-2.5 text-left transition hover:border-[#f0b6ae] hover:bg-[#fef6f5]"
        >
          <span className="text-[13px] font-medium text-slate-700">Overdue Tasks</span>
          <span className="rounded-full bg-[#fdecea] px-2 py-0.5 text-[12px] font-semibold text-[#ef5a49]">
            {overdueCount}
          </span>
        </button>
      </section>
    </aside>
  );
}
