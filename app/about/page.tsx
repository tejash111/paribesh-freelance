"use client";

import { useEffect, useState } from "react";
import { ContactCtaStrip } from "@/components/contact-cta-strip";
import { useLanguage } from "@/lib/language";

export default function AboutPage() {
  const { language } = useLanguage();
  const [copy, setCopy] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const langCode = language === "en" ? "EN" : "OR";
        const res = await fetch(`/api/site-content?page=about&language=${langCode}`);
        const data = await res.json();
        const copyContent = data.items.find((i: any) => i.section === "copy")?.content;
        setCopy(copyContent);
      } catch (error) {
        console.error("Failed to load about page data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [language]);

  if (loading || !copy) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-12 pb-8 px-4">
      <section className="py-12 border-b border-zinc-200 -mx-4 lg:-mx-8 px-4 lg:px-8 text-center md:text-left">
        <span className="text-zinc-500 font-semibold text-xs tracking-wider uppercase mb-2 block">{copy.label}</span>
        <h1 className="text-4xl md:text-[3.5rem] font-sans leading-tight text-black mb-4">{copy.title}</h1>
        <p className="text-xl font-sans text-zinc-600 max-w-3xl mx-auto md:mx-0">{copy.intro}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-zinc-200 pb-12 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">{copy.storyTitle}</h2>
          <div className="space-y-4 font-sans text-lg leading-relaxed text-zinc-800">
            {copy.storyParagraphs?.map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="bg-zinc-100 flex items-center justify-center min-h-[400px] overflow-hidden rounded-md">
          {copy.photoUrl ? (
            <img src={copy.photoUrl} alt={copy.photoLabel} className="w-full h-full object-cover" />
          ) : (
            <span className="font-semibold text-zinc-400 uppercase text-xs tracking-widest">{copy.photoLabel}</span>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-zinc-200 pb-12 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="bg-black text-white p-10 md:p-14">
          <span className="text-zinc-400 font-semibold text-xs tracking-wider uppercase mb-4 block">{copy.missionLabel}</span>
          <h2 className="text-3xl font-sans leading-tight mb-6">{copy.missionTitle}</h2>
          <p className="text-lg font-sans leading-relaxed text-zinc-300">{copy.missionBody}</p>
        </div>
        <div className="bg-[#efebd8]/50 p-10 md:p-14 border border-zinc-200 md:border-l-0">
          <span className="text-zinc-500 font-semibold text-xs tracking-wider uppercase mb-4 block">{copy.visionLabel}</span>
          <h2 className="text-3xl font-sans leading-tight text-black mb-6">{copy.visionTitle}</h2>
          <p className="text-lg font-sans leading-relaxed text-zinc-700">{copy.visionBody}</p>
        </div>
      </section>

      <section className="pb-12 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <h2 className="text-2xl font-bold mb-8">{copy.whatWeDoTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {copy.workItems?.map((item: any, idx: number) => (
            <div key={idx} className="flex flex-col bg-[#d2f0b2] rounded-sm p-6">
              <h3 className="font-bold text-lg mb-3">{item.title}</h3>
              <p className="font-sans text-zinc-700">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <ContactCtaStrip />
    </div>
  );
}
