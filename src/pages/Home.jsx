import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, MessageCircle, ShieldCheck, Zap, 
  TrendingUp, BarChart3, ChevronDown, CheckCircle, 
  Star, Award, Target, Trophy, Clock, Phone, Mail,
  MapPin, Instagram, Facebook, ChevronUp, Maximize2,
  Shield, UserPlus, Code, Sparkles, GraduationCap,
  Laptop, Home as HomeIcon, DollarSign, Sun,
  ShoppingCart, Factory, ShoppingBag, Heart,
  Video, Users, CheckCircle2
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { 
  agencyInfo, services, testimonials, 
  caseStudies, faqs, gallery, team 
} from '../data/siteContent';
import Lightbox from '../components/Lightbox';
import profitableConversionsImg from '../assets/profitable_conversions.png';
import marketingTeamImg from '../assets/marketing_team.png';

// Import new brand logos
import brand25 from '../assets/brand_25.png';
import brand26 from '../assets/brand_26.png';
import brand27 from '../assets/brand_27.png';
import brand28 from '../assets/brand_28.png';
import brand29 from '../assets/brand_29.png';
import brand30 from '../assets/brand_30.png';
import brand31 from '../assets/brand_31.png';
import brand32 from '../assets/brand_32.png';
import brand33 from '../assets/brand_33.png';
import brand34 from '../assets/brand_34.png';
import brand35 from '../assets/brand_35.png';
import brand36 from '../assets/brand_36.png';
import brand37 from '../assets/brand_37.png';

// Brand logos for Trusted section
const brandLogos = [
  { name: "Brand 25", logo: brand25 },
  { name: "Brand 26", logo: brand26 },
  { name: "Brand 27", logo: brand27 },
  { name: "Brand 28", logo: brand28 },
  { name: "Brand 29", logo: brand29 },
  { name: "Brand 30", logo: brand30 },
  { name: "Brand 31", logo: brand31 },
  { name: "Brand 32", logo: brand32 },
  { name: "Brand 33", logo: brand33 },
  { name: "Brand 34", logo: brand34 },
  { name: "Brand 35", logo: brand35 },
  { name: "Brand 36", logo: brand36 },
  { name: "Brand 37", logo: brand37 },
];

// Interactive Process flows
const processTabs = {
  b2c: {
    label: "B2C — Consumer",
    columns: [
      { title: "CHANNELS", items: ["Meta Ads", "Google Ads", "YouTube", "Instagram", "Website SEO", "WhatsApp Broadcast"] },
      { title: "CAPTURE", items: ["Landing Page", "Lead Form", "WhatsApp Opt-in", "Chat Widget", "Click-to-Call"] },
      { title: "CRM", items: ["Auto-Synced to CRM", "Lead Scored", "Segment Tagged"] },
      { title: "NURTURE", items: ["WhatsApp Sequence", "Email Drip", "Retargeting Ads", "Offer SMS", "Video Follow-up"] },
      { title: "CLOSE", items: ["Consultation Call", "Site Visit / Demo", "DEAL WON 🎉", "— Upsell & Referral"] }
    ]
  },
  b2b: {
    label: "B2B — Business",
    columns: [
      { title: "CHANNELS", items: ["LinkedIn Ads", "Google Search", "SEO / Blog", "Email Outreach", "YouTube", "Referral Network"] },
      { title: "CAPTURE", items: ["Contact / RFQ Form", "Free Audit Offer", "Whitepaper Download", "Webinar Sign-up", "Direct Inquiry"] },
      { title: "CRM", items: ["Auto-Synced to CRM", "MQL → SQL", "Account Research"] },
      { title: "NURTURE", items: ["Email Sequence", "Case Study Share", "Discovery Call", "Proposal Draft", "LinkedIn Follow-up"] },
      { title: "CLOSE", items: ["Strategy Presentation", "Proposal Review", "Contract Signed", "DEAL WON 🎉"] }
    ]
  },
  d2c: {
    label: "D2C — Direct to Consumer",
    columns: [
      { title: "CHANNELS", items: ["Instagram Ads", "Meta / Reels", "Google Shopping", "YouTube Shorts", "Influencer Collab", "WhatsApp Catalog"] },
      { title: "CAPTURE", items: ["Product Landing Page", "Add to Cart / COD", "WhatsApp Shop", "Abandoned Cart Trigger", "Offer Pop-up"] },
      { title: "CRM / DATA", items: ["Auto-Synced to CRM", "Pixel Tracking", "Cohort Segmented"] },
      { title: "NURTURE", items: ["Cart Recovery SMS", "WhatsApp Offers", "Dynamic Retargeting", "UGC + Reviews", "Loyalty Points"] },
      { title: "CLOSE & RETAIN", items: ["First Purchase", "DEAL WON 🎉", "Repeat Purchase", "— Referral Program"] }
    ]
  }
};

