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
  title: "DGG Piece",
  icons: {
    icon: "/favicon.svg",
  },
};

import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("dark", primaryFont.variable, secondaryFont.variable)}
      >
        <LazyMotion features={domMax} strict>
          {children}
          <Footer />
        </LazyMotion>
      </body>
    </html>
  );
}
