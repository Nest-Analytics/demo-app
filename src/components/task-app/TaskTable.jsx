import TaskRow from "./TaskRow.jsx";

function EmptyState({ title, description }) {
  return (
    <div className="px-6 py-16 text-center">
      <p className="text-[1.15rem] font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-[14px] text-slate-500">{description}</p>
    </div>
  );
}

export default function TaskTable({
  items,
  onToggleItem,
  onToggleFlag,
  onDeleteItem,
  onUpdateItem,
  categoryOptions,
  bucketOptions,
  emptyTitle,
  emptyDescription,
  hasMore,
  onLoadMore,
  totalCount,
}) {
  return (
    <div className="mt-4 flex flex-col overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)] lg:min-h-0 lg:flex-1">
      <div className="hidden shrink-0 grid-cols-[minmax(0,1fr)_180px_80px_112px] border-b border-slate-200 bg-slate-50/70 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 xl:grid">
        <span>Task</span>
        <span>Project</span>
        <span>Due</span>
        <span>Actions</span>
      </div>

      <div className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
        {items.length === 0 ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          <>
            {items.map((item, index) => (
              <TaskRow
                key={item.id}
                item={item}
                isLast={index === items.length - 1 && !hasMore}
                onToggleItem={onToggleItem}
                onToggleFlag={onToggleFlag}
                onDeleteItem={onDeleteItem}
                onUpdateItem={onUpdateItem}
                categoryOptions={categoryOptions}
                bucketOptions={bucketOptions}
              />
            ))}
            {hasMore ? (
              <div className="flex items-center justify-center gap-3 px-5 py-4">
                <span className="text-[12px] text-slate-500">
                  Showing {items.length} of {totalCount}
                </span>
                <button
                  type="button"
                  onClick={onLoadMore}
                  className="rounded-[10px] border border-slate-200 bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#2170eb] transition hover:bg-[#eaf1ff]"
                >
                  Load more
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
