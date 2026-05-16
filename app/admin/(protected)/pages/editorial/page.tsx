"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function AdminEditorialPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [contentEn, setContentEn] = useState<any>(null);
  const [contentOr, setContentOr] = useState<any>(null);
  const [activeLang, setActiveLang] = useState<"EN" | "OR">("EN");

  useEffect(() => {
    async function load() {
      try {
        const [resEn, resOr] = await Promise.all([
          fetch("/api/site-content?page=editorial&language=EN").then(r => r.json()),
          fetch("/api/site-content?page=editorial&language=OR").then(r => r.json())
        ]);

        const enCopy = resEn.items.find((i: any) => i.section === "copy")?.content || {};
        const orCopy = resOr.items.find((i: any) => i.section === "copy")?.content || {};

        setContentEn(enCopy);
        setContentOr(orCopy);
      } catch (error) {
        toast.error("Failed to load content");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const copyPayload = activeLang === "EN" ? contentEn : contentOr;

      await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: "editorial", section: "copy", language: activeLang, content: copyPayload })
      });

      toast.success("Saved successfully");
    } catch (error) {
      toast.error("Failed to save content");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  const currentCopy = activeLang === "EN" ? contentEn : contentOr;
  const setCopy = activeLang === "EN" ? setContentEn : setContentOr;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#2f6b3b]">Edit Editorial Page</h1>
        <div className="flex gap-2">
          <div className="flex bg-gray-100 rounded p-1 mr-4">
            <button 
              className={`px-3 py-1 text-sm font-medium rounded ${activeLang === "EN" ? "bg-white shadow-sm" : "text-gray-500"}`}
              onClick={() => setActiveLang("EN")}
            >
              English
            </button>
            <button 
              className={`px-3 py-1 text-sm font-medium rounded ${activeLang === "OR" ? "bg-white shadow-sm" : "text-gray-500"}`}
              onClick={() => setActiveLang("OR")}
            >
              Odia
            </button>
          </div>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-[#2f6b3b] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-green-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <section className="bg-gray-50 p-6 rounded border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Header Labels</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Page Title</label>
              <Input value={currentCopy.title || ""} onChange={e => setCopy({...currentCopy, title: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Intro Text</label>
              <Input value={currentCopy.intro || ""} onChange={e => setCopy({...currentCopy, intro: e.target.value})} />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Dynamic Featured Content</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Featured Post Slug (Top Left)</label>
              <p className="text-xs text-gray-500 mb-2">Enter the exact URL slug of the post you want to feature.</p>
              <Input value={currentCopy.featuredPostSlug || ""} onChange={e => setCopy({...currentCopy, featuredPostSlug: e.target.value})} placeholder="e.g. odisha-welcomes-returning-tigress" />
            </div>
            <div className="col-span-2 mt-4">
              <label className="block text-sm font-medium mb-1">Don't Miss Post Slugs (Sidebar)</label>
              <p className="text-xs text-gray-500 mb-2">Enter the slugs separated by commas.</p>
              <Input value={currentCopy.dontMissSlugs || ""} onChange={e => setCopy({...currentCopy, dontMissSlugs: e.target.value})} placeholder="slug-1, slug-2, slug-3" />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded border border-gray-200">
          <h2 className="text-lg font-bold mb-4">UI Elements</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Featured Label</label>
              <Input value={currentCopy.featuredLabel || ""} onChange={e => setCopy({...currentCopy, featuredLabel: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Don't Miss Label</label>
              <Input value={currentCopy.dontMiss || ""} onChange={e => setCopy({...currentCopy, dontMiss: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">More Stories Label</label>
              <Input value={currentCopy.moreStories || ""} onChange={e => setCopy({...currentCopy, moreStories: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Card Label</label>
              <Input value={currentCopy.cardLabel || ""} onChange={e => setCopy({...currentCopy, cardLabel: e.target.value})} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
