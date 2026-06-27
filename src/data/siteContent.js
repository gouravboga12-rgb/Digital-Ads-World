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
  address: "H.NO.11-13-524/2 Yadav Nagar Colony, Road No. 3, SRK Puram, Saroornagar, Hyderabad, Telangana 500035",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.2045610815124!2d78.55305821077755!3d17.363248100000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb995cbcc8a367%3A0x66e9239300fbdba!2sDigital%20Ads%20World%20%7C%20Best%20Digital%20Marketing%20Agency%20in%20Hyderabad!5e0!3m2!1sen!2sin!4v1719290000000!5m2!1sen!2sin",
  googleMapsBusinessUrl: "https://maps.app.goo.gl/ZGYTbNCpNj7KKLuq6",
  social: {
    linkedin: "https://linkedin.com",
    instagram: "https://www.instagram.com/digital_ads_world_?igsh=dWhseGhhbjJhejBo",
    facebook: "https://www.facebook.com/share/14UK3hdCaZY/"
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
    title: "Google Ads",
    slug: "google-ads",
    description: "Search, Display, Shopping & YouTube campaigns engineered for maximum ROI — every rupee tracked and optimised.",
    benefits: [
      "Target ready-to-buy high intent leads",
      "Precision search, display, and video ads",
      "Continuous bidding & conversion optimization",
      "Comprehensive weekly & monthly reporting"
    ],
    icon: "Google",
    order_index: 1
  },
  {
    id: "s2",
    title: "Meta Ads",
    slug: "meta-ads",
    description: "Facebook & Instagram campaigns with precision audience targeting, creative testing, and conversion-focused funnels.",
    benefits: [
      "Hyper-targeted custom & lookalike audiences",
      "High-converting video & carousel creatives",
      "Full-funnel remarketing strategies",
      "A/B split testing for scaling campaigns"
    ],
    icon: "Meta",
    order_index: 2
  },
  {
    id: "s3",
    title: "Lead Generation",
    slug: "lead-generation",
    description: "Multi-channel lead gen strategies — landing pages, forms, and retargeting funnels that fill your sales pipeline consistently.",
    benefits: [
      "Custom sales funnel construction",
      "Automated lead routing & SMS notifications",
      "High CTR landing page development",
      "A/B split testing of forms and offers"
    ],
    icon: "UserPlus",
    order_index: 3
  },
  {
    id: "s4",
    title: "Online Reputation Management",
    slug: "orm",
    description: "Monitor, manage and improve your brand perception across Google, social media, and review platforms proactively.",
    benefits: [
      "Review generation automation",
      "Negative feedback moderation protocols",
      "Search results cleanup & brand defense",
      "24/7 brand mention monitoring dashboards"
    ],
    icon: "Shield",
    order_index: 4
  },
  {
    id: "s5",
    title: "SEO",
    slug: "seo",
    description: "Dominate Google rankings with technical SEO, content strategy, and authority link-building that compounds over time.",
    benefits: [
      "Dominant organic search engine rankings",
      "Optimized Google Business Profile for local map pack",
      "Technical audits and speed optimizations",
      "High-authority backlink building strategies"
    ],
    icon: "Search",
    order_index: 5
  },
  {
    id: "s6",
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    description: "Platform-native content, community management, and paid social that builds brand equity and drives sales.",
    benefits: [
      "Aesthetic grid layouts and content calendars",
      "Viral reels planning and copy writing",
      "Proactive user engagement and DM management",
      "Follower growth and brand building strategies"
    ],
    icon: "Instagram",
    order_index: 6
  },
  {
    id: "s7",
    title: "PPC",
    slug: "ppc",
    description: "Google Ads & Meta campaigns optimised for maximum conversions at minimum cost — every rupee accountable.",
    benefits: [
      "Lowest cost per conversion optimization",
      "Advanced search and programmatic ad buying",
      "Daily budget checks & pacing audits",
      "Attribution mapping and tracking setup"
    ],
    icon: "Monitor",
    order_index: 7
  },
  {
    id: "s8",
    title: "Email & WhatsApp Marketing",
    slug: "email-whatsapp-marketing",
    description: "Automated drip campaigns, broadcast messaging, and personalised outreach that nurtures leads into loyal customers.",
    benefits: [
      "Automated sequences mapped to client actions",
      "High open-rate WhatsApp broadcasts",
      "Newsletter template design & copy writing",
      "Subscriber list segmentation and cleanup"
    ],
    icon: "Mail",
    order_index: 8
  },
  {
    id: "s9",
    title: "Website Design & Development",
    slug: "website-design-development",
    description: "High-converting, SEO-ready websites and landing pages engineered for speed, UX, and business outcomes.",
    benefits: [
      "Sleek and responsive custom designs",
      "Built for lightning-fast load times",
      "Integration with leads and CRM systems",
      "Highly secure, clean code with SEO standards"
    ],
    icon: "Code",
    order_index: 9
  },
  {
    id: "s10",
    title: "AI Tools",
    slug: "ai-tools",
    description: "AI-powered content generation, chatbots, ad creative automation, and predictive analytics to scale faster.",
    benefits: [
      "Custom conversational chatbots",
      "AI-driven visual ad creative testing",
      "Automated content drafting models",
      "Predictive audience scaling analytics"
    ],
    icon: "Sparkles",
    order_index: 10
  },
  {
    id: "s11",
    title: "Analytics & Reporting",
    slug: "analytics-reporting",
    description: "Real-time dashboards, monthly strategy reviews, and full attribution reporting — total clarity on every investment.",
    benefits: [
      "Interactive customized dashboards",
      "Pixel and server-side API configurations",
      "Deep-dive conversion analysis reviews",
      "Weekly actionable optimization goals"
    ],
    icon: "BarChart3",
    order_index: 11
  },
  {
    id: "s12",
    title: "Brand Building",
    slug: "brand-building",
    description: "From logo to full brand systems — we craft identities that communicate authority and convert first impressions.",
    benefits: [
      "Premium logo marks and visual systems",
      "Corporate presentation templates",
      "Brand voice and messaging guidelines",
      "Stationery layouts & custom typography selection"
    ],
    icon: "Award",
    order_index: 12
  }
];

