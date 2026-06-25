import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/siteContent';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function Services() {
  const [expandedServices, setExpandedServices] = useState({});

  const toggleExpand = (id) => {
    setExpandedServices(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Dynamically resolve lucide icons
  const renderIcon = (iconName, className) => {
    const IconComponent = LucideIcons[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <LucideIcons.HelpCircle className={className} />;
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
                        <ArrowRight size={14} className="group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    {/* 5 Points - Collapsible */}
                    {expandedServices[service.id] && (
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

                  {/* Toggle Button */}
                  <div className="pt-4 border-t border-slate-50 mt-auto">
                    <button
                      onClick={() => toggleExpand(service.id)}
                      className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-primary-blue font-bold rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>{expandedServices[service.id] ? 'Hide Details' : 'View More Details'}</span>
                      {expandedServices[service.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
