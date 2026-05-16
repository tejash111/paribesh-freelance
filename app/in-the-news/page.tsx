"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { newsArticles, newsPageCopy } from "@/lib/news-data";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language";

export default function InTheNewsPage() {
  const { language } = useLanguage();
  const copy = newsPageCopy[language];
  const items = newsArticles[language];
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/posts?type=NEWS&limit=20').then(res => res.json()).then(data => setPosts(data.posts || []));
  }, []);

  const displayItems = posts.length > 0 ? posts : items;
  return (
    <div className="flex flex-col gap-12 pb-8 max-w-5xl mx-auto">
      <section className="py-10 border-b border-zinc-200 text-center mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-[3.5rem] font-sans leading-tight text-black mb-4">{copy.title}</h1>
        <p className="text-xl font-sans text-zinc-600">{copy.intro}</p>
      </section>

      <section className="flex flex-col">
        {displayItems.map((item: any, idx) => (
            <div key={item._id || idx} className="flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-b border-zinc-200 group">
          
            <div className="md:w-1/4 flex flex-col gap-2 shrink-0">
              <span className="text-[#124e27] font-bold text-xs uppercase tracking-wider">{item._id ? '5' : item.readTime} {copy.readSuffix}</span>
              <span className="text-zinc-500 font-semibold text-[11px] uppercase tracking-wider border border-zinc-300 rounded px-2 py-1 w-fit bg-zinc-50">{copy.via} {item._id ? item.sourceName : item.source}</span>
              <span className="text-zinc-500 font-semibold text-[11px] uppercase tracking-wider mt-1">{item._id ? new Date(item.publishedAt).toLocaleDateString() : item.date}</span>
            </div>

            <div className="md:w-3/4 flex flex-col justify-center">
              <a href={item._id ? item.sourceUrl : '#'} target="_blank" rel="noreferrer" className="block max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-sans font-bold leading-tight mb-3 group-hover:text-[#124e27] transition-colors">
                  {item.title}
                </h2>
                <p className="text-lg font-sans text-zinc-700 leading-relaxed mb-4">{item._id ? item.body : item.summary}</p>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-zinc-600 hover:text-black transition-colors">
                  {copy.readSource} <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>
        ))}
      </section>

      <section className="flex items-center justify-between py-4 text-sm font-semibold">
        <button className="text-zinc-400 cursor-not-allowed">{copy.previous}</button>
        <div className="flex gap-1">
          <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">1</span>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-zinc-100 rounded-full transition-colors">2</button>
        </div>
        <button className="hover:text-[#124e27] transition-colors">{copy.next}</button>
      </section>
    </div>
  );
}
