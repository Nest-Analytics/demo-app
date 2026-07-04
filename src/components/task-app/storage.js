import { STARTER_TASKS, STORAGE_KEY, SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS } from "./data.js";

export function generateId() {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function makeNotification(label, value) {
  return {
    id: generateId(),
    label,
    value,
  };
}

export function loadItems() {
  if (typeof window === "undefined") return STARTER_TASKS;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return STARTER_TASKS;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : STARTER_TASKS;
  } catch {
    return STARTER_TASKS;
  }
}

export function loadSettings() {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  try {
    const stored = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!stored) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}
