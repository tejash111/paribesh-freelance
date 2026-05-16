import { type Language } from "@/lib/language";

export type NewsArticle = {
  slug: string;
  source: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  imageLabel: string;
  imageCredit: string;
  body: string[];
};

export const newsPageCopy = {
  en: {
    title: "In the News",
    intro: "Environmental stories and policy updates from across the press, curated daily by our research team.",
    readSuffix: "read",
    via: "Via",
    readSource: "Read full story",
    previous: "❮ Previous",
    next: "Next ❯",
    back: "In the News",
    related: "More News",
    desk: "Research Desk",
  },
  or: {
    title: "ସମ୍ବାଦରେ",
    intro: "ଆମ ଗବେଷଣା ଦଳ ଦ୍ୱାରା ପ୍ରତିଦିନ ଚୟନିତ ପରିବେଶ ସମ୍ବନ୍ଧୀୟ ଖବର ଓ ନୀତି ଅଦ୍ୟତନ।",
    readSuffix: "ପଢିବା",
    via: "ମାଧ୍ୟମ",
    readSource: "ସମ୍ପୂର୍ଣ୍ଣ ଖବର ପଢନ୍ତୁ",
    previous: "❮ ପୂର୍ବ",
    next: "ପରବର୍ତ୍ତୀ ❯",
    back: "ସମ୍ବାଦରେ",
    related: "ଆହୁରି ଖବର",
    desk: "ଗବେଷଣା ଡେସ୍କ",
  },
} as const satisfies Record<Language, unknown>;

