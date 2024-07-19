"use client";

import TanstackQueryProvider from "@/app/providers/TanstackQueryProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <TanstackQueryProvider>{children}</TanstackQueryProvider>;
};
