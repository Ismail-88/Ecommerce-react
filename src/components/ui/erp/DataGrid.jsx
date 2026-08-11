import { useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  MoreHorizontal,
  Rows2,
  Rows3,
  Rows,
  SlidersHorizontal,
  X,
} from "lucide-react";

const DENSITY_PADDING = {
  compact: "6px 12px",
  comfortable: "12px 16px",
  spacious: "16px 20px",
};

const DENSITY_ICONS = {
  compact: Rows,
  comfortable: Rows2,
  spacious: Rows3,
};

const getRowKey = (row, rowKey) =>
  typeof rowKey === "function" ? rowKey(row) : row?.[rowKey];

const ToolbarPopover = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <>
      <button
        aria-label="Close options"
        onClick={onClose}
        className="fixed inset-0 z-30 cursor-default"
      />
      <div className="absolute right-0 top-full mt-2 z-40 w-56 rounded-xl border border-border bg-surface shadow-overlay p-1.5 animate-scale-in origin-top-right">
        {children}
      </div>
    </>
  );
};

const DataGrid = ({
  columns,
  rows,
  rowKey = "_id",
  loading = false,
  skeletonRows = 6,
  emptyMessage = "No records found",
  selectable = false,
  bulkActions = [],
  onSelectionChange,
  sortKey,
  sortDir,
  onSortChange,
  rowActions,
  toolbar = false,
  title,
  count,
  defaultDensity = "comfortable",
  defaultHidden = [],
  className = "",
}) => {
  const [hidden, setHidden] = useState(() => new Set(defaultHidden));
  const [density, setDensity] = useState(defaultDensity);
  const [selectedKeys, setSelectedKeys] = useState(() => new Set());
  const [openMenuKey, setOpenMenuKey] = useState(null);
  const [menuPos, setMenuPos] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const selectedKeysRef = useRef(selectedKeys);
  selectedKeysRef.current = selectedKeys;

  const visibleColumns = useMemo(
    () => columns.filter((c) => !hidden.has(c.key)),
    [columns, hidden]
  );

  const handleSelectAll = (checked) => {
    const next = new Set();
    if (checked) rows.forEach((row) => next.add(getRowKey(row, rowKey)));
    setSelectedKeys(next);
    if (onSelectionChange) onSelectionChange(next);
  };

  const handleSelectRow = (key, checked) => {
    const next = new Set(selectedKeysRef.current);
    if (checked) next.add(key);
    else next.delete(key);
    setSelectedKeys(next);
    if (onSelectionChange) onSelectionChange(next);
  };

  const handleSort = (key) => {
    if (!onSortChange) return;
    if (key === sortKey) {
      onSortChange(key, sortDir === "asc" ? "desc" : "asc");
    } else {
      onSortChange(key, "asc");
    }
  };

  const openRowMenu = (key, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(rect.right - 180, 8), window.innerWidth - 192);
    const y = Math.min(rect.bottom + 6, window.innerHeight - 100);
    setMenuPos({ x, y });
    setOpenMenuKey(key);
  };

  const runRowAction = (action, row) => {
    setOpenMenuKey(null);
    setMenuPos(null);
    if (action.onClick) action.onClick(row);
  };

  const allSelected = rows.length > 0 && rows.every((r) => selectedKeysRef.current.has(getRowKey(r, rowKey)));

  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const cellPad = DENSITY_PADDING[density] || DENSITY_PADDING.comfortable;

  return (
    <div className={`bg-surface rounded-xl border border-border shadow-card overflow-hidden ${className}`}>
      {toolbar && (
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-border">
          <div className="flex items-center gap-2 min-w-0">
            {selectable && selectedKeys.size > 0 ? (
              <>
                <span className="text-xs font-semibold text-foreground tabular-nums">
                  {selectedKeys.size} selected
                </span>
                {bulkActions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => action.onClick(rows.filter((r) => selectedKeysRef.current.has(getRowKey(r, rowKey))))}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors duration-150 ${
                      action.tone === "danger"
                        ? "text-danger bg-danger-soft hover:bg-danger/10"
                        : "text-brand-600 dark:text-brand-400 bg-brand-soft hover:bg-brand-500/15"
                    }`}
                  >
                    {action.icon}
                    {action.label}
                  </button>
                ))}
                <button
                  onClick={() => handleSelectAll(false)}
                  className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-text-muted hover:text-foreground rounded-md transition-colors duration-150"
                >
                  <X size={13} />
                  Clear
                </button>
              </>
            ) : (
              title && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground truncate">{title}</span>
                  {typeof count === "number" && (
                    <span className="text-[11px] font-semibold text-text-muted bg-surface-alt rounded-md px-1.5 py-0.5 tabular-nums">
                      {count}
                    </span>
                  )}
                </div>
              )
            )}
          </div>

          <div className="relative flex items-center gap-1 shrink-0">
            <button
              onClick={() => setShowOptions((v) => !v)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-text-muted hover:text-foreground hover:bg-surface-alt rounded-md transition-colors duration-150"
            >
              <SlidersHorizontal size={14} />
              Options
            </button>

            <ToolbarPopover open={showOptions} onClose={() => setShowOptions(false)}>
              <div className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-text-faint">
                Density
              </div>
              <div className="grid grid-cols-3 gap-1 p-1">
                {Object.keys(DENSITY_PADDING).map((d) => {
                  const Icon = DENSITY_ICONS[d];
                  return (
                    <button
                      key={d}
                      onClick={() => setDensity(d)}
                      className={`flex flex-col items-center gap-1 py-2 rounded-lg text-[11px] font-medium capitalize transition-colors duration-150 ${
                        density === d
                          ? "bg-brand-soft text-brand-600 dark:text-brand-400"
                          : "text-text-muted hover:bg-surface-alt"
                      }`}
                    >
                      <Icon size={15} />
                      {d}
                    </button>
                  );
                })}
              </div>

              <div className="px-2 pt-2 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-text-faint border-t border-border mt-1">
                Columns
              </div>
              <div className="max-h-52 overflow-y-auto p-1">
                {columns.map((column) => {
                  const isHidden = hidden.has(column.key);
                  return (
                    <label
                      key={column.key}
                      className="flex items-center gap-2.5 px-2 py-1.5 rounded-md cursor-pointer hover:bg-surface-alt transition-colors duration-150"
                    >
                      <button
                        role="checkbox"
                        aria-checked={!isHidden}
                        onClick={() =>
                          setHidden((prev) => {
                            const next = new Set(prev);
                            if (isHidden) next.delete(column.key);
                            else next.add(column.key);
                            return next;
                          })
                        }
                        className={`flex items-center justify-center size-4 rounded border transition-colors duration-150 ${
                          isHidden
                            ? "border-border bg-surface"
                            : "border-brand-600 bg-brand-600 text-white"
                        }`}
                      >
                        {!isHidden && <Check size={11} strokeWidth={3} />}
                      </button>
                      <span className="text-xs text-foreground">{column.header}</span>
                    </label>
                  );
                })}
              </div>
            </ToolbarPopover>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full admin-table">
          <thead className="bg-surface-alt border-b border-border">
            <tr>
              {selectable && (
                <th style={{ padding: cellPad }} className="text-left w-10">
                  <input
                    type="checkbox"
                    aria-label="Select all"
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="size-4 rounded accent-brand-600 cursor-pointer"
                  />
                </th>
              )}
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  style={{ padding: cellPad }}
                  className={`${alignClass[column.align || "left"]} ${
                    column.headerClassName || ""
                  }`}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className={`inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer transition-colors duration-150 ${
                        sortKey === column.key
                          ? "text-brand-600 dark:text-brand-400"
                          : "hover:text-foreground"
                      }`}
                    >
                      {column.header}
                      {sortKey === column.key ? (
                        sortDir === "asc" ? (
                          <ArrowUp size={12} strokeWidth={2.5} />
                        ) : (
                          <ArrowDown size={12} strokeWidth={2.5} />
                        )
                      ) : (
                        <ArrowUpDown size={12} className="opacity-50" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
              {rowActions && (
                <th style={{ padding: cellPad }} className="text-right w-12">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              Array.from({ length: skeletonRows }).map((_, i) => (
                <tr key={`skeleton-${i}`} className={i % 2 === 0 ? "bg-transparent" : "bg-surface-alt/40"}>
                  {selectable && (
                    <td style={{ padding: cellPad }}>
                      <div className="size-4 rounded bg-surface-strong animate-pulse" />
                    </td>
                  )}
                  {visibleColumns.map((column) => (
                    <td key={column.key} style={{ padding: cellPad }}>
                      <div className="h-3.5 rounded bg-surface-strong animate-pulse" style={{ width: `${35 + ((i * 13) % 40)}%` }} />
                    </td>
                  ))}
                  {rowActions && (
                    <td style={{ padding: cellPad }}>
                      <div className="size-4 rounded bg-surface-strong animate-pulse ml-auto" />
                    </td>
                  )}
                </tr>
              ))
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={
                    (selectable ? 1 : 0) + visibleColumns.length + (rowActions ? 1 : 0)
                  }
                  className="px-6 py-14 text-center text-sm text-text-muted"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, index) => {
                const key = getRowKey(row, rowKey);
                const actions = rowActions ? rowActions(row) : [];
                return (
                  <tr
                    key={key}
                    className={`hover:bg-surface-hover transition-colors duration-100 ${
                      selectedKeysRef.current.has(key)
                        ? "bg-brand-soft/60 dark:bg-brand-soft/30"
                        : index % 2 === 0
                        ? "bg-transparent"
                        : "bg-surface-alt/40"
                    }`}
                  >
                    {selectable && (
                      <td style={{ padding: cellPad }}>
                        <input
                          type="checkbox"
                          aria-label={`Select row ${index + 1}`}
                          checked={selectedKeysRef.current.has(key)}
                          onChange={(e) => handleSelectRow(key, e.target.checked)}
                          className="size-4 rounded accent-brand-600 cursor-pointer"
                        />
                      </td>
                    )}
                    {visibleColumns.map((column) => (
                      <td
                        key={column.key}
                        style={{ padding: cellPad }}
                        className={`${alignClass[column.align || "left"]} ${column.className || ""}`}
                      >
                        {column.render ? column.render(row) : String(row?.[column.key] ?? "")}
                      </td>
                    ))}
                    {rowActions && (
                      <td style={{ padding: cellPad }} className="text-right">
                        {actions.length > 0 && (
                          <button
                            onClick={(e) => openRowMenu(key, e)}
                            className="p-1.5 text-text-muted hover:text-foreground hover:bg-surface-alt rounded-md transition-colors duration-150"
                            aria-label="Row actions"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {openMenuKey && menuPos && (
        <>
          <button
            aria-label="Close menu"
            onClick={() => {
              setOpenMenuKey(null);
              setMenuPos(null);
            }}
            className="fixed inset-0 z-[90] cursor-default"
          />
          <div
            style={{ top: menuPos.y, left: menuPos.x }}
            className="fixed z-[95] w-44 rounded-xl border border-border bg-surface shadow-overlay p-1 animate-scale-in origin-top-right"
          >
            {(() => {
              const row = rows.find((r) => getRowKey(r, rowKey) === openMenuKey);
              if (!row) return null;
              return rowActions(row).map((action, i) => (
                <button
                  key={i}
                  onClick={() => runRowAction(action, row)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    action.tone === "danger"
                      ? "text-danger hover:bg-danger-soft"
                      : "text-foreground hover:bg-surface-alt"
                  }`}
                >
                  {action.icon}
                  {action.label}
                </button>
              ));
            })()}
          </div>
        </>
      )}
    </div>
  );
};

export default DataGrid;
