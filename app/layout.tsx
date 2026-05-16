import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";
import { LanguageProvider } from "@/lib/language";

import "./globals.css";

export const metadata: Metadata = {
  title: "Paribesh Prahari",
  description: "Guardians of our environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen flex flex-col bg-[#fcfcfc] text-zinc-900">
        <LanguageProvider>
          <SiteShell>{children}</SiteShell>
        </LanguageProvider>
      </body>
    </html>
  );
}
