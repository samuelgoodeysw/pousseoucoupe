import { Badge } from "@/components/ui/badge";
import type { ProductStatus } from "@/data/products";

const config: Record<ProductStatus, { label: string; className: string }> = {
  push: { label: "Push", className: "bg-status-push-bg text-status-push border-0 hover:bg-status-push-bg" },
  fix: { label: "Fix", className: "bg-status-fix-bg text-status-fix border-0 hover:bg-status-fix-bg" },
  demote: { label: "Demote", className: "bg-status-demote-bg text-status-demote border-0 hover:bg-status-demote-bg" },
};

export function StatusBadge({ status }: { status: ProductStatus }) {
  const c = config[status];
  return <Badge variant="outline" className={c.className}>{c.label}</Badge>;
}
