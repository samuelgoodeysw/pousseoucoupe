import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { products } from "@/data/products";

const pushAvgConv = (products.filter(p => p.status === "push").reduce((s, p) => s + p.conversionRate, 0) / products.filter(p => p.status === "push").length).toFixed(1);
const fixCount = products.filter(p => p.status === "fix").length;

const insights = [
  `Products in the 'Push' category average ${pushAvgConv}% conversion — 2.3× higher than catalog average.`,
  `${fixCount} products with high traffic but low conversion may be hurting revenue.`,
  "Bedding category shows strongest opportunity this week.",
  "Silk Pillowcase Set is critically low stock — restock to capture $14K in projected demand.",
];

export function InsightsPanel() {
  const [autoApply, setAutoApply] = useState(false);

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.map((insight, i) => (
            <div key={i} className="flex gap-2 text-sm">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              <p className="text-muted-foreground leading-relaxed">{insight}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-apply" className="text-sm font-medium">Auto-apply recommendations</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Beta feature</p>
            </div>
            <Switch id="auto-apply" checked={autoApply} onCheckedChange={setAutoApply} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
