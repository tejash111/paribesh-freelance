"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function AdminContactPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [contentEn, setContentEn] = useState<any>(null);
  const [infoEn, setInfoEn] = useState<any>(null);
  
  const [contentOr, setContentOr] = useState<any>(null);
  const [infoOr, setInfoOr] = useState<any>(null);

  const [activeLang, setActiveLang] = useState<"EN" | "OR">("EN");

  useEffect(() => {
    async function load() {
      try {
        const [resEn, resOr] = await Promise.all([
          fetch("/api/site-content?page=contact&language=EN").then(r => r.json()),
          fetch("/api/site-content?page=contact&language=OR").then(r => r.json())
        ]);

        const enCopy = resEn.items.find((i: any) => i.section === "copy")?.content || {};
        const enInfo = resEn.items.find((i: any) => i.section === "info")?.content || {};
        
        const orCopy = resOr.items.find((i: any) => i.section === "copy")?.content || {};
        const orInfo = resOr.items.find((i: any) => i.section === "info")?.content || {};

        setContentEn(enCopy);
        setInfoEn(enInfo);
        setContentOr(orCopy);
        setInfoOr(orInfo);
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
      const infoPayload = activeLang === "EN" ? infoEn : infoOr;

      await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: "contact", section: "copy", language: activeLang, content: copyPayload })
      });

      await fetch("/api/site-content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: "contact", section: "info", language: activeLang, content: infoPayload })
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
  const currentInfo = activeLang === "EN" ? infoEn : infoOr;
  const setCopy = activeLang === "EN" ? setContentEn : setContentOr;
  const setInfo = activeLang === "EN" ? setInfoEn : setInfoOr;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#2f6b3b]">Edit Contact Page</h1>
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
            <div>
              <label className="block text-sm font-medium mb-1">Label (e.g. Connect)</label>
              <Input value={currentCopy.label || ""} onChange={e => setCopy({...currentCopy, label: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input value={currentCopy.title || ""} onChange={e => setCopy({...currentCopy, title: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Intro Text</label>
              <Input value={currentCopy.intro || ""} onChange={e => setCopy({...currentCopy, intro: e.target.value})} />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Contact Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Headquarters Address (HTML allowed)</label>
              <Input value={currentInfo.headquartersAddress || ""} onChange={e => setInfo({...currentInfo, headquartersAddress: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Editor's Email</label>
              <Input value={currentInfo.editorsEmail || ""} onChange={e => setInfo({...currentInfo, editorsEmail: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">General Inquiry Phone</label>
              <Input value={currentInfo.inquiryPhone || ""} onChange={e => setInfo({...currentInfo, inquiryPhone: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Google Maps Embed URL</label>
              <Input value={currentInfo.mapUrl || ""} onChange={e => setInfo({...currentInfo, mapUrl: e.target.value})} />
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Social Links</h2>
          <div className="space-y-3">
            {currentInfo.socialLinks?.map((link: any, idx: number) => (
              <div key={idx} className="flex gap-2 items-center">
                <Input value={link.label} onChange={e => {
                  const newLinks = [...currentInfo.socialLinks];
                  newLinks[idx].label = e.target.value;
                  setInfo({...currentInfo, socialLinks: newLinks});
                }} placeholder="Label (e.g. Twitter)" />
                <Input value={link.url} onChange={e => {
                  const newLinks = [...currentInfo.socialLinks];
                  newLinks[idx].url = e.target.value;
                  setInfo({...currentInfo, socialLinks: newLinks});
                }} placeholder="URL" />
                <button 
                  onClick={() => {
                    const newLinks = currentInfo.socialLinks.filter((_: any, i: number) => i !== idx);
                    setInfo({...currentInfo, socialLinks: newLinks});
                  }}
                  className="text-red-500 font-bold px-3 py-2 bg-white border border-gray-200 rounded"
                >
                  X
                </button>
              </div>
            ))}
            <button 
              onClick={() => {
                const newLinks = [...(currentInfo.socialLinks || []), { label: "New Link", url: "#" }];
                setInfo({...currentInfo, socialLinks: newLinks});
              }}
              className="mt-2 text-sm bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
            >
              + Add Social Link
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
