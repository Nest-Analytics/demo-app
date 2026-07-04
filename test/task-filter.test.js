import { test } from "node:test";
import assert from "node:assert/strict";
import { filterItems } from "../src/components/task-app/task-filter.js";

const items = [
  { text: "Alpha", category: "Marketing", due: "Today", bucket: "today", done: false, flagged: true },
  { text: "Beta", category: "Sales", due: "", bucket: "inbox", done: true, flagged: false },
  { text: "Gamma", category: "Marketing", due: "Fri", bucket: "upcoming", done: false, flagged: false },
];

const ALL_FILTERS = { status: "all", category: "all", bucket: "all" };
const texts = (result) => result.map((item) => item.text);

test("section 'all' with no filters returns everything", () => {
  const result = filterItems(items, { section: "all", filters: ALL_FILTERS, search: "" });
  assert.deepEqual(texts(result), ["Alpha", "Beta", "Gamma"]);
});

test("section 'done' returns only completed tasks", () => {
  const result = filterItems(items, { section: "done", filters: ALL_FILTERS, search: "" });
  assert.deepEqual(texts(result), ["Beta"]);
});

test("section matches a task's bucket", () => {
  const result = filterItems(items, { section: "today", filters: ALL_FILTERS, search: "" });
  assert.deepEqual(texts(result), ["Alpha"]);
});

test("status 'flagged' returns flagged, not-done tasks", () => {
  const result = filterItems(items, { section: "all", filters: { ...ALL_FILTERS, status: "flagged" }, search: "" });
  assert.deepEqual(texts(result), ["Alpha"]);
});

test("category filter narrows to one category", () => {
  const result = filterItems(items, { section: "all", filters: { ...ALL_FILTERS, category: "Marketing" }, search: "" });
  assert.deepEqual(texts(result), ["Alpha", "Gamma"]);
});

test("search matches case-insensitively against text", () => {
  const result = filterItems(items, { section: "all", filters: ALL_FILTERS, search: "GAM" });
  assert.deepEqual(texts(result), ["Gamma"]);
});

test("filters combine (open + Marketing)", () => {
  const result = filterItems(items, { section: "all", filters: { ...ALL_FILTERS, status: "open", category: "Marketing" }, search: "" });
  assert.deepEqual(texts(result), ["Alpha", "Gamma"]);
});
