import { useEffect, useState } from "react";
import { STARTER_TASKS, STORAGE_KEY } from "./data.js";
import { generateId, loadItems } from "./storage.js";

// Owns the task list and every operation on it. Each mutation also emits a
// notification via the injected pushNotification, keeping the concern self-contained.
export function useTasks(pushNotification, toast) {
  const [items, setItems] = useState(() => loadItems());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addTask(data) {
    setItems((current) => [{ id: generateId(), done: false, ...data }, ...current]);
    pushNotification("Task created", `"${data.text}" was added to ${data.bucket}.`);
  }

  function toggleItem(id) {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        const nextDone = !item.done;
        pushNotification(
          nextDone ? "Task completed" : "Task reopened",
          `"${item.text}" is now ${nextDone ? "done" : "active"}.`,
        );
        return { ...item, done: nextDone };
      }),
    );
  }

  function toggleFlag(id) {
    setItems((current) =>
      current.map((item) => {
        if (item.id !== id) return item;
        const nextFlagged = !item.flagged;
        pushNotification(
          nextFlagged ? "Task flagged" : "Task unflagged",
          `"${item.text}" was ${nextFlagged ? "flagged" : "updated"}.`,
        );
        return { ...item, flagged: nextFlagged };
      }),
    );
  }

  function deleteItem(id) {
    const target = items.find((item) => item.id === id);
    if (!target) return;
    const snapshot = items;
    setItems((current) => current.filter((item) => item.id !== id));
    pushNotification("Task deleted", `"${target.text}" was removed.`);
    toast(`Deleted "${target.text}"`, { actionLabel: "Undo", onAction: () => setItems(snapshot) });
  }

  function updateItem(id, updates) {
    setItems((current) => {
      const target = current.find((item) => item.id === id);
      if (target) pushNotification("Task updated", `"${updates.text || target.text}" was updated.`);
      return current.map((item) => (item.id === id ? { ...item, ...updates } : item));
    });
  }

  function clearCompleted() {
    const removedCount = items.filter((item) => item.done).length;
    if (removedCount === 0) return;
    const snapshot = items;
    setItems((current) => current.filter((item) => !item.done));
    pushNotification("Completed cleared", `${removedCount} completed tasks were removed.`);
    toast(`Cleared ${removedCount} completed`, { actionLabel: "Undo", onAction: () => setItems(snapshot) });
  }

  function restoreDemoTasks() {
    const snapshot = items;
    setItems(STARTER_TASKS);
    pushNotification("Demo restored", "Starter tasks were restored.");
    toast("Demo tasks restored", { actionLabel: "Undo", onAction: () => setItems(snapshot) });
  }

  return {
    items,
    addTask,
    toggleItem,
    toggleFlag,
    deleteItem,
    updateItem,
    clearCompleted,
    restoreDemoTasks,
  };
}
