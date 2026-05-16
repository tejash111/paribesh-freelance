"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language";

export default function NewsDetailPage() {
  const params = useParams<{ slug: string }>();
  const { language } = useLanguage();
  
  const [copy, setCopy] = useState<any>(null);
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const langCode = language === "en" ? "EN" : "OR";
        
        const [contentRes, postRes, relatedRes] = await Promise.all([
          fetch(`/api/site-content?page=news&language=${langCode}`),
          fetch(`/api/posts?slug=${params.slug}`),
          fetch('/api/posts?type=NEWS&limit=4')
        ]);
        
        const contentData = await contentRes.json();
        const postData = await postRes.json();
        const relatedData = await relatedRes.json();
        
        const copyContent = contentData.items.find((i: any) => i.section === "copy")?.content;
        setCopy(copyContent);

        if (postData.posts && postData.posts.length > 0) {
          setArticle(postData.posts[0]);
        } else {
          setArticle(null);
        }

        const filteredRelated = (relatedData.posts || []).filter((p: any) => p.slug !== params.slug).slice(0, 3);
        setRelatedArticles(filteredRelated);

      } catch (error) {
        console.error("Failed to load news article data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [language, params.slug]);

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
  }

  if (!article || !copy) {
    return <div className="min-h-[50vh] flex items-center justify-center">Article not found</div>;
  }

  return (
    <div className="flex flex-col pb-12 max-w-4xl mx-auto mt-6 px-4">
      <Link
        href="/in-the-news"
        className="inline-flex items-center gap-2 font-semibold text-xs text-zinc-500 uppercase hover:text-[#124e27] transition-colors tracking-wider mb-6"
      >
        <ArrowLeft className="w-3 h-3" /> {copy.back || "In the News"}
      </Link>

      <section className="mb-8">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
          <span className="text-[#124e27] block flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#124e27] rounded-full"></span> {article.tags?.[0] || 'News'}
          </span>
          <span>{copy.via || "Via"} {article.sourceName}</span>
        </div>

        <h1 className="text-4xl md:text-[3.5rem] leading-[1.05] font-sans text-black mb-6">
          {article.title}
        </h1>

        <div className="flex items-center justify-between border-t border-b border-zinc-200 py-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-zinc-500">
               {article.sourceName?.[0] || 'N'}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">{copy.desk || "Research Desk"}</span>
              <span className="text-xs text-zinc-500 font-semibold uppercase">{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
             5 {copy.readSuffix || "min read"}
          </div>
        </div>
      </section>

      {article.coverImage && (
        <section className="relative w-full aspect-[2/1] md:aspect-video bg-zinc-100 flex items-center justify-center mb-10 overflow-hidden rounded-md">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
        </section>
      )}

      <article className="prose prose-lg prose-zinc prose-headings:font-sans prose-p:font-sans prose-p:leading-relaxed max-w-3xl mx-auto w-full">
        <p>{article.body}</p>
        
        {article.sourceUrl && (
          <div className="mt-8 pt-6 border-t border-zinc-200">
             <a href={article.sourceUrl} target="_blank" rel="noreferrer" className="text-[#124e27] hover:underline font-semibold flex items-center gap-2">
               {copy.readSource || "Read full original story"} &rarr;
             </a>
          </div>
        )}
      </article>

      <section className="border-t border-zinc-200 mt-16 pt-12">
        <h3 className="text-xl font-bold mb-6">{copy.related || "More News"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedArticles.map((item) => (
            <div key={item.slug} className="flex flex-col group cursor-pointer">
              <Link href={`/in-the-news/${item.slug}`} className="flex flex-col h-full">
                <div className="aspect-[3/2] w-full bg-zinc-100 flex items-center justify-center mb-4 hover:opacity-90 transition-opacity overflow-hidden">
                  {item.coverImage ? (
                    <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-semibold text-zinc-400 uppercase text-[10px]">{item.sourceName || "Image"}</span>
                  )}
                </div>
                <h4 className="font-bold text-[15px] leading-tight group-hover:text-[#124e27] transition-colors">
                  {item.title}
                </h4>
                <div className="mt-2 text-[10px] font-bold uppercase text-zinc-500">
                  {new Date(item.publishedAt).toLocaleDateString()}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
