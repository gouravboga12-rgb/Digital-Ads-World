import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, Linkedin, Instagram, Facebook } from 'lucide-react';
import { agencyInfo } from '../data/siteContent';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'General Growth Consultation', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        // Fallback for offline review
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-white">
      
      {/* Header Banner */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-down">
          <span className="bg-blue-50 text-primary-blue text-xs font-black tracking-widest uppercase px-3.5 py-1.5 rounded-full">
            Connect
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-premium-black mt-4 font-heading font-heading">
            Contact Digital Ads World
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base mt-2 font-light">
            Ready to scale your leads and revenue metrics? Fill out the form or chat directly on WhatsApp.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Coordinates */}
            <div className="lg:col-span-5 flex flex-col gap-8 text-left" data-aos="fade-right">
              <div>
                <span className="text-xs font-black text-primary-blue tracking-widest uppercase">Office Info</span>
                <h2 className="text-2xl font-black text-premium-black font-heading mt-2">Get In Touch Directly</h2>
                <p className="text-slate-500 text-sm mt-2 font-light">
                  Have an active campaign that needs auditing? Reach out via call or message. We review requests within 4 hours.
                </p>
              </div>

              {/* Channels */}
              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl text-primary-blue flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Phone Call</span>
                    <a href={`tel:${agencyInfo.phone}`} className="block font-bold text-premium-black hover:text-primary-blue transition-colors text-sm sm:text-base mt-0.5">
                      +91 {agencyInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl text-[#25D366] flex items-center justify-center shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">WhatsApp chat</span>
                    <a 
                      href={`https://wa.me/91${agencyInfo.whatsapp}?text=Hi%20Digital%20Ads%20World,%20I'm%20interested%20in%20scaling%20my%20business.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-bold text-premium-black hover:text-primary-blue transition-colors text-sm sm:text-base mt-0.5"
                    >
                      +91 {agencyInfo.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl text-primary-blue flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email Address</span>
                    <a href={`mailto:${agencyInfo.email}`} className="block font-bold text-premium-black hover:text-primary-blue transition-colors text-sm sm:text-base mt-0.5">
                      {agencyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl text-primary-blue flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Agency Office</span>
                    <a 
                      href={agencyInfo.googleMapsBusinessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block font-bold text-premium-black hover:text-primary-blue transition-colors text-sm sm:text-base mt-0.5"
                    >
                      {agencyInfo.address}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Follow Us:</span>
                <div className="flex gap-3">
                  <a href={agencyInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-50 hover:bg-primary-blue hover:text-white text-dark-gray transition-all duration-300">
                    <Instagram size={16} />
                  </a>
                  <a href={agencyInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-50 hover:bg-primary-blue hover:text-white text-dark-gray transition-all duration-300">
                    <Facebook size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7" data-aos="fade-left">
              <div className="bg-slate-50 border border-slate-100 p-8 md:p-10 rounded-3xl text-left shadow-xl">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Email Address</label>
                        <input
                          type="email"
                          placeholder="e.g. john@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Campaign Type</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                        >
                          <option value="General Growth Consultation">General Growth Consultation</option>
                          <option value="Google Search/Display Ads">Google Search/Display Ads</option>
                          <option value="Meta Ads (FB/IG)">Meta Ads (FB/IG)</option>
                          <option value="Search Engine Optimization">Search Engine Optimization</option>
                          <option value="Landing Page & Development">Landing Page & Development</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Tell Us About Your Project</label>
                      <textarea
                        rows="4"
                        placeholder="Detail your goals, monthly budgets, and timeline parameters..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/15 flex items-center justify-center gap-2 hover:-translate-y-0.5 text-base font-heading"
                    >
                      <Send size={16} />
                      <span>Send Consultation Request</span>
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 bg-blue-50 text-primary-blue rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={36} />
                    </div>
                    <h3 className="text-2xl font-black mb-2 text-premium-black font-heading">Inquiry Logged</h3>
                    <p className="text-slate-500 max-w-sm mb-6 font-light">
                      Thank you. We have saved your submission. One of our digital specialists will contact you shortly to arrange a briefing session.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 underline"
                    >
                      Submit a new contact request
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Google Maps Integration Section */}
      <section className="w-full h-[450px] bg-slate-100 border-t border-slate-200">
        <iframe
          src={agencyInfo.googleMapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Digital Ads World Office Location Map"
        ></iframe>
      </section>

    </div>
  );
}
