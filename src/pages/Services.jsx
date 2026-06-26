import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/siteContent';
import * as LucideIcons from 'lucide-react';
import { 
  ArrowRight, CheckCircle2, ChevronDown, ChevronUp,
  Mail, UserPlus, Shield, Instagram, Laptop, Code, Sparkles, BarChart3, Award
} from 'lucide-react';

export default function Services() {
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

  return (
    <div className="relative w-full overflow-hidden bg-white">
      
      {/* Header Section */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <span className="bg-blue-50 text-primary-blue text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full">
            Expertise
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-premium-black mt-4 font-heading">
            Our Performance Services
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base mt-2 font-light">
            We deliver engineered media buying, custom development, and visual assets designed to capture leads and drive client acquisitions.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
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
                    <span>Apply / Inquire Now</span>
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

        </div>
      </section>

    </div>
  );
}
