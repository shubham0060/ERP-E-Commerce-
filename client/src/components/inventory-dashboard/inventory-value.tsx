import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@shared/schema";
import { DollarSign } from "lucide-react";

type Props = {
  products: Product[];
};

export function InventoryValue({ products }: Props) {
  const totalValue = products.reduce((sum, product) => {
    return sum + Number(product.price) * Number(product.stock);
  }, 0);

  const totalItems = products.reduce((sum, product) => {
    return sum + Number(product.stock);
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Total Inventory Value
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-3xl font-bold">
              ₹{totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              Across {totalItems.toLocaleString()} items
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border p-3">
              <p className="text-sm font-medium">Products</p>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-sm font-medium">Avg. Value/Item</p>
              <p className="text-2xl font-bold">
                ₹
                {(totalValue / totalItems).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
