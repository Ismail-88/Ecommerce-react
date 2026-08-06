// components/LiveChatWidget.jsx
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, Mail, Phone, ChevronDown } from "lucide-react";

const FAQS = {
  track: {
    question: "Track my order",
    answer:
      "Go to My Orders and hit Track Order, or use the Track Your Order page with your Order ID. You'll see live status updates from Pending → Processing → Shipped → Delivered.",
  },
  returns: {
    question: "Returns & refunds",
    answer:
      "You can cancel orders that are still Pending or Processing. For delivered items, contact support within 7 days of delivery and we'll arrange a return or refund.",
  },
  payment: {
    question: "Payment methods",
    answer:
      "We accept Cash on Delivery (COD) and Razorpay (UPI, cards, net banking). All payments are secure and processed instantly.",
  },
  delivery: {
    question: "Delivery time",
    answer:
      "Most orders are delivered within 3–5 business days. Delivery is FREE on orders over ₹499.",
  },
  contact: {
    question: "Contact support",
    answer:
      "You can reach us at support@shopsphere.com or call +91 98765 43210 (Mon–Sat, 9 AM – 8 PM).",
  },
};

const QuickChips = [
  { key: "track", label: "Track my order" },
  { key: "returns", label: "Returns & refunds" },
  { key: "payment", label: "Payment methods" },
  { key: "delivery", label: "Delivery time" },
  { key: "contact", label: "Contact support" },
];

const LiveChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi there! 👋 Welcome to ShopSphere. How can we help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  useEffect(() => {
    if (open && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  const sendBotReply = (text) => {
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text }]);
    }, 500);
  };

  const handleChip = (key) => {
    const faq = FAQS[key];
    if (!faq) return;
    setMessages((prev) => [...prev, { from: "user", text: faq.question }]);
    sendBotReply(faq.answer);
  };

  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    sendBotReply(
      "Thanks for reaching out! Our support team usually replies within a few hours. For urgent help, email support@shopsphere.com or call +91 98765 43210."
    );
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close support chat" : "Open support chat"}
        className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-brand-600 text-white shadow-lg shadow-brand-600/40 hover:bg-brand-700 hover:scale-105 active:scale-95 transition-all"
      >
        {open ? <X size={24} aria-hidden /> : <MessageCircle size={24} aria-hidden />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-40 lg:bottom-24 right-4 lg:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 rounded-2xl border border-border bg-surface shadow-overlay flex flex-col overflow-hidden animate-slide-down">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 bg-brand-600 text-white">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
              <Bot size={20} aria-hidden />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">ShopSphere Support</p>
              <p className="text-xs text-white/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" aria-hidden />
                Online — typically replies instantly
              </p>
            </div>
          </div>

          {/* Messages */}
          <div ref={bodyRef} className="flex-1 max-h-80 min-h-[220px] overflow-y-auto p-4 space-y-3 bg-background/50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-brand-600 text-white rounded-br-md"
                      : "bg-surface-alt border border-border rounded-bl-md text-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick FAQ chips */}
          <div className="px-4 pt-3 flex flex-wrap gap-2 border-t border-border bg-surface">
            {QuickChips.map((chip) => (
              <button
                key={chip.key}
                onClick={() => handleChip(chip.key)}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-surface-alt px-3 py-1.5 text-xs font-semibold text-text-muted hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-500/40 transition-all"
              >
                <ChevronDown size={12} aria-hidden />
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="flex items-center gap-2 p-4 border-t border-border bg-surface">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-text-faint focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 text-sm transition-all"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-colors flex-shrink-0"
            >
              <Send size={16} aria-hidden />
            </button>
          </form>

          {/* Footer links */}
          <div className="flex items-center justify-center gap-4 p-3 border-t border-border bg-surface-alt text-xs text-text-muted">
            <a href="mailto:support@shopsphere.com" className="inline-flex items-center gap-1.5 hover:text-brand-600 transition-colors">
              <Mail size={13} aria-hidden /> Email
            </a>
            <a href="tel:+919876543210" className="inline-flex items-center gap-1.5 hover:text-brand-600 transition-colors">
              <Phone size={13} aria-hidden /> Call
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChatWidget;
