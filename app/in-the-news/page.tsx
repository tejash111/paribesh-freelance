"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { Skeleton } from "@/components/ui/skeleton";

export default function InTheNewsPage() {
  const { language } = useLanguage();
  const [copy, setCopy] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const langCode = language === "en" ? "EN" : "OR";
      
      const [contentRes, postsRes] = await Promise.all([
        fetch(`/api/site-content?page=news&language=${langCode}`),
        fetch(`/api/posts?type=NEWS&limit=10&page=${page}`)
      ]);
      
      const contentData = await contentRes.json();
      const postsData = await postsRes.json();
      
      const copyContent = contentData.items.find((i: any) => i.section === "copy")?.content;
      
      setCopy(copyContent);
      setPosts(postsData.posts || []);
      setPagination(postsData.pagination || { page: 1, pages: 1 });
    } catch (error) {
      console.error("Failed to load news page data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, [language]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.pages) return;
    fetchPosts(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && !copy) {
    return (
      <div className="flex flex-col gap-12 pb-8 max-w-5xl mx-auto px-4 w-full animate-in fade-in duration-500">
        <section className="py-10 border-b border-zinc-200 flex flex-col items-center max-w-3xl mx-auto w-full space-y-4">
          <Skeleton className="h-14 w-2/3" />
          <Skeleton className="h-6 w-full" />
        </section>
        <section className="flex flex-col w-full">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-b border-zinc-200 w-full">
              <div className="md:w-1/4 flex flex-col gap-4 shrink-0">
                <Skeleton className="aspect-[3/2] w-full rounded-sm mb-2" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <div className="md:w-3/4 flex flex-col justify-center space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-4/5" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-24 mt-2" />
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-8">
      <section className="py-10 border-b border-zinc-200 text-center -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl md:text-[3.5rem] font-sans leading-tight text-black mb-4">{copy?.title}</h1>
          <p className="text-xl font-sans text-zinc-600">{copy?.intro}</p>
        </div>
      </section>

      <section className="flex flex-col relative pt-12 max-w-5xl mx-auto w-full px-4">
        {loading && posts.length > 0 && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            <span className="font-semibold">Updating...</span>
          </div>
        )}
        {posts.map((item: any) => (
          <div key={item._id} className="flex flex-col md:flex-row gap-6 md:gap-12 py-8 border-b border-zinc-200 group">
            <div className="md:w-1/4 flex flex-col gap-4 shrink-0">
              {item.coverImage && (
                <Link href={`/in-the-news/${item.slug}`} className="block aspect-[3/2] w-full bg-zinc-100 overflow-hidden rounded-sm mb-2">
                  <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>
              )}
              <div className="flex flex-col gap-2">
                <span className="text-[#124e27] font-bold text-xs uppercase tracking-wider">5 {copy?.readSuffix}</span>
                <span className="text-zinc-500 font-semibold text-[11px] uppercase tracking-wider border border-zinc-300 rounded px-2 py-1 w-fit bg-zinc-50">{copy?.via} {item.sourceName}</span>
                <span className="text-zinc-500 font-semibold text-[11px] uppercase tracking-wider mt-1">{new Date(item.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="md:w-3/4 flex flex-col justify-center">
              <Link href={`/in-the-news/${item.slug}`} className="block max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-sans font-bold leading-tight mb-3 group-hover:text-[#124e27] transition-colors">
                  {item.title}
                </h2>
                <p className="text-lg font-sans text-zinc-700 leading-relaxed mb-4 line-clamp-3">{item.body}</p>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-zinc-600 hover:text-black transition-colors">
                  {copy?.readSource} <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        ))}
        {posts.length === 0 && !loading && (
          <div className="py-12 text-center text-zinc-500">
            No news articles available at the moment.
          </div>
        )}
      </section>

      {pagination.pages > 1 && (
        <section className="flex items-center justify-between py-8 text-sm font-semibold">
          <button 
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className={`transition-colors ${pagination.page === 1 ? "text-zinc-300 cursor-not-allowed" : "text-black hover:text-[#124e27]"}`}
          >
            {copy?.previous || "Previous"}
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${
                  pagination.page === p 
                    ? "bg-black text-white" 
                    : "text-zinc-500 hover:bg-zinc-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button 
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className={`transition-colors ${pagination.page === pagination.pages ? "text-zinc-300 cursor-not-allowed" : "text-black hover:text-[#124e27]"}`}
          >
            {copy?.next || "Next"}
          </button>
        </section>
      )}
    </div>
  );
}
