import React from "react";

const BackgroundDecor = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 overflow-hidden -z-10"
  >
    <div className="absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-brand-500/15 blur-3xl animate-drift" />
    <div className="absolute top-1/3 -left-40 h-[380px] w-[380px] rounded-full bg-info/10 blur-3xl animate-drift-reverse" />
    <div className="absolute -bottom-48 left-1/3 h-[480px] w-[480px] rounded-full bg-violet-500/10 blur-3xl animate-drift" style={{ animationDelay: "-9s" }} />
    <div className="absolute top-2/3 right-1/4 h-[260px] w-[260px] rounded-full bg-warning/10 blur-3xl animate-drift-reverse" style={{ animationDelay: "-4s" }} />
  </div>
);

export default BackgroundDecor;
