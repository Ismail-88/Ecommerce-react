import {
  FaTachometerAlt,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaChartBar,
  FaCog,
  FaBoxes,
  FaTags,
} from "react-icons/fa";

export const MenuItems = [
  {
    title: "Dashboard",
    icon: <FaTachometerAlt />,
    path: "/admin/dashboard",
  },
  {
    title: "Products",
    icon: <FaBoxOpen />,
    path: "/admin/products",
  },
  {
    title: "Orders",
    icon: <FaShoppingCart />,
    path: "/admin/orders",
  },
  {
    title: "Customers",
    icon: <FaUsers />,
    path: "/admin/customers",
  },
  {
    title: "Analytics",
    icon: <FaChartBar />,
    path: "/admin/analytics",
  },
  {
    title: "Inventory",
    icon: <FaBoxes />,
    path: "/admin/inventory",
  },
  {
    title: "Category",
    icon: <FaTags />,
    path: "/admin/category",
  },
  {
    title: "Settings",
    icon: <FaCog />,
    path: "/admin/settings",
  },
];