"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage, type Language } from "@/lib/language";

const contactCopy = {
  en: {
    label: "Connect",
    title: "Get in Touch",
    intro: "We'd love to hear from you. Reach out for collaborations, media inquiries, or confidential environmental tips.",
    infoTitle: "Contact Information",
    headquarters: "Headquarters",
    editorsDesk: "Editor's Desk",
    inquiry: "General Inquiry",
    followTitle: "Follow Paribesh Prahari",
    messageTitle: "Send a Message",
    fullName: "Full Name",
    fullNamePlaceholder: "Enter your name",
    email: "Email Address",
    emailPlaceholder: "name@example.com",
    subject: "Subject",
    subjectPlaceholder: "What is this regarding?",
    message: "Message",
    messagePlaceholder: "Write your message here...",
    submit: "Submit Inquiry",
    mapTitle: "Find Us on the Map",
  },
  or: {
    label: "ସଂଯୋଗ",
    title: "ଯୋଗାଯୋଗ କରନ୍ତୁ",
    intro: "ଆମେ ଆପଣଙ୍କୁ ସୁଣିବାକୁ ଇଚ୍ଛୁକ। ସହଯୋଗ, ମିଡିଆ ପ୍ରଶ୍ନ କିମ୍ବା ଗୁପ୍ତ ପରିବେଶ ସୂଚନା ପାଇଁ ଆମ ସହିତ ସଂପର୍କ କରନ୍ତୁ।",
    infoTitle: "ଯୋଗାଯୋଗ ସୂଚନା",
    headquarters: "ମୁଖ୍ୟାଳୟ",
    editorsDesk: "ସମ୍ପାଦକୀୟ ଡେସ୍କ",
    inquiry: "ସାଧାରଣ ପ୍ରଶ୍ନ",
    followTitle: "ପରିବେଶ ପ୍ରହରୀକୁ ଅନୁସରଣ କରନ୍ତୁ",
    messageTitle: "ସନ୍ଦେଶ ପଠାନ୍ତୁ",
    fullName: "ପୂର୍ଣ୍ଣ ନାମ",
    fullNamePlaceholder: "ଆପଣଙ୍କ ନାମ ଲେଖନ୍ତୁ",
    email: "ଇମେଲ ଠିକଣା",
    emailPlaceholder: "name@example.com",
    subject: "ବିଷୟ",
    subjectPlaceholder: "ଏହା କଣ ବିଷୟରେ?",
    message: "ସନ୍ଦେଶ",
    messagePlaceholder: "ଆପଣଙ୍କ ସନ୍ଦେଶ ଏଠାରେ ଲେଖନ୍ତୁ...",
    submit: "ପ୍ରଶ୍ନ ପଠାନ୍ତୁ",
    mapTitle: "ମାନଚିତ୍ରରେ ଆମକୁ ଖୋଜନ୍ତୁ",
  },
} as const satisfies Record<Language, unknown>;

export default function ContactPage() {
  const { language } = useLanguage();
  const copy = contactCopy[language];

  return (
    <div className="flex flex-col pb-16 max-w-5xl mx-auto">
      <section className="py-12 border-b border-zinc-200">
        <span className="text-zinc-500 font-semibold text-xs tracking-wider uppercase mb-2 block">{copy.label}</span>
        <h1 className="text-4xl md:text-[3.5rem] font-sans leading-tight text-black mb-4">{copy.title}</h1>
        <p className="text-xl font-sans text-zinc-600 max-w-3xl">{copy.intro}</p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-12">
        <div className="lg:col-span-2 flex flex-col gap-10 lg:border-r lg:border-zinc-200 lg:pr-10">
          <div>
            <h2 className="text-xl font-bold mb-6">{copy.infoTitle}</h2>
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-semibold text-xs uppercase text-zinc-500 tracking-wider mb-2">{copy.headquarters}</p>
                <p className="text-lg font-sans">Baripada, Mayurbhanj<br />Odisha, India</p>
              </div>

              <div>
                <p className="font-semibold text-xs uppercase text-zinc-500 tracking-wider mb-2">{copy.editorsDesk}</p>
                <p className="text-lg font-sans hover:text-[#124e27] cursor-pointer transition-colors">contact@paribeshprahari.com</p>
              </div>

              <div>
                <p className="font-semibold text-xs uppercase text-zinc-500 tracking-wider mb-2">{copy.inquiry}</p>
                <p className="text-lg font-sans">+91 XXXXX XXXXX</p>
              </div>
            </div>
          </div>

          <hr className="border-zinc-200" />

          <div>
            <h2 className="text-xl font-bold mb-4">{copy.followTitle}</h2>
            <div className="flex flex-col gap-3">
              {["Twitter", "LinkedIn", "Instagram"].map((label) => (
                <a key={label} href="#" className="font-sans text-lg text-zinc-700 hover:text-[#124e27] transition-colors inline-flex items-center justify-between group">
                  {label} <span className="text-zinc-400 group-hover:text-[#124e27] transition-colors">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 pb-8">
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
      </section>

      <section className="mt-4 border-t border-zinc-200 pt-10">
        <h2 className="text-2xl font-sans mb-6">{copy.mapTitle}</h2>
        <div className="overflow-hidden border border-zinc-200 bg-zinc-100">
          <iframe
            title="Paribesh Prahari location map"
            src="https://www.google.com/maps?q=Baripada,Mayurbhanj,Odisha,India&z=13&output=embed"
            width="100%"
            height="380"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full border-0"
          />
        </div>
      </section>
    </div>
  );
}
