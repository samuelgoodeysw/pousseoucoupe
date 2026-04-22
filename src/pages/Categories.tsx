import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { products } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, DollarSign, Package } from "lucide-react";

interface CategorySummary {
  name: string;
  revenue: number;
  avgConversion: number;
  productCount: number;
  topProduct: string;
}

const Categories = () => {
  const navigate = useNavigate();

  const categorySummaries = useMemo<CategorySummary[]>(() => {
    const map = new Map<string, typeof products>();
    products.forEach((p) => {
      const arr = map.get(p.category) || [];
      arr.push(p);
      map.set(p.category, arr);
    });

    return Array.from(map.entries())
      .map(([name, items]) => ({
        name,
        revenue: items.reduce((s, p) => s + p.revenue, 0),
        avgConversion: +(items.reduce((s, p) => s + p.conversionRate, 0) / items.length).toFixed(1),
        productCount: items.length,
        topProduct: items.sort((a, b) => b.conversionRate - a.conversionRate)[0].name,
      }))
      .sort((a, b) => b.revenue - a.revenue);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-6 max-w-[1100px] space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">Performance overview by product category.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categorySummaries.map((cat) => (
            <Card
              key={cat.name}
              className="shadow-sm cursor-pointer transition-all duration-150 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5 active:scale-[0.99]"
              onClick={() => navigate(`/?category=${encodeURIComponent(cat.name)}`)}
            >
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground">{cat.name}</h3>
                  <span className="text-xs text-muted-foreground">{cat.productCount} products</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground mb-0.5">
                      <DollarSign className="h-3 w-3" />
                      <span className="text-xs">Revenue</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">${cat.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-muted-foreground mb-0.5">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-xs">Avg. Conv.</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{cat.avgConversion}%</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Package className="h-3 w-3" />
                  <span>Top: {cat.topProduct}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Categories;
