import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { SIDEBAR_MENU_ITEMS, SidebarMenuItem } from "@/constants/sidebar";

export interface UseSidebarReturn {
  menuItems: SidebarMenuItem[];
  openSections: string[];
  toggleSection: (title: string) => void;
  isItemActive: (item: SidebarMenuItem) => boolean;
  isSectionOpen: (title: string) => boolean;
}

export const useSidebar = (): UseSidebarReturn => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleSection = useCallback((title: string) => {
    setOpenSections((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  }, []);

  const isItemActive = useCallback(
    (item: SidebarMenuItem) => {
      if (!item.href) return false;

      // Exact match
      if (pathname === item.href) return true;

      // For dynamic routes, check if pathname starts with the item href
      // This handles cases like /history/contents/edit/123 matching /history/contents
      if (pathname.startsWith(item.href + "/")) return true;

      return false;
    },
    [pathname]
  );

  const isSectionOpen = useCallback(
    (title: string) => {
      return openSections.includes(title);
    },
    [openSections]
  );

  return {
    menuItems: SIDEBAR_MENU_ITEMS,
    openSections,
    toggleSection,
    isItemActive,
    isSectionOpen,
  };
};
