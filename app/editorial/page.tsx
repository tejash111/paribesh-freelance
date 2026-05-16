"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditorialListingPage() {
  const { language } = useLanguage();
  const [copy, setCopy] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [featuredPost, setFeaturedPost] = useState<any>(null);
  const [dontMissPosts, setDontMissPosts] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>({ page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const fetchEditorialPosts = async (page: number, isInitial = false) => {
    if (isInitial) setLoading(true);
    else setLoadingPosts(true);

    try {
      const langCode = language === "en" ? "EN" : "OR";
      const [contentRes, postsRes] = await Promise.all([
        fetch(`/api/site-content?page=editorial&language=${langCode}`),
        fetch(`/api/posts?type=EDITORIAL&limit=10&page=${page}`)
      ]);
      
      const contentData = await contentRes.json();
      const postsData = await postsRes.json();
      
      const copyContent = contentData.items.find((i: any) => i.section === "copy")?.content;
      const fetchedPosts = postsData.posts || [];

      if (isInitial) {
        setCopy(copyContent);
        
        if (copyContent?.featuredPostSlug) {
           const fpRes = await fetch(`/api/posts?slug=${copyContent.featuredPostSlug}`);
           const fpData = await fpRes.json();
           if (fpData.posts && fpData.posts.length > 0) {
             setFeaturedPost(fpData.posts[0]);
           } else {
             setFeaturedPost(fetchedPosts[0]);
           }
        } else {
           setFeaturedPost(fetchedPosts[0]);
        }

        if (copyContent?.dontMissSlugs) {
          const slugs = copyContent.dontMissSlugs.split(',').map((s: string) => s.trim()).filter(Boolean);
          const dmPosts = [];
          for (const slug of slugs) {
            const dmRes = await fetch(`/api/posts?slug=${slug}`);
            const dmData = await dmRes.json();
            if (dmData.posts && dmData.posts.length > 0) {
              dmPosts.push(dmData.posts[0]);
            }
          }
          setDontMissPosts(dmPosts);
        } else {
          setDontMissPosts(fetchedPosts.slice(1, 4));
        }
      }
      
      setPosts(fetchedPosts);
      setPagination(postsData.pagination || { page: 1, pages: 1 });
    } catch (error) {
      console.error("Failed to load editorial data", error);
    } finally {
      setLoading(false);
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchEditorialPosts(1, true);
  }, [language]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.pages) return;
    fetchEditorialPosts(newPage);
    const element = document.getElementById('more-stories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading || !copy) {
    return (
      <div className="flex flex-col gap-12 pb-8 animate-in fade-in duration-500">
        <section className="py-10 border-b border-zinc-200 -mx-4 lg:-mx-8 px-4 lg:px-8 space-y-3">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-6 w-2/3" />
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-200 pb-12 -mx-4 lg:-mx-8 px-4 lg:px-8">
          <div className="lg:col-span-8 flex flex-col gap-4 lg:pr-8">
            <Skeleton className="w-full aspect-video rounded-sm" />
            <div className="mt-2 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-6 lg:border-l lg:border-zinc-200 lg:pl-8">
            <Skeleton className="h-6 w-32 mb-2" />
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-2">
                <hr className="border-t border-zinc-200 mb-4 -mx-4 lg:-mx-8" />
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12 pb-8">
      <section className="py-10 border-b border-zinc-200 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-sans leading-tight text-black mb-3">{copy.title}</h1>
        <p className="text-xl font-sans text-zinc-600">{copy.intro}</p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-200 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="lg:col-span-8 flex flex-col gap-4 pt-8 pb-12 lg:pr-8 group cursor-pointer">
          {featuredPost ? (
            <>
              <Link href={`/editorial/${featuredPost.slug}`} className="block relative w-full aspect-video bg-zinc-100 flex items-center justify-center overflow-hidden">
                {featuredPost.coverImage ? (
                  <img src={featuredPost.coverImage} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <span className="text-zinc-400 font-semibold tracking-widest text-sm uppercase">{copy.featuredImage || "Featured Image"}</span>
                )}
              </Link>
              <div className="mt-2">
                <span className="text-[#124e27] font-semibold text-xs tracking-wider uppercase mb-2 block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#124e27] rounded-full"></span> {copy.featuredLabel}
                </span>
                <Link href={`/editorial/${featuredPost.slug}`}>
                  <h2 className="text-3xl md:text-4xl font-sans leading-[1.1] text-black mb-3 group-hover:text-[#124e27] transition-colors">
                    {featuredPost.title}
                  </h2>
                </Link>
                <p className="text-zinc-700 text-lg md:text-xl leading-snug font-sans mb-4">{featuredPost.body?.substring(0, 200)}...</p>
                <div className="flex items-center text-xs font-semibold text-zinc-500 uppercase tracking-widest">
                  <span>{featuredPost.author || 'Author'}</span>
                  <span className="mx-2 px-2 border-l border-zinc-300">{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-zinc-500 border border-dashed border-zinc-300 rounded">
              No featured editorial post available.
            </div>
          )}
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 pt-8 pb-12 lg:border-l lg:border-zinc-200 lg:pl-8">
          <h3 className="font-bold text-lg mb-2">{copy.dontMiss}</h3>
          {dontMissPosts.map((post: any, idx: number) => (
            <Link key={post._id || idx} href={`/editorial/${post.slug}`} className="group cursor-pointer block">
              <hr className="border-t border-zinc-200 mb-4 -mx-4 lg:-mx-8" />
              <span className="text-xs font-bold text-zinc-500 block mb-1">{post.tags?.[0] || 'Editorial'}</span>
              <h4 className="font-bold text-base leading-tight group-hover:text-[#124e27] transition-colors">
                {post.title}
              </h4>
            </Link>
          ))}
          {dontMissPosts.length === 0 && (
             <div className="text-sm text-zinc-500 italic">No posts found.</div>
          )}
        </div>
      </section>

      <section id="more-stories" className="pt-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">{copy.moreStories}</h3>
          <select className="border border-zinc-300 rounded-full px-3 py-1 text-xs font-semibold bg-white outline-none">
            <option>{copy.mostRecent}</option>
            <option>{copy.oldest}</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 pb-12 -mx-4 lg:-mx-8 px-4 lg:px-8 relative">
          {loadingPosts && (
            <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
              <span className="font-semibold">Updating...</span>
            </div>
          )}
          {posts.map((item: any) => (
            <div key={item._id} className="flex flex-col group cursor-pointer">
              <Link href={`/editorial/${item.slug}`} className="flex flex-col h-full">
                <div className="aspect-[4/3] w-full bg-zinc-100 flex items-center justify-center overflow-hidden mb-4">
                  {item.coverImage ? (
                    <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="font-semibold text-zinc-400 uppercase text-xs">Cover Image</span>
                  )}
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-zinc-500 font-semibold text-xs tracking-wider uppercase mb-1 block">{copy.cardLabel}</span>
                  <h4 className="font-bold text-lg leading-tight mb-2 group-hover:text-[#124e27] transition-colors">{item.title}</h4>
                  <p className="font-sans text-sm text-zinc-600 line-clamp-3 mb-4">{item.body.substring(0, 150)}...</p>
                  <div className="mt-auto pt-4 border-t border-zinc-100 font-semibold text-xs text-zinc-500 flex justify-between uppercase">
                    <span>{item.author || 'Author'}</span>
                    <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {posts.length === 0 && !loadingPosts && (
            <div className="col-span-3 py-12 text-center text-zinc-500">
              No editorial posts available at the moment.
            </div>
          )}
        </div>

        {pagination.pages > 1 && (
          <section className="flex items-center justify-between py-8 text-sm font-semibold border-t border-zinc-200 -mx-4 lg:-mx-8 px-4 lg:px-8">
            <button 
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className={`transition-colors ${pagination.page === 1 ? "text-zinc-300 cursor-not-allowed" : "text-black hover:text-[#124e27]"}`}
            >
              {copy.previous || "Previous"}
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
              {copy.next || "Next"}
            </button>
          </section>
        )}
      </section>
    </div>
  );
}
