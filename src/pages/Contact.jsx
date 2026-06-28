import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle, Linkedin, Instagram, Facebook } from 'lucide-react';
import { agencyInfo as defaultAgencyInfo } from '../data/siteContent';
import { siteDataManager } from '../data/siteDataManager';

export default function Contact() {
  const [agencyInfo, setAgencyInfo] = useState(defaultAgencyInfo);
  const [formFields, setFormFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let active = true;
    async function loadData() {
      try {
        const [info, fields] = await Promise.all([
          siteDataManager.getAgencyInfo(),
          siteDataManager.getContactFormFields()
        ]);
        if (active) {
          if (info) setAgencyInfo(info);
          if (fields) {
            setFormFields(fields);
            
            // Initialize form keys
            const initialForm = {};
            fields.forEach(f => {
              if (f.type === 'select') {
                initialForm[f.name] = f.options && f.options.length > 0 ? f.options[0] : '';
              } else {
                initialForm[f.name] = '';
              }
            });
            setFormData(initialForm);
          }
        }
      } catch (e) {
        console.error("Error loading contact agencyInfo / fields:", e);
      }
    }
    loadData();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      const timer = setTimeout(() => {
        const element = document.getElementById('contact-form-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Fallback if critical fields are missing, but HTML5 validation handles this
    const name = formData.name || '';
    const phone = formData.phone || '';
    const email = formData.email || '';
    const service = formData.service || 'General Growth Consultation';
    
    // Compile all other field values into message
    let compiledMessage = '';
    formFields.forEach(field => {
      if (!['name', 'phone', 'email', 'service'].includes(field.name)) {
        compiledMessage += `${field.label}: ${formData[field.name] || ''}\n`;
      }
    });

    const payload = {
      name,
      email,
      phone,
      service,
      message: compiledMessage
    };

    try {
      await siteDataManager.submitLead(payload);
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.log('Mock server offline. Offline fallback active.'));

      // Send WhatsApp notification to agency owner
      const waNumber = agencyInfo?.whatsapp || agencyInfo?.phone || '9381723378';
      const waMsg = [
        `🔔 *New Contact Inquiry*`,
        `👤 *Name:* ${name}`,
        `📞 *Phone:* ${phone}`,
        `📧 *Email:* ${email}`,
        `💼 *Service:* ${service}`,
        compiledMessage ? `📝 *Message:* ${compiledMessage.replace(/\n/g, ' | ')}` : '',
        `🕐 *Time:* ${new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}`
      ].filter(Boolean).join('\n');
      window.open(`https://wa.me/91${waNumber}?text=${encodeURIComponent(waMsg)}`, '_blank');

      setSubmitted(true);
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
            <div id="contact-form-section" className="lg:col-span-7" data-aos="fade-left">
              <div className="bg-slate-50 border border-slate-100 p-8 md:p-10 rounded-3xl text-left shadow-xl">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-xl font-black text-premium-black font-heading mb-6 block lg:hidden">
                      Send Us a Message
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {formFields.map(field => (
                        <div key={field.name} className={`text-left ${field.type === 'textarea' ? 'sm:col-span-2' : ''}`}>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                            {field.label} {field.required && <span className="text-rose-500">*</span>}
                          </label>
                          
                          {field.type === 'textarea' ? (
                            <textarea
                              rows="4"
                              required={field.required}
                              placeholder={field.placeholder}
                              value={formData[field.name] || ''}
                              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                              className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm resize-none"
                            ></textarea>
                          ) : field.type === 'select' ? (
                            <select
                              required={field.required}
                              value={formData[field.name] || ''}
                              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                              className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                            >
                              {field.options && field.options.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type || 'text'}
                              required={field.required}
                              placeholder={field.placeholder}
                              value={formData[field.name] || ''}
                              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                              className="w-full px-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
                            />
                          )}
                        </div>
                      ))}
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
        {(() => {
          const rawUrl = agencyInfo.googleMapsEmbedUrl || '';
          // If it's already a proper embed URL, use it directly
          let embedUrl = rawUrl;
          if (rawUrl && rawUrl.includes('google.com/maps') && !rawUrl.includes('/embed')) {
            // Try to convert share URL to embed URL
            const placeMatch = rawUrl.match(/place\/([^/]+)/);
            const coordMatch = rawUrl.match(/@([\d.-]+),([\d.-]+)/);
            if (coordMatch) {
              embedUrl = `https://www.google.com/maps/embed?pb=!1m0!3m2!1sen!2sin!4v1!5m2!1sen!2sin&center=${coordMatch[1]},${coordMatch[2]}&zoom=15`;
              // Better: use the q= embed for a place name
              if (placeMatch) {
                embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD-placeholder&q=${encodeURIComponent(decodeURIComponent(placeMatch[1]))}`;
              }
            }
          }
          const isValidEmbed = embedUrl && (embedUrl.includes('/maps/embed') || embedUrl.includes('maps/embed'));
          if (!isValidEmbed) {
            return (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 gap-4">
                <div className="text-slate-400 text-center px-6">
                  <div className="text-4xl mb-3">📍</div>
                  <p className="font-bold text-slate-600 text-sm">Map not configured</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Go to Admin Panel → Contact Page Edit and paste a <strong>Google Maps Embed URL</strong> (must start with <code className="bg-slate-100 px-1 rounded">https://www.google.com/maps/embed</code>).
                  </p>
                </div>
              </div>
            );
          }
          return (
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Digital Ads World Office Location Map"
            ></iframe>
          );
        })()}
      </section>

    </div>
  );
}
