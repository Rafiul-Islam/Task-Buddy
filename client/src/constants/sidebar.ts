import {LayoutDashboardIcon, ListTodoIcon, LucideIcon} from "lucide-react";

export interface SidebarMenuItem {
  title: string;
  icon: LucideIcon;
  href?: string;
  active?: boolean;
  children?: SidebarMenuItem[];
}

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
    children: [],
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: ListTodoIcon,
    children: [],
  },
];
