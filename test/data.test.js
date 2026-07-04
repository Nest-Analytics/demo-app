import { test } from "node:test";
import assert from "node:assert/strict";

// data.js reads app config at import time via runtime-config.js, which normally
// pulls from Vite's import.meta.env. Provide a window config so it short-circuits
// before touching Vite-only globals when running under plain Node.
globalThis.window = { __APP_CONFIG__: { appTitle: "Taskline" } };

const { getSidebarCount } = await import("../src/components/task-app/data.js");

const items = [
  { id: "a", done: false, bucket: "today" },
  { id: "b", done: false, bucket: "today" },
  { id: "c", done: true, bucket: "today" },
  { id: "d", done: false, bucket: "inbox" },
  { id: "e", done: true, bucket: "upcoming" },
];

test("'all' counts every task that is not done", () => {
  assert.equal(getSidebarCount(items, "all"), 3);
});

test("'done' counts only completed tasks", () => {
  assert.equal(getSidebarCount(items, "done"), 10);
});

test("a bucket counts its open tasks only", () => {
  assert.equal(getSidebarCount(items, "today"), 2);
  assert.equal(getSidebarCount(items, "inbox"), 1);
});

test("an empty list returns zero", () => {
  assert.equal(getSidebarCount([], "all"), 0);
});
