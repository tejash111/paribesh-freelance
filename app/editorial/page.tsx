"use client";

import Link from "next/link";

import { useLanguage, type Language } from "@/lib/language";

const editorialCopy = {
  en: {
    title: "Editorial",
    intro: "Original writing, in-depth reports, and field insights from our team",
    featuredLabel: "Featured",
    featuredTitle: "Odisha Welcomes Returning Tigress to Similipal Reserve",
    featuredSummary:
      "An in-depth look at the recent success of the rewilding program, documenting the extraordinary journey of the tigress and what it implies for long-term conservation targets.",
    featuredImage: "Featured Cover Image",
    dontMiss: "Don't Miss",
    sidebarTag: "Conservation",
    sidebarTitle: "Understanding the Eco-Sensitive Zones of Mayurbhanj buffer spaces",
    moreStories: "More Stories",
    mostRecent: "Most Recent",
    oldest: "Oldest",
    cardLabel: "Analysis",
    cardTitle: "Understanding the Eco-Sensitive Zones of Mayurbhanj",
    cardSummary:
      "Examining the intersection of tribal rights and ecological boundaries proposed in the latest draft notification regarding the national park periphery.",
    previous: "❮ Previous",
    next: "Next ❯",
  },
  or: {
    title: "ସମ୍ପାଦକୀୟ",
    intro: "ଆମ ଦଳର ମୂଳ ଲେଖା, ଗଭୀର ରିପୋର୍ଟ ଓ କ୍ଷେତ୍ର ଅନୁଭବ",
    featuredLabel: "ବିଶେଷ",
    featuredTitle: "ସିମିଲିପାଳ ରିଜର୍ଭକୁ ଫେରିଥିବା ବାଘିଣୀକୁ ଓଡ଼ିଶାର ସ୍ୱାଗତ",
    featuredSummary:
      "ପୁନର୍ବନ୍ୟୀକରଣ କାର୍ଯ୍ୟକ୍ରମର ସମ୍ପ୍ରତି ସଫଳତା ଉପରେ ଏକ ଗଭୀର ଅଧ୍ୟୟନ, ଯେଉଁଥିରେ ବାଘିଣୀର ଅସାଧାରଣ ଯାତ୍ରା ଓ ଦୀର୍ଘକାଳୀନ ସଂରକ୍ଷଣ ଲକ୍ଷ୍ୟ ପାଇଁ ତାହାର ଅର୍ଥ ବିବେଚନା କରାଯାଇଛି।",
    featuredImage: "ବିଶେଷ କଭର ଛବି",
    dontMiss: "ମିସ୍ କରନ୍ତୁ ନାହିଁ",
    sidebarTag: "ସଂରକ୍ଷଣ",
    sidebarTitle: "ମୟୂରଭଞ୍ଜ ବଫର ଅଞ୍ଚଳର ପରିବେଶ ସମ୍ବେଦନଶୀଳ କ୍ଷେତ୍ରଗୁଡ଼ିକୁ ବୁଝିବା",
    moreStories: "ଆହୁରି କାହାଣୀ",
    mostRecent: "ନୂତନତମ",
    oldest: "ସବୁଠୁ ପୁରୁଣା",
    cardLabel: "ବିଶ୍ଳେଷଣ",
    cardTitle: "ମୟୂରଭଞ୍ଜର ପରିବେଶ ସମ୍ବେଦନଶୀଳ କ୍ଷେତ୍ରଗୁଡ଼ିକୁ ବୁଝିବା",
    cardSummary:
      "ଜାତୀୟ ଉଦ୍ୟାନ ପାର୍ଶ୍ୱଭାଗ ସମ୍ବନ୍ଧୀୟ ସବୁଠାରୁ ନୂଆ ଖସଡ଼ା ବିଜ୍ଞପ୍ତିରେ ପ୍ରସ୍ତାବିତ ଆଦିବାସୀ ଅଧିକାର ଓ ପରିବେଶୀୟ ସୀମାର ସଙ୍ଗମକୁ ପରୀକ୍ଷା କରିବା।",
    previous: "❮ ପୂର୍ବ",
    next: "ପରବର୍ତ୍ତୀ ❯",
  },
} as const satisfies Record<Language, unknown>;

