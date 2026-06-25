import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Layers, Image as ImageIcon, Settings as SettingsIcon, 
  LogOut, Trash2, CheckCircle2, ShieldAlert, Sparkles, 
  BarChart, ExternalLink, RefreshCw, MessageSquare
} from 'lucide-react';
import { 
  services as initialServices, 
  gallery as initialGallery, 
  agencyInfo as initialAgencyInfo 
} from '../data/siteContent';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [services, setServices] = useState(initialServices);
  const [gallery, setGallery] = useState(initialGallery);
  const [agencyInfo, setAgencyInfo] = useState(initialAgencyInfo);
  
  // States for adding items
  const [newLeadCount, setNewLeadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Auth Check
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Fetch initial leads from memory/api
    fetchLeads();
  }, [navigate]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/leads', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
      });
      const data = await response.json();
      if (response.ok) {
        setLeads(data);
        setNewLeadCount(data.filter(l => l.status === 'new').length);
      } else {
        // Fallback local memory for mock review
        const mockLeads = [
          { id: "l-1", name: "John Doe", email: "john@example.com", phone: "9876543210", service: "Google Ads", message: "Free consultation request.", status: "new", created_at: new Date().toISOString() },
          { id: "l-2", name: "Sarah Smith", email: "sarah@ecom.com", phone: "9123456789", service: "Meta Ads", message: "Scale Shopify store conversions.", status: "contacted", created_at: new Date(Date.now() - 86400000).toISOString() }
        ];
        setLeads(mockLeads);
        setNewLeadCount(mockLeads.filter(l => l.status === 'new').length);
      }
    } catch (err) {
      const mockLeads = [
        { id: "l-1", name: "John Doe", email: "john@example.com", phone: "9876543210", service: "Google Ads", message: "Free consultation request.", status: "new", created_at: new Date().toISOString() },
        { id: "l-2", name: "Sarah Smith", email: "sarah@ecom.com", phone: "9123456789", service: "Meta Ads", message: "Scale Shopify store conversions.", status: "contacted", created_at: new Date(Date.now() - 86400000).toISOString() }
      ];
      setLeads(mockLeads);
      setNewLeadCount(mockLeads.filter(l => l.status === 'new').length);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'new' ? 'contacted' : currentStatus === 'contacted' ? 'converted' : 'closed';
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify({ status: nextStatus })
      });
      if (response.ok) {
        fetchLeads();
      } else {
        // Fallback update state in memory
        setLeads(leads.map(l => l.id === id ? { ...l, status: nextStatus } : l));
      }
    } catch (err) {
      setLeads(leads.map(l => l.id === id ? { ...l, status: nextStatus } : l));
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('admin_token')}` }
      });
      if (response.ok) {
        fetchLeads();
      } else {
        // Fallback update state in memory
        setLeads(leads.filter(l => l.id !== id));
      }
    } catch (err) {
      setLeads(leads.filter(l => l.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-left">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-900 text-white flex flex-col py-6 shrink-0">
        <div className="px-6 pb-6 border-b border-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-blue flex items-center justify-center font-black text-white text-md">
            D
          </div>
          <span className="font-bold text-sm tracking-widest uppercase">Admin Control</span>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'leads' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users size={16} />
              <span>Inquiry Leads</span>
            </div>
            {newLeadCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                {newLeadCount} New
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'services' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={16} />
            <span>Manage Services</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'gallery' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon size={16} />
            <span>Manage Gallery</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
              activeTab === 'settings' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <SettingsIcon size={16} />
            <span>SEO & Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            <span>Log Out Console</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-10 max-w-7xl">
        
        {/* Header metrics summary bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-200 mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-premium-black font-heading leading-none">
              {activeTab === 'leads' ? 'Lead Inquiries' : activeTab === 'services' ? 'Services Console' : activeTab === 'gallery' ? 'Portfolio Console' : 'SEO Configuration'}
            </h1>
            <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Configure your live website variables dynamically</p>
          </div>
          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 text-xs font-bold bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-500 hover:text-primary-blue hover:border-primary-blue transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Refresh Console</span>
          </button>
        </div>

        {/* Tab Panel contents */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            {/* Minimal metrics row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary-blue flex items-center justify-center shrink-0">
                  <BarChart size={18} />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Total Leads</span>
                  <span className="text-2xl font-black text-premium-black font-heading leading-none mt-1 inline-block">{leads.length}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Active / New</span>
                  <span className="text-2xl font-black text-premium-black font-heading leading-none mt-1 inline-block">{leads.filter(l => l.status === 'new').length}</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Closed / Contacted</span>
                  <span className="text-2xl font-black text-premium-black font-heading leading-none mt-1 inline-block">{leads.filter(l => l.status !== 'new').length}</span>
                </div>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4 text-left">Contact Info</th>
                    <th className="px-6 py-4 text-left">Interest Channel</th>
                    <th className="px-6 py-4 text-left">Message</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-premium-black">{lead.name}</div>
                        <div className="text-xs text-slate-400">{lead.phone}</div>
                        <div className="text-xs text-slate-400">{lead.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-lg">
                          {lead.service}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-light max-w-xs truncate">
                        {lead.message || 'No custom message.'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${
                          lead.status === 'new' 
                            ? 'bg-rose-50 text-rose-600' 
                            : lead.status === 'contacted' 
                            ? 'bg-blue-50 text-primary-blue' 
                            : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleUpdateStatus(lead.id, lead.status)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-primary-blue transition-colors"
                            title="Toggle status tag"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-rose-500 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {leads.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-slate-400">No leads registered.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-premium-black font-heading">Interactive Services List</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map(s => (
                <div key={s.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="bg-blue-100 text-primary-blue text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">{s.order_index}</span>
                    <span className="text-sm font-semibold text-premium-black">{s.title}</span>
                  </div>
                  <span className="text-slate-400 text-xs italic font-light">Protected / System card</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-premium-black font-heading">Dynamic Gallery Items</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {gallery.map(g => (
                <div key={g.id} className="relative rounded-2xl overflow-hidden aspect-[4/3] group border border-slate-100">
                  <img src={g.image_url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 w-full bg-slate-950/80 p-2.5 text-xs text-white">
                    <span className="font-bold line-clamp-1">{g.title}</span>
                    <span className="text-[10px] text-primary-blue uppercase font-bold block mt-0.5">{g.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-premium-black font-heading">SEO Metadata & agency Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">SEO Page Title</label>
                  <input
                    type="text"
                    value={agencyInfo.seo.title}
                    readOnly
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">SEO Page Description</label>
                  <textarea
                    rows="3"
                    value={agencyInfo.seo.description}
                    readOnly
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none text-slate-600 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={agencyInfo.phone}
                    readOnly
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    value={agencyInfo.whatsapp}
                    readOnly
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none text-slate-600"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
