import Logo from "./Logo.jsx";
import TopNavActions from "./TopNavActions.jsx";

export default function TopNav({
  appName,
  ownerName,
  navItems,
  section,
  onSectionChange,
  getCount,
  items,
  search,
  onSearchChange,
  notifications,
  unreadCount,
  notificationsOpen,
  onToggleNotifications,
  onCloseNotifications,
  onOpenSettings,
  onSignOut,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1180px] items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex shrink-0 items-center gap-2.5">
          <Logo className="h-9 w-9 rounded-[9px] shadow-[0_8px_16px_rgba(43,120,238,0.28)]" />
          <span className="hidden text-[1.15rem] font-semibold tracking-[-0.03em] text-slate-950 sm:block">
            {appName}
          </span>
        </div>

        <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-1">
          {navItems.map((item) => {
            const active = item.id === section;
            const count = getCount(items, item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSectionChange(item.id)}
                className={`flex shrink-0 items-center gap-2 rounded-[10px] px-3 py-1.5 text-[13px] font-medium transition ${
                  active
                    ? "bg-[#eaf1ff] text-[#2170eb]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
                {count > 0 ? (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${
                      active ? "bg-[#2170eb] text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="shrink-0">
          <TopNavActions
            ownerName={ownerName}
            search={search}
            onSearchChange={onSearchChange}
            notifications={notifications}
            unreadCount={unreadCount}
            notificationsOpen={notificationsOpen}
            onToggleNotifications={onToggleNotifications}
            onCloseNotifications={onCloseNotifications}
            onOpenSettings={onOpenSettings}
            onSignOut={onSignOut}
          />
        </div>
      </div>
    </header>
  );
}
