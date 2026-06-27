import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { agencyInfo as defaultAgencyInfo } from '../data/siteContent';
import { siteDataManager } from '../data/siteDataManager';

export default function FloatingCTAs() {
  const [agencyInfo, setAgencyInfo] = useState(defaultAgencyInfo);

  useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        const info = await siteDataManager.getAgencyInfo();
        if (active && info) {
          setAgencyInfo(info);
        }
      } catch (e) {
        console.error("Error loading FloatingCTAs agencyInfo:", e);
      }
    }
    loadData();
    return () => { active = false; };
  }, []);

  const whatsappNumber = agencyInfo.floating_whatsapp || agencyInfo.whatsapp;
  const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=Hi%20Digital%20Ads%20World,%20I'm%20interested%20in%20scaling%20my%20business.`;
  const callUrl = `tel:${agencyInfo.phone}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
      {/* Phone Button */}
      <a
        href={callUrl}
        className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-2xl hover:bg-slate-800 transition-all duration-300 hover:scale-110 group relative"
        aria-label="Call Now"
      >
        <Phone size={22} className="animate-pulse" />
        <span className="absolute right-16 top-3 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md pointer-events-none">
          Call Agency
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 group relative"
        aria-label="WhatsApp Chat"
      >
        <MessageCircle size={26} className="animate-bounce" />
        <span className="absolute right-16 top-3 bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
