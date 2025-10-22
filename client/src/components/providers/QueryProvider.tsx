"use client";

import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/query-client";
import {PropsWithChildren} from "react";

export default function QueryProvider({children}: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
