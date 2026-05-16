"use client";

import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ContactCtaStrip } from "@/components/contact-cta-strip";
import { useLanguage, type Language } from "@/lib/language";

type HeroStory = {
  category: string;
  title: string;
  description: string;
  locationDate: string;
  imageLabel: string;
  imageClasses: string;
};

const heroStories: Record<Language, HeroStory[]> = {
  en: [
    {
      category: "Analysis",
      title: "Guardians of our environment take bold new steps in Similipal",
      description:
        "Paribesh Prahari is an environmental action group fighting for biodiversity, clean water, and forest rights. We turn field research into tangible policy changes.",
      locationDate: "Baripada | May 15",
      imageLabel: "Similipal Field Briefing",
      imageClasses:
        "bg-[radial-gradient(circle_at_top_left,_rgba(72,187,120,0.38),_transparent_42%),linear-gradient(135deg,#dfeee4_0%,#9cc6a6_45%,#3c5d47_100%)]",
    },
    {
      category: "Field Report",
      title: "River watch teams map pollution hotspots across northern Odisha",
      description:
        "Volunteer monitors are tracking discharge patterns, logging contaminated stretches, and pushing district officials to publish corrective action timelines.",
      locationDate: "Jashipur | May 14",
      imageLabel: "Mahanadi Monitoring Patrol",
      imageClasses:
        "bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.3),_transparent_36%),linear-gradient(135deg,#d6edf4_0%,#87b8c7_48%,#285567_100%)]",
    },
    {
      category: "Ground Report",
      title: "Forest rights assemblies gather pace before the monsoon season",
      description:
        "Community leaders are documenting customary boundaries and preparing fresh submissions to protect access, livelihoods, and habitat stewardship.",
      locationDate: "Karanjia | May 12",
      imageLabel: "Community Rights Assembly",
      imageClasses:
        "bg-[radial-gradient(circle_at_bottom_left,_rgba(255,222,173,0.28),_transparent_40%),linear-gradient(135deg,#efe3cf_0%,#b4865b_50%,#5f3d2d_100%)]",
    },
  ],
  or: [
    {
      category: "ବିଶ୍ଳେଷଣ",
      title: "ସିମିଲିପାଳରେ ପରିବେଶ ସୁରକ୍ଷା ପାଇଁ ନୂଆ ସାହସିକ ପଦକ୍ଷେପ",
      description:
        "ପରିବେଶ ପ୍ରହରୀ ହେଉଛି ଜୀବ ବିବିଧତା, ସୁଚିତ୍ର ଜଳ ଓ ଜଙ୍ଗଲ ଅଧିକାର ପାଇଁ କାମ କରୁଥିବା ଏକ ପରିବେଶ ଅଭିଯାନ ଗୋଷ୍ଠୀ। ଆମେ ମାଟିସ୍ତରର ଅଧ୍ୟୟନକୁ ନୀତି ପରିବର୍ତ୍ତନରେ ପରିଣତ କରୁଛୁ।",
      locationDate: "ବାରିପଦା | 15 ମଇ",
      imageLabel: "ସିମିଲିପାଳ କ୍ଷେତ୍ର ଅବଲୋକନ",
      imageClasses:
        "bg-[radial-gradient(circle_at_top_left,_rgba(72,187,120,0.38),_transparent_42%),linear-gradient(135deg,#dfeee4_0%,#9cc6a6_45%,#3c5d47_100%)]",
    },
    {
      category: "କ୍ଷେତ୍ର ରିପୋର୍ଟ",
      title: "ଉତ୍ତର ଓଡ଼ିଶାରେ ନଦୀ ନିରୀକ୍ଷଣ ଦଳ ପ୍ରଦୂଷଣ ସ୍ଥଳ ଚିହ୍ନଟ କରୁଛନ୍ତି",
      description:
        "ସ୍ୱଇଚ୍ଛାସେବୀ ନିରୀକ୍ଷକମାନେ ଦୂଷିତ ପ୍ରବାହର ଧାରା ପର୍ଯ୍ୟବେକ୍ଷଣ କରୁଛନ୍ତି, ପ୍ରଭାବିତ ଅଞ୍ଚଳ ଲେଖାବଦ୍ଧ କରୁଛନ୍ତି ଏବଂ ଜିଲ୍ଲା ପ୍ରଶାସନକୁ ସୁଧାରାତ୍ମକ କାର୍ଯ୍ୟସୂଚୀ ପ୍ରକାଶ ପାଇଁ ଚାପ ଦେଉଛନ୍ତି।",
      locationDate: "ଜଶିପୁର | 14 ମଇ",
      imageLabel: "ମହାନଦୀ ନିରୀକ୍ଷଣ ଅଭିଯାନ",
      imageClasses:
        "bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.3),_transparent_36%),linear-gradient(135deg,#d6edf4_0%,#87b8c7_48%,#285567_100%)]",
    },
    {
      category: "ମାଟିସ୍ତର ରିପୋର୍ଟ",
      title: "ବର୍ଷା ଋତୁ ପୂର୍ବରୁ ଜଙ୍ଗଲ ଅଧିକାର ସଭାଗୁଡ଼ିକ ଗତି ପାଉଛି",
      description:
        "ସମୁଦାୟ ନେତାମାନେ ପାରମ୍ପରିକ ସୀମା ଲେଖାବଦ୍ଧ କରୁଛନ୍ତି ଏବଂ ପ୍ରବେଶାଧିକାର, ଜୀବିକା ଓ ଆବାସ ସୁରକ୍ଷା ପାଇଁ ନୂତନ ଦାଖଲ ପ୍ରସ୍ତୁତ କରୁଛନ୍ତି।",
      locationDate: "କରଞ୍ଜିଆ | 12 ମଇ",
      imageLabel: "ସମୁଦାୟ ଅଧିକାର ସଭା",
      imageClasses:
        "bg-[radial-gradient(circle_at_bottom_left,_rgba(255,222,173,0.28),_transparent_40%),linear-gradient(135deg,#efe3cf_0%,#b4865b_50%,#5f3d2d_100%)]",
    },
  ],
};

