import { BookOpen, Home, LucideIcon } from "lucide-react";
import { ROLE } from "./role";

export interface SidebarMenuItem {
  title: string;
  icon: LucideIcon;
  href?: string;
  active?: boolean;
  role?: string;
  children?: SidebarMenuItem[];
}

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    title: "Super Admin",
    icon: Home,
    role: ROLE.SUPER_ADMIN,
    children: [
      { title: "Dashboard", icon: BookOpen, href: "/super-admin/dashboard" },
      { title: "Shops", icon: BookOpen, href: "/super-admin/shops" },
      {
        title: "Shop Owners",
        icon: BookOpen,
        href: "/super-admin/shop-owners",
      },
    ],
  },
  {
    title: "Admin",
    icon: Home,
    role: ROLE.ADMIN,
    children: [
      { title: "Dashboard", icon: BookOpen, href: "/admin/dashboard" },
      { title: "Shops", icon: BookOpen, href: "/admin/shops" },
    ],
  },
  {
    title: "Shop Owner",
    icon: Home,
    role: ROLE.SHOP_OWNER,
    children: [
      { title: "Dashboard", icon: BookOpen, href: "/shop-owner/dashboard" },
      { title: "Shops", icon: BookOpen, href: "/shop-owner/shops" },
    ],
  },
  {
    title: "Shop Manager",
    icon: Home,
    role: ROLE.SHOP_MANAGER,
    children: [
      { title: "Dashboard", icon: BookOpen, href: "/shop-manager/dashboard" },
    ],
  },
  {
    title: "Shop Staff",
    icon: Home,
    role: ROLE.SHOP_STAFF,
    children: [
      { title: "Dashboard", icon: BookOpen, href: "/shop-staff/dashboard" },
    ],
  },
];
