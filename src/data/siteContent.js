import socialMediaImg from '../assets/social_media_marketing.png';
import graphicDesignImg from '../assets/graphic_designing.png';
import charanImg from '../assets/charan.png';
import sriramImg from '../assets/sriram.png';
import galleryG1 from '../assets/gallery_g1.png';
import galleryG2 from '../assets/gallery_g2.png';
import galleryG3 from '../assets/gallery_g3.png';
import galleryG4 from '../assets/gallery_g4.png';
import galleryG5 from '../assets/gallery_g5.png';
import galleryG6 from '../assets/gallery_g6.png';

// Initial / Mock Site Content for Digital Ads World
export const agencyInfo = {
  name: "Digital Ads World",
  tagline: "We Don't Run Ads, We Drive Results.",
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
};

export const services = [
  {
    id: "s1",
    title: "Google Ads Management",
    slug: "google-ads-management",
    description: "We create and optimize Google Ads campaigns to generate quality leads, increase website traffic, and maximize ROI.",
    image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    benefits: [
      "Target ready-to-buy high intent leads",
      "Precision search, display, and video ads",
      "Continuous bidding & conversion optimization",
      "Comprehensive weekly & monthly reporting"
    ],
    icon: "Search",
    order_index: 1
  },
  {
    id: "s2",
    title: "Meta Ads Management",
    slug: "meta-ads-management",
    description: "We run Facebook and Instagram advertising campaigns focused on lead generation, sales, and brand awareness.",
    image_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
    benefits: [
      "Hyper-targeted custom & lookalike audiences",
      "High-converting video & carousel creatives",
      "Full-funnel remarketing strategies",
      "A/B split testing for scaling campaigns"
    ],
    icon: "Instagram",
    order_index: 2
  },
  {
    id: "s3",
    title: "Performance Marketing",
    slug: "performance-marketing",
    description: "Data-driven campaigns focused on measurable business growth, conversions, and profitability.",
    image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    benefits: [
      "CAC (Customer Acquisition Cost) optimization",
      "Conversion Rate Optimization (CRO) audits",
      "Cross-channel advertising funnels",
      "Direct ROI and revenue attribution tracking"
    ],
    icon: "TrendingUp",
    order_index: 3
  },
  {
    id: "s4",
    title: "Influencer Marketing",
    slug: "influencer-marketing",
    description: "Strategic influencer collaborations that improve brand awareness and customer acquisition.",
    image_url: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=600&q=80",
    benefits: [
      "Authentic connections with vetted creators",
      "Campaign strategy and negotiation",
      "Multi-platform influencer campaigns",
      "High engagement rates and organic reach"
    ],
    icon: "Users",
    order_index: 4
  },
  {
    id: "s5",
    title: "Search Engine Optimization (SEO)",
    slug: "seo",
    description: "On-page SEO, Off-page SEO, Technical SEO, Local SEO, and Keyword Optimization.",
    image_url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
    benefits: [
      "Dominant organic search engine rankings",
      "Optimized Google Business Profile for local map pack",
      "Technical audits and speed optimizations",
      "High-authority backlink building strategies"
    ],
    icon: "Globe",
    order_index: 5
  },
  {
    id: "s6",
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    description: "Complete social media management, content creation, engagement, and growth strategies.",
    image_url: socialMediaImg,
    benefits: [
      "Aesthetic grid layouts and content calendars",
      "Viral reels planning and copy writing",
      "Proactive user engagement and DM management",
      "Follower growth and brand building strategies"
    ],
    icon: "MessageSquare",
    order_index: 6
  },
  {
    id: "s7",
    title: "Website Development",
    slug: "website-development",
    description: "Responsive, SEO-friendly, high-converting websites and landing pages.",
    image_url: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80",
    benefits: [
      "Sleek and responsive custom designs",
      "Built for lightning-fast load times",
      "Integration with leads and CRM systems",
      "Highly secure, clean code with SEO standards"
    ],
    icon: "Code",
    order_index: 7
  },
  {
    id: "s8",
    title: "Graphic Designing",
    slug: "graphic-designing",
    description: "Professional creatives, social media posts, brochures, flyers, banners, and brand assets.",
    image_url: graphicDesignImg,
    benefits: [
      "Visually stunning corporate assets",
      "High CTR social media & ad banners",
      "Unified brand guidelines & styles",
      "Ready-to-print flyers, brochures & card styles"
    ],
    icon: "Palette",
    order_index: 8
  },
  {
    id: "s9",
    title: "Video Editing",
    slug: "video-editing",
    description: "Reels, ad videos, promotional videos, YouTube content, and professional editing services.",
    image_url: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=600&q=80",
    benefits: [
      "High-retention hooks and text captions",
      "Vibrant color grading & sound design",
      "Optimized format for Shorts, Reels & TikToks",
      "Commercial product ads and corporate editing"
    ],
    icon: "Video",
    order_index: 9
  },
  {
    id: "s10",
    title: "Branding & Creative Design",
    slug: "branding",
    description: "Logo creation, brand strategy, visual identity, and premium marketing materials.",
    image_url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
    benefits: [
      "Premium logo marks and visual systems",
      "Corporate presentation templates",
      "Brand voice and messaging guidelines",
      "Stationery layouts & custom typography selection"
    ],
    icon: "Award",
    order_index: 10
  },
  {
    id: "s11",
    title: "Analytics & Reporting",
    slug: "analytics-reporting",
    description: "Campaign tracking, conversion tracking, monthly reporting, and performance insights.",
    image_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
    benefits: [
      "Interactive customized dashboards",
      "Pixel and server-side API configurations",
      "Deep-dive conversion analysis reviews",
      "Weekly actionable optimization goals"
    ],
    icon: "PieChart",
    order_index: 11
  }
];

