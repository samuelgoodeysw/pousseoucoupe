import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { KpiCards } from "@/components/KpiCards";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductTable } from "@/components/ProductTable";
import { InsightsPanel } from "@/components/InsightsPanel";
import { products } from "@/data/products";

const Index = () => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState("all");
  const [stockLevel, setStockLevel] = useState("all");
  const [status, setStatus] = useState("all");

  // Support category deep-link from Categories page
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (stockLevel !== "all" && p.stockLevel !== stockLevel) return false;
      if (status !== "all" && p.status !== status) return false;
      return true;
    });
  }, [category, stockLevel, status]);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-[1400px]">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Pousse ou Coupe</h1>
          <p className="text-sm text-muted-foreground mt-1">Push, fix, or demote — make data-driven merchandising decisions.</p>
        </div>

        <KpiCards />

        <div className="flex flex-col xl:flex-row gap-6">
          <div className="flex-1 space-y-4 min-w-0">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-medium text-foreground">Recommended Product Actions</h2>
            </div>
            <ProductFilters
              category={category} setCategory={setCategory}
              stockLevel={stockLevel} setStockLevel={setStockLevel}
              status={status} setStatus={setStatus}
            />
            <ProductTable products={filtered} />
          </div>

          <div className="w-full xl:w-[300px] shrink-0">
            <InsightsPanel />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
