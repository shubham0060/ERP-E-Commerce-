
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package, Users, ShoppingCart } from "lucide-react";
import { Product, Customer, Order } from "@shared/schema";

type StatCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
};

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function StatsCards() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: customers = [] } = useQuery<Customer[]>({
    queryKey: ["/api/customers"],
  });

  const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  // Calculate total revenue from orders
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total), 0);
  
  // Get weekly stats
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const weeklyOrders = orders.filter(order => new Date(order.createdAt) > oneWeekAgo);
  const weeklyCustomers = customers.filter(customer => new Date(customer.createdAt) > oneWeekAgo);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Revenue"
        value={`₹${totalRevenue.toFixed(2)}`}
        description={`${weeklyOrders.length} orders this week`}
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Products"
        value={products.length.toString()}
        description={`${products.length} total products`}
        icon={<Package className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Customers"
        value={customers.length.toString()}
        description={`${weeklyCustomers.length} new this week`}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Orders"
        value={orders.length.toString()}
        description={`${weeklyOrders.length} orders this week`}
        icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
