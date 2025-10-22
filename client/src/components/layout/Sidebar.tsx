"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronLeft, ChevronRight, ChevronDown, X } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import Image from "next/image";

interface SidebarProps {
  className?: string;
  isMobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
  onToggle?: (collapsed: boolean) => void;
}

export function Sidebar({
  className,
  isMobileMenuOpen = false,
  onMobileMenuClose,
  onToggle,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { menuItems, toggleSection, isItemActive, isSectionOpen } =
    useSidebar();

  const handleToggleCollapse = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    onToggle?.(newCollapsedState);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onMobileMenuClose}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={cn(
            "fixed left-0 top-0 h-full w-76 bg-white border-r border-gray-200 transition-transform duration-300 shadow-xl z-50 md:hidden backdrop-blur-sm",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm h-16">
            <Image
              src="/images/logo-black.png"
              alt="Deen Discovery"
              width={100}
              height={100}
              className="w-44 object-contain"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onMobileMenuClose}
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-2 py-4 h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="space-y-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = isSectionOpen(item.title);
                const hasActiveChild = item.children?.some((child) =>
                  isItemActive(child)
                );

                if (hasChildren) {
                  return (
                    <Collapsible
                      key={item.title}
                      open={isOpen || hasActiveChild}
                      onOpenChange={() => toggleSection(item.title)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-3 text-gray-700 hover:bg-green-100 hover:text-green-800 transition-colors duration-200 rounded-lg h-11 group font-medium shadow-none hover:shadow-none transform-none hover:scale-100 capitalize",
                            (isOpen || hasActiveChild) &&
                              "bg-green-100 text-green-800 border border-green-200"
                          )}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0 transition-transform duration-200" />
                          <span className="text-sm font-medium flex-1 text-left">
                            {item.title}
                          </span>
                          {isOpen || hasActiveChild ? (
                            <ChevronDown className="h-4 w-4 transition-all duration-300" />
                          ) : (
                            <ChevronRight className="h-4 w-4 transition-all duration-300" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-1 mt-1">
                        {item.children?.map((child) => {
                          const ChildIcon = child.icon;
                          const isChildActive = isItemActive(child);
                          return (
                            <div
                              key={child.href}
                              className={cn(
                                "pl-4 transition-all duration-200 rounded-lg mb-1",
                                !isChildActive && "hover:bg-green-50",
                                isChildActive && "bg-green-500"
                              )}
                            >
                              <Link href={child.href || "#"}>
                                <Button
                                  variant={isChildActive ? "primary" : "ghost"}
                                  className={cn(
                                    "w-full justify-start gap-3 text-gray-600 transition-colors duration-200 rounded-lg h-12 ml-0 pl-1 group font-medium border-l-2 border-transparent shadow-none hover:shadow-none transform-none hover:scale-100 capitalize",
                                    !isChildActive &&
                                      "hover:bg-transparent hover:text-green-800",
                                    isChildActive && "bg-green-500 text-white"
                                  )}
                                  onClick={onMobileMenuClose}
                                >
                                  <ChildIcon className="h-4 w-4 flex-shrink-0 transition-transform duration-200" />
                                  <span className="text-sm">{child.title}</span>
                                </Button>
                              </Link>
                            </div>
                          );
                        })}
                      </CollapsibleContent>
                    </Collapsible>
                  );
                }

                return (
                  <div key={item.href} className="my-1">
                    <Link href={item.href || "#"}>
                      <Button
                        variant={isItemActive(item) ? "primary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 text-gray-700 transition-colors duration-200 rounded-lg h-11 group font-medium shadow-none hover:shadow-none transform-none hover:scale-100 capitalize",
                          !isItemActive(item) &&
                            "hover:bg-green-100 hover:text-green-800",
                          isItemActive(item) &&
                            "bg-gradient-to-r from-green-500 to-green-600 text-white border border-green-400 hover:from-green-500 hover:to-green-600"
                        )}
                        onClick={onMobileMenuClose}
                      >
                        <Icon className="h-5 w-5 flex-shrink-0 transition-transform duration-200" />
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </nav>
          </ScrollArea>
        </div>
      </>
    );
  }

  return (
    <div
      className={cn(
        "relative hidden md:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 shadow-lg h-screen",
        isCollapsed ? "w-16" : "w-72",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white shadow-sm h-16">
        {!isCollapsed && (
          <Image
            src="/images/logo-black.png"
            alt="Deen Discovery"
            width={100}
            height={100}
            className="w-44 object-contain"
          />
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleCollapse}
          className="text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300 rounded-full"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-6 h-[calc(100vh-120px)] overflow-y-auto">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = isSectionOpen(item.title);
            const hasActiveChild = item.children?.some((child) =>
              isItemActive(child)
            );

            if (hasChildren) {
              return (
                <Collapsible
                  className="mb-0"
                  key={item.title}
                  open={(isOpen || hasActiveChild) && !isCollapsed}
                  onOpenChange={() => toggleSection(item.title)}
                >
                  <CollapsibleTrigger className="my-1" asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 text-gray-700 hover:bg-green-100 hover:text-green-800 transition-colors duration-200 rounded-lg h-11 group font-medium shadow-none hover:shadow-none transform-none hover:scale-100 capitalize",
                        isCollapsed && "justify-center px-2",
                        (isOpen || hasActiveChild) &&
                          !isCollapsed &&
                          "bg-green-100 text-green-800 border border-green-200"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0 transition-transform duration-200" />
                      {!isCollapsed && (
                        <>
                          <span className="text-sm font-medium flex-1 text-left">
                            {item.title}
                          </span>
                          {isOpen || hasActiveChild ? (
                            <ChevronDown className="h-4 w-4 transition-all duration-300" />
                          ) : (
                            <ChevronRight className="h-4 w-4 transition-all duration-300" />
                          )}
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1">
                    {item.children?.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = isItemActive(child);
                      return (
                        <div
                          key={child.href}
                          className={cn(
                            "pl-4 transition-all duration-200 rounded-lg mb-1",
                            !isChildActive && "hover:bg-green-50",
                            isChildActive && "bg-green-500"
                          )}
                        >
                          <Link href={child.href || "#"}>
                            <Button
                              variant={isChildActive ? "primary" : "ghost"}
                              className={cn(
                                "w-full justify-start gap-3 text-gray-600 transition-colors duration-200 rounded-lg h-12 ml-0 pl-1 group font-medium border-l-2 border-transparent shadow-none hover:shadow-none transform-none hover:scale-100 capitalize",
                                !isChildActive &&
                                  "hover:bg-transparent hover:text-green-800",
                                isChildActive && "bg-green-500 text-white"
                              )}
                            >
                              <ChildIcon className="h-4 w-4 flex-shrink-0 transition-transform duration-200" />
                              <span className="text-sm">{child.title}</span>
                            </Button>
                          </Link>
                        </div>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              );
            }

            return (
              <div key={item.href} className="my-1">
                <Link href={item.href || "#"}>
                  <Button
                    variant={isItemActive(item) ? "primary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-3 text-gray-700 transition-colors duration-200 rounded-lg h-11 group font-medium shadow-none hover:shadow-none transform-none hover:scale-100 capitalize",
                      !isItemActive(item) &&
                        "hover:bg-green-100 hover:text-green-800",
                      isItemActive(item) &&
                        "bg-gradient-to-r from-green-500 to-green-600 text-white border border-green-400 hover:from-green-500 hover:to-green-600",
                      isCollapsed && "justify-center px-2"
                    )}
                    onClick={onMobileMenuClose}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0 transition-transform duration-200" />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.title}</span>
                    )}
                  </Button>
                </Link>
              </div>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
