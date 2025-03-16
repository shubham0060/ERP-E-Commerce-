import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Product } from "@shared/schema";

type Props = {
  products: Product[];
};

export function StockDistribution({ products }: Props) {
  // Create price ranges and count products in each range
  const priceRanges = [
    { range: "0-50", min: 0, max: 50 },
    { range: "51-100", min: 51, max: 100 },
    { range: "101-500", min: 101, max: 500 },
    { range: "501+", min: 501, max: Infinity },
  ];

  const distribution = priceRanges.map((range) => ({
    name: range.range,
    count: products.filter(
      (product) => {
        const price = Number(product.price);
        return price >= range.min && price <= range.max;
      }
    ).length,
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Stock Distribution by Price Range</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distribution}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
