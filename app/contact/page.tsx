"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage, type Language } from "@/lib/language";

export default function ContactPage() {
  const { language } = useLanguage();
  const [copy, setCopy] = useState<any>(null);
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      try {
        const langCode = language === "en" ? "EN" : "OR";
        const res = await fetch(`/api/site-content?page=contact&language=${langCode}`);
        const data = await res.json();
        
        const copyContent = data.items.find((i: any) => i.section === "copy")?.content;
        const infoContent = data.items.find((i: any) => i.section === "info")?.content;
        
        setCopy(copyContent);
        setInfo(infoContent);
      } catch (error) {
        console.error("Failed to load contact content", error);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [language]);

  if (loading || !copy || !info) {
    return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col pb-16">
      <section className="py-12 border-b border-zinc-200 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto w-full">
          <span className="text-zinc-500 font-semibold text-xs tracking-wider uppercase mb-2 block">{copy.label}</span>
          <h1 className="text-4xl md:text-[3.5rem] font-sans leading-tight text-black mb-4">{copy.title}</h1>
          <p className="text-xl font-sans text-zinc-600 max-w-3xl">{copy.intro}</p>
        </div>
      </section>

      <section className="border-b border-zinc-200 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 max-w-5xl mx-auto w-full">
          <div className="lg:col-span-2 flex flex-col gap-10 lg:border-r lg:border-zinc-200 py-12 lg:pr-10">
          <div>
            <h2 className="text-xl font-bold mb-6">{copy.infoTitle}</h2>
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-semibold text-xs uppercase text-zinc-500 tracking-wider mb-2">{copy.headquarters}</p>
                <p className="text-lg font-sans" dangerouslySetInnerHTML={{ __html: info.headquartersAddress || "" }}></p>
              </div>

              <div>
                <p className="font-semibold text-xs uppercase text-zinc-500 tracking-wider mb-2">{copy.editorsDesk}</p>
                <p className="text-lg font-sans hover:text-[#124e27] cursor-pointer transition-colors">{info.editorsEmail}</p>
              </div>

              <div>
                <p className="font-semibold text-xs uppercase text-zinc-500 tracking-wider mb-2">{copy.inquiry}</p>
                <p className="text-lg font-sans">{info.inquiryPhone}</p>
              </div>
            </div>
          </div>

          <hr className="border-zinc-200" />

          <div>
            <h2 className="text-xl font-bold mb-4">{copy.followTitle}</h2>
            <div className="flex flex-col gap-3">
              {info.socialLinks?.map((link: any) => (
                <a key={link.label} href={link.url} className="font-sans text-lg text-zinc-700 hover:text-[#124e27] transition-colors inline-flex items-center justify-between group">
                  {link.label} <span className="text-zinc-400 group-hover:text-[#124e27] transition-colors">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 py-12 lg:pl-10">
          <h2 className="text-2xl font-sans mb-8">{copy.messageTitle}</h2>

          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold text-xs uppercase text-zinc-500 tracking-wider">{copy.fullName}</label>
                <Input
                  id="name"
                  placeholder={copy.fullNamePlaceholder}
                  className="border-0 border-b border-zinc-300 rounded-none h-12 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black px-0 pb-2 transition-colors"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-semibold text-xs uppercase text-zinc-500 tracking-wider">{copy.email}</label>
                <Input
                  id="email"
                  type="email"
                  placeholder={copy.emailPlaceholder}
                  className="border-0 border-b border-zinc-300 rounded-none h-12 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black px-0 pb-2 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label htmlFor="subject" className="font-semibold text-xs uppercase text-zinc-500 tracking-wider">{copy.subject}</label>
              <Input
                id="subject"
                placeholder={copy.subjectPlaceholder}
                className="border-0 border-b border-zinc-300 rounded-none h-12 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black px-0 pb-2 transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="message" className="font-semibold text-xs uppercase text-zinc-500 tracking-wider">{copy.message}</label>
              <Textarea
                id="message"
                placeholder={copy.messagePlaceholder}
                className="border border-zinc-300 rounded min-h-[200px] bg-zinc-50 text-base focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-black p-4 transition-colors"
              />
            </div>

            <div className="mt-4">
              <button type="submit" className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-red-700 transition-colors">
                {copy.submit}
              </button>
            </div>
          </form>
        </div>
        </div>
      </section>

      <section className="py-12 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-2xl font-sans mb-6">{copy.mapTitle}</h2>
          <div className="overflow-hidden border border-zinc-200 bg-zinc-100">
            {info.mapUrl && (
              <iframe
                title="Paribesh Prahari location map"
                src={info.mapUrl}
                width="100%"
                height="380"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block w-full border-0"
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