export const newsArticles: Record<Language, NewsArticle[]> = {
  en: [
    {
      slug: "tiger-safari-sc-ruling",
      source: "The Hindu",
      title: "Cannot permit zoo in a national park: SC on proposed tiger safari",
      summary:
        "The Supreme Court came down heavily on the controversial proposal to establish a tiger safari within the Corbett National Park buffer zone, setting a strong precedent for protected areas nationwide. This ruling bolsters our ongoing argument against similar infrastructure proposals in Similipal.",
      date: "2 Feb 2026",
      readTime: "11 min",
      category: "Protected Areas",
      imageLabel: "Supreme Court Wildlife Ruling",
      imageCredit: "Credit: Court archives",
      body: [
        "The Supreme Court's observations on the proposed tiger safari have sharpened the legal distinction between conservation spaces and tourism-led infrastructure. By questioning the permissibility of such development inside protected landscapes, the judgment sends a signal far beyond Corbett.",
        "For groups working in Odisha, the ruling matters because similar ideas often surface in the language of eco-tourism, visitor experience, or regional development. The judgment strengthens the argument that protected areas must remain ecologically governed first, with any human intervention subjected to the highest scrutiny.",
        "Researchers associated with Paribesh Prahari say the order may help local advocacy efforts around Similipal by establishing that wildlife habitats cannot be casually repurposed for high-footfall attractions. The larger policy implication is that conservation planning must not be diluted by commercial framing.",
      ],
    },
    {
      slug: "biodiversity-heritage-sites-tamil-nadu",
      source: "Down To Earth",
      title: "Tamil Nadu may get four new Biodiversity Heritage Sites this year",
      summary:
        "In an encouraging move, Tamil Nadu is expanding its protected heritage sites. This article highlights the legal frameworks utilized, which Paribesh Prahari is currently studying for applicability in the Eastern Ghats region of Odisha.",
      date: "15 Apr 2026",
      readTime: "7 min",
      category: "Biodiversity Policy",
      imageLabel: "Heritage Site Expansion",
      imageCredit: "Credit: State biodiversity board",
      body: [
        "Tamil Nadu's move to expand Biodiversity Heritage Sites offers a practical model for place-based ecological protection outside the narrow boundaries of conventional reserves. The framework is especially relevant for landscapes that hold cultural value alongside fragile ecological systems.",
        "Paribesh Prahari's research team is examining whether similar mechanisms could strengthen protection in Odisha's community-managed habitats and transition zones. The legal structure is significant because it creates a formal recognition pathway for ecosystems that are often overlooked in mainstream conservation maps.",
        "The broader lesson is that biodiversity governance does not need to rely on one template. A heritage-site approach can support local stewardship, improve documentation, and create a durable basis for resisting extractive pressure.",
      ],
    },
    {
      slug: "forest-act-deforestation-warning",
      source: "Mongabay India",
      title: "Greenlight for destruction: Controversial forest Act opens door to unfettered deforestation",
      summary:
        "A critical piece examining the implications of recent amendments to the Forest Conservation Act. It details how the removal of 'deemed forests' from protection could accelerate industrial expansion in ecologically sensitive areas of Central India.",
      date: "28 Apr 2026",
      readTime: "4 min",
      category: "Forest Law",
      imageLabel: "Forest Law Analysis",
      imageCredit: "Credit: Field reporting archive",
      body: [
        "The article lays out why recent changes to forest governance could have consequences far beyond the formal language of the law. Once categories like deemed forests lose protection, large tracts of ecologically important land become more vulnerable to administrative reinterpretation.",
        "That risk is especially serious in regions where community use, forest cover, and biodiversity value overlap without always being reflected in official maps. For environmental groups, the concern is not merely legal but operational: once classification weakens, project clearance can move faster than resistance.",
        "Paribesh Prahari has treated this development as a warning sign for Odisha's own contested landscapes. The key takeaway is that technical amendments in forest policy can quickly become irreversible changes on the ground.",
      ],
    },
    {
      slug: "ngt-mining-stay-mayurbhanj",
      source: "Sambad",
      title: "Mayurbhanj: NGT stays mining in ecologically sensitive zones",
      summary:
        "The National Green Tribunal has successfully issued a stay order on un-regulated mining activities operating along the sensitive ecological corridors of Mayurbhanj district, following recent petitions.",
      date: "14 Aug 2026",
      readTime: "2 min",
      category: "Mining",
      imageLabel: "NGT Mining Stay",
      imageCredit: "Credit: Petition records",
      body: [
        "The National Green Tribunal's stay order marks a significant pause in mining activity across sensitive corridors in Mayurbhanj. The decision follows sustained concern over how extraction pressure was intersecting with wildlife movement and local environmental stability.",
        "For campaigners, the immediate value lies in time. A stay does not resolve the deeper conflict, but it creates room for further scrutiny, evidence gathering, and public accountability around how permissions were being handled.",
        "In practical terms, the order strengthens ongoing efforts to show that ecological corridors cannot be treated as administratively invisible. Legal pauses like this often become the opening through which more durable protection can be argued.",
      ],
    },
  ],
  or: [
    {
      slug: "tiger-safari-sc-ruling",
      source: "The Hindu",
      title: "ଜାତୀୟ ଉଦ୍ୟାନରେ ଚିଡ଼ିଆଖାନାକୁ ଅନୁମତି ନୁହେଁ: ପ୍ରସ୍ତାବିତ ବାଘ ସଫାରି ଉପରେ ସୁପ୍ରିମ କୋର୍ଟ",
      summary:
        "କର୍ବେଟ ଜାତୀୟ ଉଦ୍ୟାନର ବଫର ଅଞ୍ଚଳରେ ବାଘ ସଫାରି ସ୍ଥାପନ ପ୍ରସ୍ତାବ ଉପରେ ସୁପ୍ରିମ କୋର୍ଟ କଠୋର ମତ ପ୍ରକାଶ କରିଛି। ଏହି ରାୟ ସୁରକ୍ଷିତ ଅଞ୍ଚଳଗୁଡ଼ିକ ପାଇଁ ଦେଶବ୍ୟାପୀ ଭଳି ଉଦାହରଣ ସୃଷ୍ଟି କରିଛି।",
      date: "2 ଫେବୃଆରୀ 2026",
      readTime: "11 ମିନିଟ",
      category: "ସୁରକ୍ଷିତ ଅଞ୍ଚଳ",
      imageLabel: "ସୁପ୍ରିମ କୋର୍ଟ ବନ୍ୟଜୀବ ରାୟ",
      imageCredit: "ସ୍ରେୟ: ନ୍ୟାୟାଳୟ ଅଭିଲେଖ",
      body: [
        "ପ୍ରସ୍ତାବିତ ବାଘ ସଫାରି ଉପରେ ସୁପ୍ରିମ କୋର୍ଟର ମତାମତ ସଂରକ୍ଷଣ ଅଞ୍ଚଳ ଏବଂ ପର୍ଯ୍ୟଟନମୁଖୀ ପ୍ରାତିଷ୍ଠାନିକ ବିକାଶ ମଧ୍ୟରେ ଥିବା ଆଇନଗତ ପାର୍ଥକ୍ୟକୁ ଅଧିକ ସ୍ପଷ୍ଟ କରିଛି।",
        "ଓଡ଼ିଶାରେ କାମ କରୁଥିବା ଗୋଷ୍ଠୀମାନଙ୍କ ପାଇଁ ଏହି ରାୟ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ, କାରଣ ଏହି ପ୍ରକାର ଧାରଣା ପରିବେଶ ପର୍ଯ୍ୟଟନ ବା ଅଞ୍ଚଳ ଉନ୍ନୟନର ଭାଷାରେ ପୁନର୍ବାର ଆସିଥାଏ।",
        "ପରିବେଶ ପ୍ରହରୀ ସହ ଜଡ଼ିତ ଗବେଷକମାନଙ୍କ କହିବା ଅନୁସାରେ, ଏହି ଆଦେଶ ସିମିଲିପାଳ ଚାରିପାଖରେ ଚାଲୁଥିବା ସ୍ଥାନୀୟ ପକ୍ଷସମର୍ଥନକୁ ଶକ୍ତିଦାନ କରିପାରେ।",
      ],
    },
    {
      slug: "biodiversity-heritage-sites-tamil-nadu",
      source: "Down To Earth",
      title: "ତାମିଲନାଡୁରେ ଏବେ ବର୍ଷ ଚାରିଟି ନୂତନ ଜୀବ ବିବିଧତା ଐତିହ୍ୟ ସ୍ଥଳ ହୋଇପାରେ",
      summary:
        "ଏହା ଏକ ଉତ୍ସାହଦାୟକ ପଦକ୍ଷେପ, ଯେଉଁଠାରେ ତାମିଲନାଡୁ ସୁରକ୍ଷିତ ଐତିହ୍ୟ ସ୍ଥଳ ବଢ଼ାଇବାକୁ ଆଗୁଆସିଛି। ଏଠାରେ ବ୍ୟବହୃତ ଆଇନଗତ ଢାଞ୍ଚାକୁ ପରିବେଶ ପ୍ରହରୀ ଓଡ଼ିଶାର ପୂର୍ବ ଘାଟ ଅଞ୍ଚଳରେ ପ୍ରୟୋଗଯୋଗ୍ୟତା ପାଇଁ ଅଧ୍ୟୟନ କରୁଛି।",
      date: "15 ଏପ୍ରିଲ 2026",
      readTime: "7 ମିନିଟ",
      category: "ଜୀବ ବିବିଧତା ନୀତି",
      imageLabel: "ଐତିହ୍ୟ ସ୍ଥଳ ବିସ୍ତାର",
      imageCredit: "ସ୍ରେୟ: ରାଜ୍ୟ ଜୀବ ବିବିଧତା ବୋର୍ଡ",
      body: [
        "ତାମିଲନାଡୁର ଏହି ପଦକ୍ଷେପ ପାରମ୍ପରିକ ରିଜର୍ଭ ସୀମାର ବାହାରେ ଅବସ୍ଥିତ ପରିବେଶୀୟ ଭୂଦୃଶ୍ୟ ପାଇଁ ଏକ ବ୍ୟବହାରିକ ସଂରକ୍ଷଣ ମଡେଲ ଦେଇଛି।",
        "ପରିବେଶ ପ୍ରହରୀର ଗବେଷଣା ଦଳ ଓଡ଼ିଶାର ସମୁଦାୟ ପରିଚାଳିତ ଆବାସ ଏବଂ ଟ୍ରାନ୍ସିସନ ଜୋନରେ ଏହା ପ୍ରୟୋଗ ହୋଇପାରେ କି ନାହିଁ ତାହା ଖତିଆନ କରୁଛି।",
        "ବ୍ୟାପକ ଶିକ୍ଷା ହେଉଛି ଯେ ଜୀବ ବିବିଧତା ଶାସନ ଏକମାତ୍ର ଢାଞ୍ଚାରେ ସୀମିତ ହେବାକୁ ପଡ଼େ ନାହିଁ।",
      ],
    },
    {
      slug: "forest-act-deforestation-warning",
      source: "Mongabay India",
      title: "ବନନିଧନ ପାଇଁ ସବୁଜ ସଙ୍କେତ: ବିବାଦିତ ଜଙ୍ଗଲ ଆଇନ ଅନିୟନ୍ତ୍ରିତ ବନଚ୍ଛେଦ ପାଇଁ ଦ୍ୱାର ଖୋଲିଛି",
      summary:
        "ଜଙ୍ଗଲ ସଂରକ୍ଷଣ ଆଇନର ସମ୍ପ୍ରତି ସଂଶୋଧନର ପ୍ରଭାବ ଉପରେ ଏକ ଗଭୀର ବିଶ୍ଳେଷଣ। 'ଡିମ୍ଡ ଫରେଷ୍ଟ' ସୁରକ୍ଷା ଅପସାରଣ କିପରି ପରିବେଶ ସମ୍ବେଦନଶୀଳ ଅଞ୍ଚଳରେ ଶିଳ୍ପ ବିସ୍ତାରକୁ ତ୍ୱରାନ୍ୱିତ କରିପାରେ ତାହା ଏଥିରେ ଉଲ୍ଲେଖ ଅଛି।",
      date: "28 ଏପ୍ରିଲ 2026",
      readTime: "4 ମିନିଟ",
      category: "ଜଙ୍ଗଲ ଆଇନ",
      imageLabel: "ଜଙ୍ଗଲ ଆଇନ ବିଶ୍ଳେଷଣ",
      imageCredit: "ସ୍ରେୟ: କ୍ଷେତ୍ର ରିପୋର୍ଟ ଅଭିଲେଖ",
      body: [
        "ସମ୍ପ୍ରତି ଜଙ୍ଗଲ ଶାସନର ପରିବର୍ତ୍ତନ କେବଳ ଆଇନର ଭାଷା ପର୍ଯ୍ୟନ୍ତ ସୀମିତ ନୁହେଁ, ଏହାର ପ୍ରଭାବ ମାଟିସ୍ତରରେ ଦୂରଗାମୀ ହୋଇପାରେ।",
        "ଡିମ୍ଡ ଫରେଷ୍ଟ ପରି ବର୍ଗଗୁଡ଼ିକ ସୁରକ୍ଷା ହାରାଇଲେ ପରିବେଶ ଦୃଷ୍ଟିରୁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଭୂଭାଗ ପ୍ରଶାସନିକ ପୁନଃବ୍ୟାଖ୍ୟା ପାଇଁ ଅଧିକ ଖୋଲା ହୋଇଯାଏ।",
        "ପରିବେଶ ପ୍ରହରୀ ଓଡ଼ିଶାର ବିବାଦିତ ଭୂଦୃଶ୍ୟ ପାଇଁ ଏହାକୁ ଚେତାବନୀ ସଙ୍କେତ ଭାବେ ନେଇଛି।",
      ],
    },
    {
      slug: "ngt-mining-stay-mayurbhanj",
      source: "Sambad",
      title: "ମୟୂରଭଞ୍ଜ: ପରିବେଶ ସମ୍ବେଦନଶୀଳ ଅଞ୍ଚଳରେ ଖନନ ଉପରେ NGT ରୋକ",
      summary:
        "ସମ୍ପ୍ରତି ଆବେଦନ ପରେ ମୟୂରଭଞ୍ଜ ଜିଲ୍ଲାର ସମ୍ବେଦନଶୀଳ ପରିବେଶ ଗମନପଥରେ ଅନିୟନ୍ତ୍ରିତ ଖନନ କାର୍ଯ୍ୟକଳାପ ଉପରେ ଜାତୀୟ ହରିତ ଟ୍ରାଇବ୍ୟୁନାଲ ସ୍ଥଗିତ ଆଦେଶ ଜାରି କରିଛି।",
      date: "14 ଅଗଷ୍ଟ 2026",
      readTime: "2 ମିନିଟ",
      category: "ଖନନ",
      imageLabel: "NGT ଖନନ ରୋକ",
      imageCredit: "ସ୍ରେୟ: ଆବେଦନ ଅଭିଲେଖ",
      body: [
        "ମୟୂରଭଞ୍ଜର ସମ୍ବେଦନଶୀଳ ଗମନପଥରେ ଚାଲୁଥିବା ଖନନ କାର୍ଯ୍ୟକଳାପ ଉପରେ ଜାତୀୟ ହରିତ ଟ୍ରାଇବ୍ୟୁନାଲର ସ୍ଥଗିତ ଆଦେଶ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ବିରାମ ଆଣିଛି।",
        "ଅଭିଯାନକାରୀମାନଙ୍କ ପାଇଁ ତୁରନ୍ତ ମୂଲ୍ୟ ହେଉଛି ସମୟ। ଏହି ରୋକ ସମସ୍ୟାର ଶେଷ ସମାଧାନ ନୁହେଁ, କିନ୍ତୁ ଆହୁରି ତଦନ୍ତ, ପ୍ରମାଣ ସଂଗ୍ରହ ଓ ସାଧାରଣ ଜବାବଦେହିତା ପାଇଁ ସୁଯୋଗ ଦେଇଥାଏ।",
        "ପ୍ରାୟୋଗିକ ଭାବେ, ଏହି ଆଦେଶ ପ୍ରମାଣ କରେ ଯେ ପରିବେଶୀୟ ଗମନପଥକୁ ପ୍ରଶାସନିକ ଭାବେ ଅଦୃଶ୍ୟ ଭାବି ଚାଲିହେବ ନାହିଁ।",
      ],
    },
  ],
};

export function getNewsArticle(language: Language, slug: string) {
  return newsArticles[language].find((article) => article.slug === slug);
}
