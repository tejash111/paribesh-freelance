"use client";

import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ContactCtaStrip } from "@/components/contact-cta-strip";
import { useLanguage } from "@/lib/language";
import { Skeleton } from "@/components/ui/skeleton";

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} sec`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hrs`;
  return `${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) !== 1 ? 's' : ''}`;
}

const DEFAULT_GRADIENTS = [
  "bg-[radial-gradient(circle_at_top_left,_rgba(72,187,120,0.38),_transparent_42%),linear-gradient(135deg,#dfeee4_0%,#9cc6a6_45%,#3c5d47_100%)]",
  "bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.3),_transparent_36%),linear-gradient(135deg,#d6edf4_0%,#87b8c7_48%,#285567_100%)]",
  "bg-[radial-gradient(circle_at_bottom_left,_rgba(255,222,173,0.28),_transparent_40%),linear-gradient(135deg,#efe3cf_0%,#b4865b_50%,#5f3d2d_100%)]"
];

export default function Home() {
  const { language } = useLanguage();
  
  const [copy, setCopy] = useState<any>(null);
  const [heroPosts, setHeroPosts] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [featuredUpdatePost, setFeaturedUpdatePost] = useState<any>(null);
  
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const langCode = language === "en" ? "EN" : "OR";
        
        const [contentRes, postsRes] = await Promise.all([
          fetch(`/api/site-content?page=home&language=${langCode}`),
          fetch(`/api/posts?limit=40&language=${langCode}`)
        ]);
        
        const contentData = await contentRes.json();
        const postsData = await postsRes.json();
        
        const copyContent = contentData.items.find((i: any) => i.section === "copy")?.content;
        const heroContent = contentData.items.find((i: any) => i.section === "hero")?.content;
        
        const fetchedPosts = postsData.posts || [];
        setCopy(copyContent);
        setPosts(fetchedPosts);
        setActiveHeroIndex(0);

        // Fetch Hero Posts
        if (heroContent?.slugs) {
           const slugs = heroContent.slugs.split(',').map((s: string) => s.trim()).filter(Boolean);
           const hp = [];
           for (const slug of slugs) {
             const fpRes = await fetch(`/api/posts?slug=${slug}`);
             const fpData = await fpRes.json();
             if (fpData.posts && fpData.posts.length > 0) {
               hp.push(fpData.posts[0]);
             }
           }
           if (hp.length > 0) {
              setHeroPosts(hp);
           } else {
              setHeroPosts(fetchedPosts.slice(0, 3));
           }
        } else {
           setHeroPosts(fetchedPosts.slice(0, 3));
        }

        // Fetch Featured Update
        if (copyContent?.featuredUpdateSlug) {
           const fpRes = await fetch(`/api/posts?slug=${copyContent.featuredUpdateSlug}`);
           const fpData = await fpRes.json();
           if (fpData.posts && fpData.posts.length > 0) {
             setFeaturedUpdatePost(fpData.posts[0]);
           } else {
             setFeaturedUpdatePost(fetchedPosts[0]);
           }
        } else {
           setFeaturedUpdatePost(fetchedPosts[0]);
        }

      } catch (error) {
        console.error("Failed to load home page data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [language]);

  const showPreviousHero = () => {
    if (!heroPosts.length) return;
    setActiveHeroIndex((currentIndex) => (currentIndex - 1 + heroPosts.length) % heroPosts.length);
  };

  const showNextHero = () => {
    if (!heroPosts.length) return;
    setActiveHeroIndex((currentIndex) => (currentIndex + 1) % heroPosts.length);
  };

  useEffect(() => {
    if (!heroPosts.length) return;
    const interval = window.setInterval(() => {
      setActiveHeroIndex((currentIndex) => (currentIndex + 1) % heroPosts.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [heroPosts.length]);

  if (loading || !copy) {
    return (
      <div className="flex flex-col gap-10 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-200 -mt-8 -mx-4 lg:-mx-8 px-4 lg:px-8">
          <div className="lg:col-span-8 flex flex-col gap-4 pt-8 pb-10 lg:pr-8">
            <Skeleton className="w-full aspect-video rounded-sm" />
            <div className="mt-2 space-y-3">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-8 pt-8 pb-10 lg:border-l lg:border-zinc-200 lg:pl-8">
            <div>
               <div className="flex justify-between items-center mb-4">
                 <Skeleton className="h-6 w-32" />
                 <Skeleton className="h-6 w-16 rounded-full" />
               </div>
               <Skeleton className="w-full aspect-video rounded-sm mb-3" />
               <Skeleton className="h-5 w-full" />
            </div>
            <hr className="border-zinc-200 -mx-4 lg:-mx-8" />
            <div>
              <Skeleton className="h-6 w-24 mb-5" />
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-4 w-12 shrink-0" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const editorialPosts = posts.filter(p => p.type === "EDITORIAL").slice(0, 4);
  const newsPosts = posts.filter(p => p.type === "NEWS").slice(0, 4);
  const latestItems = newsPosts.slice(0, 3);
  
  const activeHeroPost = heroPosts[activeHeroIndex];

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-200 -mt-8 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="lg:col-span-8 flex flex-col gap-4 pt-8 pb-10 lg:pr-8">
          {activeHeroPost ? (
            <>
              <Link
                href={activeHeroPost.type === 'EDITORIAL' ? `/editorial/${activeHeroPost.slug}` : (activeHeroPost.sourceUrl || '#')}
                target={activeHeroPost.type === 'EDITORIAL' ? "_self" : "_blank"}
                className={`group relative w-full aspect-video flex items-center justify-center overflow-hidden transition-all duration-700 bg-zinc-800 ${!activeHeroPost.coverImage ? DEFAULT_GRADIENTS[activeHeroIndex % DEFAULT_GRADIENTS.length] : ''}`}
              >
                {activeHeroPost.coverImage && (
                  <img src={activeHeroPost.coverImage} alt={activeHeroPost.title} className="absolute inset-0 w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/30" />
                
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); showPreviousHero(); }}
                  className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-all duration-200 hover:bg-black/65 group-hover:opacity-100 focus-visible:opacity-100"
                  aria-label={copy.previousStory || "Previous"}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); showNextHero(); }}
                  className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-all duration-200 hover:bg-black/65 group-hover:opacity-100 focus-visible:opacity-100"
                  aria-label={copy.nextStory || "Next"}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute top-4 left-4 bg-black/70 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm flex items-center gap-1.5 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span> {new Date(activeHeroPost.publishedAt).toLocaleDateString()}
                </div>
              </Link>
              <div className="mt-2">
                <span className="text-zinc-500 font-semibold text-xs tracking-wider uppercase mb-1 block">
                  {activeHeroPost.type}
                </span>
                <Link href={activeHeroPost.type === 'EDITORIAL' ? `/editorial/${activeHeroPost.slug}` : (activeHeroPost.sourceUrl || '#')} target={activeHeroPost.type === 'EDITORIAL' ? "_self" : "_blank"}>
                  <h1 className="text-4xl md:text-[2.75rem] font-sans leading-[1.1] text-black mb-3 cursor-pointer hover:text-[#124e27] transition-colors">
                    {activeHeroPost.title}
                  </h1>
                </Link>
                <p className="text-zinc-700 text-lg md:text-xl leading-snug font-sans">
                  {activeHeroPost.body?.substring(0, 180)}...
                </p>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-zinc-500 border border-dashed border-zinc-300 rounded">
              No hero posts available.
            </div>
          )}
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8 pt-8 pb-10 lg:border-l lg:border-zinc-200 lg:pl-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">{copy.featuredUpdate}</h2>
              {featuredUpdatePost && (
                <Link href={featuredUpdatePost.type === 'EDITORIAL' ? `/editorial/${featuredUpdatePost.slug}` : `/in-the-news/${featuredUpdatePost.slug}`} className="border border-zinc-300 rounded-full px-3 py-1 text-xs font-semibold hover:bg-zinc-50 transition-colors">
                  {copy.exploreMore || 'Read'}
                </Link>
              )}
            </div>
            
            {featuredUpdatePost ? (
              <Link href={featuredUpdatePost.type === 'EDITORIAL' ? `/editorial/${featuredUpdatePost.slug}` : `/in-the-news/${featuredUpdatePost.slug}`} className="block group cursor-pointer">
                <div className="relative w-full aspect-video bg-zinc-100 flex items-center justify-center mb-3 overflow-hidden">
                  {featuredUpdatePost.coverImage ? (
                    <img src={featuredUpdatePost.coverImage} alt={featuredUpdatePost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-zinc-400 font-semibold text-xs uppercase">{copy.thumbnail || "Image"}</span>
                  )}
                  {featuredUpdatePost.type === 'NEWS' && <PlayCircle className="absolute text-white w-10 h-10 opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-md" />}
                </div>
                <h3 className="font-bold text-base group-hover:text-[#124e27] transition-colors leading-tight">
                  {featuredUpdatePost.title}
                </h3>
              </Link>
            ) : (
               <div className="py-8 text-center text-zinc-400 border border-dashed border-zinc-200 rounded">No featured post selected</div>
            )}
          </div>

          <hr className="border-zinc-200 -mx-4 lg:-mx-8" />

          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-[#124e27] text-lg">{copy.latest}</h2>
            </div>

            <div className="flex flex-col gap-4">
              {latestItems.map((item: any, index: number) => (
                <div key={item._id}>
                  {index > 0 ? <hr className="border-slate-100 -mx-4 lg:-mx-8 mb-4" /> : null}
                  <Link href={`/in-the-news/${item.slug}`} className="flex gap-4 group cursor-pointer">
                    <span className="text-[#124e27] font-bold text-xs shrink-0 pt-0.5 w-12">{formatTimeAgo(item.publishedAt)}</span>
                    <p className="font-bold text-sm leading-snug group-hover:text-[#124e27] transition-colors">{item.title}</p>
                  </Link>
                </div>
              ))}
              {latestItems.length === 0 && <div className="text-sm text-zinc-500">No news articles found.</div>}
            </div>

            <Link href="/in-the-news" className="block text-right text-xs font-medium text-zinc-500 hover:text-[#124e27] transition-colors mt-4">
              {copy.seeAllLatest}
            </Link>
          </div>
        </div>
      </div>

      <section className="border-b border-zinc-200 pb-10 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="border border-zinc-200 bg-[#d2f0b2] px-6 py-12 text-center md:px-16 md:py-16">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.24em] text-[#124e27]">
            {copy.missionLabel}
          </span>
          <h2 className="mx-auto mb-5 max-w-4xl font-sans text-3xl leading-tight text-black md:text-5xl">
            {copy.missionTitle}
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-zinc-700 md:text-xl">
            {copy.missionBody}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-10">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">{copy.latestEditorial}</h2>
            <Link href="/editorial" className="text-sm font-semibold hover:text-[#124e27] transition-colors">{copy.exploreAll}</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {editorialPosts.map((post: any, index: number) => (
              <Link key={post._id} href={`/editorial/${post.slug}`} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-zinc-100 w-full mb-3 flex items-center justify-center overflow-hidden">
                   {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   ) : (
                    <span className="text-[10px] text-zinc-400 font-semibold uppercase">{copy.editorialCardLabel || 'Editorial'} {index + 1}</span>
                   )}
                </div>
                <h3 className="font-bold text-[15px] leading-tight group-hover:text-[#124e27] transition-colors line-clamp-3">
                  {post.title}
                </h3>
              </Link>
            ))}
            {editorialPosts.length === 0 && <div className="text-zinc-500 col-span-4 text-sm">No editorial posts found.</div>}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">{copy.inTheNews}</h2>
            <Link href="/in-the-news" className="text-sm font-semibold hover:text-[#124e27] transition-colors">{copy.exploreAll}</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newsPosts.map((post: any, index: number) => (
              <Link key={post._id} href={`/in-the-news/${post.slug}`} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-zinc-100 w-full mb-3 flex items-center justify-center overflow-hidden">
                   {post.coverImage ? (
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   ) : (
                    <span className="text-[10px] text-zinc-400 font-semibold uppercase">{copy.newsCardLabel || 'News'} {index + 1}</span>
                   )}
                </div>
                <h3 className="font-bold text-[15px] leading-tight group-hover:text-[#124e27] transition-colors line-clamp-3">
                  {post.title}
                </h3>
              </Link>
            ))}
            {newsPosts.length === 0 && <div className="text-zinc-500 col-span-4 text-sm">No news articles found.</div>}
          </div>
        </div>
      </section>

      <ContactCtaStrip />
    </div>
  );
}
