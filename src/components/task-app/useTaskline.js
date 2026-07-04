import { useEffect, useState } from "react";
import { APP_NAME, DEFAULT_SETTINGS, SECTION_META, SETTINGS_STORAGE_KEY } from "./data.js";
import { loadSettings } from "./storage.js";
import { filterItems } from "./task-filter.js";
import { useNotifications } from "./useNotifications.js";
import { usePagination } from "./usePagination.js";
import { useTasks } from "./useTasks.js";
import { useToasts } from "./useToasts.js";

const CLEARED_FILTERS = { status: "all", category: "all", bucket: "all" };

export function useTaskline() {
  const notifications = useNotifications();
  const toasts = useToasts();
  const tasks = useTasks(notifications.pushNotification, toasts.toast);
  const [settings, setSettings] = useState(() => loadSettings());
  const [composer, setComposer] = useState({
    text: "",
    category: DEFAULT_SETTINGS.defaultCategory,
    due: DEFAULT_SETTINGS.defaultDue,
    bucket: DEFAULT_SETTINGS.defaultBucket,
    flagged: false,
  });
  const [search, setSearch] = useState("");
  const [section, setSection] = useState("all");
  const [filters, setFilters] = useState(CLEARED_FILTERS);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [newTaskOpen, setNewTaskOpen] = useState(false);

  useEffect(() => {
    document.title = settings.workspaceName || APP_NAME;
  }, [settings.workspaceName]);

  useEffect(() => {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    setComposer((current) => ({
      ...current,
      category: current.text ? current.category : settings.defaultCategory,
      due: current.text ? current.due : settings.defaultDue,
      bucket: current.text ? current.bucket : settings.defaultBucket,
    }));
  }, [settings.defaultBucket, settings.defaultCategory, settings.defaultDue]);

  function addItem(event) {
    event.preventDefault();
    const text = composer.text.trim();
    if (!text) return;
    tasks.addTask({
      text,
      category: composer.category,
      due: composer.due.trim() || "",
      flagged: composer.flagged,
      bucket: composer.bucket,
    });
    setComposer({
      text: "",
      category: settings.defaultCategory,
      due: settings.defaultDue,
      bucket: settings.defaultBucket,
      flagged: false,
    });
    setNewTaskOpen(false);
  }

  function handleStartNewTask() {
    setSection("today");
    setFilters(CLEARED_FILTERS);
    setSearch("");
    setNewTaskOpen(true);
  }

  function openOverdue() {
    setSection("all");
    setSearch("");
    setFilters((current) => ({ ...current, status: "flagged" }));
  }

  const items = tasks.items;
  const filtered = filterItems(items, { section, filters, search });
  const resetKey = `${section}|${JSON.stringify(filters)}|${search}`;
  const pagination = usePagination(filtered, resetKey);
  const activeSection = SECTION_META[section] || SECTION_META.all;

  return {
    ...notifications,
    ...tasks,
    toasts: toasts.toasts,
    dismissToast: toasts.dismiss,
    settings,
    setSettings,
    composer,
    setComposer,
    search,
    setSearch,
    section,
    setSection,
    filters,
    setFilters,
    settingsOpen,
    setSettingsOpen,
    newTaskOpen,
    setNewTaskOpen,
    visibleItems: pagination.items,
    filteredCount: pagination.total,
    hasMore: pagination.hasMore,
    loadMore: pagination.loadMore,
    activeSection,
    totalCount: items.length,
    doneCount: items.filter((item) => item.done).length,
    openCount: items.filter((item) => !item.done).length,
    overdueCount: items.filter((item) => item.flagged && !item.done).length,
    addItem,
    handleStartNewTask,
    openOverdue,
    resetFilters: () => setFilters(CLEARED_FILTERS),
  };
}
