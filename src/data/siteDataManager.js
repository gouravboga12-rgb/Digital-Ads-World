import * as db from './supabaseService';
import { 
  agencyInfo as defaultAgencyInfo, 
  services as defaultServices, 
  team as defaultTeam, 
  testimonials as defaultTestimonials,
  gallery as defaultGallery,
  defaultBrands,
  faqs as defaultFaqsImport,
  defaultJourney
} from './siteContent';

const defaultIndustries = [
  { id: 'i1', title: 'Healthcare', desc: 'Hospitals • Clinics • Pharma', icon: 'Activity', color: 'bg-red-50 text-red-500 border-red-100' },
  { id: 'i2', title: 'Education & EdTech', desc: 'Schools • Universities • LMS', icon: 'GraduationCap', color: 'bg-blue-50 text-blue-500 border-blue-100' },
  { id: 'i3', title: 'IT & ITES', desc: 'Software • SaaS • Services', icon: 'Laptop', color: 'bg-indigo-50 text-indigo-500 border-indigo-100' },
  { id: 'i4', title: 'Real Estate', desc: 'Builders • Developers • Plots', icon: 'HomeIcon', color: 'bg-amber-50 text-amber-500 border-amber-100' },
  { id: 'i5', title: 'Fintech & Banking', desc: 'Insurance • Trading • NBFC', icon: 'DollarSign', color: 'bg-green-50 text-green-500 border-green-100' },
  { id: 'i6', title: 'Solar Energy', desc: 'Panels • Installation • EPC', icon: 'Sun', color: 'bg-yellow-50 text-yellow-600 border-yellow-100' },
  { id: 'i7', title: 'E-Commerce & D2C', desc: 'Marketplace • Retail • Shopify', icon: 'ShoppingCart', color: 'bg-cyan-50 text-cyan-500 border-cyan-100' },
  { id: 'i8', title: 'Manufacturing', desc: 'Industrial • B2B • Export', icon: 'Factory', color: 'bg-slate-50 text-slate-600 border-slate-200' },
  { id: 'i9', title: 'Fashion & Beauty', desc: 'Brands • Salons • D2C', icon: 'ShoppingBag', color: 'bg-pink-50 text-pink-500 border-pink-100' },
  { id: 'i10', title: 'NGOs & Social Impact', desc: 'Donations • Awareness', icon: 'Heart', color: 'bg-rose-50 text-rose-500 border-rose-100' },
  { id: 'i11', title: 'Entertainment', desc: 'Media • Events • OTT', icon: 'Video', color: 'bg-purple-50 text-purple-500 border-purple-100' },
  { id: 'i12', title: 'Human Resources', desc: 'Recruitment • Staffing • HR Tech', icon: 'Users', color: 'bg-teal-50 text-teal-500 border-teal-100' }
];

const defaultFaqs = defaultFaqsImport.map((f, i) => ({ id: `faq${i+1}`, ...f }));

