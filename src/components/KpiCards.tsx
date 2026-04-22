import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Wrench, TrendingDown, DollarSign } from "lucide-react";
import { products } from "@/data/products";

const pushCount = products.filter((p) => p.status === "push").length;
const fixCount = products.filter((p) => p.status === "fix").length;
const demoteCount = products.filter((p) => p.status === "demote").length;
const totalRevOpp = products.filter((p) => p.status === "push").reduce((s, p) => s + Math.round(p.revenue * 0.15), 0);

const kpis = [
  { title: "Products to Push", value: String(pushCount), description: "High conversion + high margin", icon: TrendingUp, iconClass: "text-status-push bg-status-push-bg" },
  { title: "Products to Fix", value: String(fixCount), description: "High traffic, low conversion", icon: Wrench, iconClass: "text-status-fix bg-status-fix-bg" },
  { title: "Products to Demote", value: String(demoteCount), description: "Low engagement", icon: TrendingDown, iconClass: "text-status-demote bg-status-demote-bg" },
  { title: "Revenue Opportunity", value: `+$${totalRevOpp.toLocaleString()}`, description: "Potential uplift this quarter", icon: DollarSign, iconClass: "text-primary bg-secondary" },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="shadow-sm transition-shadow duration-150 hover:shadow-md">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-semibold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.description}</p>
              </div>
              <div className={`p-2 rounded-lg ${kpi.iconClass}`}>
                <kpi.icon className="h-4 w-4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
