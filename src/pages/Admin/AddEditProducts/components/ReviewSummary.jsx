import { ClipboardCheck } from "lucide-react";
import { formatINR } from "../../../../utils/formatCurrency";
import SectionCard from "../../../../components/ui/erp/SectionCard";

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-4 py-1.5 text-sm">
    <span className="text-text-muted">{label}</span>
    <span className="font-semibold text-foreground text-right">{value}</span>
  </div>
);

export const ReviewSummary = ({ watched, finalPrice, imageCount, colorsCount, categories }) => {
  const categoryName =
    categories?.find((c) => String(c._id) === String(watched.category))?.name || watched.category;

  return (
    <SectionCard
      icon={ClipboardCheck}
      tone="warning"
      title="Review & Confirm"
      description="Verify everything looks correct before saving"
    >
      <div className="max-w-xl">
        <Row label="Product Title" value={watched.title || "—"} />
        <Row label="Brand" value={watched.brand || "—"} />
        <Row label="Category" value={categoryName || "—"} />
        <Row label="Price" value={watched.price > 0 ? formatINR(watched.price) : "—"} />
        <Row label="Discount" value={watched.discount > 0 ? `${watched.discount}%` : "None"} />
        <Row label="Final Price" value={watched.price > 0 ? formatINR(finalPrice) : "—"} />
        <Row label="Stock Quantity" value={Number.isNaN(Number(watched.stock)) ? "—" : watched.stock} />
        <Row label="Images" value={`${imageCount} uploaded`} />
        <Row label="Color Variants" value={`${colorsCount} configured`} />
      </div>
    </SectionCard>
  );
};
