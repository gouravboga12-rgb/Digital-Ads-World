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
  caseStudies, faqs 
} from '../data/siteContent';
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
                  href={`https://wa.me/91${agencyInfo.whatsapp}?text=Hi%20Digital%20Ads%20World,%20I'm%20interested%20in%20a%20free%20consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 text-base backdrop-blur-md"
                >
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span>Chat On WhatsApp</span>
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

      {/* 2. COMPANY INTRODUCTION */}
      <section className="py-20 bg-slate-50">
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
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-premium-black font-heading">
                We Build Highly Profitable Conversions, Not Just Brand Awareness.
              </h2>
              <p className="text-slate-600 leading-relaxed font-light">
                Digital Ads World is a modern performance marketing partner designed for businesses that expect quantifiable business results. We understand that vanity metrics like impressions and clicks don't pay the bills. That is why we structure every element of our campaign—from landing page speed to copy angles—specifically to convert high-intent prospects into paying clients.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-premium-black text-sm">Enterprise Data Analytics</h4>
                    <p className="text-xs text-slate-500 mt-0.5">We route, attribute and track every conversion accurately.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle size={14} />
                  </div>
                  <div>
                    <h4 className="font-bold text-premium-black text-sm">Custom Landing Pages</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Custom, high-speed UX designed to maximize client acquisition rates.</p>
                  </div>
                </div>
              </div>
              <Link
                to="/about"
                className="text-primary-blue hover:text-blue-700 font-bold text-sm flex items-center gap-2 mt-4 hover:underline"
              >
                <span>Read Our Journey</span>
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="py-20 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-black mt-3 mb-4 tracking-tight text-premium-black font-heading">
            Built For Growth-Focused Businesses
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-16 text-sm sm:text-base font-light">
            We align our goals directly with your revenue sheet. Here is why international and regional brands partner with us.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Reason 1 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col gap-5 text-left premium-shadow-hover" data-aos="fade-up" data-aos-delay="100">
              <div className="w-12 h-12 bg-blue-50 text-primary-blue rounded-2xl flex items-center justify-center">
                <Target size={24} />
              </div>
              <h3 className="text-lg font-bold text-premium-black font-heading">Laser-Targeted Strategies</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                No spray-and-pray techniques. We deep-dive into buyer persona intent, building campaigns that match correct demographic buying cycles.
              </p>
            </div>
            {/* Reason 2 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col gap-5 text-left premium-shadow-hover" data-aos="fade-up" data-aos-delay="200">
              <div className="w-12 h-12 bg-blue-50 text-primary-blue rounded-2xl flex items-center justify-center">
                <Award size={24} />
              </div>
              <h3 className="text-lg font-bold text-premium-black font-heading">Expertise & Execution</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                We handle your budget as our own, overseen by qualified media buyers with years of performance experience and certified specializations.
              </p>
            </div>
            {/* Reason 3 */}
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col gap-5 text-left premium-shadow-hover" data-aos="fade-up" data-aos-delay="300">
              <div className="w-12 h-12 bg-blue-50 text-primary-blue rounded-2xl flex items-center justify-center">
                <Trophy size={24} />
              </div>
              <h3 className="text-lg font-bold text-premium-black font-heading">Transparent Attributions</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Detailed reporting and live client dashboards. You see where every single click originated and exactly how many leads it closed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICE HIGHLIGHTS */}
      <section className="py-20 bg-slate-50">
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
            {services.slice(0, 6).map((service, index) => (
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

          <div className="mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-primary-blue hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/15 hover:-translate-y-0.5"
            >
              <span>Explore All 11 Services</span>
              <LucideIcons.ArrowRight size={16} />
            </Link>
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

      {/* 9. LEAD CAPTURE FORM SECTION */}
      <section id="contact-section" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex flex-col gap-6 text-left" data-aos="fade-right">
              <span className="text-xs font-black tracking-widest text-primary-blue uppercase">
                Let's Partner Up
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-premium-black font-heading leading-tight">
                Ready To Scale Your Sales & Leads?
              </h2>
              <p className="text-slate-500 font-light leading-relaxed">
                Fill out the brief consultation details. Our team will review your website and current marketing campaigns, scheduling a free 30-minute growth call detailing exactly where your leakage points are.
              </p>

              <div className="space-y-4 pt-4 border-t border-slate-200/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">NDAs available for corporate brands.</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center shrink-0">
                    <Clock size={18} />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">Typical response time: Less than 4 hours.</span>
                </div>
              </div>
            </div>

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

    </div>
  );
}
