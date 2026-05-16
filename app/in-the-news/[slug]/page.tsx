"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getNewsArticle, newsArticles, newsPageCopy } from "@/lib/news-data";
import { useLanguage } from "@/lib/language";

export default function NewsDetailPage() {
  const params = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const copy = newsPageCopy[language];
  const article = getNewsArticle(language, params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = newsArticles[language]
    .filter((item) => item.slug !== article.slug)
    .slice(0, 3);

  return (
    <div className="flex flex-col pb-12 max-w-4xl mx-auto mt-6">
      <Link
        href="/in-the-news"
        className="inline-flex items-center gap-2 font-semibold text-xs text-zinc-500 uppercase hover:text-[#124e27] transition-colors tracking-wider mb-6"
      >
        <ArrowLeft className="w-3 h-3" /> {copy.back}
      </Link>

      <section className="mb-8">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
          <span className="text-[#124e27] block flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#124e27] rounded-full"></span> {article.category}
          </span>
          <span>{copy.via} {article.source}</span>
        </div>

        <h1 className="text-4xl md:text-[3.5rem] leading-[1.05] font-sans text-black mb-6">
          {article.title}
        </h1>

        <p className="text-xl md:text-2xl font-sans text-zinc-600 leading-snug mb-8">
          {article.summary}
        </p>

        <div className="flex items-center justify-between border-t border-b border-zinc-200 py-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-200"></div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">{copy.desk}</span>
              <span className="text-xs text-zinc-500 font-semibold uppercase">{article.date}</span>
            </div>
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {article.readTime} {copy.readSuffix}
          </div>
        </div>
      </section>

      <section className="relative w-full aspect-[2/1] md:aspect-video bg-zinc-100 flex items-center justify-center mb-10 overflow-hidden">
        <span className="font-semibold text-zinc-400 uppercase tracking-widest text-xs">{article.imageLabel}</span>
        <span className="absolute bottom-2 right-2 text-[10px] text-zinc-500 bg-white/80 px-2 py-1 backdrop-blur-sm">
          {article.imageCredit}
        </span>
      </section>

      <article className="prose prose-lg prose-zinc prose-headings:font-sans prose-p:font-sans prose-p:leading-relaxed max-w-3xl mx-auto">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </article>

      <section className="border-t border-zinc-200 mt-16 pt-12">
        <h3 className="text-xl font-bold mb-6">{copy.related}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedArticles.map((item) => (
            <div key={item.slug} className="flex flex-col group cursor-pointer">
              <Link href={`/in-the-news/${item.slug}`} className="flex flex-col h-full">
                <div className="aspect-[3/2] w-full bg-zinc-100 flex items-center justify-center mb-4 hover:opacity-90 transition-opacity">
                  <span className="font-semibold text-zinc-400 uppercase text-[10px]">{item.source}</span>
                </div>
                <h4 className="font-bold text-[15px] leading-tight group-hover:text-[#124e27] transition-colors">
                  {item.title}
                </h4>
                <div className="mt-2 text-[10px] font-bold uppercase text-zinc-500">
                  {item.date}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
