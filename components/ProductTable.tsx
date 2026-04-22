import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/data/products";

export function ProductTable({ products }: { products: Product[] }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-medium">Product Name</TableHead>
            <TableHead className="font-medium">Category</TableHead>
            <TableHead className="font-medium text-right">Conv. Rate</TableHead>
            <TableHead className="font-medium text-right">Margin</TableHead>
            <TableHead className="font-medium">Stock</TableHead>
            <TableHead className="font-medium">Status</TableHead>
            <TableHead className="font-medium">Recommended Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow
              key={p.id}
              className="cursor-pointer transition-colors duration-100 hover:bg-primary/5 active:bg-primary/10"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <TableCell className="font-medium text-foreground">{p.name}</TableCell>
              <TableCell className="text-muted-foreground">{p.category}</TableCell>
              <TableCell className="text-right">{p.conversionRate}%</TableCell>
              <TableCell className="text-right">{p.margin}%</TableCell>
              <TableCell>
                <span className="text-sm text-muted-foreground">{p.stockLevel}</span>
              </TableCell>
              <TableCell><StatusBadge status={p.status} /></TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-[200px]">{p.recommendedAction}</TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                No products match your filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
