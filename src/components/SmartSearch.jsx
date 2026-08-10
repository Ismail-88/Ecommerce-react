import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Sparkles, ArrowRight, PackageSearch, Mic } from "lucide-react";
import { getData } from "../context/DataContext";
import { searchProducts } from "../utils/aiEngine";
import { formatINR } from "../utils/formatCurrency";

const SmartSearch = ({ placeholder = "Search products..." }) => {
  const { data, getProductImageUrl } = getData();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (e) => {
      const transcript = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join("");
      setQuery(transcript);
      setOpen(true);
      setActiveIndex(-1);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    return () => {
      try {
        recognition.abort();
      } catch (_) {}
    };
  }, []);

  const toggleVoiceSearch = () => {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    try {
      setListening(true);
      recognitionRef.current?.start();
    } catch (error) {
      setListening(false);
    }
  };

  const results = useMemo(
    () => (query.trim().length >= 2 ? searchProducts(data || [], query, 7) : []),
    [data, query]
  );

  useEffect(() => {
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const selectProduct = (id) => {
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
    navigate(`/products/${id}`);
  };

  const viewAll = () => {
    if (!query.trim()) return;
    setOpen(false);
    setActiveIndex(-1);
    navigate(`/products?q=${encodeURIComponent(query.trim())}`);
  };

  const onKeyDown = (e) => {
    if (!open || results.length === 0) {
      if (e.key === "Enter" && open) viewAll();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) selectProduct(results[activeIndex]._id);
      else viewAll();
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const showResults = open && query.trim().length >= 2;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search
          size={17}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-faint pointer-events-none"
          aria-hidden
        />
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          aria-label="Search products"
          className="w-full h-11 pl-10 pr-16 rounded-xl border border-border bg-surface-alt text-sm font-medium text-foreground placeholder:text-text-faint focus:outline-none focus:ring-2 focus:ring-brand-500/25 focus:border-brand-500 transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {results.length > 0 && showResults && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-brand-600 dark:text-brand-400 bg-brand-soft rounded-full px-2 py-0.5">
              <Sparkles size={10} aria-hidden />
              AI
            </span>
          )}
          {voiceSupported && (
            <button
              type="button"
              onClick={toggleVoiceSearch}
              aria-label={listening ? "Stop voice search" : "Search by voice"}
              className={`p-1.5 rounded-full transition-all ${
                listening
                  ? "bg-danger text-white animate-pulse"
                  : "text-text-muted hover:text-brand-600 dark:hover:text-brand-400"
              }`}
            >
              <Mic size={16} aria-hidden />
            </button>
          )}
        </div>
      </div>

      {showResults && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-border bg-surface shadow-overlay overflow-hidden z-50 animate-slide-down">
          <div className="max-h-[420px] overflow-y-auto p-2">
            {results.length > 0 ? (
              results.map((product, index) => (
                <button
                  key={product._id}
                  onClick={() => selectProduct(product._id)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-colors ${
                    activeIndex === index ? "bg-surface-hover" : ""
                  }`}
                >
                  <div className="w-11 h-11 rounded-lg bg-surface-alt border border-border overflow-hidden flex-shrink-0">
                    <img
                      src={getProductImageUrl(product)}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{product.title}</p>
                    <p className="text-xs text-text-muted truncate">
                      {typeof product.category === "string" ? product.category : product.category?.name}
                      {product.brand ? ` · ${product.brand}` : ""}
                    </p>
                  </div>
                  <span className="text-sm font-bold text-brand-600 dark:text-brand-400 flex-shrink-0">
                    {formatINR(product.price)}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <PackageSearch size={28} className="mx-auto mb-2 text-text-faint" aria-hidden />
                <p className="text-sm text-text-muted">
                  No matches for "<span className="font-semibold text-foreground">{query}</span>"
                </p>
              </div>
            )}
          </div>

          {results.length > 0 && (
            <button
              onClick={viewAll}
              className="w-full flex items-center justify-center gap-1.5 border-t border-border bg-surface-alt px-4 py-3 text-sm font-bold text-brand-600 dark:text-brand-400 hover:bg-surface-hover transition-colors"
            >
              View all results
              <ArrowRight size={15} aria-hidden />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartSearch;
