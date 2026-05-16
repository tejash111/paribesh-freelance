"use client";

import Link from "next/link";
import { ArrowLeft, Mail, MessageCircle, Link2 } from "lucide-react";

import { useLanguage, type Language } from "@/lib/language";

const detailCopy = {
  en: {
    back: "Editorial",
    tag: "Wildlife",
    title: "Odisha Welcomes Returning Tigress to Similipal Reserve",
    intro:
      "The reintroduction of the young tigress marks a watershed moment in Odisha's concerted conservation efforts after a meticulously planned translocation protocol.",
    date: "October 28, 2026",
    imageLabel: "Primary Cover Image",
    imageCredit: "Credit: Forest Department",
    body: {
      dropcapRest:
        "fter a meticulously planned translocation protocol, the big cat has taken her first steps onto the soft forest floor of the Similipal core zone.",
      p2: "Similipal, known for its unique melanistic tiger population, has faced significant challenges in recent years, including genetic isolation. Integrating new tigers from distinct landscapes brings much-needed genetic diversity to the local breeding pool.",
      quote:
        '"This is not simply about moving an animal from Point A to Point B. It is an ecological rescue mission to ensure the survival of the species in Eastern India."',
      quoteBy: "— Dr. H. Routray, Chief Wildlife Warden",
      journeyTitle: "The Journey to Similipal",
      p3: "The logistics of the operation were daunting. Wildlife veterinarians, tracking teams, and state police coordinated to ensure safe passage. The route was cleared, and the tigress, comfortably sedated in an air-conditioned transport cage, was monitored round the clock.",
      phases: [
        "Phase 1: Quarantine observation and medical clearance in source reserve.",
        "Phase 2: The 600km road transport under strict veterinary supervision.",
        "Phase 3: Release into a 2-hectare soft-release enclosure for acclimatization.",
      ],
      p4: "As the cage doors slid open, she hesitated for only a moment before disappearing into the dense Sal and Asan foliage. We watched via remote cameras, holding our breath, the culmination of two years of policy lobbying and field preparation by Paribesh Prahari and allied NGOs.",
    },
    readNext: "Read Next",
    readNextTitle: "Policy Review: The New Wildlife Act implications on buffer zones",
  },
  or: {
    back: "ସମ୍ପାଦକୀୟ",
    tag: "ବନ୍ୟଜୀବ",
    title: "ସିମିଲିପାଳ ରିଜର୍ଭକୁ ଫେରିଥିବା ବାଘିଣୀକୁ ଓଡ଼ିଶାର ସ୍ୱାଗତ",
    intro:
      "ଯୁବ ବାଘିଣୀର ପୁନଃପ୍ରବେଶ ସୂକ୍ଷ୍ମ ଭାବେ ଯୋଜିତ ସ୍ଥାନାନ୍ତର ପ୍ରକ୍ରିୟା ପରେ ଓଡ଼ିଶାର ସଂଯୁକ୍ତ ସଂରକ୍ଷଣ ପ୍ରୟାସରେ ଏକ ଐତିହାସିକ ମୁହୂର୍ତ୍ତ ଚିହ୍ନଟ କରୁଛି।",
    date: "28 ଅକ୍ଟୋବର 2026",
    imageLabel: "ମୁଖ୍ୟ କଭର ଛବି",
    imageCredit: "ସ୍ରେୟ: ବନ ବିଭାଗ",
    body: {
      dropcapRest:
        "ତ୍ୟନ୍ତ ସୁଯୋଜିତ ସ୍ଥାନାନ୍ତର ପ୍ରକ୍ରିୟା ପରେ ଏହି ବଡ଼ ବିଲାଡ଼ି ସିମିଲିପାଳ କୋର ଅଞ୍ଚଳର ନରମ ଜଙ୍ଗଲ ମାଟିରେ ତାର ପ୍ରଥମ ପଦକ୍ଷେପ ରଖିଛି।",
      p2: "ସିମିଲିପାଳ ତାର ଅନନ୍ୟ ମେଲାନିଷ୍ଟିକ ବାଘ ଜନସଂଖ୍ୟା ପାଇଁ ପରିଚିତ, କିନ୍ତୁ ସମ୍ପ୍ରତି ବର୍ଷଗୁଡ଼ିକରେ ଜେନେଟିକ ଅଲଗାତ୍ୱ ଭଳି ଗୁରୁତର ଚାଲେଞ୍ଜ ସମ୍ମୁଖୀନ ହୋଇଛି। ଭିନ୍ନ ଭୂଦୃଶ୍ୟରୁ ନୂଆ ବାଘ ଆଣିବା ଥାନୀୟ ପ୍ରଜନନ ଦଳକୁ ଅତ୍ୟାବଶ୍ୟକ ଜେନେଟିକ ବିବିଧତା ଯୋଗାଇଥାଏ।",
      quote:
        '"ଏହା କେବଳ ଗୋଟିଏ ପ୍ରାଣୀକୁ ଗୋଟିଏ ସ୍ଥାନରୁ ଅନ୍ୟ ସ୍ଥାନକୁ ନେବା କଥା ନୁହେଁ। ପୂର୍ବ ଭାରତରେ ପ୍ରଜାତିର ଟିକେଇବାକୁ ନିଶ୍ଚିତ କରିବା ପାଇଁ ଏହା ଏକ ପରିବେଶୀୟ ଉଦ୍ଧାର ଅଭିଯାନ।"',
      quoteBy: "— ଡା. ଏଚ. ରାଉତରାୟ, ମୁଖ୍ୟ ବନ୍ୟଜୀବ ରକ୍ଷକ",
      journeyTitle: "ସିମିଲିପାଳକୁ ଯାତ୍ରା",
      p3: "ଏହି କାର୍ଯ୍ୟର ଲଜିଷ୍ଟିକ୍ସ ବହୁତ କଠିନ ଥିଲା। ବନ୍ୟଜୀବ ପଶୁଚିକିତ୍ସକ, ଟ୍ରାକିଂ ଦଳ ଓ ରାଜ୍ୟ ପୋଲିସ ନିରାପଦ ଯାତ୍ରା ନିଶ୍ଚିତ କରିବା ପାଇଁ ସମନ୍ୱୟ କରିଥିଲେ। ପଥ ସଫା କରାଗଲା ଏବଂ ଏୟାର କଣ୍ଡିସନ୍ ଖୋଳରେ ସୁବିଧାଜନକ ଭାବେ ନିଶ୍ଚେତ ରଖାଯାଇଥିବା ବାଘିଣୀକୁ ଚବିଶଘଣ୍ଟା ନଜରରେ ରଖାଯାଇଥିଲା।",
      phases: [
        "ପର୍ଯ୍ୟାୟ 1: ଉତ୍ସ ରିଜର୍ଭରେ କ୍ୱାରେଣ୍ଟାଇନ ନିରୀକ୍ଷଣ ଓ ଚିକିତ୍ସା ଅନୁମୋଦନ।",
        "ପର୍ଯ୍ୟାୟ 2: କଠୋର ପଶୁଚିକିତ୍ସା ନିରୀକ୍ଷଣରେ 600 କିମି ସଡ଼କ ଯାତ୍ରା।",
        "ପର୍ଯ୍ୟାୟ 3: ଅନୁକଳନ ପାଇଁ 2 ହେକ୍ଟର ସଫ୍ଟ-ରିଲିଜ ଘେରାଉରେ ଛାଡ଼ାଯିବା।",
      ],
      p4: "ଖୋଳର ଦୁଆର ଖୋଲିବା ସହିତ ସେ କେବଳ ମୁହୂର୍ତ୍ତକ ପାଇଁ ଦ୍ୱିଧାରେ ପଡ଼ିଲା, ତାପରେ ଘନ ସାଲ ଓ ଆସନ ଜଙ୍ଗଲରେ ଅଦୃଶ୍ୟ ହୋଇଗଲା। ଆମେ ରିମୋଟ କ୍ୟାମେରା ମାଧ୍ୟମରେ ଶ୍ୱାସ ରୋକି ଦେଖୁଥିଲୁ, ଯାହା ପରିବେଶ ପ୍ରହରୀ ଓ ସହଯୋଗୀ ସଂଗଠନମାନଙ୍କ ଦୁଇ ବର୍ଷର ନୀତି ଲବିଂ ଓ କ୍ଷେତ୍ର ପ୍ରସ୍ତୁତିର ସାରଫଳ ଥିଲା।",
    },
    readNext: "ପରେ ପଢନ୍ତୁ",
    readNextTitle: "ନୀତି ସମୀକ୍ଷା: ନୂଆ ବନ୍ୟଜୀବ ଆଇନର ବଫର ଅଞ୍ଚଳ ଉପରେ ପ୍ରଭାବ",
  },
} as const satisfies Record<Language, unknown>;

