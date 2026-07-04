import { useEffect, useState } from "react";

const PAGE_SIZE = 20;

// Client-side "load more" pagination over an already-filtered list.
// Resets back to the first page whenever resetKey changes (section/filter/search).
export function usePagination(items, resetKey) {
  const [count, setCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setCount(PAGE_SIZE);
  }, [resetKey]);

  return {
    items: items.slice(0, count),
    total: items.length,
    hasMore: items.length > count,
    loadMore: () => setCount((current) => current + PAGE_SIZE),
  };
}
