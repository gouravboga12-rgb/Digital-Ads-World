import React, { useState, useEffect } from 'react';
import { gallery as initialGallery } from '../data/siteContent';
import { siteDataManager } from '../data/siteDataManager';
import Lightbox from '../components/Lightbox';
import { Maximize2, Tag } from 'lucide-react';

export default function Gallery() {
  const [items, setItems] = useState(initialGallery);
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    let active = true;
    siteDataManager.getGallery().then(data => {
      if (active && data && data.length > 0) {
        setItems(data);
      }
    }).catch(e => console.error("Gallery fetch failed:", e));
    return () => { active = false; };
  }, []);

  const filters = [
    { label: 'All Projects', value: 'all' },
    { label: 'Campaign Results', value: 'campaign' },
    { label: 'Ad Creatives', value: 'creative' },
    { label: 'Branding & Designs', value: 'branding' },
    { label: 'Websites', value: 'website' },
    { label: 'Video Projects', value: 'video' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? items 
    : items.filter(item => item.category === activeFilter);

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden bg-white">
      
      {/* Header Banner */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-down">
          <span className="bg-blue-50 text-primary-blue text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-premium-black mt-4 font-heading">
            Our Work & Results
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base mt-2 font-light">
            Browse our case results, graphic designs, landing pages, and marketing campaigns driving real performance metrics.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters List */}
          <div className="flex flex-wrap justify-center gap-2 mb-12" data-aos="fade-up">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => {
                    setActiveFilter(filter.value);
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

          {/* Masonry-like Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
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
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-6 flex flex-col gap-2 bg-white">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-primary-blue uppercase tracking-widest leading-none">
                    <Tag size={10} />
                    <span>{item.category}</span>
                  </div>
                  <h3 className="text-base font-bold text-premium-black font-heading mt-1 line-clamp-1 leading-tight group-hover:text-primary-blue transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Preview Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          activeItem={filteredItems[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}

    </div>
  );
}
