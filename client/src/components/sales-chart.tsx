import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Order } from "@shared/schema";

export function SalesChart() {
  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  // Process orders into daily sales data
  const salesData = orders.reduce((acc, order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    const existingDay = acc.find(d => d.date === date);

    if (existingDay) {
      existingDay.total += Number(order.total);
      existingDay.orders += 1;
    } else {
      acc.push({ date, total: Number(order.total), orders: 1 });
    }
    return acc;
  }, [] as Array<{ date: string; total: number; orders: number }>);

  // Sort by date
  salesData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={salesData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}