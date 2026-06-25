import React from 'react';
import { team } from '../data/siteContent';
import { Linkedin, Twitter } from 'lucide-react';

export default function Team() {
  return (
    <div className="relative w-full overflow-hidden bg-white">
      
      {/* Header Banner */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-down">
          <span className="bg-blue-50 text-primary-blue text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full">
            Leadership
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-premium-black mt-4 font-heading">
            Our Professional Team
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base mt-2 font-light">
            Meet the founders and leadership behind Digital Ads World.
          </p>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <div 
                key={member.id} 
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-slate-200">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className={`w-full h-full object-cover ${member.objectPosition || 'object-center'}`}
                  />
                </div>
                <div className="p-6 flex flex-col gap-2 flex-grow bg-white text-left">
                  <div>
                    <h3 className="text-base font-bold text-premium-black font-heading leading-tight">{member.name}</h3>
                    <span className="text-[11px] font-black uppercase text-primary-blue tracking-wider">{member.designation}</span>
                  </div>
                  <p className="text-slate-500 text-xs font-light leading-relaxed mt-1 line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
