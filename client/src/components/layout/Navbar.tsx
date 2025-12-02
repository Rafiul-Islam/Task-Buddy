"use client";

import Link from "next/link";
import {useUser} from "@/hooks/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {LogOut, Menu, User} from "lucide-react";
import {doLogout} from "@/actions/authActions";

interface AdminHeaderProps {
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

export function AdminHeader({onMobileMenuToggle}: AdminHeaderProps) {
  const {user, isLoading} = useUser();

  // Helper function to get user initials
  const getUserInitials = (name: string) => {
    return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  };

  if (isLoading) {
    return (
      <header
        className="flex items-center justify-between px-6 bg-white border-b border-gray-200 shadow-md backdrop-blur-sm h-16">
        <div className="flex items-center gap-4">
          <Menu
            onClick={onMobileMenuToggle}
            className="h-6 w-6 group-hover:rotate-180 transition-transform duration-300 cursor-pointer lg:hidden"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 bg-gray-200 rounded-full animate-pulse"/>
        </div>
      </header>
    );
  }

  return (
    <header
      className="flex items-center justify-between px-6 bg-white border-b border-gray-200 shadow-md backdrop-blur-sm h-16">
      <div className="flex items-center gap-4">
        <Menu
          onClick={onMobileMenuToggle}
          className="h-6 w-6 group-hover:rotate-180 transition-transform duration-300 cursor-pointer md:hidden"
        />
      </div>
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 shadow-sm cursor-pointer">
              <AvatarImage
                src={user?.image || "/default-avatar.svg"}
                alt={user?.name || "User"}
              />
              <AvatarFallback
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm">
                {user?.name ? getUserInitials(user.name) : "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white border-gray-100 shadow-xl rounded-xl p-2 mt-2.5" align="end" forceMount>
            <DropdownMenuLabel
              className="font-normal p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg mx-1 mb-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-gray-800">
                  {user?.name || "User"}
                </p>
                <p className="text-xs leading-none text-gray-600">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100"/>
            <Link href="/profile">
              <DropdownMenuItem
                className="text-gray-700 hover:bg-blue-50 hover:text-blue-700 duration-200 group cursor-pointer py-3 px-4 rounded-md mx-2 my-1 font-medium">
                <User className="mr-3 h-4 w-4"/>
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator className="bg-gray-100"/>
            <DropdownMenuItem
              onClick={doLogout}
              className="text-gray-700 hover:bg-red-50 hover:text-red-700 duration-200 group cursor-pointer py-3 px-4 rounded-md mx-2 my-1 font-medium"
            >
              <LogOut className="mr-3 h-4 w-4"/>
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
