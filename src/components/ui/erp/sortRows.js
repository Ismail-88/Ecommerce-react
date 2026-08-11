const getSortValue = (row, column) => {
  if (typeof column.sortValue === "function") return column.sortValue(row);
  return row?.[column.key];
};

export const sortRows = (rows, columns, sortKey, sortDir) => {
  if (!sortKey || !sortDir) return rows;
  const column = columns.find((c) => c.key === sortKey);
  if (!column) return rows;
  const dir = sortDir === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    const av = getSortValue(a, column);
    const bv = getSortValue(b, column);
    if (av == null && bv == null) return 0;
    if (av == null) return 1;
    if (bv == null) return -1;
    if (typeof av === "number" && typeof bv === "number") {
      return (av - bv) * dir;
    }
    return String(av).localeCompare(String(bv), undefined, { numeric: true }) * dir;
  });
};
