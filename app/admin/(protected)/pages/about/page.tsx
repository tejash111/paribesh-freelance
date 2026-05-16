"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [contentEn, setContentEn] = useState<any>(null);
  const [contentOr, setContentOr] = useState<any>(null);
  const [activeLang, setActiveLang] = useState<"EN" | "OR">("EN");

  useEffect(() => {
    async function load() {
      try {
        const [resEn, resOr] = await Promise.all([
          fetch("/api/site-content?page=about&language=EN").then(r => r.json()),
          fetch("/api/site-content?page=about&language=OR").then(r => r.json())
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
        body: JSON.stringify({ page: "about", section: "copy", language: activeLang, content: copyPayload })
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
        <h1 className="text-2xl font-bold text-[#2f6b3b]">Edit About Page</h1>
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

      <div className="space-y-8 pb-12">
        <section className="bg-gray-50 p-6 rounded border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Header Section</h2>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Label</label><Input value={currentCopy.label || ""} onChange={e => setCopy({...currentCopy, label: e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">Title</label><Input value={currentCopy.title || ""} onChange={e => setCopy({...currentCopy, title: e.target.value})} /></div>
            <div className="col-span-2"><label className="block text-sm font-medium mb-1">Intro</label><Input value={currentCopy.intro || ""} onChange={e => setCopy({...currentCopy, intro: e.target.value})} /></div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Our Story</h2>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium mb-1">Story Title</label><Input value={currentCopy.storyTitle || ""} onChange={e => setCopy({...currentCopy, storyTitle: e.target.value})} /></div>
            <div>
              <label className="block text-sm font-medium mb-1">Story Paragraphs</label>
              <div className="space-y-2">
                {currentCopy.storyParagraphs?.map((p: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <Textarea value={p} onChange={e => {
                      const newP = [...currentCopy.storyParagraphs];
                      newP[idx] = e.target.value;
                      setCopy({...currentCopy, storyParagraphs: newP});
                    }} />
                    <button onClick={() => {
                      const newP = currentCopy.storyParagraphs.filter((_: any, i: number) => i !== idx);
                      setCopy({...currentCopy, storyParagraphs: newP});
                    }} className="text-red-500 font-bold px-2">X</button>
                  </div>
                ))}
                <button onClick={() => setCopy({...currentCopy, storyParagraphs: [...(currentCopy.storyParagraphs || []), ""]})} className="text-xs bg-white border border-gray-300 px-2 py-1 rounded">+ Add Paragraph</button>
              </div>
            </div>
            <div><label className="block text-sm font-medium mb-1">Photo URL</label><Input value={currentCopy.photoUrl || ""} onChange={e => setCopy({...currentCopy, photoUrl: e.target.value})} placeholder="Cloudinary URL" /></div>
            <div><label className="block text-sm font-medium mb-1">Photo Label (Fallback)</label><Input value={currentCopy.photoLabel || ""} onChange={e => setCopy({...currentCopy, photoLabel: e.target.value})} /></div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Mission</h3>
              <Input placeholder="Label" value={currentCopy.missionLabel || ""} onChange={e => setCopy({...currentCopy, missionLabel: e.target.value})} />
              <Input placeholder="Title" value={currentCopy.missionTitle || ""} onChange={e => setCopy({...currentCopy, missionTitle: e.target.value})} />
              <Textarea placeholder="Body" value={currentCopy.missionBody || ""} onChange={e => setCopy({...currentCopy, missionBody: e.target.value})} />
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Vision</h3>
              <Input placeholder="Label" value={currentCopy.visionLabel || ""} onChange={e => setCopy({...currentCopy, visionLabel: e.target.value})} />
              <Input placeholder="Title" value={currentCopy.visionTitle || ""} onChange={e => setCopy({...currentCopy, visionTitle: e.target.value})} />
              <Textarea placeholder="Body" value={currentCopy.visionBody || ""} onChange={e => setCopy({...currentCopy, visionBody: e.target.value})} />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded border border-gray-200">
          <h2 className="text-lg font-bold mb-4">What We Do</h2>
          <div className="space-y-4">
             <div><label className="block text-sm font-medium mb-1">Section Title</label><Input value={currentCopy.whatWeDoTitle || ""} onChange={e => setCopy({...currentCopy, whatWeDoTitle: e.target.value})} /></div>
             <div className="space-y-4">
               {currentCopy.workItems?.map((item: any, idx: number) => (
                 <div key={idx} className="p-4 bg-white border border-gray-300 rounded relative">
                   <button onClick={() => {
                     const newItems = currentCopy.workItems.filter((_: any, i: number) => i !== idx);
                     setCopy({...currentCopy, workItems: newItems});
                   }} className="absolute top-2 right-2 text-red-500 font-bold px-2 py-1 bg-gray-100 rounded text-xs">Remove</button>
                   <div className="space-y-2 mt-2">
                     <Input placeholder="Item Title" value={item.title} onChange={e => {
                       const newItems = [...currentCopy.workItems];
                       newItems[idx].title = e.target.value;
                       setCopy({...currentCopy, workItems: newItems});
                     }} />
                     <Textarea placeholder="Item Body" value={item.body} onChange={e => {
                       const newItems = [...currentCopy.workItems];
                       newItems[idx].body = e.target.value;
                       setCopy({...currentCopy, workItems: newItems});
                     }} />
                   </div>
                 </div>
               ))}
               <button onClick={() => setCopy({...currentCopy, workItems: [...(currentCopy.workItems || []), { title: "", body: "" }]})} className="text-xs bg-white border border-gray-300 px-3 py-1 rounded">+ Add Work Item</button>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