const homeCopy = {
  en: {
    featuredUpdate: "Featured Update",
    exploreMore: "Explore More",
    thumbnail: "Thumbnail",
    featuredUpdateHeadline: "Community mobilization sees record turnaround in local plantations",
    latest: "Latest",
    allCategories: "All categories",
    latestItems: [
      { time: "11 min", title: "Cannot permit zoo in a national park: SC on proposed tiger safari" },
      { time: "3 hrs", title: "Tamil Nadu may get four new Biodiversity Heritage Sites" },
      { time: "1 day", title: "Controversial forest Act opens door to unfettered deforestation" },
    ],
    seeAllLatest: "See all latest ❯",
    missionLabel: "Mission Statement",
    missionTitle: "Paribesh Prahari defends forests, water, biodiversity, and community rights across Odisha.",
    missionBody:
      "We combine field reporting, research, and community engagement to document environmental harm and amplify local voices. Our work turns on-the-ground evidence into public awareness, policy pressure, and long-term ecological action.",
    latestEditorial: "Latest Editorial",
    inTheNews: "In the News",
    exploreAll: "Explore All ❯",
    editorialCardLabel: "Editorial",
    newsCardLabel: "News",
    editorialStories: [
      "Community forest councils are rewriting local conservation playbooks in northern Odisha",
      "Why wetland restoration needs legal backing before the next monsoon cycle",
      "The case for stronger biodiversity mapping in district development plans",
      "Grassroots climate reporting is reshaping accountability in vulnerable regions",
    ],
    newsStories: [
      "District teams begin fresh survey of illegal sand mining along sensitive riverbanks",
      "Residents press for quicker action after new contamination alerts in drinking water sources",
      "State wildlife officials expand patrol coverage near elephant movement corridors",
      "Local schools launch youth biodiversity clubs with support from community groups",
    ],
    previousStory: "Show previous hero story",
    nextStory: "Show next hero story",
  },
  or: {
    featuredUpdate: "ବିଶେଷ ଅଦ୍ୟତନ",
    exploreMore: "ଆଉ ଦେଖନ୍ତୁ",
    thumbnail: "ଥମ୍ବନେଲ",
    featuredUpdateHeadline: "ସ୍ଥାନୀୟ ଗଛରୋପଣରେ ସମୁଦାୟ ମୋବିଲାଇଜେସନ ଉଲ୍ଲେଖନୀୟ ସଫଳତା ଆଣିଛି",
    latest: "ସର୍ବଶେଷ",
    allCategories: "ସମସ୍ତ ବର୍ଗ",
    latestItems: [
      { time: "11 ମିନିଟ", title: "ଜାତୀୟ ଉଦ୍ୟାନରେ ଚିଡ଼ିଆଖାନାକୁ ଅନୁମତି ନୁହେଁ: ପ୍ରସ୍ତାବିତ ବାଘ ସଫାରି ଉପରେ ସୁପ୍ରିମ କୋର୍ଟ" },
      { time: "3 ଘଣ୍ଟା", title: "ତାମିଲନାଡୁରେ ଏବେ ବର୍ଷ ଚାରିଟି ନୂତନ ଜୀବ ବିବିଧତା ଐତିହ୍ୟ ସ୍ଥଳ ହୋଇପାରେ" },
      { time: "1 ଦିନ", title: "ବିବାଦିତ ଜଙ୍ଗଲ ଆଇନ ଅନିୟନ୍ତ୍ରିତ ବନନିଧନ ପାଇଁ ଦ୍ୱାର ଖୋଲିଦେଇଛି" },
    ],
    seeAllLatest: "ସବୁ ସର୍ବଶେଷ ଦେଖନ୍ତୁ ❯",
    missionLabel: "ମିଶନ ବକ୍ତବ୍ୟ",
    missionTitle: "ପରିବେଶ ପ୍ରହରୀ ଓଡ଼ିଶାର ଜଙ୍ଗଲ, ଜଳ, ଜୀବ ବିବିଧତା ଓ ସମୁଦାୟ ଅଧିକାରର ସୁରକ୍ଷା କରେ।",
    missionBody:
      "ଆମେ ପରିବେଶୀୟ କ୍ଷତି ଲେଖାବଦ୍ଧ କରିବା ଓ ସ୍ଥାନୀୟ ସ୍ୱରକୁ ଆଗକୁ ଆଣିବା ପାଇଁ କ୍ଷେତ୍ର ରିପୋର୍ଟିଂ, ଗବେଷଣା ଓ ସମୁଦାୟ ସଂଯୋଗକୁ ଏକତ୍ର କରୁଛୁ। ଆମ କାମ ମାଟିସ୍ତରର ପ୍ରମାଣକୁ ଜନଚେତନା, ନୀତିଗତ ଚାପ ଓ ଦୀର୍ଘକାଳୀନ ପରିବେଶୀୟ କାର୍ଯ୍ୟରେ ପରିଣତ କରେ।",
    latestEditorial: "ସର୍ବଶେଷ ସମ୍ପାଦକୀୟ",
    inTheNews: "ସମ୍ବାଦରେ",
    exploreAll: "ସବୁ ଦେଖନ୍ତୁ ❯",
    editorialCardLabel: "ସମ୍ପାଦକୀୟ",
    newsCardLabel: "ସମ୍ବାଦ",
    editorialStories: [
      "ଉତ୍ତର ଓଡ଼ିଶାରେ ସମୁଦାୟ ଜଙ୍ଗଲ ପରିଷଦଗୁଡ଼ିକ ନୂଆ ସଂରକ୍ଷଣ ମଡେଲ ତିଆରି କରୁଛନ୍ତି",      "ଆସନ୍ତା ବର୍ଷା ପୂର୍ବରୁ ଜଳାଶୟ ପୁନରୁଦ୍ଧାର ପାଇଁ କାହିଁକି ଆଇନଗତ ସମର୍ଥନ ଜରୁରୀ",
      "ଜିଲ୍ଲା ଉନ୍ନୟନ ଯୋଜନାରେ ଶକ୍ତିଶାଳୀ ଜୀବ ବିବିଧତା ମାପନର ପକ୍ଷରେ ଯୁକ୍ତି",
      "ମାଟିସ୍ତରର ଜଳବାୟୁ ରିପୋର୍ଟିଂ କିପରି ଜବାବଦେହିତାକୁ ନୂଆ ଆକାର ଦେଉଛି",
    ],
    newsStories: [
      "ସମ୍ବେଦନଶୀଳ ନଦୀତଟରେ ଅବୈଧ ବାଲୁକା ଖନନ ଉପରେ ଜିଲ୍ଲା ଦଳ ନୂଆ ସର୍ଭେ ଆରମ୍ଭ କରିଛି",      "ପାନୀୟ ଜଳ ସ୍ରୋତରେ ନୂଆ ପ୍ରଦୂଷଣ ସତର୍କତା ପରେ ନିବାସୀମାନେ ଶୀଘ୍ର କାର୍ଯ୍ୟାନୁଷ୍ଠାନ ଦାବି କରୁଛନ୍ତି"
,
      "ହାତୀ ଗମନପଥ ନିକଟରେ ବନ୍ୟପ୍ରାଣୀ ଅଧିକାରୀମାନେ ଗସ୍ତ କଭରେଜ ବଢ଼ାଇଛନ୍ତି",
      "ସମୁଦାୟ ସଂଗଠନମାନଙ୍କ ସହଯୋଗରେ ସ୍ଥାନୀୟ ବିଦ୍ୟାଳୟଗୁଡ଼ିକ ଯୁବ ଜୀବ ବିବିଧତା କ୍ଲବ ଆରମ୍ଭ କରିଛନ୍ତି",
    ],
    previousStory: "ପୂର୍ବ ହିରୋ ଖବର ଦେଖାନ୍ତୁ",
    nextStory: "ପରବର୍ତ୍ତୀ ହିରୋ ଖବର ଦେଖାନ୍ତୁ",
  },
} as const satisfies Record<Language, unknown>;

