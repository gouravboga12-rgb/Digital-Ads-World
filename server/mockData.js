// Mock Database fallback for Digital Ads World when Supabase is not connected.
const { v4: uuidv4 } = require('crypto').randomUUID ? require('crypto') : { randomUUID: () => Math.random().toString(36).substring(2, 15) };

let mockLeads = [
  {
    id: "lead-1",
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    service: "Google Ads Management",
    message: "Interested in running Google Search Ads for my dental clinic.",
    status: "new",
    created_at: new Date().toISOString()
  },
  {
    id: "lead-2",
    name: "Sarah Jenkins",
    email: "sarah@ecomstore.com",
    phone: "9123456789",
    service: "Performance Marketing",
    message: "Need to scale my Shopify store conversions.",
    status: "contacted",
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

let mockServices = [
  {
    id: "s1",
    title: "Google Ads Management",
    slug: "google-ads-management",
    description: "We create and optimize Google Ads campaigns to generate quality leads, increase website traffic, and maximize ROI.",
    benefits: ["Target Ready-to-Buy Leads", "Precision Keyword Targeting", "High Ad Placement Relevance", "Transparent ROI Tracking"],
    icon: "Search",
    order_index: 1
  },
  {
    id: "s2",
    title: "Meta Ads Management",
    slug: "meta-ads-management",
    description: "We run Facebook and Instagram advertising campaigns focused on lead generation, sales, and brand awareness.",
    benefits: ["Hyper-targeted Custom Audiences", "Engaging Video & Creative Formats", "Retargeting Funnel Implementation", "Cost-effective Brand Building"],
    icon: "Instagram",
    order_index: 2
  },
  {
    id: "s3",
    title: "Performance Marketing",
    slug: "performance-marketing",
    description: "Data-driven campaigns focused on measurable business growth, conversions, and profitability.",
    benefits: ["CPA & CAC Optimization", "Scale Sales Channels", "Advanced Multi-channel Funnels", "A/B Conversion Testing"],
    icon: "TrendingUp",
    order_index: 3
  },
  {
    id: "s4",
    title: "Influencer Marketing",
    slug: "influencer-marketing",
    description: "Strategic influencer collaborations that improve brand awareness and customer acquisition.",
    benefits: ["Build Instant Credibility", "Tap into Engaged Niches", "User-Generated Content Creation", "Brand Trust Amplification"],
    icon: "Users",
    order_index: 4
  },
  {
    id: "s5",
    title: "Search Engine Optimization (SEO)",
    slug: "seo",
    description: "On-page SEO, Off-page SEO, Technical SEO, Local SEO, and Keyword Optimization.",
    benefits: ["High Organic Rankings", "Sustainable Traffic Pipelines", "Authority & Backlink Profiles", "Local Map Pack Visibility"],
    icon: "Globe",
    order_index: 5
  },
  {
    id: "s6",
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    description: "Complete social media management, content creation, engagement, and growth strategies.",
    benefits: ["Consistent Brand Voice", "Stunning Feed Design", "Engaging Interactive Posts", "Active Community Management"],
    icon: "MessageSquare",
    order_index: 6
  },
  {
    id: "s7",
    title: "Website Development",
    slug: "website-development",
    description: "Responsive, SEO-friendly, high-converting websites and landing pages.",
    benefits: ["Sleek Premium Design Layouts", "Ultra-fast Page Loading Speed", "Conversion-focused Funnels", "Perfect Mobile Experience"],
    icon: "Code",
    order_index: 7
  },
  {
    id: "s8",
    title: "Graphic Designing",
    slug: "graphic-designing",
    description: "Professional creatives, social media posts, brochures, flyers, banners, and brand assets.",
    benefits: ["Luxurious Brand Aesthetics", "High-conversion Ad Creatives", "Consistent Brand Identity", "Print-ready Professional Graphics"],
    icon: "Palette",
    order_index: 8
  },
  {
    id: "s9",
    title: "Video Editing",
    slug: "video-editing",
    description: "Reels, ad videos, promotional videos, YouTube content, and professional editing services.",
    benefits: ["High-retention Hook Editing", "Premium Transitions & Color Grade", "Viral Content Formats", "Conversion Ads Video Snippets"],
    icon: "Video",
    order_index: 9
  },
  {
    id: "s10",
    title: "Branding & Creative Design",
    slug: "branding",
    description: "Logo creation, brand strategy, visual identity, and premium marketing materials.",
    benefits: ["Positioning & Brand Strategy", "Professional Logo Systems", "Brand Style Guidelines", "Trust & Credibility Elevation"],
    icon: "Award",
    order_index: 10
  },
  {
    id: "s11",
    title: "Analytics & Reporting",
    slug: "analytics-reporting",
    description: "Campaign tracking, conversion tracking, monthly reporting, and performance insights.",
    benefits: ["Custom Dashboard Integrations", "Advanced Conversion Attributions", "Actionable Optimization Insights", "Monthly Strategy Calls"],
    icon: "PieChart",
    order_index: 11
  }
];

let mockGallery = [
  {
    id: "g-1",
    title: "E-commerce Scale Campaign Results",
    category: "campaign",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    created_at: new Date().toISOString()
  },
  {
    id: "g-2",
    title: "Sleek Real Estate Branding Package",
    category: "branding",
    image_url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    created_at: new Date().toISOString()
  },
  {
    id: "g-3",
    title: "Premium SaaS Landing Page UI",
    category: "website",
    image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    created_at: new Date().toISOString()
  },
  {
    id: "g-4",
    title: "Instagram High-converting Ad Creatives",
    category: "creative",
    image_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
    created_at: new Date().toISOString()
  }
];

let mockTeam = [
  {
    id: "t-1",
    name: "K CHARAN",
    designation: "Founder & CEO",
    bio: "Visionary leader driving performance-focused growth and strategic scaling initiatives for international and local clients.",
    image_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    social_links: { linkedin: "https://linkedin.com", twitter: "https://twitter.com", facebook: "" },
    order_index: 1
  },
  {
    id: "t-2",
    name: "D SRI RAM",
    designation: "Digital Marketing Head",
    bio: "Data-driven marketing master specializing in Meta and Google Ads ROI optimization, funnel architecture, and analytics.",
    image_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    social_links: { linkedin: "https://linkedin.com", twitter: "", facebook: "" },
    order_index: 2
  }
];

let mockTestimonials = [
  {
    id: "test-1",
    name: "Dr. Aditya Reddy",
    designation: "Chief Orthodontist",
    company: "Reddy Dental Clinic",
    feedback: "Digital Ads World completely transformed our client acquisition. We went from 10 inquiries a month to over 150+ high-quality WhatsApp patient inquiries! Highly professional team.",
    rating: 5,
    image_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    order_index: 1
  },
  {
    id: "test-2",
    name: "Vikram Malhotra",
    designation: "Marketing Director",
    company: "Apex Properties",
    feedback: "Their Meta Ads performance is top-notch. They built an automation funnel that direct-routes leads to our sales reps. Our ROI has scaled by 4.5x in less than 3 months.",
    rating: 5,
    image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    order_index: 2
  }
];

let mockCaseStudies = [
  {
    id: "c-1",
    title: "Scaling an E-Commerce Fashion Brand to 6.2x ROAS",
    slug: "ecom-fashion-6x-roas",
    client: "Zara & Co E-comm",
    challenge: "High CAC (Cost Per Acquisition) and stagnant sales with Facebook standard campaigns.",
    solution: "We restructured the Facebook pixel events, set up high-retention lookalike audiences, and deployed interactive video ads focusing on immediate benefits.",
    results: [
      { label: "ROAS Boost", value: "6.2x" },
      { label: "CAC Reduction", value: "-45%" },
      { label: "Total Revenue Generated", value: "$180,000" }
    ],
    image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "c-2",
    title: "10x Lead Volume for Premium Real Estate Builder",
    slug: "real-estate-10x-leads",
    client: "Prestige Estates Agency",
    challenge: "Struggling to find verified, high-intent home buyers via standard interest targeting.",
    solution: "We initiated a Google Search Campaign combined with custom YouTube bumpers targeting intent-based search terms. Redirected leads into a conversational WhatsApp funnel.",
    results: [
      { label: "Lead Increase", value: "+950%" },
      { label: "Cost Per Lead", value: "-30%" },
      { label: "Qualified Meetings Booked", value: "85" }
    ],
    image_url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80"
  }
];

let mockSettings = {
  agency_info: {
    phone: "9381723378",
    whatsapp: "9381723378",
    email: "digitaladsworld.co@gmail.com",
    address: "Hyderabad, Telangana, India",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.757962453676!2d78.3840243!3d17.4357497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93f5b7468165%3A0xe543e06180360a0f!2sHitech%20City!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    social: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      facebook: "https://facebook.com"
    },
    seo: {
      title: "Digital Ads World | We Don't Run Ads, We Drive Results.",
      description: "Premium Performance Marketing Agency helping businesses scale with Google Ads, Meta Ads, SEO, Social Media Marketing, and high-converting Website Development.",
      keywords: ["Digital Marketing", "Google Ads", "Meta Ads", "Performance Marketing", "SEO Services", "Website Development", "Lead Generation"]
    }
  }
};

module.exports = {
  getLeads: () => mockLeads,
  addLead: (lead) => {
    const newLead = { id: uuidv4(), ...lead, status: 'new', created_at: new Date().toISOString() };
    mockLeads.unshift(newLead);
    return newLead;
  },
  updateLeadStatus: (id, status) => {
    const index = mockLeads.findIndex(l => l.id === id);
    if (index !== -1) {
      mockLeads[index].status = status;
      return mockLeads[index];
    }
    return null;
  },
  deleteLead: (id) => {
    const initialLength = mockLeads.length;
    mockLeads = mockLeads.filter(l => l.id !== id);
    return mockLeads.length < initialLength;
  },

  getServices: () => mockServices,
  addService: (service) => {
    const newService = { id: uuidv4(), ...service };
    mockServices.push(newService);
    return newService;
  },
  updateService: (id, service) => {
    const index = mockServices.findIndex(s => s.id === id);
    if (index !== -1) {
      mockServices[index] = { ...mockServices[index], ...service };
      return mockServices[index];
    }
    return null;
  },
  deleteService: (id) => {
    const initialLength = mockServices.length;
    mockServices = mockServices.filter(s => s.id !== id);
    return mockServices.length < initialLength;
  },

  getGallery: () => mockGallery,
  addGalleryItem: (item) => {
    const newItem = { id: uuidv4(), ...item, created_at: new Date().toISOString() };
    mockGallery.push(newItem);
    return newItem;
  },
  deleteGalleryItem: (id) => {
    const initialLength = mockGallery.length;
    mockGallery = mockGallery.filter(g => g.id !== id);
    return mockGallery.length < initialLength;
  },

  getTeam: () => mockTeam,
  addTeamMember: (member) => {
    const newMember = { id: uuidv4(), ...member };
    mockTeam.push(newMember);
    return newMember;
  },
  updateTeamMember: (id, member) => {
    const index = mockTeam.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTeam[index] = { ...mockTeam[index], ...member };
      return mockTeam[index];
    }
    return null;
  },
  deleteTeamMember: (id) => {
    const initialLength = mockTeam.length;
    mockTeam = mockTeam.filter(t => t.id !== id);
    return mockTeam.length < initialLength;
  },

  getTestimonials: () => mockTestimonials,
  addTestimonial: (testimonial) => {
    const newTestimonial = { id: uuidv4(), ...testimonial };
    mockTestimonials.push(newTestimonial);
    return newTestimonial;
  },
  updateTestimonial: (id, testimonial) => {
    const index = mockTestimonials.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTestimonials[index] = { ...mockTestimonials[index], ...testimonial };
      return mockTestimonials[index];
    }
    return null;
  },
  deleteTestimonial: (id) => {
    const initialLength = mockTestimonials.length;
    mockTestimonials = mockTestimonials.filter(t => t.id !== id);
    return mockTestimonials.length < initialLength;
  },

  getCaseStudies: () => mockCaseStudies,
  addCaseStudy: (study) => {
    const newStudy = { id: uuidv4(), ...study };
    mockCaseStudies.push(newStudy);
    return newStudy;
  },
  updateCaseStudy: (id, study) => {
    const index = mockCaseStudies.findIndex(c => c.id === id);
    if (index !== -1) {
      mockCaseStudies[index] = { ...mockCaseStudies[index], ...study };
      return mockCaseStudies[index];
    }
    return null;
  },
  deleteCaseStudy: (id) => {
    const initialLength = mockCaseStudies.length;
    mockCaseStudies = mockCaseStudies.filter(c => c.id !== id);
    return mockCaseStudies.length < initialLength;
  },

  getSettings: () => mockSettings,
  updateSettings: (value) => {
    mockSettings.agency_info = { ...mockSettings.agency_info, ...value };
    return mockSettings;
  }
};