// Pre-seeded terms
const defaultTerms = [
  { id: 'acceptance', title: '1. Acceptance of Terms', content: 'By using our website or purchasing any service from Digital Ads World, you agree to be bound by these Terms & Conditions.' },
  { 
    id: 'services', 
    title: '2. Our Services', 
    content: 'Digital Ads World provides a comprehensive suite of digital marketing and technical solutions including Google Ads Management, Meta Ads Management, Performance Marketing, Search Engine Optimization (SEO), Website Development, and more.' 
  },
  { id: 'agreement', title: '3. Service Agreement', content: 'Every project begins only after receiving the agreed advance payment and confirmation from the client.' },
  { id: 'payment', title: '4. Payment Terms', content: 'All payments must be made as per the agreed schedule in the project proposal. Late payments may result in suspension of marketing campaigns.' },
  { id: 'budget', title: '5. Advertising Budget', content: 'Ad budgets spent directly on third-party platforms (like Google and Meta) are paid by the client directly and are separate from our agency management fees.' },
  { id: 'performance', title: '6. Campaign Performance', content: 'We focus on performance marketing and conversion metrics. While we guarantee campaign visibility and search optimizations, final sales conversion is dependent on client market factors and close rates.' },
  { id: 'responsibilities', title: '7. Client Responsibilities', content: 'Clients must provide prompt feedback, correct brand assets, and access permissions in a timely manner. Delays in approvals will affect delivery dates.' },
  { id: 'ip', title: '8. Intellectual Property', content: 'All custom layouts, ad copywriting, and creative graphics developed for the client belong to the client upon full payment clearance.' },
  { id: 'confidentiality', title: '9. Confidentiality', content: 'Both parties agree to keep all business trade details, customer lists, and financial figures strictly confidential.' },
  { id: 'platforms', title: '10. Third-Party Platforms', content: 'We are subject to third-party policies (Google Ads, Meta Policies). We are not liable for account suspensions or changes in algorithms out of our direct control.' },
  { id: 'seo', title: '11. SEO Disclaimer', content: 'SEO requires 3 to 6 months for rank traction. We follow white-hat techniques but do not guarantee specific rank positions as search algorithms change.' },
  { id: 'webdev', title: '12. Website Development', content: 'Custom site setups include 30 days of post-launch maintenance support. Future updates, hosting fees, and security renewals are billed separately.' },
  { id: 'reporting', title: '13. Reporting', content: 'Attribution tracking is synced to live Google/Meta reports. We generate monthly analytics dashboards for full transparency.' },
  { id: 'refund', title: '14. Refund Policy', content: 'Fees paid for ad campaigns, technical optimization, and design work are non-refundable since they cover custom labor and ad platform media buy costs.' },
  { id: 'cancellation', title: '15. Cancellation Policy', content: 'Either party can cancel active ongoing retainer contracts by providing a written notice 30 days in advance.' },
  { id: 'liability', title: '16. Limitation of Liability', content: 'Digital Ads World is not liable for any indirect or consequential business losses resulting from campaign modifications, hosting downtime, or platform policy changes.' },
  { id: 'privacy', title: '17. Privacy', content: 'Client data is protected using high-grade security tools. We never share your statistics or customer files with any external network.' },
  { id: 'modifications', title: '18. Modifications', content: 'We reserve the right to modify these Terms and Conditions at any time. Changes will be posted immediately on our website.' },
  { id: 'law', title: '19. Governing Law', content: 'These terms are governed by the laws of India, under jurisdiction of courts in Hyderabad, Telangana.' },
  { id: 'contact', title: '20. Contact Us', content: 'For legal queries, reach us at legal@digitaladsworld.com or contact our office coordinates listed on the contact page.' }
];

// Seed/initialize local storage helpers
function getLocalItem(key, defaultValue) {
  const val = localStorage.getItem(key);
  if (!val) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(val);
  } catch (e) {
    return defaultValue;
  }
}

function setLocalItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const defaultContactFormFields = [
  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'e.g. John Doe', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'e.g. 9876543210', required: true },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'e.g. john@company.com', required: true },
  { name: 'service', label: 'Interested Service', type: 'select', options: ['General Growth Consultation', 'Google Ads', 'Meta Ads', 'SEO', 'Website Development'], required: true },
  { name: 'message', label: 'Custom Message', type: 'textarea', placeholder: 'Describe your requirements...', required: false }
];

const defaultServiceInquiryFields = [
  { name: 'website', label: 'Website / Social Media URL', type: 'text', placeholder: 'e.g. https://example.com', required: true },
  { name: 'goals', label: 'Primary Business Goals', type: 'textarea', placeholder: 'Describe what you want to achieve...', required: false }
];

// Pre-seed local storage
getLocalItem('agency_info', defaultAgencyInfo);
getLocalItem('services', defaultServices);
getLocalItem('team', defaultTeam);
getLocalItem('testimonials', defaultTestimonials);
getLocalItem('gallery', defaultGallery);
getLocalItem('terms_and_conditions', defaultTerms);
getLocalItem('contact_form_fields', defaultContactFormFields);
getLocalItem('brands', defaultBrands);
getLocalItem('industries', defaultIndustries);
getLocalItem('faqs', defaultFaqs);
getLocalItem('leads', [
  { id: "l-1", name: "John Doe", email: "john@example.com", phone: "9876543210", service: "Google Ads", message: "Free consultation request.", status: "new", created_at: new Date().toISOString() },
  { id: "l-2", name: "Sarah Smith", email: "sarah@ecom.com", phone: "9123456789", service: "Meta Ads", message: "Scale Shopify store conversions.", status: "contacted", created_at: new Date(Date.now() - 86400000).toISOString() }
]);

