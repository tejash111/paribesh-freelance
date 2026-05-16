import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI =
  process.env.MONGODB_URI ||
  process.env.MONGO_URI ||
  "mongodb+srv://tejashsinghrajput_db_user:33ZVT4Ti5dCKXH9R@cluster0.z2pxjus.mongodb.net/paribesh-prahari";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  body: { type: String, required: true },
  type: { type: String, enum: ['EDITORIAL', 'NEWS'], required: true },
  language: { type: String, enum: ['EN', 'OR'], required: true },
  status: { type: String, enum: ['DRAFT', 'PUBLISHED'], default: 'DRAFT' },
  publishedAt: { type: Date, default: Date.now },
  coverImage: { type: String },
  author: { type: String },
  sourceName: { type: String },
  sourceUrl: { type: String },
  tags: [{ type: String }]
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

const SiteContentSchema = new mongoose.Schema(
  {
    page: { type: String, required: true },
    section: { type: String, required: true },
    language: { type: String, enum: ["EN", "OR"], required: true },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);
const SiteContent = mongoose.models.SiteContent || mongoose.model("SiteContent", SiteContentSchema);

const posts = [
  // EDITORIALS (10)
  {
    title: "The Silent Crisis: Soil Degradation in Coastal Odisha",
    slug: "soil-degradation-coastal-odisha",
    body: "Extensive agricultural practices and climate change are accelerating soil degradation along the coast. We must adopt sustainable farming before the land becomes barren. Our research over the past year has shown a 20% decrease in soil nutrient density, directly impacting local farmers and long-term food security in the region. Immediate policy intervention is required to subsidize organic fertilizers and promote crop rotation.",
    type: "EDITORIAL",
    language: "EN",
    status: "PUBLISHED",
    author: "Dr. Ananya Dash",
    tags: ["Conservation", "Agriculture"],
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
  },
  {
    title: "Why Elephant Corridors Need Urgent Legal Protection",
    slug: "elephant-corridors-urgent-legal-protection",
    body: "Human-elephant conflicts are rising. Securing dedicated corridors is the only viable long-term solution to protect both communities and the majestic Asian elephants. Fragmented habitats force herds into agricultural lands, resulting in tragic consequences for both sides. The state must prioritize land acquisition and community compensation to establish unbroken migration routes across central and northern districts.",
    type: "EDITORIAL",
    language: "EN",
    status: "PUBLISHED",
    author: "Priya Das",
    tags: ["Wildlife", "Policy"],
    coverImage: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800&q=80"
  },
  {
    title: "Mangrove Restoration: Our First Line of Defense",
    slug: "mangrove-restoration-defense",
    body: "Cyclones are becoming more intense. Restoring the mangrove forests in Bhitarkanika and surrounding areas isn't just an environmental goal; it's a critical infrastructure project for disaster management. Mangroves absorb storm surges, prevent coastal erosion, and act as vital nurseries for marine life. We must transition from short-term relief funding to long-term ecological restoration investments.",
    type: "EDITORIAL",
    language: "EN",
    status: "PUBLISHED",
    author: "Rakesh Mohanty",
    tags: ["Climate Action", "Marine Life"],
    coverImage: "https://images.unsplash.com/photo-1542385151-efd9000785a0?w=800&q=80"
  },
  {
    title: "The Truth About Illegal Sand Mining",
    slug: "truth-about-illegal-sand-mining",
    body: "Unregulated sand extraction is destroying river ecosystems. It alters riverbeds, exacerbates flooding, and depletes groundwater reserves. Local activists have been sounding the alarm, but enforcement remains weak due to political apathy and lack of resources. It is time for a transparent, tech-driven monitoring system using satellite imagery to track and halt illegal operations.",
    type: "EDITORIAL",
    language: "EN",
    status: "PUBLISHED",
    author: "Subrat Sahoo",
    tags: ["Investigation", "Rivers"],
    coverImage: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80"
  },
  {
    title: "Empowering Indigenous Communities in Forest Governance",
    slug: "empowering-indigenous-communities",
    body: "Conservation models that exclude indigenous populations are destined to fail. By implementing the Forest Rights Act in its true spirit, we can empower the best stewards of our forests. Traditional ecological knowledge combined with modern conservation techniques presents the most effective strategy for preserving biodiversity hotspots across the Eastern Ghats.",
    type: "EDITORIAL",
    language: "EN",
    status: "PUBLISHED",
    author: "Dr. Ananya Dash",
    tags: ["Community Rights", "Forests"],
    coverImage: "https://images.unsplash.com/photo-1542317826-681bcfc23942?w=800&q=80"
  },
  {
    title: "Renewable Energy Transition: Are We Moving Fast Enough?",
    slug: "renewable-energy-transition-speed",
    body: "Despite ambitious targets, the shift to solar and wind energy remains sluggish. We analyze the bureaucratic hurdles and infrastructure bottlenecks slowing down the green energy revolution in the state. Phasing out coal dependency requires not just building new solar parks, but fundamentally upgrading the grid to handle decentralized power generation.",
    type: "EDITORIAL",
    language: "EN",
    status: "PUBLISHED",
    author: "Rakesh Mohanty",
    tags: ["Energy", "Policy"],
    coverImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80"
  },
  {
    title: "Protecting the Olive Ridley Turtles: A Success Story?",
    slug: "protecting-olive-ridley-turtles",
    body: "Mass nesting sites at Gahirmatha and Rushikulya are global treasures. While protection efforts have improved, climate-induced coastal erosion and offshore fishing trawlers still pose massive threats to hatchling survival rates. We look at what the next decade of marine conservation must entail to keep the turtles returning.",
    type: "EDITORIAL",
    language: "EN",
    status: "PUBLISHED",
    author: "Priya Das",
    tags: ["Wildlife", "Marine Life"],
    coverImage: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&q=80"
  },
  {
    title: "Urban Air Quality: A Growing Public Health Emergency",
    slug: "urban-air-quality-emergency",
    body: "Industrial emissions and vehicular pollution are choking our cities. The air quality index routinely crosses hazardous levels during winter months. We need strict enforcement of emission norms and a massive expansion of public transportation networks. Clean air is a fundamental human right, not a luxury.",
    type: "EDITORIAL",
    language: "EN",
    status: "PUBLISHED",
    author: "Subrat Sahoo",
    tags: ["Pollution", "Public Health"],
    coverImage: "https://images.unsplash.com/photo-1532205562181-420fbfa06fdb?w=800&q=80"
  },
  {
    title: "The Disappearing Wetlands and Bird Migration",
    slug: "disappearing-wetlands-bird-migration",
    body: "Chilika Lake and surrounding wetlands are crucial wintering grounds for millions of migratory birds. However, encroachment and agricultural runoff are threatening these habitats. Conservationists are pushing for stricter zoning laws to prevent commercial aquaculture from entirely consuming the delicate ecosystem.",
    type: "EDITORIAL",
    language: "EN",
    status: "PUBLISHED",
    author: "Dr. Ananya Dash",
    tags: ["Wildlife", "Conservation"],
    coverImage: "https://images.unsplash.com/photo-1469558315147-1563f4b4ce34?w=800&q=80"
  },
  {
    title: "Sustainable Eco-Tourism: Balancing Revenue and Nature",
    slug: "sustainable-eco-tourism",
    body: "Opening up pristine forests to tourism generates revenue, but often at a steep ecological cost. How can we ensure that eco-tourism benefits local communities without disrupting wildlife corridors? We argue for strict capping of tourist numbers and enforcing zero-waste policies in all protected areas.",
    type: "EDITORIAL",
    language: "EN",
    status: "PUBLISHED",
    author: "Priya Das",
    tags: ["Forests", "Economy"],
    coverImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80"
  },

  // NEWS (10)
  {
    title: "State Government Announces New Wildlife Sanctuary in Koraput",
    slug: "new-wildlife-sanctuary-koraput",
    body: "In a major victory for conservationists, the government has officially designated a 500 sq km area in Koraput as a protected wildlife sanctuary, aiming to preserve the region's unique flora and fauna.",
    type: "NEWS",
    language: "EN",
    status: "PUBLISHED",
    sourceName: "The Hindu",
    sourceUrl: "https://thehindu.com",
    tags: ["Policy", "Wildlife"],
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
  },
  {
    title: "Record Number of Tiger Cubs Spotted in Similipal",
    slug: "record-tiger-cubs-similipal",
    body: "Forest officials reported a significant increase in the tiger population, with camera traps capturing over 12 new cubs this season, indicating the success of recent anti-poaching measures.",
    type: "NEWS",
    language: "EN",
    status: "PUBLISHED",
    sourceName: "Times of India",
    sourceUrl: "https://timesofindia.com",
    tags: ["Wildlife", "Conservation"],
    coverImage: "https://images.unsplash.com/photo-1474511320723-9a536ad7bc10?w=800&q=80"
  },
  {
    title: "Local Communities Protest Proposed Bauxite Mine",
    slug: "protest-proposed-bauxite-mine",
    body: "Thousands of indigenous residents gathered to protest a newly proposed bauxite mining project that threatens to displace villages and destroy crucial water catchments.",
    type: "NEWS",
    language: "EN",
    status: "PUBLISHED",
    sourceName: "Down To Earth",
    sourceUrl: "https://downtoearth.org.in",
    tags: ["Community Rights", "Mining"],
    coverImage: "https://images.unsplash.com/photo-1541829070764-84a7d30dee62?w=800&q=80"
  },
  {
    title: "Major River Cleanup Initiative Launched Across 5 Districts",
    slug: "river-cleanup-initiative-launched",
    body: "A coalition of NGOs and local municipalities launched a massive campaign to remove plastic waste from the Mahanadi river basin, aiming to clear 50 tons of debris in the next month.",
    type: "NEWS",
    language: "EN",
    status: "PUBLISHED",
    sourceName: "Hindustan Times",
    sourceUrl: "https://hindustantimes.com",
    tags: ["Rivers", "Pollution"],
    coverImage: "https://images.unsplash.com/photo-1495480137269-ff29bd0a695c?w=800&q=80"
  },
  {
    title: "Rare Orchids Discovered in Eastern Ghats",
    slug: "rare-orchids-discovered",
    body: "Botanists conducting a biodiversity survey stumbled upon three species of orchids previously thought to be extinct in the region, highlighting the area's rich ecological value.",
    type: "NEWS",
    language: "EN",
    status: "PUBLISHED",
    sourceName: "The Wire Science",
    sourceUrl: "https://science.thewire.in",
    tags: ["Flora", "Discovery"],
    coverImage: "https://images.unsplash.com/photo-1566903451935-7e890e059b04?w=800&q=80"
  },
  {
    title: "Illegal Timber Smuggling Ring Busted",
    slug: "illegal-timber-smuggling-busted",
    body: "A joint operation by the forest department and state police led to the arrest of 15 individuals involved in a large-scale illegal timber logging operation targeting old-growth teak.",
    type: "NEWS",
    language: "EN",
    status: "PUBLISHED",
    sourceName: "Indian Express",
    sourceUrl: "https://indianexpress.com",
    tags: ["Forests", "Crime"],
    coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
  },
  {
    title: "Solar Power Subsidy Increased for Rural Farmers",
    slug: "solar-power-subsidy-increased",
    body: "To reduce reliance on diesel generators, the state government has increased subsidies for solar-powered irrigation pumps by 30%, encouraging a shift to clean energy in agriculture.",
    type: "NEWS",
    language: "EN",
    status: "PUBLISHED",
    sourceName: "Economic Times",
    sourceUrl: "https://economictimes.com",
    tags: ["Energy", "Agriculture"],
    coverImage: "https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?w=800&q=80"
  },
  {
    title: "Dolphin Sighting Numbers Improve in Chilika",
    slug: "dolphin-sightings-improve-chilika",
    body: "The annual census of Irrawaddy dolphins in Chilika Lake shows a promising 15% increase in population compared to last year, attributed to stricter regulations on motorized tourist boats.",
    type: "NEWS",
    language: "EN",
    status: "PUBLISHED",
    sourceName: "The Hindu",
    sourceUrl: "https://thehindu.com",
    tags: ["Wildlife", "Marine Life"],
    coverImage: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?w=800&q=80"
  },
  {
    title: "High Court Orders Halt to Coastal Resort Construction",
    slug: "high-court-halts-coastal-resort",
    body: "Following a PIL by environmental activists, the High Court has stayed the construction of a luxury resort complex citing violations of the Coastal Regulation Zone (CRZ) norms.",
    type: "NEWS",
    language: "EN",
    status: "PUBLISHED",
    sourceName: "LiveLaw",
    sourceUrl: "https://livelaw.in",
    tags: ["Policy", "Coastal"],
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
  },
  {
    title: "Youth Climate Summit Held in Bhubaneswar",
    slug: "youth-climate-summit",
    body: "Over 500 student delegates from across the state gathered to discuss local climate action strategies, presenting a manifesto to the Chief Minister demanding greener urban planning.",
    type: "NEWS",
    language: "EN",
    status: "PUBLISHED",
    sourceName: "Times of India",
    sourceUrl: "https://timesofindia.com",
    tags: ["Climate Action", "Youth"],
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80"
  },
  {
    title: "New Climate-Resilient Paddy Varieties Introduced for Western Odisha",
    slug: "climate-resilient-paddy-western-odisha",
    body: "Agricultural scientists have successfully trialed three new paddy varieties that can withstand both extreme heat and erratic rainfall, offering hope to thousands of farmers in the drought-prone western districts.",
    type: "NEWS",
    language: "EN",
    status: "PUBLISHED",
    sourceName: "Sambad English",
    sourceUrl: "https://sambadenglish.com",
    tags: ["Agriculture", "Climate Action"],
    coverImage: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?w=800&q=80"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to DB.");

    // Delete existing posts to avoid duplicates in this run if needed, 
    // but since slugs are unique we will use findOneAndUpdate
    for (const post of posts) {
      await Post.findOneAndUpdate({ slug: post.slug }, post, { upsert: true });
    }
    console.log("Inserted 20 Posts (10 Editorial, 10 News) with images.");

    // Update Home Page Site Content to use these slugs
    const homeHeroSlugs = "elephant-corridors-urgent-legal-protection, record-tiger-cubs-similipal, disappearing-wetlands-bird-migration";
    
    await SiteContent.findOneAndUpdate(
      { page: "home", section: "hero", language: "EN" },
      { content: { slugs: homeHeroSlugs } }
    );
    
    const homeCopyRes = await SiteContent.findOne({ page: "home", section: "copy", language: "EN" });
    if (homeCopyRes) {
      homeCopyRes.content.featuredUpdateSlug = "soil-degradation-coastal-odisha";
      await SiteContent.findOneAndUpdate(
        { page: "home", section: "copy", language: "EN" },
        { content: homeCopyRes.content }
      );
    }

    // Update Editorial Page Site Content
    const editorialCopyRes = await SiteContent.findOne({ page: "editorial", section: "copy", language: "EN" });
    if (editorialCopyRes) {
      editorialCopyRes.content.featuredPostSlug = "empowering-indigenous-communities";
      editorialCopyRes.content.dontMissSlugs = "sustainable-eco-tourism, truth-about-illegal-sand-mining, mangrove-restoration-defense";
      await SiteContent.findOneAndUpdate(
        { page: "editorial", section: "copy", language: "EN" },
        { content: editorialCopyRes.content }
      );
    }

    // Update About Page Site Content
    const aboutContentEn = {
      label: "Organization",
      title: "About Us",
      intro: "Our story, mission, and the dedicated team of guardians standing behind Paribesh Prahari.",
      storyTitle: "Our Story",
      storyParagraphs: [
        "Paribesh Prahari was founded in 2026 out of a profound need to protect the rich biodiversity of Odisha, particularly around the Similipal Biosphere Reserve.",
        "What started as a small cohort of concerned citizens and field researchers has quickly grown into a dedicated environmental action group.",
        "We exist to bridge the gap through field action, robust empirical research, and community-led conservation efforts."
      ],
      photoLabel: "Founder / Team Photo",
      photoUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      missionLabel: "Core Objective",
      missionTitle: "Mission",
      missionBody: "To vigorously protect Odisha's ecosystems through scientifically backed advocacy, environmental literacy, and direct intervention.",
      visionLabel: "Future Outlook",
      visionTitle: "Vision",
      visionBody: "A future where humans and nature coexist in harmony. We envision an Odisha where forests thrive and rivers run clean.",
      whatWeDoTitle: "What We Do",
      workItems: [
        { title: "Field Work", body: "Conducting plantation drives and intensive biodiversity surveys." },
        { title: "Awareness", body: "Running school programs and organizing community talks." },
        { title: "Advocacy", body: "Filing NGT petitions and engaging in deep environmental reporting." }
      ]
    };

    const aboutContentOr = {
      label: "ସଂଗଠନ",
      title: "ଆମ ବିଷୟରେ",
      intro: "ପରିବେଶ ପ୍ରହରୀର କାହାଣୀ, ମିଶନ ଓ ପଛରେ ଥିବା ସମର୍ପିତ ସୁରକ୍ଷାକର୍ମୀ ଦଳ ସମ୍ପର୍କରେ ଜାଣନ୍ତୁ।",
      storyTitle: "ଆମ କାହାଣୀ",
      storyParagraphs: [
        "2026 ମସିହାରେ ଓଡ଼ିଶାର ସମୃଦ୍ଧ ଜୀବ ବିବିଧତାକୁ ସୁରକ୍ଷା କରିବାର ଆବଶ୍ୟକତାରୁ ପରିବେଶ ପ୍ରହରୀର ଜନ୍ମ ହୋଇଥିଲା।",
        "କିଛି ଚିନ୍ତିତ ନାଗରିକଙ୍କ ଛୋଟ ଦଳରୁ ଆରମ୍ଭ ହୋଇଥିବା ଏହି ପ୍ରୟାସ ଏକ ସମର୍ପିତ ଆନ୍ଦୋଳନରେ ପରିଣତ ହୋଇଛି।",
        "ଆମେ ଗବେଷଣା ଓ ସମୁଦାୟ ନେତୃତ୍ୱାଧୀନ ସଂରକ୍ଷଣ ମାଧ୍ୟମରେ କାମ କରୁଛୁ।"
      ],
      photoLabel: "ସ୍ଥାପକ / ଦଳୀୟ ଛବି",
      photoUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      missionLabel: "ମୂଳ ଉଦ୍ଦେଶ୍ୟ",
      missionTitle: "ମିଶନ",
      missionBody: "ଓଡ଼ିଶାର ପରିସ୍ଥିତିତନ୍ତ୍ରକୁ ସୁରକ୍ଷା କରିବା ଓ ସ୍ଥାନୀୟ ସମୁଦାୟମାନଙ୍କୁ ସକ୍ଷମ କରିବା ଆମ ଲକ୍ଷ୍ୟ।",
      visionLabel: "ଭବିଷ୍ୟତ ଦୃଷ୍ଟି",
      visionTitle: "ଭିଜନ",
      visionBody: "ମନୁଷ୍ୟ ଓ ପ୍ରକୃତି ଏକତାରେ ଅବସ୍ଥାନ କରୁଥିବା ଏକ ଭବିଷ୍ୟତ।",
      whatWeDoTitle: "ଆମେ କ'ଣ କରୁ",
      workItems: [
        { title: "କ୍ଷେତ୍ର କାର୍ଯ୍ୟ", body: "ଗଛରୋପଣ ଅଭିଯାନ ଓ ଜୀବ ବିବିଧତା ସର୍ଭେ କରିବା।" },
        { title: "ଜାଗରୁକତା", body: "ବିଦ୍ୟାଳୟ କାର୍ଯ୍ୟକ୍ରମ ଓ ସାମାଜିକ ଅଭିଯାନ ଚାଲାଇବା।" },
        { title: "ପକ୍ଷସମର୍ଥନ", body: "NGT ମାମଲା ଓ ଗଭୀର ପରିବେଶ ରିପୋର୍ଟିଂରେ ଅଂଶଗ୍ରହଣ।" }
      ]
    };

    await SiteContent.findOneAndUpdate({ page: "about", section: "copy", language: "EN" }, { content: aboutContentEn }, { upsert: true });
    await SiteContent.findOneAndUpdate({ page: "about", section: "copy", language: "OR" }, { content: aboutContentOr }, { upsert: true });

    console.log("Updated SiteContent configurations with new slugs and About page content.");
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
