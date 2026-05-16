"use client";

import Link from "next/link";

import { useLanguage, type Language } from "@/lib/language";

const contactCtaCopy = {
  en: {
    title: "Join us in protecting Odisha's environment",
    button: "Contact Us →",
  },
  or: {
    title: "ଓଡ଼ିଶାର ପରିବେଶ ସୁରକ୍ଷାରେ ଆମ ସହିତ ଯୋଗ ଦିଅନ୍ତୁ",
    button: "ଯୋଗାଯୋଗ କରନ୍ତୁ →",
  },
} as const satisfies Record<Language, unknown>;

export function ContactCtaStrip() {
  const { language } = useLanguage();
  const copy = contactCtaCopy[language];

  return (
    <section className="border-t border-zinc-200 py-8">
      <div className="flex flex-col gap-3 rounded-sm bg-[#9ee970] px-6 py-6 text-zinc-950 md:flex-row md:items-center md:justify-between md:px-8">
        <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
          {copy.title}
        </h2>
        <Link
          href="/contact"
          className="inline-flex w-fit items-center px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-zinc-950 hover:text-[#9ee970]"
        >
          {copy.button}
        </Link>
      </div>
    </section>
  );
}
