import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
];

export function SidebarNav() {
  const [location] = useLocation();
  const { logoutMutation } = useAuth();

  return (
    <div className="h-screen flex flex-col border-r bg-sidebar">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-sidebar-foreground">ERP System</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <a
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-colors",
                      location === item.href
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent/50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => logoutMutation.mutate()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