export default function EditorialDetailPage() {
  const { language } = useLanguage();
  const copy = detailCopy[language];

  return (
    <div className="flex flex-col pb-12 max-w-4xl mx-auto mt-6">
      <Link href="/editorial" className="inline-flex items-center gap-2 font-semibold text-xs text-zinc-500 uppercase hover:text-[#124e27] transition-colors tracking-wider mb-6">
        <ArrowLeft className="w-3 h-3" /> {copy.back}
      </Link>

      <section className="mb-8">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">
          <span className="text-[#124e27] block flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#124e27] rounded-full"></span> {copy.tag}
          </span>
        </div>

        <h1 className="text-4xl md:text-[3.5rem] leading-[1.05] font-sans text-black mb-6">{copy.title}</h1>
        <p className="text-xl md:text-2xl font-sans text-zinc-600 leading-snug mb-8">{copy.intro}</p>

        <div className="flex items-center justify-between border-t border-b border-zinc-200 py-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-200"></div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">Priya Das</span>
              <span className="text-xs text-zinc-500 font-semibold uppercase">{copy.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"><Mail className="w-4 h-4 text-zinc-700" /></button>
            <button className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"><MessageCircle className="w-4 h-4 text-zinc-700" /></button>
            <button className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"><Link2 className="w-4 h-4 text-zinc-700" /></button>
          </div>
        </div>
      </section>

      <section className="relative w-full aspect-[2/1] md:aspect-video bg-zinc-100 flex items-center justify-center mb-10 overflow-hidden">
        <span className="font-semibold text-zinc-400 uppercase tracking-widest text-xs">{copy.imageLabel}</span>
        <span className="absolute bottom-2 right-2 text-[10px] text-zinc-500 bg-white/80 px-2 py-1 backdrop-blur-sm">{copy.imageCredit}</span>
      </section>

      <article className="prose prose-lg prose-zinc prose-headings:font-sans prose-p:font-sans prose-p:leading-relaxed prose-a:text-[#124e27] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline max-w-3xl mx-auto">
        <p>
          <span className="float-left text-6xl font-sans leading-[0.8] pr-2 text-black">A</span>{copy.body.dropcapRest}
        </p>
        <p>{copy.body.p2}</p>

        <blockquote className="border-l-4 border-black pl-6 py-2 my-10 italic font-sans text-2xl text-black">
          {copy.body.quote}
          <footer className="text-sm font-sans not-italic font-bold text-zinc-500 uppercase mt-4">{copy.body.quoteBy}</footer>
        </blockquote>

        <h2 className="text-3xl font-sans text-black mt-12 mb-6">{copy.body.journeyTitle}</h2>
        <p>{copy.body.p3}</p>
        <ul className="marker:text-[#124e27] list-disc pl-6 space-y-2 my-8 font-sans text-lg">
          {copy.body.phases.map((phase) => (
            <li key={phase}>{phase}</li>
          ))}
        </ul>
        <p>{copy.body.p4}</p>
      </article>

      <section className="border-t border-zinc-200 mt-16 pt-12">
        <h3 className="text-xl font-bold mb-6">{copy.readNext}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex flex-col group cursor-pointer">
              <Link href={`/editorial/post-${item}`} className="flex flex-col h-full">
                <div className="aspect-[3/2] w-full bg-zinc-100 flex items-center justify-center mb-4 hover:opacity-90 transition-opacity">
                  <span className="font-semibold text-zinc-400 uppercase text-[10px]">Image {item}</span>
                </div>
                <h4 className="font-bold text-[15px] leading-tight group-hover:text-[#124e27] transition-colors">
                  {copy.readNextTitle}
                </h4>
                <div className="mt-2 text-[10px] font-bold uppercase text-zinc-500">14 Sep 2026</div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
