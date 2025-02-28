import { SidebarNav } from "@/components/sidebar-nav";
import { StatsCards } from "@/components/stats-cards";
import { SalesChart } from "@/components/sales-chart";

export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <SidebarNav />
      <main className="flex-1 p-8 overflow-auto">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Overview of your business performance
            </p>
          </div>
          
          <StatsCards />
          <SalesChart />
        </div>
      </main>
    </div>
  );
}
