"use client";

import React, { PropsWithChildren, useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdminHeader } from "./Navbar";

const RootLayout = ({ children }: PropsWithChildren) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="fixed top-0 left-0 z-20">
        <Sidebar
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={closeMobileMenu}
          onToggle={handleSidebarToggle}
        />
      </div>
      <div className={`ml-0 transition-all duration-300 ${isSidebarCollapsed ? "md:ml-16" : "md:ml-72"}`}>
        <div className="sticky top-0 z-10">
          <AdminHeader
            onMobileMenuToggle={toggleMobileMenu}
            isMobileMenuOpen={isMobileMenuOpen}
          />
        </div>
        <main className="p-3 md:p-6" style={{minHeight: "calc(100vh - 64px)",}}>
          <div className="container mx-auto max-w-7xl">
            <div className="bg-white overflow-auto"
              style={{
                borderRadius: "7px",
                boxShadow:
                  "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06), 0 0 0 1px rgba(59, 130, 246, 0.05)",
              }}
            >
              <div className="p-8">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
