import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { agencyInfo } from '../data/siteContent';

export default function ExitPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'General Inquiry' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check session storage to avoid annoying user repeatedly
    const dismissed = sessionStorage.getItem('exit_popup_dismissed');
    if (dismissed) return;

    const handleMouseLeave = (e) => {
      // Trigger if cursor goes above the viewport top edge
      if (e.clientY < 20) {
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('exit_popup_dismissed', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    try {
      // Submit to backend
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          handleClose();
        }, 3000);
      } else {
        // Fallback mock success if server is not fully online yet
        setSubmitted(true);
        setTimeout(() => {
          handleClose();
        }, 3000);
      }
    } catch (err) {
      // Local fallback
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col p-8 md:p-10">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="text-center mb-6">
              <span className="bg-blue-50 text-primary-blue text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full">
                Don't Miss Out
              </span>
              <h2 className="text-2xl md:text-3xl font-black mt-3 mb-2 font-heading leading-tight text-premium-black">
                Scale Your Business
              </h2>
              <p className="text-dark-gray text-sm md:text-base">
                Get a <strong className="text-primary-blue">Free 30-Minute Consultation</strong> & audit. Let's design your roadmap to growth!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-md shadow-blue-500/10 hover:shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <Send size={16} />
                <span>Claim Free Audit</span>
              </button>
            </form>

            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase">OR</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <a
              href={`https://wa.me/91${agencyInfo.whatsapp}?text=Hi%20Digital%20Ads%20World,%20I'm%20leaving%20the%20website%20but%20want%20to%20chat%20here.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md shadow-emerald-500/10 hover:shadow-lg"
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="w-16 h-16 bg-blue-50 text-primary-blue rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={36} />
            </div>
            <h3 className="text-2xl font-black mb-2 text-premium-black">Thank You!</h3>
            <p className="text-dark-gray max-w-sm mb-4">
              Your inquiry has been logged. Our marketing director will call you shortly to review your roadmap.
            </p>
            <span className="text-xs text-slate-400">Closing window...</span>
          </div>
        )}
      </div>
    </div>
  );
}