import { useEffect, useState } from "react";

export default function EditorialListingPage() {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/posts?type=EDITORIAL&limit=20').then(res => res.json()).then(data => setPosts(data.posts || []));
  }, []);
  const { language } = useLanguage();
  const copy = editorialCopy[language];

  return (
    <div className="flex flex-col gap-12 pb-8">
      <section className="py-10 border-b border-zinc-200 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-sans leading-tight text-black mb-3">{copy.title}</h1>
        <p className="text-xl font-sans text-zinc-600">{copy.intro}</p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-200 pb-12 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="lg:col-span-8 flex flex-col gap-4 lg:pr-8 group cursor-pointer">
          <Link href="/editorial/sample-post" className="block relative w-full aspect-video bg-zinc-100 flex items-center justify-center overflow-hidden">
            <span className="text-zinc-400 font-semibold tracking-widest text-sm uppercase">{copy.featuredImage}</span>
          </Link>
          <div className="mt-2">
            <span className="text-[#124e27] font-semibold text-xs tracking-wider uppercase mb-2 block flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#124e27] rounded-full"></span> {copy.featuredLabel}
            </span>
            <Link href="/editorial/sample-post">
              <h2 className="text-3xl md:text-4xl font-sans leading-[1.1] text-black mb-3 group-hover:text-[#124e27] transition-colors">
                {copy.featuredTitle}
              </h2>
            </Link>
            <p className="text-zinc-700 text-lg md:text-xl leading-snug font-sans mb-4">{copy.featuredSummary}</p>
            <div className="flex items-center text-xs font-semibold text-zinc-500 uppercase tracking-widest">
              <span>Priya Das</span>
              <span className="mx-2 px-2 border-l border-zinc-300">28 Oct 2026</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 lg:border-l lg:border-zinc-200 lg:pl-8">
          <h3 className="font-bold text-lg mb-2">{copy.dontMiss}</h3>
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="group cursor-pointer">
              <hr className="border-t border-zinc-200 mb-4 -mx-4 lg:-mx-8" />
              <span className="text-xs font-bold text-zinc-500 block mb-1">{copy.sidebarTag}</span>
              <h4 className="font-bold text-base leading-tight group-hover:text-[#124e27] transition-colors">
                {copy.sidebarTitle}
              </h4>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">{copy.moreStories}</h3>
          <select className="border border-zinc-300 rounded-full px-3 py-1 text-xs font-semibold bg-white outline-none">
            <option>{copy.mostRecent}</option>
            <option>{copy.oldest}</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 border-b border-zinc-200 pb-12 -mx-4 lg:-mx-8 px-4 lg:px-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex flex-col group cursor-pointer">
              <Link href={`/editorial/post-${item}`} className="flex flex-col h-full">
                <div className="aspect-[4/3] w-full bg-zinc-100 flex items-center justify-center mb-4">
                  <span className="font-semibold text-zinc-400 uppercase text-xs">Cover Image {item}</span>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-zinc-500 font-semibold text-xs tracking-wider uppercase mb-1 block">{copy.cardLabel}</span>
                  <h4 className="font-bold text-lg leading-tight mb-2 group-hover:text-[#124e27] transition-colors">{copy.cardTitle}</h4>
                  <p className="font-sans text-sm text-zinc-600 line-clamp-3 mb-4">{copy.cardSummary}</p>
                  <div className="mt-auto pt-4 border-t border-zinc-100 font-semibold text-xs text-zinc-500 flex justify-between uppercase">
                    <span>Rahul Naik</span>
                    <span>14 Sep 2026</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-between py-4 text-sm font-semibold border-b border-zinc-200 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <button className="text-zinc-400 cursor-not-allowed">{copy.previous}</button>
        <div className="flex gap-1">
          <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">1</span>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 rounded-full transition-colors">2</button>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 rounded-full transition-colors">3</button>
        </div>
        <button className="hover:text-[#124e27] transition-colors">{copy.next}</button>
      </section>
    </div>
  );
}
