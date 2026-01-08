import "./globals.css";

import { domMax, LazyMotion } from "motion/react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const primaryFont = Manrope({
  subsets: ["latin-ext"],
  variable: "--font-primary",
});

const secondaryFont = localFont({
  src: [
    {
      path: "./satoshi-medium.woff2",
      style: "normal",
      weight: "500",
    },
  ],
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  title: {
    default: "DGG Piece | Profesjonalne Piece Ceramiczne",
    template: "%s | DGG Piece"
  },
  description: "Produkcja, serwis i modernizacja pieców ceramicznych. Najwyższa jakość, sterowniki TC, serwis gwarancyjny i pogwarancyjny.",
  icons: {
    icon: "/favicon.svg",
  },
};

import { Footer } from "@/components/footer";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={cn("dark", primaryFont.variable, secondaryFont.variable, "flex min-h-screen flex-col")}
      >
        <LazyMotion features={domMax} strict>
          <main className="flex-1">
            {children}
          </main>
          <Toaster />
          <Footer />
        </LazyMotion>
      </body>
    </html>
  );
}
