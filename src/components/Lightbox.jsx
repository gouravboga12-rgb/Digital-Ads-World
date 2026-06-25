import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ activeItem, onClose, onPrev, onNext }) {
  if (!activeItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose}></div>
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Close Lightbox"
      >
        <X size={24} />
      </button>

      {/* Control Buttons */}
      <button
        onClick={onPrev}
        className="absolute left-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={onNext}
        className="absolute right-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>

      {/* Media Content Container */}
      <div className="relative z-10 max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center pointer-events-none">
        <img
          src={activeItem.image_url}
          alt={activeItem.title}
          className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl pointer-events-auto"
        />
        
        {/* Caption Info */}
        <div className="mt-4 text-center pointer-events-auto bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5">
          <span className="text-primary-blue text-xs font-black tracking-widest uppercase">
            {activeItem.category}
          </span>
          <h3 className="text-white text-md font-bold mt-1 font-heading">
            {activeItem.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
