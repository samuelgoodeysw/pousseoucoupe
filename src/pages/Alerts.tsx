import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, TrendingDown, Package } from "lucide-react";
import { products } from "@/data/products";

const alerts = [
  { icon: Package, title: "Low Stock Alert", desc: `${products.filter((p) => p.stockLevel === "Low").length} products running low on inventory`, severity: "warning" as const },
  { icon: TrendingDown, title: "Conversion Drop", desc: "Bath category conversion down 12% vs. last week", severity: "error" as const },
  { icon: AlertTriangle, title: "Demote Candidates", desc: `${products.filter((p) => p.status === "demote").length} products flagged for demotion — review recommended`, severity: "warning" as const },
];

const severityClass = { warning: "border-status-fix/30 bg-status-fix-bg", error: "border-status-demote/30 bg-status-demote-bg" };

const Alerts = () => (
  <DashboardLayout>
    <div className="p-6 max-w-[1100px] space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Alerts</h1>
        <p className="text-sm text-muted-foreground mt-1">Items that need your attention.</p>
      </div>
      <div className="space-y-3">
        {alerts.map((a, i) => (
          <Card key={i} className={`shadow-sm border ${severityClass[a.severity]}`}>
            <CardContent className="p-4 flex items-start gap-3">
              <a.icon className="h-5 w-5 mt-0.5 shrink-0 text-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">{a.title}</p>
                <p className="text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </DashboardLayout>
);

export default Alerts;
