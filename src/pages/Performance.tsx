import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/data/products";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = products
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 8)
  .map((p) => ({ name: p.name.length > 18 ? p.name.slice(0, 18) + "…" : p.name, revenue: p.revenue, conversion: p.conversionRate }));

const Performance = () => (
  <DashboardLayout>
    <div className="p-6 max-w-[1100px] space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Performance</h1>
        <p className="text-sm text-muted-foreground mt-1">Revenue and conversion performance across top products.</p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Top 8 Products by Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 13 }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                />
                <Bar dataKey="revenue" fill="hsl(220 70% 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default Performance;
