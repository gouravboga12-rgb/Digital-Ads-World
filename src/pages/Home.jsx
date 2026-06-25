import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, MessageCircle, ShieldCheck, Zap, 
  TrendingUp, BarChart3, ChevronDown, CheckCircle, 
  Star, Award, Target, Trophy, Clock
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { 
  agencyInfo, services, testimonials, 
  caseStudies, faqs, gallery, team 
} from '../data/siteContent';
import Lightbox from '../components/Lightbox';
import profitableConversionsImg from '../assets/profitable_conversions.png';
import heroBg from '../assets/hero_bg.png';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', service: 'General Growth Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [expandedServices, setExpandedServices] = useState({});

  const toggleExpand = (id) => {
    setExpandedServices(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderIcon = (iconName, className) => {
    const IconComponent = LucideIcons[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <LucideIcons.HelpCircle className={className} />;
  };

  const [activeGalleryFilter, setActiveGalleryFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredGalleryItems = activeGalleryFilter === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === activeGalleryFilter);

  const handlePrevGalleryItem = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredGalleryItems.length - 1 : prev - 1));
  };

  const handleNextGalleryItem = () => {
    setLightboxIndex((prev) => (prev === filteredGalleryItems.length - 1 ? 0 : prev + 1));
  };

  // Auto scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadForm)
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        // Fallback for offline mock testing
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section 
        className="relative min-h-[90vh] flex items-center bg-slate-950 pt-10 md:pt-16 pb-20 border-b border-slate-900 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Immersive Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/70 z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left" data-aos="fade-right">
              <div className="inline-flex items-center gap-2 bg-blue-950/40 border border-blue-900/50 rounded-full px-4 py-1.5 w-fit">
                <span className="w-2 h-2 rounded-full bg-primary-blue animate-ping"></span>
                <span className="text-xs font-black tracking-wider uppercase text-blue-400">
                  Leading Performance Marketing Agency
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-white font-heading">
                Scale Your Business With <span className="text-primary-blue">Performance-Driven</span> Digital Marketing
              </h1>
              
              <p className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-light">
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
                <a
                  href="#services-section"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 text-base backdrop-blur-md"
                >
                  <LucideIcons.Briefcase size={18} />
                  <span>View All Services</span>
                </a>
              </div>

              {/* Minimalist Trust Badges */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 mt-6 max-w-md">
                <div>
                  <h3 className="text-2xl font-black text-white font-heading">4.8x</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Average ROAS</p>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white font-heading">150k+</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Leads Driven</p>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white font-heading">98%</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Client Retention</p>
                </div>
              </div>
            </div>

            {/* Right Column (Spacer to showcase realistic workspace background image) */}
            <div className="lg:col-span-5" />
          </div>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION / ABOUT US */}
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

      {/* 3. MISSION, VISION & CORE VALUES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 text-left">
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

          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-widest text-primary-blue uppercase">Our Values</span>
            <h2 className="text-3xl font-black mt-3 text-premium-black font-heading font-heading font-heading">What We Stand For</h2>
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

      {/* 3B. OUR FOUNDERS (TEAM) */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-widest text-primary-blue uppercase">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 text-premium-black font-heading font-heading">
              Our Founders & Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-3xl p-8 border border-slate-200/50 flex flex-col md:flex-row gap-6 items-start text-left shadow-sm hover:shadow-lg transition-all"
                data-aos="fade-up"
              >
                <img
                  src={member.image_url}
                  alt={member.name}
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover shrink-0 border border-slate-100 ${member.objectPosition || 'object-center'}`}
                />
                <div className="flex flex-col gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-premium-black font-heading leading-tight">{member.name}</h3>
                    <span className="text-xs font-bold text-primary-blue uppercase tracking-widest">{member.designation}</span>
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                    {member.bio}
                  </p>
                  
                  {/* Social links preview */}
                  <div className="flex items-center gap-3 mt-2 text-slate-400">
                    {member.social_links.linkedin && (
                      <a href={member.social_links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary-blue text-xs font-bold">
                        LinkedIn
                      </a>
                    )}
                    {member.social_links.twitter && (
                      <a href={member.social_links.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary-blue text-xs font-bold">
                        Twitter
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3C. OUR JOURNEY TIMELINE */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-widest text-primary-blue uppercase">Timeline</span>
            <h2 className="text-3xl font-black mt-3 text-premium-black font-heading">Our Journey</h2>
          </div>

          <div className="relative border-l border-slate-200 ml-4 md:ml-32 md:mr-32 text-left">
            {[
              { year: "2023", title: "The Inception", desc: "Digital Ads World was founded in Hyderabad by K Charan with a single goal: driving performance-first results." },
              { year: "2024", title: "Scaling Up", desc: "D Sri Ram joined to spearhead Digital Marketing, expanding ad management capacity by 300%." },
              { year: "2025", title: "Global Client Base", desc: "Serviced over 50+ clients globally, managing over $2.4 Million in cumulative ad spend." },
              { year: "2026", title: "Dynamic Lead Systems", desc: "Launched automated conversation funnels integrating client databases with immediate WhatsApp routing." }
            ].map((item, index) => (
              <div key={index} className="mb-12 ml-6 relative" data-aos="fade-up">
                {/* Timeline dot */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-primary-blue border-4 border-white shadow-sm"></div>
                
                <span className="text-xs font-black text-primary-blue">{item.year}</span>
                <h3 className="text-lg font-bold text-premium-black font-heading mt-1">{item.title}</h3>
                <p className="text-slate-500 text-xs sm:text-sm font-light mt-1.5 leading-relaxed max-w-2xl">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICE HIGHLIGHTS */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 text-left"
                data-aos="fade-up"
                data-aos-delay={(index % 3) * 100}
              >
                {/* Banner Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Icon Badge Overlay */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl border border-white/50 text-primary-blue shadow-md">
                    {renderIcon(service.icon, "w-5 h-5")}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-8 flex flex-col flex-grow justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-premium-black font-heading leading-tight hover:text-primary-blue transition-colors duration-200">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3 font-light">
                      {service.description}
                    </p>

                    {/* Apply Now / Inquire Link */}
                    <div className="mt-4">
                      <Link
                        to={`/services/${service.slug}`}
                        className="text-primary-blue hover:text-blue-700 font-bold text-sm inline-flex items-center gap-1 group/link transition-colors"
                      >
                        <span>Apply / Inquire Now</span>
                        <LucideIcons.ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    {/* 5 Points - Collapsible */}
                    {expandedServices[service.id] && (
                      <div className="space-y-2.5 mt-6 pt-6 border-t border-slate-100 animate-fade-in">
                        {service.benefits.slice(0, 5).map((point, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start">
                            <LucideIcons.CheckCircle2 size={15} className="text-primary-blue shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-600 leading-tight font-medium">{point}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Toggle Button */}
                  <div className="pt-4 border-t border-slate-50 mt-auto">
                    <button
                      onClick={() => toggleExpand(service.id)}
                      className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-primary-blue font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>{expandedServices[service.id] ? 'Hide Details' : 'View More Details'}</span>
                      {expandedServices[service.id] ? <LucideIcons.ChevronUp size={14} /> : <LucideIcons.ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RESULTS & STATISTICS */}
      <section className="py-20 bg-deep-navy text-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_60%)] -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
            Proven Results
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-16 tracking-tight text-white font-heading">
            Numbers That Speak Louder Than Pitches
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div data-aos="zoom-in" data-aos-delay="100">
              <h3 className="text-4xl sm:text-5xl font-black text-primary-blue font-heading">$2.4M+</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-2">Ad Spend Managed</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="200">
              <h3 className="text-4xl sm:text-5xl font-black text-primary-blue font-heading">150k+</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-2">Leads Generated</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="300">
              <h3 className="text-4xl sm:text-5xl font-black text-primary-blue font-heading">4.8x</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-2">Average Campaign ROAS</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="400">
              <h3 className="text-4xl sm:text-5xl font-black text-primary-blue font-heading">95%</h3>
              <p className="text-slate-400 text-xs sm:text-sm font-bold uppercase tracking-wider mt-2">Campaign ROI Success</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CASE STUDIES */}
      <section className="py-20 bg-white">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {caseStudies.map((study) => (
              <div 
                key={study.id} 
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-left"
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
                  <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded-2xl border border-slate-200/50 mt-auto">
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

      {/* 6B. GALLERY & PORTFOLIO */}
      <section className="py-20 bg-white border-y border-slate-100">
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

          {/* Filters List */}
          <div className="flex flex-wrap justify-center gap-2 mb-12" data-aos="fade-up">
            {[
              { label: 'All Projects', value: 'all' },
              { label: 'Campaign Results', value: 'campaign' },
              { label: 'Ad Creatives', value: 'creative' },
              { label: 'Branding & Designs', value: 'branding' },
              { label: 'Websites', value: 'website' },
              { label: 'Video Projects', value: 'video' }
            ].map((filter) => {
              const isActive = activeGalleryFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => {
                    setActiveGalleryFilter(filter.value);
                    setLightboxIndex(null);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary-blue text-white shadow-lg shadow-blue-500/15' 
                      : 'bg-slate-100 hover:bg-slate-200 text-dark-gray'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGalleryItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 cursor-zoom-in shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 text-left"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <LucideIcons.Maximize2 size={20} />
                    </div>
                  </div>
                </div>

                {/* Content Info */}
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

          {filteredGalleryItems.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-12 tracking-tight text-premium-black font-heading">
            What Our Partners Say
          </h2>

          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl relative min-h-[320px] flex flex-col justify-center">
            
            {/* Stars */}
            <div className="flex justify-center gap-1.5 mb-6 text-amber-400">
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>

            <p className="text-slate-600 text-base md:text-lg italic leading-relaxed font-light mb-8 max-w-2xl mx-auto">
              "{testimonials[activeTestimonial].feedback}"
            </p>

            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[activeTestimonial].image_url}
                alt={testimonials[activeTestimonial].name}
                className="w-12 h-12 rounded-full object-cover border border-slate-100"
              />
              <div className="text-left">
                <h4 className="font-bold text-premium-black text-sm">{testimonials[activeTestimonial].name}</h4>
                <p className="text-slate-400 text-xs">{testimonials[activeTestimonial].designation}, <span className="font-semibold text-slate-500">{testimonials[activeTestimonial].company}</span></p>
              </div>
            </div>

            {/* Testimonials Indicator Dots */}
            <div className="flex justify-center gap-2.5 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeTestimonial === index ? 'bg-primary-blue w-6' : 'bg-slate-200'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-20 bg-white">
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
                    isOpen ? 'bg-slate-50 border-slate-200' : 'bg-white hover:bg-slate-50/50'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
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

      {/* 9. LEAD CAPTURE & CONTACT DETAILS */}
      <section id="contact-section" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Direct Contact Channels */}
            <div className="lg:col-span-5 flex flex-col gap-8 text-left" data-aos="fade-right">
              <div>
                <span className="text-xs font-black text-primary-blue tracking-widest uppercase">Office Info</span>
                <h2 className="text-2xl font-black text-premium-black font-heading mt-2">Get In Touch Directly</h2>
                <p className="text-slate-500 text-sm mt-2 font-light">
                  Have an active campaign that needs auditing? Reach out via call or message. We review requests within 4 hours.
                </p>
              </div>

              {/* Channels List */}
              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white border border-slate-200/50 rounded-xl text-primary-blue flex items-center justify-center shrink-0 shadow-sm">
                    <LucideIcons.Phone size={18} />
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
                    <LucideIcons.MessageCircle size={20} />
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
                    <LucideIcons.Mail size={18} />
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
                    <LucideIcons.MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Agency Office</span>
                    <span className="block font-bold text-premium-black text-sm sm:text-base mt-0.5">
                      {agencyInfo.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-slate-200 flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Follow Us:</span>
                <div className="flex gap-3">
                  <a href={agencyInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white border border-slate-200/50 hover:bg-primary-blue hover:text-white text-dark-gray transition-all duration-300 shadow-sm">
                    <LucideIcons.Linkedin size={16} />
                  </a>
                  <a href={agencyInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white border border-slate-200/50 hover:bg-primary-blue hover:text-white text-dark-gray transition-all duration-300 shadow-sm">
                    <LucideIcons.Instagram size={16} />
                  </a>
                  <a href={agencyInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white border border-slate-200/50 hover:bg-primary-blue hover:text-white text-dark-gray transition-all duration-300 shadow-sm">
                    <LucideIcons.Facebook size={16} />
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
                          <option value="Google Ads Management">Google Ads Management</option>
                          <option value="Meta Ads Management">Meta Ads Management</option>
                          <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                          <option value="Website Development">Website Development</option>
                          <option value="Branding & Design">Branding & Creative Design</option>
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

      {/* 9B. GOOGLE MAPS LOCATION INTEGRATION */}
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

      {/* 10. WHATSAPP CTA BANNER */}
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
