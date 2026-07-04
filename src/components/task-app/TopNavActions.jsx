import { useEffect, useRef, useState } from "react";
import { BellIcon, ChevronIcon, SearchIcon } from "./Icons.jsx";

function NotificationsMenu({ notifications }) {
  return (
    <div className="absolute right-0 top-full z-30 mt-2 w-64 rounded-[12px] border border-slate-200 bg-white p-2.5 shadow-[0_12px_28px_rgba(15,23,42,0.12)]">
      <p className="px-2 pb-2 text-[13px] font-semibold text-slate-900">Notifications</p>
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <div className="rounded-[10px] bg-slate-50 px-3 py-3 text-[13px] text-slate-500">
            No notifications yet.
          </div>
        ) : null}
        {notifications.map((item) => (
          <div key={item.id} className="rounded-[10px] bg-slate-50 px-3 py-2">
            <p className="text-[13px] font-medium text-slate-800">{item.label}</p>
            <p className="mt-0.5 text-[12px] text-slate-500">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileMenu({ ownerName, onOpenSettings, onSignOut }) {
  return (
    <div className="absolute right-0 top-full z-30 mt-2 w-52 rounded-[12px] border border-slate-200 bg-white p-1.5 shadow-[0_12px_28px_rgba(15,23,42,0.12)]">
      <div className="px-2.5 py-2">
        <p className="text-[13px] font-semibold text-slate-900">{ownerName}</p>
        <p className="text-[12px] text-slate-500">Signed in</p>
      </div>
      <div className="my-1 h-px bg-slate-100" />
      <button
        type="button"
        onClick={onOpenSettings}
        className="w-full rounded-[9px] px-2.5 py-2 text-left text-[13px] font-medium text-slate-700 transition hover:bg-slate-100"
      >
        Settings
      </button>
      <button
        type="button"
        onClick={onSignOut}
        className="w-full rounded-[9px] px-2.5 py-2 text-left text-[13px] font-medium text-[#ef5a49] transition hover:bg-red-50"
      >
        Sign out
      </button>
    </div>
  );
}

export default function TopNavActions({
  ownerName,
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
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handlePointerDown(event) {
      if (notificationsOpen && !notifRef.current?.contains(event.target)) onCloseNotifications();
      if (profileOpen && !profileRef.current?.contains(event.target)) setProfileOpen(false);
    }
    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [notificationsOpen, profileOpen, onCloseNotifications]);

  return (
    <div className="flex items-center gap-2">
      <label className="hidden items-center gap-2 rounded-[10px] border border-slate-200 bg-[#f8fafc] px-3 py-1.5 text-slate-400 transition focus-within:border-[#2170eb] focus-within:bg-white sm:flex">
        <SearchIcon />
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks..."
          className="w-[160px] bg-transparent text-[13px] text-slate-700 outline-none placeholder:text-slate-400"
        />
      </label>

      <div ref={notifRef} className="relative">
        <button
          type="button"
          onClick={onToggleNotifications}
          className="relative rounded-[10px] p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Notifications"
        >
          <BellIcon />
          {unreadCount > 0 ? (
            <span className="absolute right-0.5 top-0.5 flex min-h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#ef5a49] px-1 text-[10px] font-semibold text-white">
              {Math.min(unreadCount, 9)}
            </span>
          ) : null}
        </button>
        {notificationsOpen ? <NotificationsMenu notifications={notifications} /> : null}
      </div>

      <div ref={profileRef} className="relative">
        <button
          type="button"
          onClick={() => setProfileOpen((value) => !value)}
          className="flex items-center gap-2 rounded-[10px] py-1 pl-1 pr-1.5 transition hover:bg-slate-100"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(180deg,#4fa3ff_0%,#2b78ee_100%)] text-[13px] font-semibold text-white">
            {ownerName.slice(0, 1).toUpperCase()}
          </span>
          <span className="hidden text-[13px] font-medium text-slate-700 xl:block">{ownerName}</span>
          <span className="text-slate-400">
            <ChevronIcon />
          </span>
        </button>
        {profileOpen ? (
          <ProfileMenu
            ownerName={ownerName}
            onOpenSettings={() => {
              setProfileOpen(false);
              onOpenSettings();
            }}
            onSignOut={onSignOut}
          />
        ) : null}
      </div>
    </div>
  );
}
