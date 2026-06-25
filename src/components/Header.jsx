import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, Menu, X, ArrowRight } from 'lucide-react';
import { agencyInfo } from '../data/siteContent';
import logo from '../assets/logo.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Our Team', path: '/team' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const handleNavigation = (path) => {
    setIsOpen(false);
    if (path === '/contact' && window.innerWidth < 1024) {
      setTimeout(() => {
        const element = document.getElementById('contact-form-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 w-full ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-3' 
        : 'bg-white border-b border-slate-50 py-4'
    }`}>
      {/* Scroll Progress Indicator */}
      <div 
        className="absolute bottom-0 left-0 h-[3px] bg-primary-blue transition-all duration-300"
        style={{
          width: `${
            typeof document !== 'undefined' 
              ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 
              : 0
          }%`
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" onClick={() => handleNavigation('/')} className="flex items-center group">
            <img src={logo} alt="Digital Ads World" className="h-16 md:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavigation(link.path)}
                  className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 pb-1 ${
                    isActive ? 'text-primary-blue' : 'text-dark-gray hover:text-primary-blue'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-blue rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${agencyInfo.phone}`}
              className="flex items-center gap-2 text-dark-gray hover:text-primary-blue transition-colors duration-300 font-bold text-sm bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl"
            >
              <Phone size={14} />
              <span>Call Now</span>
            </a>
            <a
              href={`https://wa.me/91${agencyInfo.whatsapp}?text=Hi%20Digital%20Ads%20World,%20I'm%20interested%20in%20scaling%20my%20business.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary-blue hover:bg-blue-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Now</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-dark-gray hover:text-primary-blue transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 animate-slide-up duration-200 py-6 px-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => handleNavigation(link.path)}
                  className={`text-base font-bold px-4 py-2.5 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-primary-blue' 
                      : 'text-dark-gray hover:bg-slate-50 hover:text-primary-blue'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <hr className="border-slate-100 my-2" />

            <div className="flex flex-col sm:flex-row gap-3 px-4">
              <a
                href={`tel:${agencyInfo.phone}`}
                className="flex items-center justify-center gap-2 text-dark-gray bg-slate-100 hover:bg-slate-200 py-3 rounded-xl font-bold transition-colors w-full"
              >
                <Phone size={16} />
                <span>Call Now</span>
              </a>
              <a
                href={`https://wa.me/91${agencyInfo.whatsapp}?text=Hi%20Digital%20Ads%20World,%20I'm%20interested%20in%20scaling%20my%20business.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary-blue hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition-colors w-full shadow-lg shadow-blue-500/15"
              >
                <MessageCircle size={17} />
                <span>WhatsApp Now</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
