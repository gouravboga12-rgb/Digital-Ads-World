import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Linkedin, Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import { agencyInfo as defaultAgencyInfo } from '../data/siteContent';
import { siteDataManager } from '../data/siteDataManager';
import { useState, useEffect } from 'react';
import footerLogo from '../assets/footer_logo.png';

export default function Footer() {
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
        console.error("Error loading footer agencyInfo:", e);
      }
    }
    loadData();
    return () => { active = false; };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-deep-navy text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info Column */}
          <div className="flex flex-col gap-6">
            <Link to="/" onClick={handleScrollToTop} className="flex items-center group w-fit">
              <img src={footerLogo} alt="Digital Ads World" className="h-16 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              "{agencyInfo.tagline}" We are a premium performance marketing agency focused on driving verified leads, phone calls, and direct business growth for startups, brands, and local companies.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={agencyInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary-blue text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={agencyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-primary-blue text-white flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-md font-bold tracking-wider uppercase text-slate-200 mb-6 font-heading">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Our Team', path: '/team' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={handleScrollToTop}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quick Column */}
          <div>
            <h3 className="text-md font-bold tracking-wider uppercase text-slate-200 mb-6 font-heading">
              Key Services
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Google Ads', path: '/services' },
                { name: 'Meta Ads', path: '/services' },
                { name: 'SEO Optimization', path: '/services' },
                { name: 'Social Media', path: '/services' },
                { name: 'Website Development', path: '/services' },
                { name: 'Branding & Design', path: '/services' }
              ].map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    onClick={handleScrollToTop}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-md font-bold tracking-wider uppercase text-slate-200 mb-6 font-heading">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-blue shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">{agencyInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-blue shrink-0" />
                <a href={`tel:${agencyInfo.phone}`} className="text-slate-400 hover:text-white text-sm transition-colors">
                  +91 {agencyInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-blue shrink-0" />
                <a href={`mailto:${agencyInfo.email}`} className="text-slate-400 hover:text-white text-sm transition-colors">
                  {agencyInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-slate-800 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {agencyInfo.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" onClick={handleScrollToTop} className="hover:text-slate-400">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
