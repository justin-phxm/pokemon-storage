import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import ClientInjectables from "./components/ClientInjectables";
import Modal from "./components/Modal";
import { Providers } from "@/app/providers/Providers";

export const metadata: Metadata = {
  title: "Pokemon Storage Box",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <Providers>
            <Modal />
            {children}
          </Providers>
        </body>
      </html>
      <ClientInjectables />
    </>
  );
}
