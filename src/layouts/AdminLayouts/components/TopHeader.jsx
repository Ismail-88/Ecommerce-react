import { Search, Bell, Mail, Sun, Moon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { MenuSections } from "../data/MenuItems";

const iconBtn =
  "relative p-2.5 rounded-lg text-text-muted hover:bg-surface-hover hover:text-foreground transition-colors duration-150";

const paletteItems = MenuSections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.label }))
);

export const TopHeader = ({
  onMenuClick,
  adminInfo,
  getAdminName,
  getAdminInitials,
  hasValidProfileImage,
}) => {
  const [notifications] = useState(5);
  const [messages] = useState(3);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return paletteItems;
    return paletteItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.path.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const go = (item) => {
    setOpen(false);
    navigate(item.path);
  };

  const onInputKeyDown = (e) => {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      if (filtered[activeIndex]) go(filtered[activeIndex]);
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-3 flex-1">
          <button onClick={onMenuClick} aria-label="Open menu" className={`${iconBtn} lg:hidden`}>
            <Search className="w-5 h-5" />
          </button>

          {/* Command Search Trigger */}
          <button
            onClick={() => setOpen(true)}
            className="hidden md:flex items-center gap-2 w-full max-w-md px-3.5 py-2 rounded-lg border border-border bg-input-bg text-sm text-text-faint hover:border-border-strong hover:bg-surface-hover transition-colors duration-150"
          >
            <Search className="w-4 h-4" aria-hidden />
            <span className="flex-1 text-left">Search anything...</span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border border-border bg-surface-alt text-[11px] font-medium text-text-faint">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setOpen(true)}
            aria-label="Search"
            className={`${iconBtn} md:hidden`}
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={iconBtn}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button className={iconBtn} aria-label={`${notifications} notifications`}>
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-danger text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-sm">
                {notifications}
              </span>
            )}
          </button>

          <button className={`${iconBtn} hidden sm:block`} aria-label={`${messages} messages`}>
            <Mail className="w-5 h-5" />
            {messages > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold shadow-sm">
                {messages}
              </span>
            )}
          </button>

          <div className="hidden md:flex items-center gap-2.5 pl-3 ml-1.5 border-l border-border">
            {hasValidProfileImage() ? (
              <img
                src={adminInfo.profileImage}
                alt={getAdminName()}
                className="w-8 h-8 rounded-full object-cover border-2 border-brand-500/50"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-xs"
              style={{ display: hasValidProfileImage() ? "none" : "flex" }}
            >
              {getAdminInitials()}
            </div>
            <div className="text-sm leading-tight">
              <p className="font-semibold text-foreground">{getAdminName()}</p>
              <p className="text-xs text-text-muted">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Command Palette */}
      {open && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Command palette">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="relative mx-auto mt-24 w-[92vw] max-w-xl rounded-xl border border-border bg-surface shadow-overlay animate-fade-in">
            <div className="flex items-center gap-3 px-4 border-b border-border">
              <Search className="w-4 h-4 text-text-faint shrink-0" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search pages, products, orders..."
                className="w-full py-3.5 bg-transparent text-sm text-foreground placeholder:text-text-faint focus:outline-none"
              />
              <kbd className="shrink-0 px-1.5 py-0.5 rounded border border-border bg-surface-alt text-[11px] font-medium text-text-faint">
                esc
              </kbd>
            </div>
            <div className="p-2 max-h-[50vh] overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="px-4 py-6 text-sm text-text-muted text-center">
                  No results for "{query}"
                </p>
              ) : (
                filtered.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => go(item)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-100 ${
                        i === activeIndex
                          ? "bg-brand-500/10 text-foreground"
                          : "text-text-secondary"
                      }`}
                    >
                      <Icon size={17} className="text-text-muted shrink-0" aria-hidden />
                      <span className="flex-1 text-left font-medium">{item.title}</span>
                      <span className="text-[11px] uppercase tracking-wide text-text-faint">
                        {item.section}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
