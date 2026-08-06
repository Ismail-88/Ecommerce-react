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

export const MenuSections = [
  {
    label: "Main",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
      },
    ],
  },
  {
    label: "Catalog",
    items: [
      {
        title: "Products",
        icon: Package,
        path: "/admin/products",
      },
      {
        title: "Category",
        icon: Tags,
        path: "/admin/category",
      },
      {
        title: "Inventory",
        icon: Boxes,
        path: "/admin/inventory",
      },
    ],
  },
  {
    label: "Sales",
    items: [
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
    ],
  },
  {
    label: "Insights",
    items: [
      {
        title: "Analytics",
        icon: BarChart3,
        path: "/admin/analytics",
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Settings",
        icon: Settings,
        path: "/admin/settings",
      },
    ],
  },
];

export const MenuItems = MenuSections.flatMap((section) => section.items);
