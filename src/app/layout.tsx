import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import React from "react";
import { MotionProvider } from "@/components/ui/MotionProvider";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
  fallback: ["Georgia", "serif"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plus-jakarta",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Dr. Surajit Sinha — Advocate, High Court & Lower Courts",
  description:
    "Official professional website of Dr. Surajit Sinha — Advocate practicing in criminal law, public prosecution, cybercrime & cyber law, civil litigation, and banking dispute resolution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
