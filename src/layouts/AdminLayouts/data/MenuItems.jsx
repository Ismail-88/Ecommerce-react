import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Boxes,
  Tags,
  Settings,
} from "lucide-react";

export const MenuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    title: "Products",
    icon: Package,
    path: "/admin/products",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
  },
  {
    title: "Customers",
    icon: Users,
    path: "/admin/customers",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
  {
    title: "Inventory",
    icon: Boxes,
    path: "/admin/inventory",
  },
  {
    title: "Category",
    icon: Tags,
    path: "/admin/category",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];
