"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminHomePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [contentEn, setContentEn] = useState<any>(null);
  const [heroEn, setHeroEn] = useState<any>(null);
  const [contentOr, setContentOr] = useState<any>(null);
  const [heroOr, setHeroOr] = useState<any>(null);
  
  const [activeLang, setActiveLang] = useState<"EN" | "OR">("EN");

  useEffect(() => {
    async function load() {
      try {
        const [resEn, resOr] = await Promise.all([
          fetch("/api/site-content?page=home&language=EN").then(r => r.json()),
          fetch("/api/site-content?page=home&language=OR").then(r => r.json())
        ]);

        setContentEn(resEn.items.find((i: any) => i.section === "copy")?.content || {});
        setHeroEn(resEn.items.find((i: any) => i.section === "hero")?.content || { slugs: "" });
        
        setContentOr(resOr.items.find((i: any) => i.section === "copy")?.content || {});
        setHeroOr(resOr.items.find((i: any) => i.section === "hero")?.content || { slugs: "" });
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
      const heroPayload = activeLang === "EN" ? heroEn : heroOr;

      await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: "home", section: "copy", language: activeLang, content: copyPayload })
      });

      await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: "home", section: "hero", language: activeLang, content: heroPayload })
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
  const currentHero = activeLang === "EN" ? heroEn : heroOr;
  const setCopy = activeLang === "EN" ? setContentEn : setContentOr;
  const setHero = activeLang === "EN" ? setHeroEn : setHeroOr;

  // Convert old 'stories' format to 'slugs' string if needed
  let slugsValue = currentHero.slugs !== undefined ? currentHero.slugs : "";
  if (!slugsValue && currentHero.stories && currentHero.stories.length > 0) {
    // If it's still using the old format but we want to show it empty or migrated, just leave empty
    // so they can enter slugs.
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#2f6b3b]">Edit Home Page</h1>
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
          <h2 className="text-lg font-bold mb-4">Main Hero Carousel</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Featured Posts (Slugs)</label>
              <p className="text-xs text-gray-500 mb-2">Enter the slugs of the Editorial or News posts you want to show in the main hero carousel, separated by commas.</p>
              <Input 
                value={slugsValue} 
                onChange={e => setHero({...currentHero, slugs: e.target.value})} 
                placeholder="e.g. bold-new-steps, river-watch-teams, forest-rights"
              />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Mission Statement</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Mission Label</label>
              <Input value={currentCopy.missionLabel || ""} onChange={e => setCopy({...currentCopy, missionLabel: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mission Title</label>
              <Input value={currentCopy.missionTitle || ""} onChange={e => setCopy({...currentCopy, missionTitle: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mission Body</label>
              <Textarea value={currentCopy.missionBody || ""} onChange={e => setCopy({...currentCopy, missionBody: e.target.value})} />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Featured Update</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Featured Update Label</label>
              <Input value={currentCopy.featuredUpdate || ""} onChange={e => setCopy({...currentCopy, featuredUpdate: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Featured Update Post Slug</label>
              <p className="text-xs text-gray-500 mb-2">Enter the slug of the post to show here (e.g., odisha-news-update).</p>
              <Input value={currentCopy.featuredUpdateSlug || ""} onChange={e => setCopy({...currentCopy, featuredUpdateSlug: e.target.value})} placeholder="slug-of-the-post" />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Other UI Labels</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Latest Label</label><Input value={currentCopy.latest || ""} onChange={e => setCopy({...currentCopy, latest: e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">See All Latest Label</label><Input value={currentCopy.seeAllLatest || ""} onChange={e => setCopy({...currentCopy, seeAllLatest: e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">Latest Editorial Label</label><Input value={currentCopy.latestEditorial || ""} onChange={e => setCopy({...currentCopy, latestEditorial: e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">In The News Label</label><Input value={currentCopy.inTheNews || ""} onChange={e => setCopy({...currentCopy, inTheNews: e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">Explore All Label</label><Input value={currentCopy.exploreAll || ""} onChange={e => setCopy({...currentCopy, exploreAll: e.target.value})} /></div>
          </div>
        </section>
      </div>
    </div>
  );
}