// Industries We Serve
const industries = [
  { title: "Healthcare", desc: "Hospitals • Clinics • Pharma", icon: "Activity", color: "bg-red-50 text-red-500 border-red-100" },
  { title: "Education & EdTech", desc: "Schools • Universities • LMS", icon: "GraduationCap", color: "bg-blue-50 text-blue-500 border-blue-100" },
  { title: "IT & ITES", desc: "Software • SaaS • Services", icon: "Laptop", color: "bg-indigo-50 text-indigo-500 border-indigo-100" },
  { title: "Real Estate", desc: "Builders • Developers • Plots", icon: "HomeIcon", color: "bg-amber-50 text-amber-500 border-amber-100" },
  { title: "Fintech & Banking", desc: "Insurance • Trading • NBFC", icon: "DollarSign", color: "bg-green-50 text-green-500 border-green-100" },
  { title: "Solar Energy", desc: "Panels • Installation • EPC", icon: "Sun", color: "bg-yellow-50 text-yellow-600 border-yellow-100" },
  { title: "E-Commerce & D2C", desc: "Marketplace • Retail • Shopify", icon: "ShoppingCart", color: "bg-cyan-50 text-cyan-500 border-cyan-100" },
  { title: "Manufacturing", desc: "Industrial • B2B • Export", icon: "Factory", color: "bg-slate-50 text-slate-600 border-slate-200" },
  { title: "Fashion & Beauty", desc: "Brands • Salons • D2C", icon: "ShoppingBag", color: "bg-pink-50 text-pink-500 border-pink-100" },
  { title: "NGOs & Social Impact", desc: "Donations • Awareness", icon: "Heart", color: "bg-rose-50 text-rose-500 border-rose-100" },
  { title: "Entertainment", desc: "Media • Events • OTT", icon: "Video", color: "bg-purple-50 text-purple-500 border-purple-100" },
  { title: "Human Resources", desc: "Recruitment • Staffing • HR Tech", icon: "Users", color: "bg-teal-50 text-teal-500 border-teal-100" }
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', service: 'General Growth Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeProcessTab, setActiveProcessTab] = useState('b2c');
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [expandedServiceId, setExpandedServiceId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedServiceId(prev => prev === id ? null : id);
  };

  const renderOfficialIcon = (iconName, className = "w-5 h-5") => {
    if (iconName === 'Google') {
      return (
        <svg viewBox="0 0 24 24" className={`${className} shrink-0`}>
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
        </svg>
      );
    }
    if (iconName === 'Meta') {
      return (
        <svg viewBox="0 0 16 16" className={`${className} fill-blue-600 shrink-0`}>
          <path fillRule="evenodd" d="M8.217 5.243C9.145 3.988 10.171 3 11.483 3 13.96 3 16 6.153 16.001 9.907c0 2.29-.986 3.725-2.757 3.725-1.543 0-2.395-.866-3.924-3.424l-.667-1.123-.118-.197a55 55 0 0 0-.53-.877l-1.178 2.08c-1.673 2.925-2.615 3.541-3.923 3.541C1.086 13.632 0 12.217 0 9.973 0 6.388 1.995 3 4.598 3q.477-.001.924.122c.31.086.611.22.913.407.577.359 1.154.915 1.782 1.714m1.516 2.224q-.378-.615-.727-1.133L9 6.326c.845-1.305 1.543-1.954 2.372-1.954 1.723 0 3.102 2.537 3.102 5.653 0 1.188-.39 1.877-1.195 1.877-.773 0-1.142-.51-2.61-2.87zM4.846 4.756c.725.1 1.385.634 2.34 2.001A212 212 0 0 0 5.551 9.3c-1.357 2.126-1.826 2.603-2.581 2.603-.777 0-1.24-.682-1.24-1.9 0-2.602 1.298-5.264 2.846-5.264q.137 0 .27.018"/>
        </svg>
      );
    }
    if (iconName === 'Mail') return <Mail className={`${className} text-orange-500 shrink-0`} />;
    if (iconName === 'UserPlus') return <UserPlus className={`${className} text-green-600 shrink-0`} />;
    if (iconName === 'Shield') return <Shield className={`${className} text-red-500 shrink-0`} />;
    if (iconName === 'Search') return <LucideIcons.Search className={`${className} text-blue-500 shrink-0`} />;
    if (iconName === 'Instagram') return <Instagram className={`${className} text-pink-600 shrink-0`} />;
    if (iconName === 'Monitor') return <Laptop className={`${className} text-indigo-500 shrink-0`} />;
    if (iconName === 'Code') return <Code className={`${className} text-cyan-500 shrink-0`} />;
    if (iconName === 'Sparkles') return <Sparkles className={`${className} text-purple-500 shrink-0`} />;
    if (iconName === 'BarChart3') return <BarChart3 className={`${className} text-teal-500 shrink-0`} />;
    if (iconName === 'Award') return <Award className={`${className} text-amber-500 shrink-0`} />;
    
    const IconComp = LucideIcons[iconName] || LucideIcons.HelpCircle;
    return <IconComp className={className} />;
  };

  const renderIndustryIcon = (iconName, className = "w-5 h-5") => {
    if (iconName === 'HomeIcon') return <HomeIcon className={className} />;
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? <IconComponent className={className} /> : <LucideIcons.HelpCircle className={className} />;
  };

  const filteredGalleryItems = activeGalleryFilter === 'all' ? gallery : gallery.filter(item => item.category === activeGalleryFilter);

  const handlePrevGalleryItem = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredGalleryItems.length - 1 : prev - 1));
  };

  const handleNextGalleryItem = () => {
    setLightboxIndex((prev) => (prev === filteredGalleryItems.length - 1 ? 0 : prev + 1));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="relative w-full overflow-hidden bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center bg-slate-50 py-16 md:py-24 border-b border-slate-100 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left" data-aos="fade-right">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 w-fit">
                <span className="w-2 h-2 rounded-full bg-primary-blue animate-ping"></span>
                <span className="text-xs font-black tracking-wider uppercase text-primary-blue">
                  Leading Performance Marketing Agency
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-premium-black font-heading">
                Scale Your Business With <span className="text-primary-blue">Performance-Driven</span> Digital Marketing
              </h1>
              
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                Google Ads, Meta Ads, SEO, Social Media Marketing, Branding & Website Development Solutions designed to generate verified leads and drive explosive revenue growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a
                  href="#contact-section"
                  className="bg-primary-blue hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-blue-500/20 hover:-translate-y-0.5 text-base"
                >
                  <span>Get Free Consultation</span>
                  <ArrowRight size={18} />
                </a>
                <Link
                  to="/services"
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 text-base shadow-sm hover:shadow"
                >
                  <span>View All Services</span>
                </Link>
              </div>

              {/* Partner Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-slate-200 mt-6">
                <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span className="text-xs font-bold text-slate-600">Google Partner</span>
                  <CheckCircle size={12} className="text-green-500 fill-green-500 stroke-white" />
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 text-[#0668E1] shrink-0">
                    <path fillRule="evenodd" d="M8.217 5.243C9.145 3.988 10.171 3 11.483 3 13.96 3 16 6.153 16.001 9.907c0 2.29-.986 3.725-2.757 3.725-1.543 0-2.395-.866-3.924-3.424l-.667-1.123-.118-.197a55 55 0 0 0-.53-.877l-1.178 2.08c-1.673 2.925-2.615 3.541-3.923 3.541C1.086 13.632 0 12.217 0 9.973 0 6.388 1.995 3 4.598 3q.477-.001.924.122c.31.086.611.22.913.407.577.359 1.154.915 1.782 1.714m1.516 2.224q-.378-.615-.727-1.133L9 6.326c.845-1.305 1.543-1.954 2.372-1.954 1.723 0 3.102 2.537 3.102 5.653 0 1.188-.39 1.877-1.195 1.877-.773 0-1.142-.51-2.61-2.87zM4.846 4.756c.725.1 1.385.634 2.34 2.001A212 212 0 0 0 5.551 9.3c-1.357 2.126-1.826 2.603-2.581 2.603-.777 0-1.24-.682-1.24-1.9 0-2.602 1.298-5.264 2.846-5.264q.137 0 .27.018"/>
                  </svg>
                  <span className="text-xs font-bold text-slate-600">Meta Partner</span>
                  <CheckCircle size={12} className="text-green-500 fill-green-500 stroke-white" />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5" data-aos="fade-left">
              <div className="relative p-2 rounded-3xl overflow-hidden border border-slate-200/60 shadow-2xl bg-white/85 backdrop-blur-md">
                <img
                  src={marketingTeamImg}
                  alt="Team Working"
                  className="rounded-2xl w-full h-[320px] object-cover"
                />
                <div className="grid grid-cols-3 gap-4 pt-6 pb-2 border-t border-slate-100 mt-4 text-center">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-primary-blue">50+</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Happy Clients</p>
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-primary-blue">500+</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Projects</p>
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-primary-blue">4+ Yrs</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Industry Exp</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. TRUSTED BY 50+ BUSINESSES ACROSS INDIA */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
            Brands
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-2 tracking-tight text-premium-black font-heading">
            Trusted by 50+ Businesses Across India
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-12 text-sm font-light">
            From healthcare to real estate — brands that chose Digital Ads World and scaled.
          </p>

          {/* Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {brandLogos.map((brand, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex items-center justify-center text-center h-28 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
            <div className="bg-blue-50 border border-blue-100/50 rounded-2xl p-3 shadow-sm flex items-center justify-center text-center h-28 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <span className="text-xs sm:text-sm text-primary-blue font-bold uppercase tracking-wider">50+ More Brands</span>
            </div>
          </div>

          {/* Dark Stats Banner */}
          <div className="bg-slate-900 text-white rounded-[32px] p-8 md:p-12 border border-slate-800 shadow-xl relative overflow-hidden text-center mt-6">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 relative z-10">
              <div data-aos="zoom-in" data-aos-delay="100">
                <h3 className="text-3xl sm:text-4xl font-black text-primary-blue font-heading">50+</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2">Happy Clients</p>
              </div>
              <div data-aos="zoom-in" data-aos-delay="200">
                <h3 className="text-3xl sm:text-4xl font-black text-primary-blue font-heading">500+</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2">Projects Delivered</p>
              </div>
              <div data-aos="zoom-in" data-aos-delay="300">
                <h3 className="text-3xl sm:text-4xl font-black text-primary-blue font-heading">4 Years</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2">Industry Experience</p>
              </div>
              <div data-aos="zoom-in" data-aos-delay="400">
                <h3 className="text-3xl sm:text-4xl font-black text-primary-blue font-heading">1 Cr +</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2">Ad Budget Managed</p>
              </div>
              <div className="col-span-2 lg:col-span-1" data-aos="zoom-in" data-aos-delay="500">
                <h3 className="text-3xl sm:text-4xl font-black text-primary-blue font-heading">10+</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-2">Professional Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE & PHILOSOPHY */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5" data-aos="fade-right">
              <div className="relative p-2 rounded-3xl overflow-hidden border border-slate-200/50 shadow-lg bg-white">
                <img
                  src={profitableConversionsImg}
                  alt="Digital Agency Office"
                  className="rounded-2xl w-full h-[320px] md:h-[400px] object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-left">
                  <h4 className="text-white text-md font-bold leading-tight font-heading">"We Don't Run Ads, We Drive Results."</h4>
                  <p className="text-slate-400 text-xs mt-1">Our agency focus metrics are strictly sales pipelines and inquiries.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6 text-left" data-aos="fade-left">
              <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
                Who We Are & Philosophy
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-premium-black font-heading">
                We Build Highly Profitable Conversions, Not Just Brand Awareness.
              </h2>
              <p className="text-slate-600 leading-relaxed font-light">
                Digital Ads World is a modern performance marketing partner designed for businesses that expect quantifiable business results. We understand that vanity metrics like impressions and clicks don't pay the bills. That is why we structure every element of our campaign—from landing page speed to copy angles—specifically to convert high-intent prospects into paying clients.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {['Custom optimization cycles', 'Dedicated account managers', 'Daily budget checks', 'ROI matching models'].map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-primary-blue shrink-0" />
                    <span className="text-sm font-semibold text-slate-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. OUR MISSION, OUR VISION */}
      <section className="py-20 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100" data-aos="fade-right">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-premium-black font-heading mb-3">Our Mission</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                To construct scalable customer acquisition channels that transform marketing budgets into transparent, compounding sales pipelines. We resolve to elevate industry benchmarks through data-driven campaigns.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100" data-aos="fade-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center mb-6">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-bold text-premium-black font-heading mb-3">Our Vision</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                To be recognized as the premier global standard for ROI-centric performance marketing, helping over 1,000 businesses break past digital plateaus using specialized funnel designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR VALUES WHAT WE STAND FOR */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-widest text-primary-blue uppercase">Our Values</span>
            <h2 className="text-3xl font-black mt-3 text-premium-black font-heading">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            {[
              {
                title: "Absolute ROI Focus",
                description: "We align all marketing strategies with actual sales revenue and cashflow, rather than clicks or branding impressions.",
                icon: Target
              },
              {
                title: "Data Transparency",
                description: "No hidden spreadsheets. Our partners see live conversion data routed directly from platforms like Google Ads and Meta Pixel.",
                icon: BarChart3
              },
              {
                title: "High Integrity",
                description: "We are selective about partnerships. If we believe a product is not ready to scale, we state it transparently.",
                icon: ShieldCheck
              },
              {
                title: "Creative Innovation",
                description: "Dynamic ad creative styles are changed consistently to combat audience fatigue and reduce conversion prices.",
                icon: Zap
              }
            ].map((value, i) => {
              const IconComp = value.icon;
              return (
                <div key={i} className="flex flex-col gap-4 p-4" data-aos="fade-up" data-aos-delay={i * 50}>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <IconComp size={20} />
                  </div>
                  <h4 className="text-base font-bold text-premium-black font-heading">{value.title}</h4>
                  <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* 6. TIMELINE OUR JOURNEY */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-widest text-primary-blue uppercase">Timeline</span>
            <h2 className="text-3xl font-black mt-3 text-premium-black font-heading">Our Journey</h2>
          </div>

          <div className="relative border-l border-slate-200 ml-4 md:ml-32 md:mr-32 text-left">
            {[
              { year: "2023", title: "The Inception", desc: "Digital Ads World was founded in Hyderabad by K Charan with a single goal: driving performance-first results." },
              { year: "2024", title: "Scaling Up", desc: "G Sri Ram joined to spearhead Digital Marketing, expanding ad management capacity by 300%." },
              { year: "2025", title: "Global Client Base", desc: "Serviced over 50+ clients globally, managing over $2.4 Million in cumulative ad spend." },
              { year: "2026", title: "Dynamic Lead Systems", desc: "Launched automated conversation funnels integrating client databases with immediate WhatsApp routing." }
            ].map((item, index) => (
              <div key={index} className="mb-12 ml-6 relative" data-aos="fade-up">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-primary-blue border-4 border-white shadow-sm"></div>
                <span className="text-xs font-black text-primary-blue">{item.year}</span>
                <h3 className="text-lg font-bold text-premium-black font-heading mt-1">{item.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm font-light mt-1.5 leading-relaxed max-w-2xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SERVICES SECTION */}
      <section id="services-section" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-4 tracking-tight text-premium-black font-heading">
            Full-Funnel Acquisition Channels
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-16 text-sm sm:text-base font-light">
            We coordinate multiple client acquisition channels to feed your business database with qualified leads daily.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="bg-white rounded-3xl p-8 border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 text-left relative overflow-hidden group"
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 100}
              >
                <div className="flex flex-col gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100/50">
                    {renderOfficialIcon(service.icon, "w-6 h-6")}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-premium-black font-heading leading-tight group-hover:text-primary-blue transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed font-light">
                      {service.description}
                    </p>

                    {expandedServiceId === service.id && (
                      <div className="space-y-2.5 mt-6 pt-6 border-t border-slate-100 animate-fade-in">
                        {service.benefits.slice(0, 5).map((point, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start">
                            <CheckCircle2 size={15} className="text-primary-blue shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-600 leading-tight font-medium">{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-50 flex flex-col gap-3">
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-primary-blue hover:text-blue-700 font-bold text-sm inline-flex items-center gap-1.5 group/link transition-colors"
                  >
                    <span>Explore {service.title}</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-primary-blue font-bold rounded-xl text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 mt-2"
                  >
                    <span>{expandedServiceId === service.id ? 'Hide details' : 'View benefits'}</span>
                    {expandedServiceId === service.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              to="/services"
              className="bg-primary-blue hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-blue-500/20 hover:-translate-y-0.5 text-base"
            >
              <span>View Services Page</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. B2C / B2B / D2C PROCESS FLOW */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
            How Leads Flow
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-4 tracking-tight text-premium-black font-heading">
            Our Digital Marketing Process — Click To Conversion
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-12 text-sm font-light">
            Our end-to-end lead generation engine — from demand creation to closed deals.
          </p>

          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {Object.keys(processTabs).map((key) => (
              <button
                key={key}
                onClick={() => setActiveProcessTab(key)}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeProcessTab === key 
                    ? 'bg-primary-blue text-white shadow-lg shadow-blue-500/15' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {processTabs[key].label}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4 lg:gap-2 bg-slate-50/50 p-6 md:p-8 rounded-[36px] border border-slate-100/50">
            {processTabs[activeProcessTab].columns.map((column, cIdx) => (
              <React.Fragment key={cIdx}>
                <div className="flex-1 flex flex-col gap-3 bg-white rounded-3xl p-5 border border-slate-100 shadow-sm relative text-left">
                  <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-2 block text-center">
                    {column.title}
                  </span>
                  <div className="flex flex-col gap-2 flex-grow justify-center animate-fade-in">
                    {column.items.map((item, iIdx) => {
                      const isDealWon = item === "DEAL WON 🎉";
                      return (
                        <div
                          key={iIdx}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                            isDealWon
                              ? 'bg-gradient-to-r from-orange-500 to-amber-500 border-orange-400 text-white shadow-lg shadow-orange-500/25 scale-105 font-black'
                              : 'bg-slate-50 border-slate-100 text-slate-700 hover:border-blue-300 hover:text-primary-blue hover:bg-white shadow-sm'
                          }`}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                </div>
                {cIdx < processTabs[activeProcessTab].columns.length - 1 && (
                  <div className="flex items-center justify-center py-2 lg:py-0 lg:px-1 text-slate-300 select-none">
                    <ArrowRight size={20} className="hidden lg:block animate-pulse" />
                    <ArrowRight size={20} className="block lg:hidden rotate-90" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CASE STUDIES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div className="text-left">
              <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
                Case Studies
              </span>
              <h2 className="text-3xl md:text-4xl font-black mt-3 tracking-tight text-premium-black font-heading">
                Real Client Transformations
              </h2>
            </div>
            <Link
              to="/gallery"
              className="text-primary-blue hover:text-blue-700 font-bold text-sm flex items-center gap-1 border-b border-primary-blue hover:border-blue-700 transition-colors pb-1 w-fit shrink-0"
            >
              <span>View Campaign Portfolio</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <div 
                key={study.id} 
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-left h-full"
                data-aos="fade-up"
              >
                <img
                  src={study.image_url}
                  alt={study.title}
                  className="w-full h-[260px] object-cover"
                />
                <div className="p-8 flex flex-col gap-5 flex-grow">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none">
                    Client: {study.client}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-premium-black font-heading leading-tight">
                    {study.title}
                  </h3>
                  
                  <div className="space-y-3 mt-2 text-sm text-slate-600 font-light">
                    <p><strong>Challenge:</strong> {study.challenge}</p>
                    <p><strong>Solution:</strong> {study.solution}</p>
                  </div>

                  {/* Results Grid */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/50 mt-auto">
                    {study.results.map((res, i) => (
                      <div key={i} className="text-center">
                        <span className="text-lg font-black text-primary-blue font-heading">{res.value}</span>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{res.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. GALLERY SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-premium-black mt-3 font-heading">
              Our Work & Results Gallery
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-xs sm:text-sm mt-2 font-light">
              Check out our realistic creative campaigns, graphic layout designs, and high-performance landing pages.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12" data-aos="fade-up">
            {[
              { label: 'All Projects', value: 'all' },
              { label: 'Campaign Results', value: 'campaign' },
              { label: 'Ad Creatives', value: 'creative' },
              { label: 'Branding & Designs', value: 'branding' },
              { label: 'Websites', value: 'website' },
              { label: 'Video Projects', value: 'video' }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => {
                  setActiveGalleryFilter(filter.value);
                  setLightboxIndex(null);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeGalleryFilter === filter.value 
                    ? 'bg-primary-blue text-white shadow-lg shadow-blue-500/15' 
                    : 'bg-slate-100 hover:bg-slate-200 text-dark-gray'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGalleryItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 cursor-zoom-in shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-left"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-2 bg-white">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-primary-blue uppercase tracking-widest leading-none">
                    <LucideIcons.Tag size={10} />
                    <span>{item.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-premium-black font-heading mt-1 line-clamp-1 leading-tight group-hover:text-primary-blue transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR LEADERSHIP TEAM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-4 tracking-tight text-premium-black font-heading">
            Meet the Experts Behind Your Growth
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-16 text-sm font-light">
            Strategists, funnel architects, and campaign managers working together to scale your business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member) => (
              <div 
                key={member.id} 
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex flex-col md:flex-row items-stretch hover:shadow-xl transition-all duration-300 text-left"
                data-aos="fade-up"
              >
                {/* Image */}
                <div className="md:w-1/2 relative min-h-[320px] md:min-h-full bg-slate-200">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className={`absolute inset-0 w-full h-full object-cover ${member.objectPosition || 'object-center'}`}
                  />
                </div>
                
                {/* Content */}
                <div className="p-8 md:w-1/2 flex flex-col justify-center gap-6">
                  <div>
                    <span className="text-[10px] font-black tracking-widest text-primary-blue uppercase">
                      {member.designation}
                    </span>
                    <h3 className="text-xl font-bold text-premium-black font-heading mt-1">
                      {member.name}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light mt-4">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. TESTIMONIALS (Google Reviews Grid) */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-12 tracking-tight text-premium-black font-heading">
            What Our Partners Say
          </h2>

          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm max-w-4xl mx-auto mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-8 h-8">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </div>
              <div>
                <h4 className="text-md font-bold text-premium-black font-heading">Google Reviews</h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-lg font-black text-slate-800 font-heading">4.9</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" className="stroke-none" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">/ 5 rating</span>
                </div>
              </div>
            </div>
            
            <div className="h-px w-full md:w-px md:h-12 bg-slate-100"></div>

            <div className="text-center md:text-left flex flex-col justify-center">
              <div className="flex items-baseline justify-center md:justify-start gap-1">
                <span className="text-2xl font-black text-slate-800 font-heading">750+</span>
                <span className="text-sm font-medium text-slate-500">Reviews</span>
              </div>
              <p className="text-xs font-bold text-orange-500 mt-1 uppercase tracking-wide">
                #1 Most Reviewed Digital Agency in Hyderabad
              </p>
            </div>
            
            <div className="h-px w-full md:w-px md:h-12 bg-slate-100"></div>

            <div>
              <a 
                href="https://share.google/MwvC23EQriS21UwL7"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-50 text-primary-blue hover:bg-primary-blue hover:text-white rounded-2xl px-6 py-3 text-sm font-bold flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow"
              >
                <span>Read All Reviews</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {testimonials.map((test) => (
              <div 
                key={test.id} 
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full flex items-center gap-1">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      Google Review
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" className="stroke-none" />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed font-light mb-6 italic">
                    "{test.feedback}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-50 mt-auto">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm ${test.bgColor || 'bg-blue-600'}`}>
                    {test.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-premium-black text-sm leading-snug">{test.name}</h4>
                    <p className="text-slate-400 text-xs mt-0.5">{test.designation}, <span className="font-medium text-slate-500">{test.company}</span></p>
                    <span className="text-[10px] text-slate-300 font-bold block mt-0.5">{test.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Google Reviews Summary and Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12">
            <a 
              href="https://share.google/MwvC23EQriS21UwL7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-800 rounded-2xl px-6 py-3 text-sm font-bold flex items-center gap-2.5 transition-all duration-300 shadow-sm hover:shadow"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>View All 750+ Google Reviews</span>
            </a>

            <a 
              href="https://share.google/MwvC23EQriS21UwL7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-2xl px-6 py-3 text-sm font-bold flex items-center gap-2 transition-all duration-300 shadow-sm hover:shadow"
            >
              <Star size={16} fill="currentColor" className="stroke-none" />
              <span>Leave a review</span>
            </a>

            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>
                Reviews sourced from Google My Business <span className="text-slate-300 font-light mx-1">—</span> verified & authentic
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. INDUSTRIES WE SERVE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
            Industries We Serve
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-4 tracking-tight text-premium-black font-heading">
            Industries We Power Across India
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-16 text-sm font-light">
            Tailored strategies for every industry — powered by vertical-specific insights and AI.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
            {industries.map((ind, i) => (
              <div 
                key={i} 
                className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-sm ${ind.color}`}>
                  {renderIndustryIcon(ind.icon, "w-5 h-5")}
                </div>
                <div>
                  <h4 className="text-base font-bold text-premium-black font-heading">{ind.title}</h4>
                  <p className="text-slate-400 text-xs mt-1 font-medium">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-12 tracking-tight text-premium-black font-heading font-heading">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 text-left">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className={`border border-slate-100 rounded-2xl transition-all duration-300 ${
                    isOpen ? 'bg-white border-slate-200 shadow-sm' : 'bg-white hover:bg-slate-50/50'
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                  >
                    <span className="font-bold text-premium-black text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-slate-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-primary-blue' : ''
                      }`} 
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 md:px-6 pb-5 md:pb-6 text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE & CONTACT DETAILS */}
      <section id="contact-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-5 flex flex-col gap-8 text-left" data-aos="fade-right">
              <div>
                <span className="text-xs font-black text-primary-blue tracking-widest uppercase">Office Info</span>
                <h2 className="text-2xl font-black text-premium-black font-heading mt-2">Get In Touch Directly</h2>
                <p className="text-slate-500 text-sm mt-2 font-light">
                  Have an active campaign that needs auditing? Reach out via call or message. We review requests within 4 hours.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-slate-200/50 rounded-xl text-primary-blue flex items-center justify-center shrink-0 shadow-sm">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Phone Call</span>
                    <a href={`tel:${agencyInfo.phone}`} className="block font-bold text-premium-black hover:text-primary-blue transition-colors text-sm sm:text-base mt-0.5">
                      +91 {agencyInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-slate-200/50 rounded-xl text-[#25D366] flex items-center justify-center shrink-0 shadow-sm">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">WhatsApp chat</span>
                    <a 
                      href={`https://wa.me/91${agencyInfo.whatsapp}?text=Hi%20Digital%20Ads%20World,%20I'm%20interested%20in%20scaling%20my%20business.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-bold text-premium-black hover:text-primary-blue transition-colors text-sm sm:text-base mt-0.5"
                    >
                      +91 {agencyInfo.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-slate-200/50 rounded-xl text-primary-blue flex items-center justify-center shrink-0 shadow-sm">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email Address</span>
                    <a href={`mailto:${agencyInfo.email}`} className="block font-bold text-premium-black hover:text-primary-blue transition-colors text-sm sm:text-base mt-0.5">
                      {agencyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-slate-200/50 rounded-xl text-primary-blue flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Agency Office</span>
                    <a 
                      href={agencyInfo.googleMapsBusinessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-bold text-premium-black hover:text-primary-blue transition-colors text-sm sm:text-base mt-0.5"
                    >
                      {agencyInfo.address}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Follow Us:</span>
                <div className="flex gap-3">
                  <a href={agencyInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/50 hover:bg-primary-blue hover:text-white text-dark-gray transition-all duration-300 shadow-sm">
                    <Instagram size={16} />
                  </a>
                  <a href={agencyInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/50 hover:bg-primary-blue hover:text-white text-dark-gray transition-all duration-300 shadow-sm">
                    <Facebook size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form */}
            <div className="lg:col-span-7" data-aos="fade-left">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100 text-left">
                {!submitted ? (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email Address</label>
                        <input
                          type="email"
                          placeholder="e.g. john@company.com"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Interest Channel</label>
                        <select
                          value={leadForm.service}
                          onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm bg-white"
                        >
                          <option value="General Growth Inquiry">General Growth Inquiry</option>
                          <option value="Google Ads">Google Ads</option>
                          <option value="Meta Ads">Meta Ads</option>
                          <option value="Lead Generation">Lead Generation</option>
                          <option value="SEO">SEO</option>
                          <option value="Social Media Marketing">Social Media Marketing</option>
                          <option value="Website Design & Development">Website Design & Development</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Message / Goals</label>
                      <textarea
                        rows="3"
                        placeholder="Tell us about your business goals and target metrics..."
                        value={leadForm.message}
                        onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/15 flex items-center justify-center gap-2 hover:-translate-y-0.5 text-base"
                    >
                      <Zap size={18} />
                      <span>Book Free Strategy Session</span>
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-blue-50 text-primary-blue rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={36} />
                    </div>
                    <h3 className="text-2xl font-black mb-2 text-premium-black font-heading">Thank You!</h3>
                    <p className="text-slate-500 max-w-sm mb-6 font-light">
                      Your consultation request has been received. Our account manager will analyze your website parameters and get in touch within the next 4 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 underline"
                    >
                      Submit another request
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* GOOGLE MAPS LOCATION INTEGRATION */}
      <section className="w-full h-[450px] bg-slate-100 border-t border-slate-200">
        <iframe
          src={agencyInfo.googleMapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Digital Ads World Office Location Map"
        ></iframe>
      </section>

      {/* WHATSAPP CTA BANNER */}
      <section className="bg-primary-blue py-16 text-white relative">
        <div className="absolute top-0 right-0 w-[30vw] h-[30vw] bg-white/10 rounded-full blur-[80px] -z-10"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6">
          <span className="bg-white/20 text-white text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full">
            Instant Consultation
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight font-heading leading-tight max-w-3xl">
            Want Growth Advice Right Away? Chat With Our CEO.
          </h2>
          <p className="text-blue-100 text-base md:text-lg max-w-xl font-light">
            Skip the forms and get in touch directly on WhatsApp. Let's discuss your Meta or Google ad plans right now.
          </p>
          <a
            href={`https://wa.me/91${agencyInfo.whatsapp}?text=Hi%20Charan,%20I'm%20interested%20in%20a%20free%20ad%20audit.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-primary-blue font-extrabold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-base"
          >
            <MessageCircle size={22} className="text-[#25D366] fill-[#25D366] stroke-white" />
            <span>Connect Directly on WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Lightbox Preview Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          activeItem={filteredGalleryItems[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrevGalleryItem}
          onNext={handleNextGalleryItem}
        />
      )}

    </div>
  );
}
