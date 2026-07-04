import TopNav from "./TopNav.jsx";
import TaskFilters from "./TaskFilters.jsx";
import TaskTable from "./TaskTable.jsx";
import InsightsPanel from "./InsightsPanel.jsx";
import SettingsPage from "./SettingsPage.jsx";
import NewTaskModal from "./NewTaskModal.jsx";
import ToastViewport from "./ToastViewport.jsx";
import {
  APP_NAME,
  BUCKET_OPTIONS,
  CATEGORY_OPTIONS,
  SIDEBAR_ITEMS,
  formatDateText,
  getSidebarCount,
} from "./data.js";

export default function Workspace({ taskline: t, onSignOut }) {
  const inSettings = t.settingsOpen;

  function goToSection(id) {
    t.setSettingsOpen(false);
    t.setSection(id);
  }

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[#eef3f7] text-slate-900">
      <TopNav
        appName={t.settings.workspaceName || APP_NAME}
        ownerName={t.settings.ownerName}
        navItems={SIDEBAR_ITEMS}
        section={inSettings ? null : t.section}
        onSectionChange={goToSection}
        getCount={getSidebarCount}
        items={t.items}
        search={t.search}
        onSearchChange={t.setSearch}
        notifications={t.notifications}
        unreadCount={t.unreadCount}
        notificationsOpen={t.notificationsOpen}
        onToggleNotifications={t.toggleNotifications}
        onCloseNotifications={t.closeNotifications}
        onOpenSettings={() => {
          t.closeNotifications();
          t.setSettingsOpen(true);
        }}
        onSignOut={onSignOut}
      />

      <div className="min-h-0 flex-1 overflow-y-auto lg:overflow-hidden">
        {inSettings ? (
          <div className="h-full overflow-y-auto">
            <SettingsPage
              settings={t.settings}
              categoryOptions={CATEGORY_OPTIONS}
              bucketOptions={BUCKET_OPTIONS}
              onChange={t.setSettings}
              onClose={() => t.setSettingsOpen(false)}
              onResetDemo={t.restoreDemoTasks}
              onClearCompleted={t.clearCompleted}
            />
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-[1180px] flex-col px-4 py-5 sm:px-6 sm:py-6 lg:h-full">
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-[1.7rem] font-semibold tracking-[-0.03em] text-slate-950">
                  {t.activeSection.title}
                </h1>
                <p className="mt-1 text-[13px] text-slate-500">
                  {formatDateText()} · {t.activeSection.description}
                </p>
              </div>

              <button
                type="button"
                onClick={t.handleStartNewTask}
                className="inline-flex items-center gap-2 self-start rounded-[12px] bg-[linear-gradient(180deg,#4492ff_0%,#2170eb_100%)] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_10px_20px_rgba(32,112,235,0.20)] transition hover:brightness-105 sm:self-auto"
              >
                <span className="text-[16px] leading-none">+</span>
                Add New Task
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-5 lg:min-h-0 lg:flex-1 lg:flex-row">
              <section className="flex flex-col lg:min-h-0 lg:flex-1">
                <TaskFilters
                  filters={t.filters}
                  categoryOptions={CATEGORY_OPTIONS}
                  bucketOptions={BUCKET_OPTIONS}
                  onChange={t.setFilters}
                  onReset={t.resetFilters}
                />
                <TaskTable
                  items={t.visibleItems}
                  categoryOptions={CATEGORY_OPTIONS}
                  bucketOptions={BUCKET_OPTIONS}
                  onToggleItem={t.toggleItem}
                  onToggleFlag={t.toggleFlag}
                  onDeleteItem={t.deleteItem}
                  onUpdateItem={t.updateItem}
                  emptyTitle={t.activeSection.emptyTitle}
                  emptyDescription={t.activeSection.emptyDescription}
                  hasMore={t.hasMore}
                  onLoadMore={t.loadMore}
                  totalCount={t.filteredCount}
                />
              </section>

              <div className="lg:w-[300px] lg:shrink-0 lg:overflow-y-auto">
                <InsightsPanel
                  totalCount={t.totalCount}
                  doneCount={t.doneCount}
                  openCount={t.openCount}
                  overdueCount={t.overdueCount}
                  streakDays={5}
                  onOpenCompleted={() => t.setSection("done")}
                  onOpenOverdue={t.openOverdue}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <NewTaskModal
        isOpen={t.newTaskOpen}
        composer={t.composer}
        categoryOptions={CATEGORY_OPTIONS}
        bucketOptions={BUCKET_OPTIONS}
        onComposerChange={t.setComposer}
        onClose={() => t.setNewTaskOpen(false)}
        onSubmit={t.addItem}
      />

      <ToastViewport toasts={t.toasts} onDismiss={t.dismissToast} />
    </main>
  );
}
