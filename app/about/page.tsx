"use client";

import { ContactCtaStrip } from "@/components/contact-cta-strip";
import { useLanguage, type Language } from "@/lib/language";

const aboutCopy = {
  en: {
    label: "Organization",
    title: "About Us",
    intro: "Our story, mission, and the dedicated team of guardians standing behind Paribesh Prahari.",
    storyTitle: "Our Story",
    storyParagraphs: [
      "Paribesh Prahari was founded in 2026 out of a profound need to protect the rich biodiversity of Odisha, particularly around the Similipal Biosphere Reserve.",
      "What started as a small cohort of concerned citizens and field researchers has quickly grown into a dedicated environmental action group. We recognized that the gap between grassroots realities and high-level policy making was too vast.",
      "We exist to bridge that gap through field action, robust empirical research, and community-led conservation efforts.",
    ],
    photoLabel: "Founder / Team Photo",
    missionLabel: "Core Objective",
    missionTitle: "Mission",
    missionBody:
      "To vigorously protect Odisha's ecosystems through scientifically backed advocacy, environmental literacy, and direct intervention. We strive to empower local communities as the primary guardians of their natural habitats.",
    visionLabel: "Future Outlook",
    visionTitle: "Vision",
    visionBody:
      "A future where humans and nature coexist in harmony. We envision an Odisha where forests thrive, rivers run clean, and policies reflect an unwavering commitment to ecological sustainability.",
    whatWeDoTitle: "What We Do",
    workItems: [
      {
        title: "Field Work",
        body: "Conducting plantation drives, systematic cleanups, and intensive biodiversity surveys across sensitive ecological zones.",
      },
      {
        title: "Awareness",
        body: "Running school programs, organizing community talks, and leading robust social campaigns to foster ecological literacy.",
      },
      {
        title: "Advocacy",
        body: "Filing NGT petitions, coordinating rigorous policy responses, and engaging in deep environmental reporting.",
      },
    ],
  },
  or: {
    label: "ସଂଗଠନ",
    title: "ଆମ ବିଷୟରେ",
    intro: "ପରିବେଶ ପ୍ରହରୀର କାହାଣୀ, ମିଶନ ଓ ପଛରେ ଥିବା ସମର୍ପିତ ସୁରକ୍ଷାକର୍ମୀ ଦଳ ସମ୍ପର୍କରେ ଜାଣନ୍ତୁ।",
    storyTitle: "ଆମ କାହାଣୀ",
    storyParagraphs: [
      "2026 ମସିହାରେ ଓଡ଼ିଶାର ସମୃଦ୍ଧ ଜୀବ ବିବିଧତା, ବିଶେଷକରି ସିମିଲିପାଳ ବାୟୋସ୍ଫିଅର ରିଜର୍ଭ ଅଞ୍ଚଳକୁ ସୁରକ୍ଷା କରିବାର ଗଭୀର ଆବଶ୍ୟକତାରୁ ପରିବେଶ ପ୍ରହରୀର ଜନ୍ମ ହୋଇଥିଲା।",
      "କିଛି ଚିନ୍ତିତ ନାଗରିକ ଓ କ୍ଷେତ୍ର ଗବେଷକଙ୍କ ଛୋଟ ଦଳରୁ ଆରମ୍ଭ ହୋଇଥିବା ଏହି ପ୍ରୟାସ ଖୁବ୍ ଶୀଘ୍ର ଏକ ସମର୍ପିତ ପରିବେଶ ଆନ୍ଦୋଳନ ଦଳରେ ପରିଣତ ହୋଇଛି। ଆମେ ଅନୁଭବ କଲୁ ଯେ ମାଟିସ୍ତରର ବାସ୍ତବତା ଓ ଉଚ୍ଚସ୍ତରୀୟ ନୀତି ନିର୍ମାଣ ମଧ୍ୟରେ ଥିବା ଦୂରତା ଅତ୍ୟଧିକ ବଡ଼।",
      "କ୍ଷେତ୍ରସ୍ତରୀୟ କାର୍ଯ୍ୟ, ଦୃଢ଼ ଗବେଷଣା ଓ ସମୁଦାୟ ନେତୃତ୍ୱାଧୀନ ସଂରକ୍ଷଣ ମାଧ୍ୟମରେ ଆମେ ସେହି ଦୂରତାକୁ କମାଇବାକୁ କାମ କରୁଛୁ।",
    ],
    photoLabel: "ସ୍ଥାପକ / ଦଳୀୟ ଛବି",
    missionLabel: "ମୂଳ ଉଦ୍ଦେଶ୍ୟ",
    missionTitle: "ମିଶନ",
    missionBody:
      "ବୈଜ୍ଞାନିକ ଆଧାରିତ ପକ୍ଷସମର୍ଥନ, ପରିବେଶ ସାକ୍ଷରତା ଓ ପ୍ରତ୍ୟକ୍ଷ ହସ୍ତକ୍ଷେପ ମାଧ୍ୟମରେ ଓଡ଼ିଶାର ପରିସ୍ଥିତିତନ୍ତ୍ରକୁ ଶକ୍ତିଶାଳୀ ଭାବରେ ସୁରକ୍ଷା କରିବା। ସ୍ଥାନୀୟ ସମୁଦାୟମାନଙ୍କୁ ତାଙ୍କର ପ୍ରାକୃତିକ ଆବାସର ପ୍ରଧାନ ସୁରକ୍ଷକ ଭାବେ ସକ୍ଷମ କରିବା ଆମ ଲକ୍ଷ୍ୟ।",
    visionLabel: "ଭବିଷ୍ୟତ ଦୃଷ୍ଟି",
    visionTitle: "ଭିଜନ",
    visionBody:
      "ମନୁଷ୍ୟ ଓ ପ୍ରକୃତି ଏକତାରେ ଅବସ୍ଥାନ କରୁଥିବା ଏକ ଭବିଷ୍ୟତ। ଆମର କଳ୍ପନା ହେଉଛି ଏମିତି ଏକ ଓଡ଼ିଶା ଯେଉଁଠାରେ ଜଙ୍ଗଲ ସୁଫଳିତ, ନଦୀ ସ୍ୱଚ୍ଛ ଏବଂ ନୀତିରେ ପରିବେଶ ସ୍ଥିରତା ପ୍ରତି ଅଟୁଟ ପ୍ରତିବଦ୍ଧତା ପ୍ରତିଫଳିତ ହୁଏ।",
    whatWeDoTitle: "ଆମେ କ'ଣ କରୁ",
    workItems: [
      {
        title: "କ୍ଷେତ୍ର କାର୍ଯ୍ୟ",
        body: "ସମ୍ବେଦନଶୀଳ ପରିବେଶ ଅଞ୍ଚଳରେ ଗଛରୋପଣ ଅଭିଯାନ, ବ୍ୟବସ୍ଥିତ ପରିସ୍କାର ଅଭିଯାନ ଓ ଜୀବ ବିବିଧତା ସର୍ଭେ କରିବା।",
      },
      {
        title: "ଜାଗରୁକତା",
        body: "ବିଦ୍ୟାଳୟ କାର୍ଯ୍ୟକ୍ରମ, ସମୁଦାୟ ଆଲୋଚନା ଏବଂ ପରିବେଶ ସାକ୍ଷରତା ବଢ଼ାଇବା ପାଇଁ ସାମାଜିକ ଅଭିଯାନ ଚାଲାଇବା।",
      },
      {
        title: "ପକ୍ଷସମର୍ଥନ",
        body: "NGT ମାମଲା, କଠୋର ନୀତିଗତ ପ୍ରତିକ୍ରିୟା ସମନ୍ୱୟ ଏବଂ ଗଭୀର ପରିବେଶ ରିପୋର୍ଟିଂରେ ଅଂଶଗ୍ରହଣ।",
      },
    ],
  },
} as const satisfies Record<Language, unknown>;

export default function AboutPage() {
  const { language } = useLanguage();
  const copy = aboutCopy[language];

  return (
    <div className="flex flex-col gap-12 pb-8">
      <section className="py-12 border-b border-zinc-200">
        <span className="text-zinc-500 font-semibold text-xs tracking-wider uppercase mb-2 block">{copy.label}</span>
        <h1 className="text-4xl md:text-[3.5rem] font-sans leading-tight text-black mb-4">{copy.title}</h1>
        <p className="text-xl font-sans text-zinc-600 max-w-3xl">{copy.intro}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-zinc-200 pb-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">{copy.storyTitle}</h2>
          <div className="space-y-4 font-sans text-lg leading-relaxed text-zinc-800">
            {copy.storyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="bg-zinc-100 flex items-center justify-center min-h-[400px]">
          <span className="font-semibold text-zinc-400 uppercase text-xs tracking-widest">{copy.photoLabel}</span>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-zinc-200 pb-12">
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

      <section className="border-b border-zinc-200 pb-12">
        <h2 className="text-2xl font-bold mb-8">{copy.whatWeDoTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {copy.workItems.map((item) => (
            <div key={item.title} className="flex flex-col border-t border-black pt-4">
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
