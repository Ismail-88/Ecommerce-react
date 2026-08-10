import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, X, Send, Mic, User, RotateCcw } from "lucide-react";
import { toast } from "react-toastify";
import { api, getData } from "../context/DataContext";
import { formatINR } from "../utils/formatCurrency";

const SUGGESTIONS = [
  "Recommend a laptop under ₹60,000",
  "Best wireless headphones",
  "Gifts under ₹2,000",
  "Which smartwatch should I buy?",
];

const WELCOME_TEXT =
  "Hi! I'm your AI shopping assistant. Ask me for product recommendations, comparisons, or gift ideas — I know what's in the ShopSphere catalog!";

const AIAssistant = () => {
  const navigate = useNavigate();
  const { getProductImageUrl } = getData();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: WELCOME_TEXT, products: [] },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bodyRef = useRef(null);
  const nextIdRef = useRef(2);

  useEffect(() => {
    if (open && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const sendMessage = async (text, products = []) => {
    setMessages((prev) => [
      ...prev,
      { id: nextIdRef.current++, from: "user", text, products: [] },
    ]);
    setLoading(true);

    try {
      const history = messages
        .slice(-6)
        .filter((m) => m.text)
        .map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));

      const res = await api.post("/api/ai/chat", { message: text, history });
      const reply = res.data?.reply || "Sorry, I couldn't generate a reply.";
      const matchedProducts = res.data?.matchedProducts || [];

      setMessages((prev) => [
        ...prev,
        { id: nextIdRef.current++, from: "bot", text: reply, products: matchedProducts },
      ]);
    } catch (error) {
      console.error("AI chat error:", error);
      toast.error("AI assistant is unavailable right now. Please try again.");
      setMessages((prev) => [
        ...prev,
        {
          id: nextIdRef.current++,
          from: "bot",
          text: "Sorry, I hit a technical snag. Please try again in a moment.",
          products: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    sendMessage(text);
  };

  const handleChip = (chip) => {
    if (loading) return;
    sendMessage(chip);
  };

  const handleProductClick = (id) => {
    setOpen(false);
    navigate(`/products/${id}`);
  };

  const clearChat = () => {
    setMessages([{ id: nextIdRef.current++, from: "bot", text: WELCOME_TEXT, products: [] }]);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        className="fixed bottom-24 lg:bottom-6 left-4 lg:left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/40 hover:scale-105 active:scale-95 transition-all"
      >
        {open ? <X size={24} aria-hidden /> : <Sparkles size={24} aria-hidden />}
      </button>

      {open && (
        <div className="fixed bottom-40 lg:bottom-24 left-4 lg:left-6 z-50 w-[calc(100vw-2rem)] sm:w-96 rounded-2xl border border-border bg-surface shadow-overlay flex flex-col overflow-hidden animate-slide-down">
          <div className="flex items-center gap-3 p-4 bg-gradient-to-tr from-indigo-600 to-violet-600 text-white">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
              <Sparkles size={20} aria-hidden />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">ShopSphere AI</p>
              <p className="text-xs text-white/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" aria-hidden />
                Powered by Groq — recommends from live catalog
              </p>
            </div>
            <button
              onClick={clearChat}
              aria-label="Clear chat"
              title="Clear chat"
              className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
            >
              <RotateCcw size={16} aria-hidden />
            </button>
          </div>

          <div
            ref={bodyRef}
            className="flex-1 max-h-80 min-h-[220px] overflow-y-auto p-4 space-y-3 bg-background/50"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-brand-600 text-white rounded-br-md"
                      : "bg-surface-alt border border-border text-foreground rounded-bl-md"
                  }`}
                >
                  <span className="whitespace-pre-wrap">{msg.text}</span>

                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.products.slice(0, 4).map((p) => (
                        <button
                          key={p._id}
                          onClick={() => handleProductClick(p._id)}
                          className="w-full flex items-center gap-2.5 p-2 rounded-xl border border-border bg-surface hover:border-brand-500/50 hover:bg-surface-hover transition-all text-left"
                        >
                          <img
                            src={getProductImageUrl(p)}
                            alt={p.title}
                            loading="lazy"
                            className="w-10 h-10 rounded-lg object-cover bg-surface-alt flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate">
                              {p.title}
                            </p>
                            <p className="text-xs font-bold text-brand-600 dark:text-brand-400">
                              {formatINR(p.price)}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-surface-alt border border-border text-foreground rounded-bl-md">
                  <span className="flex items-center gap-1.5 text-text-muted">
                    <Mic size={12} aria-hidden />
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce" />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="px-4 pt-3 flex flex-wrap gap-2 border-t border-border bg-surface">
            {SUGGESTIONS.map((chip) => (
              <button
                key={chip}
                onClick={() => handleChip(chip)}
                disabled={loading}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-alt px-3 py-1.5 text-xs font-semibold text-text-muted hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-500/40 transition-all disabled:opacity-50"
              >
                <Sparkles size={11} aria-hidden />
                {chip}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 p-4 border-t border-border bg-surface">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-faint focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm transition-all"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white hover:opacity-90 transition-opacity flex-shrink-0 disabled:opacity-40"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Send size={16} aria-hidden />
              )}
            </button>
          </form>

          <div className="flex items-center justify-center gap-1.5 p-3 border-t border-border bg-surface-alt text-[11px] text-text-muted">
            <User size={12} aria-hidden />
            AI can make mistakes. Verify details before purchasing.
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