export const siteDataManager = {
  // --- AGENCY INFO ---
  async getAgencyInfo() {
    try {
      const data = await db.fetchSettings('agency_info');
      if (data) {
        setLocalItem('agency_info', data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchSettings(agency_info) failed, using local fallback:', e);
    }
    return getLocalItem('agency_info', defaultAgencyInfo);
  },

  async saveAgencyInfo(info) {
    setLocalItem('agency_info', info);
    try {
      await db.updateSettings('agency_info', info);
    } catch (e) {
      console.error('Supabase updateSettings(agency_info) failed:', e);
    }
    return info;
  },

  // --- CONTACT FORM FIELDS ---
  async getContactFormFields() {
    try {
      const data = await db.fetchSettings('contact_form_fields');
      if (data) {
        setLocalItem('contact_form_fields', data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchSettings(contact_form_fields) failed, using local fallback:', e);
    }
    return getLocalItem('contact_form_fields', defaultContactFormFields);
  },

  async saveContactFormFields(fields) {
    setLocalItem('contact_form_fields', fields);
    try {
      await db.updateSettings('contact_form_fields', fields);
    } catch (e) {
      console.error('Supabase updateSettings(contact_form_fields) failed:', e);
    }
    return fields;
  },

  // --- SERVICE INQUIRY FORM FIELDS ---
  async getServiceInquiryFields(serviceSlug = 'general') {
    const key = `service_inquiry_fields_${serviceSlug}`;
    try {
      const data = await db.fetchSettings(key);
      if (data) {
        setLocalItem(key, data);
        return data;
      }
    } catch (e) {
      console.warn(`Supabase fetchSettings(${key}) failed, using local fallback:`, e);
    }
    return getLocalItem(key, defaultServiceInquiryFields);
  },

  async saveServiceInquiryFields(serviceSlug = 'general', fields) {
    const key = `service_inquiry_fields_${serviceSlug}`;
    setLocalItem(key, fields);
    try {
      await db.updateSettings(key, fields);
    } catch (e) {
      console.error(`Supabase updateSettings(${key}) failed:`, e);
    }
    return fields;
  },

  // --- BRANDS ---
  async getBrands() {
    try {
      const data = await db.fetchSettings('brands');
      if (data) {
        setLocalItem('brands', data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchSettings(brands) failed, using local fallback:', e);
    }
    return getLocalItem('brands', defaultBrands);
  },

  async saveBrands(brands) {
    setLocalItem('brands', brands);
    try {
      await db.updateSettings('brands', brands);
    } catch (e) {
      console.error('Supabase updateSettings(brands) failed:', e);
    }
    return brands;
  },

  // --- SERVICES ---
  async getServices() {
    try {
      const data = await db.fetchServices();
      if (data && data.length > 0) {
        setLocalItem('services', data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchServices failed, using local fallback:', e);
    }
    return getLocalItem('services', defaultServices);
  },

  async addService(service) {
    const list = getLocalItem('services', defaultServices);
    const newService = { id: Math.random().toString(36).substring(2, 9), ...service };
    list.push(newService);
    setLocalItem('services', list);
    
    try {
      // Omit temporary client-side ID to let Supabase autogenerate uuid
      const { id, ...dbPayload } = service;
      const created = await db.createService(dbPayload);
      if (created) {
        // Sync generated ID back to local list
        const updatedList = list.map(item => item.slug === created.slug ? created : item);
        setLocalItem('services', updatedList);
        return created;
      }
    } catch (e) {
      console.error('Supabase createService failed, saved locally only:', e);
    }
    return newService;
  },

  async updateService(id, serviceData) {
    const list = getLocalItem('services', defaultServices);
    const updatedList = list.map(item => item.id === id ? { ...item, ...serviceData } : item);
    setLocalItem('services', updatedList);

    try {
      await db.editService(id, serviceData);
    } catch (e) {
      console.error('Supabase editService failed:', e);
    }
    return { id, ...serviceData };
  },

  async deleteService(id) {
    const list = getLocalItem('services', defaultServices);
    const filtered = list.filter(item => item.id !== id);
    setLocalItem('services', filtered);

    try {
      await db.removeService(id);
    } catch (e) {
      console.error('Supabase removeService failed:', e);
    }
    return true;
  },

  // --- TEAM ---
  async getTeam() {
    try {
      const data = await db.fetchTeam();
      if (data && data.length > 0) {
        setLocalItem('team', data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchTeam failed, using local fallback:', e);
    }
    return getLocalItem('team', defaultTeam);
  },

  async addTeamMember(member) {
    const list = getLocalItem('team', defaultTeam);
    const newMember = { id: Math.random().toString(36).substring(2, 9), ...member };
    list.push(newMember);
    setLocalItem('team', list);

    try {
      const { id, ...dbPayload } = member;
      const created = await db.createTeamMember(dbPayload);
      if (created) {
        const updatedList = list.map(item => item.name === created.name ? created : item);
        setLocalItem('team', updatedList);
        return created;
      }
    } catch (e) {
      console.error('Supabase createTeamMember failed, saved locally:', e);
    }
    return newMember;
  },

  async updateTeamMember(id, memberData) {
    const list = getLocalItem('team', defaultTeam);
    const updatedList = list.map(item => item.id === id ? { ...item, ...memberData } : item);
    setLocalItem('team', updatedList);

    try {
      await db.editTeamMember(id, memberData);
    } catch (e) {
      console.error('Supabase editTeamMember failed:', e);
    }
    return { id, ...memberData };
  },

  async deleteTeamMember(id) {
    const list = getLocalItem('team', defaultTeam);
    const filtered = list.filter(item => item.id !== id);
    setLocalItem('team', filtered);

    try {
      await db.removeTeamMember(id);
    } catch (e) {
      console.error('Supabase removeTeamMember failed:', e);
    }
    return true;
  },

  // --- TESTIMONIALS ---
  async getTestimonials() {
    try {
      const data = await db.fetchSettings('testimonials');
      if (data) {
        setLocalItem('testimonials', data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchSettings(testimonials) failed, using local fallback:', e);
    }
    return getLocalItem('testimonials', defaultTestimonials);
  },

  async saveTestimonials(testimonials) {
    setLocalItem('testimonials', testimonials);
    try {
      await db.updateSettings('testimonials', testimonials);
    } catch (e) {
      console.error('Supabase updateSettings(testimonials) failed:', e);
    }
    return testimonials;
  },

  async addTestimonial(testimonial) {
    const list = await this.getTestimonials();
    const newItem = { id: Math.random().toString(36).substring(2, 9), ...testimonial };
    list.push(newItem);
    await this.saveTestimonials(list);
    return newItem;
  },

  async updateTestimonial(id, testimonialData) {
    const list = await this.getTestimonials();
    const updatedList = list.map(item => item.id === id ? { ...item, ...testimonialData } : item);
    await this.saveTestimonials(updatedList);
    return { id, ...testimonialData };
  },

  async deleteTestimonial(id) {
    const list = await this.getTestimonials();
    const filtered = list.filter(item => item.id !== id);
    await this.saveTestimonials(filtered);
    return true;
  },

  // --- GALLERY ---
  async getGallery() {
    try {
      const data = await db.fetchGallery();
      if (data && data.length > 0) {
        setLocalItem('gallery', data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchGallery failed, using local fallback:', e);
    }
    return getLocalItem('gallery', defaultGallery);
  },

  async addGalleryItem(item) {
    const list = getLocalItem('gallery', defaultGallery);
    const newItem = { id: Math.random().toString(36).substring(2, 9), created_at: new Date().toISOString(), ...item };
    list.unshift(newItem);
    setLocalItem('gallery', list);

    try {
      const { id, ...dbPayload } = item;
      const created = await db.createGalleryItem(dbPayload);
      if (created) {
        const updatedList = list.map(g => g.title === created.title ? created : g);
        setLocalItem('gallery', updatedList);
        return created;
      }
    } catch (e) {
      console.error('Supabase createGalleryItem failed, saved locally:', e);
    }
    return newItem;
  },

  async deleteGalleryItem(id) {
    const list = getLocalItem('gallery', defaultGallery);
    const filtered = list.filter(item => item.id !== id);
    setLocalItem('gallery', filtered);

    try {
      await db.removeGalleryItem(id);
    } catch (e) {
      console.error('Supabase removeGalleryItem failed:', e);
    }
    return true;
  },

  async updateGalleryItem(id, itemData) {
    const list = getLocalItem('gallery', defaultGallery);
    const updated = list.map(item => item.id === id ? { ...item, ...itemData } : item);
    setLocalItem('gallery', updated);

    try {
      await db.updateGalleryItem(id, itemData);
    } catch (e) {
      console.error('Supabase updateGalleryItem failed:', e);
    }
    return true;
  },

  // --- TERMS AND CONDITIONS ---
  async getTermsAndConditions() {
    try {
      const data = await db.fetchSettings('terms_and_conditions');
      if (data) {
        setLocalItem('terms_and_conditions', data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchSettings(terms_and_conditions) failed, using local fallback:', e);
    }
    return getLocalItem('terms_and_conditions', defaultTerms);
  },

  async saveTermsAndConditions(terms) {
    setLocalItem('terms_and_conditions', terms);
    try {
      await db.updateSettings('terms_and_conditions', terms);
    } catch (e) {
      console.error('Supabase updateSettings(terms_and_conditions) failed:', e);
    }
    return terms;
  },

  // --- LEADS / INQUIRIES ---
  async getLeads() {
    try {
      const data = await db.fetchLeads();
      if (data) {
        setLocalItem('leads', data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchLeads failed, using local fallback:', e);
    }
    return getLocalItem('leads', []);
  },

  async submitLead(lead) {
    const list = getLocalItem('leads', []);
    const newLead = { 
      id: Math.random().toString(36).substring(2, 9), 
      status: 'new', 
      created_at: new Date().toISOString(), 
      ...lead 
    };
    list.unshift(newLead);
    setLocalItem('leads', list);

    try {
      const created = await db.submitLead(lead);
      if (created) {
        const updatedList = list.map(l => l.email === created.email && l.name === created.name ? created : l);
        setLocalItem('leads', updatedList);
        return created;
      }
    } catch (e) {
      console.error('Supabase submitLead failed, saved locally:', e);
    }
    return newLead;
  },

  async updateLeadStatus(id, status) {
    const list = getLocalItem('leads', []);
    const updatedList = list.map(item => item.id === id ? { ...item, status } : item);
    setLocalItem('leads', updatedList);

    try {
      await db.updateLeadStatus(id, status);
    } catch (e) {
      console.error('Supabase updateLeadStatus failed:', e);
    }
    return { id, status };
  },

  async deleteLead(id) {
    const list = getLocalItem('leads', []);
    const filtered = list.filter(item => item.id !== id);
    setLocalItem('leads', filtered);

    try {
      await db.removeLead(id);
    } catch (e) {
      console.error('Supabase removeLead failed:', e);
    }
    return true;
  },

  // --- INDUSTRIES WE SERVE ---
  async getIndustries() {
    try {
      const data = await db.fetchSettings('industries');
      if (data && data.length > 0) {
        setLocalItem('industries', data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchSettings(industries) failed, using local fallback:', e);
    }
    return getLocalItem('industries', defaultIndustries);
  },

  async saveIndustries(industries) {
    setLocalItem('industries', industries);
    try {
      await db.updateSettings('industries', industries);
    } catch (e) {
      console.error('Supabase updateSettings(industries) failed:', e);
    }
    return industries;
  },

  // --- FAQS ---
  async getFaqs() {
    try {
      const data = await db.fetchSettings('faqs');
      if (data && data.length > 0) {
        setLocalItem('faqs', data);
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchSettings(faqs) failed, using local fallback:', e);
    }
    return getLocalItem('faqs', defaultFaqs);
  },

  async saveFaqs(faqs) {
    setLocalItem('faqs', faqs);
    try {
      await db.updateSettings('faqs', faqs);
    } catch (e) {
      console.error('Supabase updateSettings(faqs) failed:', e);
    }
    return faqs;
  }
};
