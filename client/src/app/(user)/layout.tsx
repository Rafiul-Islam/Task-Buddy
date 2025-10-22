import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "../globals.css";
import AdminRootLayout from "@/components/layout/RootLayout";

export const metadata: Metadata = {
  title: "Task Buddy",
  description: "A website for Task Buddy",
};

export default function AdminLayout({ children }: PropsWithChildren) {
  return <AdminRootLayout>{children}</AdminRootLayout>;
}
