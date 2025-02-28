import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingCart, TrendingUp } from "lucide-react";

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
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Revenue"
        value="$45,231.89"
        description="+20.1% from last month"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Products"
        value="2,345"
        description="86 added this week"
        icon={<Package className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Customers"
        value="1,234"
        description="156 new customers"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Orders"
        value="12,345"
        description="432 orders this week"
        icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
