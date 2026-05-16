import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb+srv://tejashsinghrajput_db_user:33ZVT4Ti5dCKXH9R@cluster0.z2pxjus.mongodb.net/paribesh-prahari";

const SiteContentSchema = new mongoose.Schema(
  {
    page: { type: String, required: true },
    section: { type: String, required: true },
    language: { type: String, enum: ["EN", "OR"], required: true },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

SiteContentSchema.index({ page: 1, section: 1, language: 1 }, { unique: true });

const SiteContent = mongoose.models.SiteContent || mongoose.model("SiteContent", SiteContentSchema);

const seedData = [
  // HOME PAGE - EN
  {
    page: "home",
    section: "hero",
    language: "EN",
    content: {
      stories: [
        {
          category: "Analysis",
          title: "Guardians of our environment take bold new steps in Similipal",
          description: "Paribesh Prahari is an environmental action group fighting for biodiversity, clean water, and forest rights. We turn field research into tangible policy changes.",
          locationDate: "Baripada | May 15",
          imageLabel: "Similipal Field Briefing",
          imageClasses: "bg-[radial-gradient(circle_at_top_left,_rgba(72,187,120,0.38),_transparent_42%),linear-gradient(135deg,#dfeee4_0%,#9cc6a6_45%,#3c5d47_100%)]",
        },
        {
          category: "Field Report",
          title: "River watch teams map pollution hotspots across northern Odisha",
          description: "Volunteer monitors are tracking discharge patterns, logging contaminated stretches, and pushing district officials to publish corrective action timelines.",
          locationDate: "Jashipur | May 14",
          imageLabel: "Mahanadi Monitoring Patrol",
          imageClasses: "bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.3),_transparent_36%),linear-gradient(135deg,#d6edf4_0%,#87b8c7_48%,#285567_100%)]",
        },
        {
          category: "Ground Report",
          title: "Forest rights assemblies gather pace before the monsoon season",
          description: "Community leaders are documenting customary boundaries and preparing fresh submissions to protect access, livelihoods, and habitat stewardship.",
          locationDate: "Karanjia | May 12",
          imageLabel: "Community Rights Assembly",
          imageClasses: "bg-[radial-gradient(circle_at_bottom_left,_rgba(255,222,173,0.28),_transparent_40%),linear-gradient(135deg,#efe3cf_0%,#b4865b_50%,#5f3d2d_100%)]",
        }
      ]
    }
  },
  {
    page: "home",
    section: "copy",
    language: "EN",
    content: {
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
      missionBody: "We combine field reporting, research, and community engagement to document environmental harm and amplify local voices. Our work turns on-the-ground evidence into public awareness, policy pressure, and long-term ecological action.",
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
    }
  },
  // HOME PAGE - OR
  {
    page: "home",
    section: "hero",
    language: "OR",
    content: {
      stories: [
        {
          category: "ବିଶ୍ଳେଷଣ",
          title: "ସିମିଲିପାଳରେ ପରିବେଶ ସୁରକ୍ଷା ପାଇଁ ନୂଆ ସାହସିକ ପଦକ୍ଷେପ",
          description: "ପରିବେଶ ପ୍ରହରୀ ହେଉଛି ଜୀବ ବିବିଧତା, ସୁଚିତ୍ର ଜଳ ଓ ଜଙ୍ଗଲ ଅଧିକାର ପାଇଁ କାମ କରୁଥିବା ଏକ ପରିବେଶ ଅଭିଯାନ ଗୋଷ୍ଠୀ। ଆମେ ମାଟିସ୍ତରର ଅଧ୍ୟୟନକୁ ନୀତି ପରିବର୍ତ୍ତନରେ ପରିଣତ କରୁଛୁ।",
          locationDate: "ବାରିପଦା | 15 ମଇ",
          imageLabel: "ସିମିଲିପାଳ କ୍ଷେତ୍ର ଅବଲୋକନ",
          imageClasses: "bg-[radial-gradient(circle_at_top_left,_rgba(72,187,120,0.38),_transparent_42%),linear-gradient(135deg,#dfeee4_0%,#9cc6a6_45%,#3c5d47_100%)]",
        },
        {
          category: "କ୍ଷେତ୍ର ରିପୋର୍ଟ",
          title: "ଉତ୍ତର ଓଡ଼ିଶାରେ ନଦୀ ନିରୀକ୍ଷଣ ଦଳ ପ୍ରଦୂଷଣ ସ୍ଥଳ ଚିହ୍ନଟ କରୁଛନ୍ତି",
          description: "ସ୍ୱଇଚ୍ଛାସେବୀ ନିରୀକ୍ଷକମାନେ ଦୂଷିତ ପ୍ରବାହର ଧାରା ପର୍ଯ୍ୟବେକ୍ଷଣ କରୁଛନ୍ତି, ପ୍ରଭାବିତ ଅଞ୍ଚଳ ଲେଖାବଦ୍ଧ କରୁଛନ୍ତି ଏବଂ ଜିଲ୍ଲା ପ୍ରଶାସନକୁ ସୁଧାରାତ୍ମକ କାର୍ଯ୍ୟସୂଚୀ ପ୍ରକାଶ ପାଇଁ ଚାପ ଦେଉଛନ୍ତି।",
          locationDate: "ଜଶିପୁର | 14 ମଇ",
          imageLabel: "ମହାନଦୀ ନିରୀକ୍ଷଣ ଅଭିଯାନ",
          imageClasses: "bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.3),_transparent_36%),linear-gradient(135deg,#d6edf4_0%,#87b8c7_48%,#285567_100%)]",
        },
        {
          category: "ମାଟିସ୍ତର ରିପୋର୍ଟ",
          title: "ବର୍ଷା ଋତୁ ପୂର୍ବରୁ ଜଙ୍ଗଲ ଅଧିକାର ସଭାଗୁଡ଼ିକ ଗତି ପାଉଛି",
          description: "ସମୁଦାୟ ନେତାମାନେ ପାରମ୍ପରିକ ସୀମା ଲେଖାବଦ୍ଧ କରୁଛନ୍ତି ଏବଂ ପ୍ରବେଶାଧିକାର, ଜୀବିକା ଓ ଆବାସ ସୁରକ୍ଷା ପାଇଁ ନୂତନ ଦାଖଲ ପ୍ରସ୍ତୁତ କରୁଛନ୍ତି।",
          locationDate: "କରଞ୍ଜିଆ | 12 ମଇ",
          imageLabel: "ସମୁଦାୟ ଅଧିକାର ସଭା",
          imageClasses: "bg-[radial-gradient(circle_at_bottom_left,_rgba(255,222,173,0.28),_transparent_40%),linear-gradient(135deg,#efe3cf_0%,#b4865b_50%,#5f3d2d_100%)]",
        }
      ]
    }
  },
  {
    page: "home",
    section: "copy",
    language: "OR",
    content: {
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
      missionBody: "ଆମେ ପରିବେଶୀୟ କ୍ଷତି ଲେଖାବଦ୍ଧ କରିବା ଓ ସ୍ଥାନୀୟ ସ୍ୱରକୁ ଆଗକୁ ଆଣିବା ପାଇଁ କ୍ଷେତ୍ର ରିପୋର୍ଟିଂ, ଗବେଷଣା ଓ ସମୁଦାୟ ସଂଯୋଗକୁ ଏକତ୍ର କରୁଛୁ। ଆମ କାମ ମାଟିସ୍ତରର ପ୍ରମାଣକୁ ଜନଚେତନା, ନୀତିଗତ ଚାପ ଓ ଦୀର୍ଘକାଳୀନ ପରିବେଶୀୟ କାର୍ଯ୍ୟରେ ପରିଣତ କରେ।",
      latestEditorial: "ସର୍ବଶେଷ ସମ୍ପାଦକୀୟ",
      inTheNews: "ସମ୍ବାଦରେ",
      exploreAll: "ସବୁ ଦେଖନ୍ତୁ ❯",
      editorialCardLabel: "ସମ୍ପାଦକୀୟ",
      newsCardLabel: "ସମ୍ବାଦ",
      editorialStories: [
        "ଉତ୍ତର ଓଡ଼ିଶାରେ ସମୁଦାୟ ଜଙ୍ଗଲ ପରିଷଦଗୁଡ଼ିକ ନୂଆ ସଂରକ୍ଷଣ ମଡେଲ ତିଆରି କରୁଛନ୍ତି",
        "ଆସନ୍ତା ବର୍ଷା ପୂର୍ବରୁ ଜଳାଶୟ ପୁନରୁଦ୍ଧାର ପାଇଁ କାହିଁକି ଆଇନଗତ ସମର୍ଥନ ଜରୁରୀ",
        "ଜିଲ୍ଲା ଉନ୍ନୟନ ଯୋଜନାରେ ଶକ୍ତିଶାଳୀ ଜୀବ ବିବିଧତା ମାପନର ପକ୍ଷରେ ଯୁକ୍ତି",
        "ମାଟିସ୍ତରର ଜଳବାୟୁ ରିପୋର୍ଟିଂ କିପରି ଜବାବଦେହିତାକୁ ନୂଆ ଆକାର ଦେଉଛି",
      ],
      newsStories: [
        "ସମ୍ବେଦନଶୀଳ ନଦୀତଟରେ ଅବୈଧ ବାଲୁକା ଖନନ ଉପରେ ଜିଲ୍ଲା ଦଳ ନୂଆ ସର୍ଭେ ଆରମ୍ଭ କରିଛି",
        "ପାନୀୟ ଜଳ ସ୍ରୋତରେ ନୂଆ ପ୍ରଦୂଷଣ ସତର୍କତା ପରେ ନିବାସୀମାନେ ଶୀଘ୍ର କାର୍ଯ୍ୟାନୁଷ୍ଠାନ ଦାବି କରୁଛନ୍ତି",
        "ହାତୀ ଗମନପଥ ନିକଟରେ ବନ୍ୟପ୍ରାଣୀ ଅଧିକାରୀମାନେ ଗସ୍ତ କଭରେଜ ବଢ଼ାଇଛନ୍ତି",
        "ସମୁଦାୟ ସଂଗଠନମାନଙ୍କ ସହଯୋଗରେ ସ୍ଥାନୀୟ ବିଦ୍ୟାଳୟଗୁଡ଼ିକ ଯୁବ ଜୀବ ବିବିଧତା କ୍ଲବ ଆରମ୍ଭ କରିଛନ୍ତି",
      ],
      previousStory: "ପୂର୍ବ ହିରୋ ଖବର ଦେଖାନ୍ତୁ",
      nextStory: "ପରବର୍ତ୍ତୀ ହିରୋ ଖବର ଦେଖାନ୍ତୁ",
    }
  },
  // EDITORIAL PAGE - EN
  {
    page: "editorial",
    section: "copy",
    language: "EN",
    content: {
      title: "Editorial",
      intro: "Original writing, in-depth reports, and field insights from our team",
      featuredLabel: "Featured",
      featuredTitle: "Odisha Welcomes Returning Tigress to Similipal Reserve",
      featuredSummary: "An in-depth look at the recent success of the rewilding program, documenting the extraordinary journey of the tigress and what it implies for long-term conservation targets.",
      featuredImage: "Featured Cover Image",
      dontMiss: "Don't Miss",
      sidebarTag: "Conservation",
      sidebarTitle: "Understanding the Eco-Sensitive Zones of Mayurbhanj buffer spaces",
      moreStories: "More Stories",
      mostRecent: "Most Recent",
      oldest: "Oldest",
      cardLabel: "Analysis",
      cardTitle: "Understanding the Eco-Sensitive Zones of Mayurbhanj",
      cardSummary: "Examining the intersection of tribal rights and ecological boundaries proposed in the latest draft notification regarding the national park periphery.",
      previous: "❮ Previous",
      next: "Next ❯",
    }
  },
  // EDITORIAL PAGE - OR
  {
    page: "editorial",
    section: "copy",
    language: "OR",
    content: {
      title: "ସମ୍ପାଦକୀୟ",
      intro: "ଆମ ଦଳର ମୂଳ ଲେଖା, ଗଭୀର ରିପୋର୍ଟ ଓ କ୍ଷେତ୍ର ଅନୁଭବ",
      featuredLabel: "ବିଶେଷ",
      featuredTitle: "ସିମିଲିପାଳ ରିଜର୍ଭକୁ ଫେରିଥିବା ବାଘିଣୀକୁ ଓଡ଼ିଶାର ସ୍ୱାଗତ",
      featuredSummary: "ପୁନର୍ବନ୍ୟୀକରଣ କାର୍ଯ୍ୟକ୍ରମର ସମ୍ପ୍ରତି ସଫଳତା ଉପରେ ଏକ ଗଭୀର ଅଧ୍ୟୟନ, ଯେଉଁଥିରେ ବାଘିଣୀର ଅସାଧାରଣ ଯାତ୍ରା ଓ ଦୀର୍ଘକାଳୀନ ସଂରକ୍ଷଣ ଲକ୍ଷ୍ୟ ପାଇଁ ତାହାର ଅର୍ଥ ବିବେଚନା କରାଯାଇଛି।",
      featuredImage: "ବିଶେଷ କଭର ଛବି",
      dontMiss: "ମିସ୍ କରନ୍ତୁ ନାହିଁ",
      sidebarTag: "ସଂରକ୍ଷଣ",
      sidebarTitle: "ମୟୂରଭଞ୍ଜ ବଫର ଅଞ୍ଚଳର ପରିବେଶ ସମ୍ବେଦନଶୀଳ କ୍ଷେତ୍ରଗୁଡ଼ିକୁ ବୁଝିବା",
      moreStories: "ଆହୁରି କାହାଣୀ",
      mostRecent: "ନୂତନତମ",
      oldest: "ସବୁଠୁ ପୁରୁଣା",
      cardLabel: "ବିଶ୍ଳେଷଣ",
      cardTitle: "ମୟୂରଭଞ୍ଜର ପରିବେଶ ସମ୍ବେଦନଶୀଳ କ୍ଷେତ୍ରଗୁଡ଼ିକୁ ବୁଝିବା",
      cardSummary: "ଜାତୀୟ ଉଦ୍ୟାନ ପାର୍ଶ୍ୱଭାଗ ସମ୍ବନ୍ଧୀୟ ସବୁଠାରୁ ନୂଆ ଖସଡ଼ା ବିଜ୍ଞପ୍ତିରେ ପ୍ରସ୍ତାବିତ ଆଦିବାସୀ ଅଧିକାର ଓ ପରିବେଶୀୟ ସୀମାର ସଙ୍ଗମକୁ ପରୀକ୍ଷା କରିବା।",
      previous: "❮ ପୂର୍ବ",
      next: "ପରବର୍ତ୍ତୀ ❯",
    }
  },
  // NEWS PAGE - EN
  {
    page: "news",
    section: "copy",
    language: "EN",
    content: {
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
    }
  },
  // NEWS PAGE - OR
  {
    page: "news",
    section: "copy",
    language: "OR",
    content: {
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
    }
  },
  // CONTACT PAGE - EN
  {
    page: "contact",
    section: "copy",
    language: "EN",
    content: {
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
    }
  },
  {
    page: "contact",
    section: "info",
    language: "EN",
    content: {
      headquartersAddress: "Baripada, Mayurbhanj<br />Odisha, India",
      editorsEmail: "contact@paribeshprahari.com",
      inquiryPhone: "+91 XXXXX XXXXX",
      socialLinks: [
        { label: "Twitter", url: "#" },
        { label: "LinkedIn", url: "#" },
        { label: "Instagram", url: "#" }
      ],
      mapUrl: "https://www.google.com/maps?q=Baripada,Mayurbhanj,Odisha,India&z=13&output=embed"
    }
  },
  // CONTACT PAGE - OR
  {
    page: "contact",
    section: "copy",
    language: "OR",
    content: {
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
    }
  },
  {
    page: "contact",
    section: "info",
    language: "OR",
    content: {
      headquartersAddress: "ବାରିପଦା, ମୟୂରଭଞ୍ଜ<br />ଓଡ଼ିଶା, ଭାରତ",
      editorsEmail: "contact@paribeshprahari.com",
      inquiryPhone: "+91 XXXXX XXXXX",
      socialLinks: [
        { label: "Twitter", url: "#" },
        { label: "LinkedIn", url: "#" },
        { label: "Instagram", url: "#" }
      ],
      mapUrl: "https://www.google.com/maps?q=Baripada,Mayurbhanj,Odisha,India&z=13&output=embed"
    }
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB.");

    for (const item of seedData) {
      await SiteContent.findOneAndUpdate(
        { page: item.page, section: item.section, language: item.language },
        item,
        { upsert: true, new: true }
      );
    }
    
    console.log("Seed successful.");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
