import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { products } from "@/data/products";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles, Package, TrendingUp, DollarSign, ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <p className="text-muted-foreground">Product not found.</p>
          <Button variant="ghost" onClick={() => navigate(-1)} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const statusLabel = product.status === "push" ? "PUSH" : product.status === "fix" ? "FIX" : "DEMOTE";
  const statusBg =
    product.status === "push"
      ? "bg-status-push-bg border-status-push/20"
      : product.status === "fix"
        ? "bg-status-fix-bg border-status-fix/20"
        : "bg-status-demote-bg border-status-demote/20";

  return (
    <DashboardLayout>
      <div className="p-6 max-w-[1100px] space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* Back + Title */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-semibold text-foreground">{product.name}</h1>
              <StatusBadge status={product.status} />
            </div>
            <p className="text-sm text-muted-foreground mt-0.5">{product.category} · ${product.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Conversion Rate", value: `${product.conversionRate}%`, icon: TrendingUp },
            { label: "Add-to-Cart Rate", value: `${product.addToCartRate}%`, icon: ShoppingCart },
            { label: "Revenue Generated", value: `$${product.revenue.toLocaleString()}`, icon: DollarSign },
            { label: "Margin", value: `${product.margin}%`, icon: Package },
          ].map((m) => (
            <Card key={m.label} className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <m.icon className="h-3.5 w-3.5" />
                  <span className="text-xs">{m.label}</span>
                </div>
                <p className="text-xl font-semibold text-foreground">{m.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* AI Recommendation */}
          <Card className={`lg:col-span-3 border ${statusBg} shadow-sm`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                AI Recommendation: {statusLabel}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Reasoning</p>
                <ul className="space-y-2">
                  {product.aiReasoning.map((r, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground">
                      <span className="text-primary mt-0.5 shrink-0">•</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Product Info */}
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Product Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3 text-sm">
                {[
                  ["Category", product.category],
                  ["Price", `$${product.price.toFixed(2)}`],
                  ["Stock Level", product.stockLevel],
                  ["Margin", `${product.margin}%`],
                  ["Conv. Rate", `${product.conversionRate}%`],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-medium text-foreground">{val}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* Suggested Actions */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Suggested Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {product.suggestedActions.map((action, i) => (
                <Button
                  key={i}
                  variant={i === 0 ? "default" : "outline"}
                  size="sm"
                  className="transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {action}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProductDetail;
