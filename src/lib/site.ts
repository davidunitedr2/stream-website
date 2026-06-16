// Central content/config for the Stream site. Copy-as-code (no CMS), per the build brief.
// Phone format convention: (XXX) XXX-XXXX.

export const site = {
  name: "Stream",
  legalName: "Stream Remarketing Services",
  tagline: "Inlane. Online. Everywhere.",
  subtitle: "Your Complete Nationwide Remarketing Solution",
  founded: 2008,
  url: "https://thestream.com",
  description:
    "Stream Remarketing Services lists vehicles in-lane and online at top auctions nationwide, bringing the best sellers together with the best buyers anywhere, any time.",

  address: {
    line1: "311 Moore Lane",
    city: "Collierville",
    state: "TN",
    zip: "38017",
  },
  hours: "Monday – Friday, 8:15am – 5:00pm",

  phones: {
    main: "(901) 302-4800",
    tollFree: "(800) 238-5889",
    fax: "(901) 302-4767",
  },

  emails: {
    general: "streamteam@thestream.com", // general inquiries & auction bids
    notify: "notify@thestream.com", // assignments, pickup notices
    invoices: "ap-ar@thestream.com", // AP/AR
    arbitration: "arbitrations@thestream.com", // arbitration inquiries
    floorplans: "floorplans@memphisautoauction.com", // floor plans (sister entity)
  },

  external: {
    titleServices: "http://www.streamtitleservices.com",
    careers:
      "https://secure7.saashr.com/ta/6206255.careers?CareersSearch=&lang=en-US",
    runListEmbed:
      "https://stream-runlist-cqh0c9afhpf7aecp.centralus-01.azurewebsites.net/",
  },
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Run List", href: "/run-list" },
  { label: "Title Services", href: "/title-services" },
  { label: "Meet the Team", href: "/team" },
  { label: "Careers", href: site.external.careers, external: true },
] as const;

// Where Stream vehicles sell — the network. Logos live in /public/logos.
export const platforms = [
  { name: "SmartAuction", logo: "/logos/smartauction.png", href: "https://www.smartauction.com" },
  { name: "Manheim", logo: "/logos/manheim.png", href: "https://www.manheim.com" },
  { name: "OVE", logo: "/logos/ove.gif", href: "https://www.ove.com" },
  { name: "Carmigo", logo: "/logos/carmigo.png", href: "https://carmigo.io" },
] as const;

// Channels Stream sells across, per the May 2026 deck.
export const onlineChannels = ["SmartAuction", "OVE", "Carmigo"] as const;
export const physicalChannels = [
  "Manheim",
  "America's Auto Auction",
  "ServNet",
  "Independent auctions",
] as const;

// Why Stream is unique — six benefit pillars (verbatim from the deck).
export const pillars = [
  { h: "Decreased days to sell", p: "End-to-end control from the repo yard to liquidation means vehicles move faster, cutting your cost of money." },
  { h: "Every sales channel", p: "Sell across in-lane and online channels at once, not just one auction or one platform." },
  { h: "A wider buyer audience", p: "More eyeballs on every vehicle. More eyeballs means faster sales at stronger numbers." },
  { h: "One inlane and online brand", p: "Your vehicles run under Stream's established SRS Nationwide brand, recognized by buyers everywhere." },
  { h: "Fewer claims", p: "One accountable partner across repo, auction, and transport, so claims between vendors disappear." },
  { h: "Lower transport costs", p: "Selling upstream from the repo lot decreases, or eliminates, transportation costs and time." },
] as const;

// SIMN — Stream Inventory Management Network (pronounced "Simon").
export const simnFeatures = [
  "Real-time inventory status and updates",
  "Two-way notes between your team and ours",
  "Vehicle condition and reconditioning approvals",
  "Live sale phase: pre-auction, hold, ready, scheduled, on-sale, sold",
  "Title status tracking on every unit",
  "Monthly reporting and full attachment history",
] as const;

// The Stream process, condensed for the public site.
export const processSteps = [
  { n: "01", h: "Notified", p: "The moment a vehicle is repossessed, it enters SIMN with full condition and location data." },
  { n: "02", h: "Analyzed", p: "Streamalytics weighs location, market data, and history to pick the best avenue to sell, per vehicle." },
  { n: "03", h: "Prepared", p: "Detailed inspection, reconditioning, transport, and title work, handled and tracked in-house." },
  { n: "04", h: "Sold", p: "Listed in-lane or online across the full network, then funds and title move to close it out." },
] as const;

export interface Person {
  name: string;
  title: string;
}

// Titles per the live Meet the Team page — flagged for David's review (MISSING.md §2).
export const team: Person[] = [
  { name: "Kevin Wilson", title: "Chief Operating Officer" },
  { name: "Mike Wilson", title: "Stream Director" },
  { name: "Marianne Simshauser", title: "Stream Title Services Director" },
  { name: "Brad Huddleston", title: "Chief Financial Officer" },
  { name: "Paul Rettenmaier", title: "Chief Relationship Officer" },
  { name: "Ashley Grant", title: "Senior Auction Operations" },
  { name: "Christie Hammond", title: "Senior Auction Support" },
  { name: "Roshawnda Allen", title: "Stream Title Services Manager" },
  { name: "Michael McCollum", title: "Remarketing Manager" },
  { name: "Mike Bruce", title: "Remarketing Manager" },
  { name: "Luke Jackemeyer", title: "Senior Auction Operations" },
];

// Stream Title Services (separate entity, streamtitleservices.com).
export const titleServices = {
  pitch: "Stream Title Services streamlines your title process so you can focus on what you do best.",
  blurb: "A concierge title service, custom-tailored to your titling needs and handled by a team that has spent years in the title processes of every state.",
  services: [
    "Repo affidavits",
    "Title flips in any state",
    "Duplicate titles",
    "State-specific title requirements",
  ],
  how: [
    { h: "You submit", p: "Send vehicle information in a single file." },
    { h: "SIMN generates", p: "Our system produces every document the state requires." },
    { h: "We file", p: "Title paperwork is submitted on your behalf." },
    { h: "You receive", p: "The completed title is returned to you, fast." },
  ],
} as const;

export const causes = [
  {
    name: "Memphis Athletic Ministries",
    abbr: "MAM",
    body: "Year-round, Christ-centered mentoring programs with well-trained staff for youth, ages 8 to 18, at eight centers in disadvantaged neighborhoods. Stream supports their Christmas Shop and mentoring programs, and our Auto Be Grillin' BBQ team supplied meals to MAM's mobile food pantry during COVID-19.",
  },
  {
    name: "National Kidney Foundation",
    abbr: "NKF",
    body: "The leading organization in the U.S. dedicated to the awareness, prevention and treatment of kidney disease. Stream has partnered with NKF since the early 2000s, selling donated vehicles and organizing fundraising events.",
  },
  {
    name: "Operation BBQ Relief",
    abbr: "OBR",
    body: "Our Auto Be Grillin' team deploys smokers to help feed hundreds of disaster victims, including relief efforts after tornadoes in Moore, Oklahoma, Tupelo, Mississippi, and Tuscaloosa, Alabama.",
  },
] as const;