export const team = [
  {
    id: "t-1",
    name: "K CHARAN",
    designation: "FOUNDER AND CEO OF DIGITAL ADS WORLD",
    bio: "Visionary leader driving performance-focused growth and strategic scaling initiatives for international and local clients. Charan works directly with clients to map growth strategies.",
    image_url: charanImg,
    social_links: { linkedin: "https://linkedin.com", twitter: "https://twitter.com", facebook: "" },
    order_index: 1,
    objectPosition: "object-top"
  },
  {
    id: "t-2",
    name: "GUDALA SRI RAM",
    designation: "DIGITAL MARKETING HEAD",
    bio: "Data-driven marketing master specializing in Meta and Google Ads ROI optimization, funnel architecture, and analytics. Sri Ram oversees campaign delivery and execution.",
    image_url: sriramImg,
    social_links: { linkedin: "https://linkedin.com", twitter: "", facebook: "" },
    order_index: 2,
    objectPosition: "object-center"
  }
];

export const testimonials = [
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
  },
  {
    id: "test-3",
    name: "Neha Sharma",
    designation: "Founder",
    company: "E-Glow Cosmetics",
    feedback: "We scaled our e-commerce store sales by 300% in our first campaign with them. They helped us identify our key buyer persona and focused purely on ROAS optimization.",
    rating: 5,
    image_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    order_index: 3
  }
];

export const caseStudies = [
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

export const gallery = [
  {
    id: "g-1",
    title: "E-commerce Scale Campaign Results",
    category: "campaign",
    image_url: galleryG1,
    created_at: new Date().toISOString()
  },
  {
    id: "g-2",
    title: "Sleek Real Estate Branding Package",
    category: "branding",
    image_url: galleryG2,
    created_at: new Date().toISOString()
  },
  {
    id: "g-3",
    title: "Premium SaaS Landing Page UI",
    category: "website",
    image_url: galleryG3,
    created_at: new Date().toISOString()
  },
  {
    id: "g-4",
    title: "Instagram High-converting Ad Creatives",
    category: "creative",
    image_url: galleryG4,
    created_at: new Date().toISOString()
  },
  {
    id: "g-5",
    title: "YouTube Video Banner Design",
    category: "video",
    image_url: galleryG5,
    created_at: new Date().toISOString()
  },
  {
    id: "g-6",
    title: "Corporate Identity Stationery",
    category: "branding",
    image_url: galleryG6,
    created_at: new Date().toISOString()
  }
];

export const faqs = [
  {
    question: "What is your main advertising strategy?",
    answer: "We focus on Performance Marketing. This means every rupee or dollar you spend is tracked against direct leads, sales, or inquiries. We optimize your campaigns (Google Ads, Meta Ads) daily to ensure maximum ROAS and lowest possible CAC."
  },
  {
    question: "Do you guarantee results?",
    answer: "We guarantee performance transparency and optimized media buying. While final business sales depend on multiple variables (product market fit, sales team close rate), our marketing pipelines are built to deliver qualified leads and target-ready audiences."
  },
  {
    question: "How long does SEO take to show results?",
    answer: "Typically, search engine optimization projects start showing visible authority improvements and ranking shifts in 3 to 6 months. It represents a sustainable, long-term, compounding investment for organic lead acquisition."
  },
  {
    question: "How do you coordinate reports and tracking?",
    answer: "We configure server-side conversion tracking (Meta Conversions API, Google Ads Enhanced Conversions) and compile interactive real-time dashboards so you can view daily performance metrics. We also schedule bi-weekly strategy updates."
  },
  {
    question: "Which industries do you specialize in?",
    answer: "We have successful campaign models across Real Estate, E-commerce, Medical/Dental Clinics, Local Businesses, Startups, SMEs, and Corporate Organizations."
  }
];
