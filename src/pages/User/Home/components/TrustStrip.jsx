// pages/User/Home/components/TrustStrip.jsx
import React from "react";
import { BadgeCheck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";
import Reveal from "../../../../components/ui/Reveal";

const items = [
  { icon: BadgeCheck, text: "Genuine Products" },
  { icon: RotateCcw, text: "Easy Returns" },
  { icon: ShieldCheck, text: "Secure Payments" },
  { icon: Headphones, text: "24x7 Support" },
];

const TrustStrip = () => {
  return (
    <section className="bg-surface-alt/80 border-y border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {items.map(({ icon: Icon, text }, i) => (
            <Reveal key={text} delay={i * 90} className="flex items-center justify-center gap-2 py-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary-soft text-brand-600">
                <Icon size={15} aria-hidden />
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-text-secondary">
                {text}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
