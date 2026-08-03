import { forwardRef } from "react";

const Card = forwardRef(function Card({ className = "", padded = true, hoverable = false, as: Tag = "div", ...props }, ref) {
  const classes = [
    "bg-surface border border-border rounded-xl shadow-card",
    padded && "p-6",
    hoverable && "transition-all duration-200 hover:shadow-raised hover:border-border-strong hover:-translate-y-0.5",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag ref={ref} className={classes} {...props} />;
});

export default Card;
