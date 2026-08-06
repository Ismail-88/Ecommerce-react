import { SearchX } from "lucide-react";
import EmptyState from "../../../../components/ui/EmptyState";
import Button from "../../../../components/ui/Button";

const EmptyProductsState = ({ onReset }) => {
  return (
    <EmptyState
      icon={SearchX}
      title="No Products Found"
      description="Try adjusting your search or filters to find what you're looking for."
      action={<Button variant="secondary" onClick={onReset}>Clear All Filters</Button>}
      className="rounded-xl border border-border bg-surface"
    />
  );
};

export default EmptyProductsState;
