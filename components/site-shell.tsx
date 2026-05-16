"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";

import { useLanguage, type Language } from "@/lib/language";

const shellCopy = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      editorial: "Editorial",
      news: "In the News",
      contact: "Contact",
    },
    subscribe: "Subscribe",
    edition: "Odisha Edition",
    footer: {
      location: "© 2026 Paribesh Prahari · Baripada, Odisha",
      facebook: "Facebook",
      email: "Email",
      phone: "Phone",
    },
  },
  or: {
    nav: {
      home: "ମୁଖ୍ୟପୃଷ୍ଠା",
      about: "ଆମ ବିଷୟରେ",
      editorial: "ସମ୍ପାଦକୀୟ",
      news: "ସମ୍ବାଦରେ",
      contact: "ଯୋଗାଯୋଗ",
    },
    subscribe: "ସଦସ୍ୟ ହୁଅନ୍ତୁ",
    edition: "ଓଡ଼ିଶା ସଂସ୍କରଣ",
    footer: {
      location: "© 2026 ପରିବେଶ ପ୍ରହରୀ · ବାରିପଦା, ଓଡ଼ିଶା",
      facebook: "ଫେସବୁକ",
      email: "ଇମେଲ",
      phone: "ଫୋନ",
    },
  },
} as const satisfies Record<Language, unknown>;

export function SiteShell({ children }: { children: ReactNode }) {
  const { language, setLanguage } = useLanguage();
  const copy = shellCopy[language];

  return (
    <>
      <header className="bg-[#f6f4ea] text-black">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Paribesh Prahari Logo" width={40} height={40} className="w-10 h-10 object-contain" />
            <strong className="text-2xl font-sans tracking-tight">Paribesh Prahari</strong>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden md:inline-flex items-center rounded-full border border-zinc-300 p-1 text-xs font-semibold tracking-wider">
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded-full px-3 py-1 transition-colors ${
                  language === "en" ? "bg-[#124e27] text-white" : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("or")}
                className={`rounded-full px-3 py-1 transition-colors ${
                  language === "or" ? "bg-[#124e27] text-white" : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                ଓଡ଼ିଆ
              </button>
            </div>

            <button className="bg-[#c10008] text-white px-4 py-1.5 rounded-sm hover:bg-red-800 transition-colors">
              {copy.subscribe}
            </button>
          </div>
        </div>
      </header>

      <div className="bg-[#124e27] text-white sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between overflow-x-auto">
          <nav className="flex items-center gap-6 text-sm font-semibold whitespace-nowrap">
            <Link href="/" className="hover:text-green-200 transition-colors">{copy.nav.home}</Link>
            <Link href="/about" className="hover:text-green-200 transition-colors">{copy.nav.about}</Link>
            <Link href="/editorial" className="hover:text-green-200 transition-colors">{copy.nav.editorial}</Link>
            <Link href="/in-the-news" className="hover:text-green-200 transition-colors">{copy.nav.news}</Link>
            <Link href="/contact" className="hover:text-green-200 transition-colors">{copy.nav.contact}</Link>
          </nav>
          <div className="hidden md:block text-xs font-medium text-green-100 opacity-80">
            {copy.edition}
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-4 lg:px-8 pt-8 pb-0 border-x border-zinc-200 bg-white">
        {children}
      </main>

      <footer className="bg-black text-white border-t-4 border-black">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-start md:items-center text-sm">
          <div className="mb-6 md:mb-0">
            <strong className="text-xl font-sans block mb-2">Paribesh Prahari</strong>
            <span className="text-zinc-400">{copy.footer.location}</span>
          </div>
          <div className="flex gap-6 text-zinc-300 font-medium">
            <a href="#" className="hover:text-white transition-colors">{copy.footer.facebook}</a>
            <a href="#" className="hover:text-white transition-colors">{copy.footer.email}</a>
            <a href="#" className="hover:text-white transition-colors">{copy.footer.phone}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
