import React from 'react';
import { team, agencyInfo } from '../data/siteContent';
import { Target, Eye, Shield, Users, Compass, CompassIcon, Landmark, Star, CheckSquare } from 'lucide-react';
import marketingTeamImg from '../assets/marketing_team.png';

export default function About() {
  const coreValues = [
    {
      title: "Absolute ROI Focus",
      description: "We align all marketing strategies with actual sales revenue and cashflow, rather than clicks or branding impressions.",
      icon: Target
    },
    {
      title: "Data Transparency",
      description: "No hidden spreadsheets. Our partners see live conversion data routed directly from platforms like Google Ads and Meta Pixel.",
      icon: Eye
    },
    {
      title: "High Integrity",
      description: "We are selective about partnerships. If we believe a product is not ready to scale, we state it transparently.",
      icon: Shield
    },
    {
      title: "Creative Innovation",
      description: "Dynamic ad creative styles are changed consistently to combat audience fatigue and reduce conversion prices.",
      icon: Users
    }
  ];

  const milestones = [
    { year: "2023", title: "The Inception", desc: "Digital Ads World was founded in Hyderabad by K Charan with a single goal: driving performance-first results." },
    { year: "2024", title: "Scaling Up", desc: "D Sri Ram joined to spearhead Digital Marketing, expanding ad management capacity by 300%." },
    { year: "2025", title: "Global Client Base", desc: "Serviced over 50+ clients globally, managing over $2.4 Million in cumulative ad spend." },
    { year: "2026", title: "Dynamic Lead Systems", desc: "Launched automated conversation funnels integrating client databases with immediate WhatsApp routing." }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-white">
      
      {/* Page Header Banner */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-down">
          <span className="bg-blue-50 text-primary-blue text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full">
            Who We Are
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-premium-black mt-4 font-heading">
            Meet the Results-Driven Agency
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base mt-2 font-light">
            We are a group of developers, copywriters, and media buyers who don't run ads, but drive verified growth.
          </p>
        </div>
      </section>
      
      {/* Company Overview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 flex flex-col gap-6 text-left" data-aos="fade-right">
              <span className="text-xs font-black tracking-widest text-primary-blue uppercase">Our Philosophy</span>
              <h2 className="text-3xl font-black text-premium-black font-heading leading-tight">
                Empowering Businesses To Break Through Stagnation.
              </h2>
              <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-base">
                Traditional marketing models rely heavily on generic brand awareness campaigns that fail to justify their cost. At Digital Ads World, we operate on a completely different model: performance-based customer acquisition. We construct custom digital pipelines for each of our clients, syncing highly persuasive ad copies, landing pages, and email lists to deliver high-converting inquiries.
              </p>
              <div className="space-y-3">
                {['Custom optimization cycles', 'Dedicated account managers', 'Daily budget checks', 'ROI matching models'].map((text, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckSquare size={16} className="text-primary-blue" />
                    <span className="text-sm font-semibold text-slate-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6" data-aos="fade-left">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={marketingTeamImg}
                  alt="Marketing team"
                  className="rounded-3xl w-full h-[280px] object-cover shadow-md"
                />
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
                  alt="Collaboration team"
                  className="rounded-3xl w-full h-[280px] object-cover mt-8 shadow-md"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Founders message */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-widest text-primary-blue uppercase">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-black mt-3 text-premium-black font-heading">
              Our Founders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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

      {/* Vision, Mission, Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 text-left">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100/50" data-aos="fade-right">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center mb-6">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-premium-black font-heading mb-3">Our Mission</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                To construct scalable customer acquisition channels that transform marketing budgets into transparent, compounding sales pipelines. We resolve to elevate industry benchmarks through data-driven campaigns.
              </p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100/50" data-aos="fade-left">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center mb-6">
                <Eye size={24} />
              </div>
              <h3 className="text-xl font-bold text-premium-black font-heading mb-3">Our Vision</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                To be recognized as the premier global standard for ROI-centric performance marketing, helping over 1,000 businesses break past digital plateaus using specialized funnel designs.
              </p>
            </div>
          </div>

          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-widest text-primary-blue uppercase">Our Values</span>
            <h2 className="text-3xl font-black mt-3 text-premium-black font-heading">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            {coreValues.map((value, i) => {
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

      {/* Our Journey Timeline */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-black tracking-widest text-primary-blue uppercase">Timeline</span>
            <h2 className="text-3xl font-black mt-3 text-premium-black font-heading">Our Journey</h2>
          </div>

          <div className="relative border-l border-slate-200 ml-4 md:ml-32 md:mr-32 text-left">
            {milestones.map((item, index) => (
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

    </div>
  );
}
