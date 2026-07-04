// Pure task filtering: given the current section, filter chips, and search text,
// return only the items that should be visible. Extracted from App so it can be
// unit-tested in isolation.
export function filterItems(items, { section, filters, search }) {
  const query = search.toLowerCase();
  return items.filter((item) => {
    const matchesSection =
      section === "all"
        ? true
        : section === "done"
          ? item.done
          : item.bucket === section;
    const matchesStatus =
      filters.status === "flagged"
        ? item.flagged && !item.done
        : filters.status === "open"
          ? !item.done
          : filters.status === "done"
            ? item.done
            : true;
    const matchesCategory =
      filters.category === "all" ? true : item.category === filters.category;
    const matchesBucket =
      filters.bucket === "all" ? true : item.bucket === filters.bucket;
    const haystack = [item.text, item.category, item.due, item.bucket].join(" ").toLowerCase();
    const matchesSearch = haystack.includes(query);
    return matchesSection && matchesStatus && matchesCategory && matchesBucket && matchesSearch;
  });
}
