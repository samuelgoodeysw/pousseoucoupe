import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/data/products";

interface FiltersProps {
  category: string;
  setCategory: (v: string) => void;
  stockLevel: string;
  setStockLevel: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
}

export function ProductFilters({ category, setCategory, stockLevel, setStockLevel, status, setStatus }: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-[170px] bg-card transition-colors duration-100">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={stockLevel} onValueChange={setStockLevel}>
        <SelectTrigger className="w-[160px] bg-card transition-colors duration-100">
          <SelectValue placeholder="Stock Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Stock</SelectItem>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[160px] bg-card transition-colors duration-100">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="push">Push</SelectItem>
          <SelectItem value="fix">Fix</SelectItem>
          <SelectItem value="demote">Demote</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
