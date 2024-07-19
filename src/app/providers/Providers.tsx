"use client";

import TanstackQueryProvider from "@/app/providers/TanstackQueryProvider";
import { ModalProvider } from "@/app/providers/ModalContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TanstackQueryProvider>
      <ModalProvider>{children}</ModalProvider>
    </TanstackQueryProvider>
  );
};
