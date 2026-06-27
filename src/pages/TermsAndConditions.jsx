import React, { useEffect, useState } from 'react';
import { 
  FileText, Shield, Sparkles, CheckCircle, CreditCard, DollarSign, 
  TrendingUp, UserCheck, Key, Lock, Globe, Search, Code, BarChart2, 
  RefreshCw, Ban, AlertOctagon, Scale, Mail, Phone, ChevronRight 
} from 'lucide-react';
import { agencyInfo } from '../data/siteContent';

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms', icon: CheckCircle },
    { id: 'services', title: '2. Our Services', icon: Sparkles },
    { id: 'agreement', title: '3. Service Agreement', icon: FileText },
    { id: 'payment', title: '4. Payment Terms', icon: CreditCard },
    { id: 'budget', title: '5. Advertising Budget', icon: DollarSign },
    { id: 'performance', title: '6. Campaign Performance', icon: TrendingUp },
    { id: 'responsibilities', title: '7. Client Responsibilities', icon: UserCheck },
    { id: 'ip', title: '8. Intellectual Property', icon: Key },
    { id: 'confidentiality', title: '9. Confidentiality', icon: Lock },
    { id: 'platforms', title: '10. Third-Party Platforms', icon: Globe },
    { id: 'seo', title: '11. SEO Disclaimer', icon: Search },
    { id: 'webdev', title: '12. Website Development', icon: Code },
    { id: 'reporting', title: '13. Reporting', icon: BarChart2 },
    { id: 'refund', title: '14. Refund Policy', icon: RefreshCw },
    { id: 'cancellation', title: '15. Cancellation Policy', icon: Ban },
    { id: 'liability', title: '16. Limitation of Liability', icon: AlertOctagon },
    { id: 'privacy', title: '17. Privacy', icon: Shield },
    { id: 'modifications', title: '18. Modifications', icon: FileText },
    { id: 'law', title: '19. Governing Law', icon: Scale },
    { id: 'contact', title: '20. Contact Us', icon: Mail }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      // Find which section is currently in viewport
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.offsetTop - 120;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-deep-navy to-slate-900 text-white py-16 md:py-24 border-b border-slate-800 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" data-aos="fade-down">
          <span className="bg-primary-blue/20 text-blue-400 text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full border border-blue-500/20">
            Legal Agreement
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-4 font-heading tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base mt-4 font-light">
            Last Updated: July 2026
          </p>
          <p className="text-slate-300 max-w-2xl mx-auto text-xs sm:text-sm mt-2 font-normal italic opacity-95">
            Welcome to Digital Ads World. By accessing our website or using our services, you agree to the following Terms & Conditions. Please read them carefully before engaging our services.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Sticky Sidebar Nav - Desktop Only */}
            <aside className="hidden lg:block lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
                <h3 className="text-sm font-black text-premium-black uppercase tracking-wider mb-4 border-b border-slate-100 pb-3 font-heading">
                  Quick Navigation
                </h3>
                <nav className="flex flex-col gap-1">
                  {sections.map((section) => {
                    const IconComponent = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`flex items-center gap-3 px-3 py-2 text-left text-xs font-semibold rounded-xl transition-all duration-200 group ${
                          isActive 
                            ? 'bg-primary-blue text-white shadow-sm shadow-blue-500/25' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-primary-blue'
                        }`}
                      >
                        <IconComponent size={14} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary-blue'} />
                        <span className="truncate">{section.title.split('. ')[1]}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Right Scrollable Terms content */}
            <main className="col-span-1 lg:col-span-3 flex flex-col gap-8">
              
              {/* 1. Acceptance of Terms */}
              <div 
                id="acceptance" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <CheckCircle size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">1. Acceptance of Terms</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  By using our website or purchasing any service from Digital Ads World, you agree to be bound by these Terms & Conditions.
                </p>
              </div>

              {/* 2. Our Services */}
              <div 
                id="services" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">2. Our Services</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light mb-6">
                  Digital Ads World provides a comprehensive suite of digital marketing and technical solutions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Google Ads Management",
                    "Meta Ads Management",
                    "Performance Marketing",
                    "Search Engine Optimization (SEO)",
                    "Google Business Profile Optimization",
                    "Website Development",
                    "Social Media Management",
                    "Branding & Creative Design",
                    "Graphic Designing",
                    "Video Editing",
                    "Influencer Marketing",
                    "Lead Generation Consulting"
                  ].map((service, index) => (
                    <div key={index} className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-100 hover:bg-blue-50/20 transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-blue shrink-0" />
                      <span className="text-sm font-semibold text-slate-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Service Agreement */}
              <div 
                id="agreement" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">3. Service Agreement</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  Every project begins only after receiving the agreed advance payment and confirmation from the client.
                </p>
              </div>

              {/* 4. Payment Terms */}
              <div 
                id="payment" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <CreditCard size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">4. Payment Terms</h2>
                </div>
                <ul className="space-y-3">
                  {[
                    "Advance payment is required before work begins.",
                    "Remaining payments must be made as per the agreed schedule.",
                    "Delayed payments may result in suspension of services."
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[10px] font-bold">{index + 1}</span>
                      </div>
                      <span className="text-slate-600 text-sm md:text-base font-light leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5. Advertising Budget */}
              <div 
                id="budget" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <DollarSign size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">5. Advertising Budget</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  Advertising spend for Google Ads, Meta Ads, or any third-party platform is separate from the agency management fee unless otherwise agreed in writing.
                </p>
              </div>

              {/* 6. Campaign Performance */}
              <div 
                id="performance" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">6. Campaign Performance</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light mb-4">
                  We continuously optimize campaigns to achieve the best possible results. However, results such as leads, conversions, sales, rankings, or revenue depend on factors including market demand, competition, audience behaviour, platform algorithms, landing page quality, business offerings, and follow-up.
                </p>
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary-blue text-white flex items-center justify-center shrink-0 text-xs font-bold font-heading mt-0.5">i</div>
                  <p className="text-xs md:text-sm font-semibold text-slate-700 leading-relaxed">
                    Therefore, specific outcomes cannot be guaranteed.
                  </p>
                </div>
              </div>

              {/* 7. Client Responsibilities */}
              <div 
                id="responsibilities" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <UserCheck size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">7. Client Responsibilities</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light mb-4">
                  To ensure successful campaign operations, the client agrees to:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {[
                    "Provide accurate business information.",
                    "Approve creatives and campaigns promptly.",
                    "Provide timely access to required accounts.",
                    "Respond promptly to generated leads."
                  ].map((responsibility, index) => (
                    <li key={index} className="flex gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 items-start">
                      <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm font-medium">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 8. Intellectual Property */}
              <div 
                id="ip" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <Key size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">8. Intellectual Property</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  All logos, trademarks, content, and materials provided by the client remain the client's property. Marketing strategies, reports, and original creative work produced by Digital Ads World remain our intellectual property unless otherwise agreed.
                </p>
              </div>

              {/* 9. Confidentiality */}
              <div 
                id="confidentiality" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <Lock size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">9. Confidentiality</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  All client information, campaign data, business strategies, and account credentials will be treated as confidential.
                </p>
              </div>

              {/* 10. Third-Party Platforms */}
              <div 
                id="platforms" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <Globe size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">10. Third-Party Platforms</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  Campaigns are subject to the policies of Google, Meta, LinkedIn, YouTube, and other advertising platforms. We are not responsible for account suspensions, policy violations, or platform changes beyond our control.
                </p>
              </div>

              {/* 11. SEO Disclaimer */}
              <div 
                id="seo" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <Search size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">11. SEO Disclaimer</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  Search engine rankings depend on numerous external factors. While we follow industry best practices, first-page rankings or specific positions cannot be guaranteed.
                </p>
              </div>

              {/* 12. Website Development */}
              <div 
                id="webdev" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <Code size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">12. Website Development</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  Website delivery timelines depend on timely content, approvals, and client communication. Additional revisions beyond the agreed scope may incur additional charges.
                </p>
              </div>

              {/* 13. Reporting */}
              <div 
                id="reporting" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <BarChart2 size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">13. Reporting</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  Campaign reports will be shared according to the agreed reporting schedule.
                </p>
              </div>

              {/* 14. Refund Policy */}
              <div 
                id="refund" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-red-200/80 bg-red-50/10 shadow-sm scroll-mt-28 hover:shadow-md transition-all duration-300"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                    <RefreshCw size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">14. Refund Policy</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  Management fees, consultation fees, setup charges, and advertising spend already utilized are non-refundable once work has commenced.
                </p>
              </div>

              {/* 15. Cancellation Policy */}
              <div 
                id="cancellation" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <Ban size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">15. Cancellation Policy</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  Either party may terminate services by providing written notice. Outstanding dues remain payable for work completed up to the termination date.
                </p>
              </div>

              {/* 16. Limitation of Liability */}
              <div 
                id="liability" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-amber-200/80 bg-amber-50/10 shadow-sm scroll-mt-28 hover:shadow-md transition-all duration-300"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
                    <AlertOctagon size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">16. Limitation of Liability</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  Digital Ads World shall not be liable for indirect or consequential losses, including revenue loss, account restrictions, or service interruptions caused by third-party platforms or events beyond our reasonable control.
                </p>
              </div>

              {/* 17. Privacy */}
              <div 
                id="privacy" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <Shield size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">17. Privacy</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  Client information is handled in accordance with our Privacy Policy and is never sold to third parties.
                </p>
              </div>

              {/* 18. Modifications */}
              <div 
                id="modifications" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">18. Modifications</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  Digital Ads World reserves the right to update these Terms & Conditions at any time. Updated versions will be published on our website.
                </p>
              </div>

              {/* 19. Governing Law */}
              <div 
                id="law" 
                className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm scroll-mt-28 hover:shadow-md transition-shadow"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center">
                    <Scale size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-premium-black font-heading">19. Governing Law</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base font-light">
                  These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of the competent courts in Hyderabad, Telangana.
                </p>
              </div>

              {/* 20. Contact Us */}
              <div 
                id="contact" 
                className="bg-gradient-to-br from-slate-900 to-deep-navy text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl scroll-mt-28"
                data-aos="fade-up"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-primary-blue text-white flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-white font-heading">20. Contact Us</h2>
                </div>
                
                <div className="flex flex-col gap-6">
                  <div className="border-l-4 border-primary-blue pl-4 py-1">
                    <h3 className="text-lg font-bold text-white font-heading">{agencyInfo.name}</h3>
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Founder & CEO: K CHARAN</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <a 
                      href={`tel:+919381723378`} 
                      className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-blue/30 transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-primary-blue/20 text-primary-blue flex items-center justify-center shrink-0">
                        <Phone size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Call Us</p>
                        <p className="text-sm font-semibold text-white group-hover:text-primary-blue transition-colors">+91 9381723378</p>
                      </div>
                    </a>
                    
                    <a 
                      href={`mailto:${agencyInfo.email}`} 
                      className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-blue/30 transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-primary-blue/20 text-primary-blue flex items-center justify-center shrink-0">
                        <Mail size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Email Us</p>
                        <p className="text-sm font-semibold text-white group-hover:text-primary-blue transition-colors truncate max-w-[200px]">
                          {agencyInfo.email}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