export default function Home() {
  const { language } = useLanguage();
  const copy = homeCopy[language];
  const localizedHeroStories = heroStories[language];
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/posts?limit=10").then(r => r.json()).then(d => setPosts(d.posts || []));
  }, []);

  const editorialPosts = posts.filter(p => p.type === "EDITORIAL").slice(0, 4);
  const newsPosts = posts.filter(p => p.type === "NEWS").slice(0, 4);
  const activeHero = localizedHeroStories[activeHeroIndex];

  const showPreviousHero = () => {
    setActiveHeroIndex((currentIndex) => (currentIndex - 1 + localizedHeroStories.length) % localizedHeroStories.length);
  };

  const showNextHero = () => {
    setActiveHeroIndex((currentIndex) => (currentIndex + 1) % localizedHeroStories.length);
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroIndex((currentIndex) => (currentIndex + 1) % localizedHeroStories.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [localizedHeroStories.length]);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-200 -mt-8 -mx-4 lg:-mx-8 px-4 lg:px-8">
        <div className="lg:col-span-8 flex flex-col gap-4 pt-8 pb-10 lg:pr-8">
          <div
            className={`group relative w-full aspect-video flex items-center justify-center overflow-hidden transition-all duration-700 ${activeHero.imageClasses}`}
          >
            <div className="absolute inset-0 bg-black/10" />
            <button
              type="button"
              onClick={showPreviousHero}
              className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-all duration-200 hover:bg-black/65 group-hover:opacity-100 focus-visible:opacity-100"
              aria-label={copy.previousStory}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNextHero}
              className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition-all duration-200 hover:bg-black/65 group-hover:opacity-100 focus-visible:opacity-100"
              aria-label={copy.nextStory}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <span className="relative text-white/90 font-semibold tracking-[0.25em] text-xs uppercase text-center px-6">
              {activeHero.imageLabel}
            </span>
            <div className="absolute top-4 left-4 bg-black/70 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm flex items-center gap-1.5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></span> {activeHero.locationDate}
            </div>
          </div>

          <div className="mt-2">
            <span className="text-zinc-500 font-semibold text-xs tracking-wider uppercase mb-1 block">
              {activeHero.category}
            </span>
            <h1 className="text-4xl md:text-[2.75rem] font-sans leading-[1.1] text-black mb-3 cursor-pointer hover:text-[#124e27] transition-colors">
              {activeHero.title}
            </h1>
            <p className="text-zinc-700 text-lg md:text-xl leading-snug font-sans">
              {activeHero.description}
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8 pt-8 pb-10 lg:border-l lg:border-zinc-200 lg:pl-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">{copy.featuredUpdate}</h2>
              <button className="border border-zinc-300 rounded-full px-3 py-1 text-xs font-semibold hover:bg-zinc-50 transition-colors">
                {copy.exploreMore}
              </button>
            </div>
            <div className="relative w-full aspect-video bg-zinc-100 flex items-center justify-center mb-3 group cursor-pointer">
              <span className="text-zinc-400 font-semibold text-xs uppercase">{copy.thumbnail}</span>
              <PlayCircle className="absolute text-white w-10 h-10 opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-md" />
            </div>
            <h3 className="font-bold text-base hover:text-[#124e27] transition-colors cursor-pointer leading-tight">
              {copy.featuredUpdateHeadline}
            </h3>
          </div>

          <hr className="border-zinc-200 -mx-4 lg:-mx-8" />

          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-[#124e27] text-lg">{copy.latest}</h2>
              <select className="border border-zinc-300 rounded-full px-2 py-1 text-xs font-semibold bg-white outline-none">
                <option>{copy.allCategories}</option>
              </select>
            </div>

            <div className="flex flex-col gap-4">
              {copy.latestItems.map((item, index) => (
                <div key={item.title}>
                  {index > 0 ? <hr className="border-slate-100 -mx-4 lg:-mx-8 mb-4" /> : null}
                  <div className="flex gap-4 group cursor-pointer">
                    <span className="text-[#124e27] font-bold text-xs shrink-0 pt-0.5">{item.time}</span>
                    <p className="font-bold text-sm leading-snug group-hover:text-[#124e27] transition-colors">{item.title}</p>
                  </div>
                </div>
              ))}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">            {copy.editorialStories.map((story, index) => (
              <div key={story} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-zinc-100 w-full mb-3 flex items-center justify-center">
                  <span className="text-[10px] text-zinc-400 font-semibold uppercase">{copy.editorialCardLabel} {index + 1}</span>
                </div>
                <h3 className="font-bold text-[15px] leading-tight group-hover:text-[#124e27] transition-colors">
                  {story}
                </h3>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">{copy.inTheNews}</h2>
            <Link href="/in-the-news" className="text-sm font-semibold hover:text-[#124e27] transition-colors">{copy.exploreAll}</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">            {copy.newsStories.map((story, index) => (
              <div key={story} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-zinc-100 w-full mb-3 flex items-center justify-center">
                  <span className="text-[10px] text-zinc-400 font-semibold uppercase">{copy.newsCardLabel} {index + 1}</span>
                </div>
                <h3 className="font-bold text-[15px] leading-tight group-hover:text-[#124e27] transition-colors">
                  {story}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCtaStrip />
    </div>
  );
}