export const team = [
  {
    id: "t-1",
    name: "K CHARAN",
    designation: "FOUNDER AND CEO",
    bio: "Visionary leader driving performance-focused growth and strategic scaling initiatives for international and local clients. Charan works directly with clients to map growth strategies.",
    image_url: charanImg,
    social_links: { linkedin: "https://linkedin.com", twitter: "https://twitter.com", facebook: "" },
    order_index: 1,
    objectPosition: "object-top"
  },
  {
    id: "t-2",
    name: "G SRI RAM",
    designation: "CO FOUNDER & DIGITAL MARKETING HEAD",
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
    name: "Arvind Kumar",
    designation: "CEO",
    company: "TechVenture India • Hyderabad",
    feedback: "Digital Ads World tripled our organic traffic in under 8 months. Their SEO team is incredibly thorough — from technical fixes to content that actually ranks. Best investment we've made in years.",
    rating: 5,
    date: "2 months ago",
    initials: "AK",
    bgColor: "bg-blue-600",
    order_index: 1
  },
  {
    id: "test-2",
    name: "Sunita Reddy",
    designation: "Founder",
    company: "Urban Spaces • Mumbai",
    feedback: "Our Google Ads ROI went from 1.2x to 4.5x within 3 months. Digital Ads World's PPC team understands our industry deeply and the monthly reporting is incredibly transparent.",
    rating: 5,
    date: "1 month ago",
    initials: "SR",
    bgColor: "bg-orange-500",
    order_index: 2
  },
  {
    id: "test-3",
    name: "Dr. Priya Rao",
    designation: "Director",
    company: "Wellness Clinics • Bangalore",
    feedback: "What sets Digital Ads World apart is their collaborative approach. They genuinely listen, build strategy around our goals, and the results speak for themselves — 891% more leads.",
    rating: 5,
    date: "3 weeks ago",
    initials: "PR",
    bgColor: "bg-yellow-600",
    order_index: 3
  },
  {
    id: "test-4",
    name: "Ravi Kumar",
    designation: "MD",
    company: "Greenfield Builders • Hyderabad",
    feedback: "We had tried 3 agencies before Digital Ads World. None delivered what they promised. Digital Ads World gave us page 1 rankings in just 4 months and our leads doubled. Highly recommend!",
    rating: 5,
    date: "5 weeks ago",
    initials: "RK",
    bgColor: "bg-teal-600",
    order_index: 4
  },
  {
    id: "test-5",
    name: "Sravanthi P.",
    designation: "Founder",
    company: "FitLife Studio • Hyderabad",
    feedback: "Exceptional team with great knowledge of digital marketing. They handled our social media and Google Ads and the response from customers improved drastically within weeks.",
    rating: 5,
    date: "6 weeks ago",
    initials: "SP",
    bgColor: "bg-purple-600",
    order_index: 5
  },
  {
    id: "test-6",
    name: "Mahesh V.",
    designation: "CEO",
    company: "MedTech Solutions • Hyderabad",
    feedback: "Digital Ads World managed our ₹50L+ annual ad budget with exceptional ROI. Their AI-powered optimization and transparent monthly reporting is unlike any agency we've worked with.",
    rating: 5,
    date: "2 months ago",
    initials: "MV",
    bgColor: "bg-indigo-600",
    order_index: 6
  }
];

export const caseStudies = [
  {
    id: "c-1",
    title: "9.5x Appointment Volume and Lead Flow for Corporate Hospitals",
    slug: "corporate-hospitals-9x-appointments",
    client: "Medicover & Yashoda Hospitals",
    challenge: "High patient acquisition cost and low inquiry conversion rates for premium elective specialties.",
    solution: "Implemented multi-channel Meta & Google Search funnels synced to automated CRM pipelines, targeting local patient cohorts.",
    results: [
      { label: "Bookings Boost", value: "9.5x" },
      { label: "Cost per Lead", value: "-40%" },
      { label: "Revenue Pipeline", value: "₹2.4 Cr+" }
    ],
    image_url: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "c-2",
    title: "Scaling Solar Inquiries to 5.8x ROI via Intent-Based Campaigns",
    slug: "solar-solar-inquiries-5x-roi",
    client: "Freyr Energy",
    challenge: "Low-intent leads and high cost-per-lead for residential and commercial solar installations.",
    solution: "Launched targeted Google search campaigns and interactive YouTube ad funnels highlighting government solar subsidies and net-metering benefits.",
    results: [
      { label: "Marketing ROI", value: "5.8x" },
      { label: "High-Intent Leads", value: "+340%" },
      { label: "Sales Pipeline", value: "₹1.8 Cr+" }
    ],
    image_url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "c-3",
    title: "92% Increase in Student Registrations for Vocational Programs",
    slug: "vocational-student-registrations-92-percent",
    client: "Apollo MedSkills",
    challenge: "Stagnant organic traffic and drop-offs in digital application forms for training programs.",
    solution: "Rebuilt mobile-friendly landing pages, technical SEO audit, and high-performance search campaigns routing leads directly to local branch counselors.",
    results: [
      { label: "Registrations", value: "+92%" },
      { label: "Cost per Acquisition", value: "-35%" },
      { label: "Google Rankings", value: "Page 1" }
    ],
    image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
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
