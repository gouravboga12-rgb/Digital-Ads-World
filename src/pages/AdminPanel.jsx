import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Users, Layers, Settings, LogOut, CheckCircle2, Trash2, ShieldAlert, 
  Sparkles, RefreshCw, BarChart3, FileText, Plus, HelpCircle, 
  Upload, Trash, Edit2, Check, X, ShieldCheck, Mail, Info, FileSpreadsheet,
  Clock, Search, Briefcase, Image, Eye, Download, Globe, MessageCircle
} from 'lucide-react';
import { siteDataManager } from '../data/siteDataManager';
import marketingTeamImg from '../assets/marketing_team.png';

export default function AdminPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Global app data state
  const [leads, setLeads] = useState([]);
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [agencyInfo, setAgencyInfo] = useState(null);
  const [terms, setTerms] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  // Active sub-page tab
  const getActiveTabFromPath = () => {
    const path = location.pathname;
    if (path.includes('/services/new')) return 'add-service';
    if (path.includes('/services-edit')) return 'services-edit';
    if (path.includes('/services')) return 'services';
    if (path.includes('/orders')) return 'orders';
    if (path.includes('/contact-edit')) return 'contact-edit';
    if (path.includes('/home-edit')) return 'home-edit';
    if (path.includes('/about-edit')) return 'about-edit';
    if (path.includes('/team-edit')) return 'team-edit';
    if (path.includes('/gallery-edit')) return 'gallery-edit';
    if (path.includes('/terms-edit')) return 'terms-edit';
    return 'dashboard';
  };

  const activeTab = getActiveTabFromPath();

  // Load state and authenticate from token
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      loadAllData();
    } else {
      setLoading(false);
    }
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [leadsData, servicesData, teamData, testimonialsData, galleryData, agencyData, termsData, brandsData] = await Promise.all([
        siteDataManager.getLeads(),
        siteDataManager.getServices(),
        siteDataManager.getTeam(),
        siteDataManager.getTestimonials(),
        siteDataManager.getGallery(),
        siteDataManager.getAgencyInfo(),
        siteDataManager.getTermsAndConditions(),
        siteDataManager.getBrands()
      ]);
      setLeads(leadsData);
      setServices(servicesData);
      setTeam(teamData);
      setTestimonials(testimonialsData);
      setGallery(galleryData);
      setAgencyInfo(agencyData);
      setTerms(termsData);
      setBrands(brandsData);
    } catch (err) {
      showToast('Error syncing with data storage.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    // Check credentials
    if (username === 'suraxasteelsafemarketing@gmail.com' && password === 'Digitaladsworld@#12345') {
      localStorage.setItem('admin_token', 'mock_token_suraxa_steels_safemarketing');
      setIsAuthenticated(true);
      loadAllData();
      showToast('Authenticated successfully.');
    } else {
      setAuthError('Access Denied. Invalid email or password credentials.');
    }
    setAuthLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    navigate('/admin/');
  };

  // Cloudinary direct file upload handler
  const handleCloudinaryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    showToast('Uploading media to Cloudinary...', 'info');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'digital_preset');

      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dfyawdpk0';
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
          method: 'POST',
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Upload request rejected by server');
      }

      const data = await response.json();
      setUploadedUrl(data.secure_url);
      showToast('Media uploaded successfully!');
      return data.secure_url;
    } catch (err) {
      console.error(err);
      showToast('Failed to upload file to Cloudinary.', 'error');
      return null;
    } finally {
      setUploading(false);
    }
  };

  if (loading && isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4">
        <RefreshCw className="animate-spin text-primary-blue" size={40} />
        <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">Synchronizing Supabase Variables...</p>
      </div>
    );
  }

  // Auth Guard Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-2xl p-8 md:p-10 flex flex-col gap-6 text-left" data-aos="zoom-in">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-50 text-primary-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldAlert size={22} />
            </div>
            <h1 className="text-2xl font-black text-premium-black font-heading">Admin Central Login</h1>
            <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Cloud Database Control Center</p>
          </div>

          {authError && (
            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs flex gap-2 items-center font-semibold">
              <ShieldAlert size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Authorized Username ID</label>
              <input
                type="email"
                required
                placeholder="e.g. admin@agency.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Admin Encryption Key</label>
              <input
                type="password"
                required
                placeholder="Password Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue transition-colors text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/15 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <span>Authenticate and Connect</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row text-left font-body">
      
      {/* Toast Alert */}
      {toast.message && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-xl flex items-center gap-3 text-xs font-bold uppercase transition-all duration-300 animate-slide-in ${
          toast.type === 'error' ? 'bg-rose-500 text-white' : toast.type === 'info' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
        }`}>
          {toast.type === 'error' ? <ShieldAlert size={16} /> : <CheckCircle2 size={16} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-slate-900 text-white flex flex-col py-6 shrink-0 z-10 shadow-lg">
        <div className="px-6 pb-6 border-b border-slate-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-blue flex items-center justify-center font-black text-white text-md">A</div>
          <span className="font-bold text-sm tracking-widest uppercase">Admin console</span>
        </div>

        <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
          <Link
            to="/admin/"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'dashboard' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Users size={16} />
            <span>Dashboard Inquiries</span>
          </Link>

          <Link
            to="/admin/orders"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'orders' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <FileSpreadsheet size={16} />
            <span>Service Requests</span>
          </Link>

          <Link
            to="/admin/services"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'services' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={16} />
            <span>Manage Services</span>
          </Link>

          <Link
            to="/admin/services/new"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'add-service' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Plus size={16} />
            <span>Add New Service</span>
          </Link>

          <Link
            to="/admin/home-edit"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'home-edit' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Settings size={16} />
            <span>Home Page Edit</span>
          </Link>

          <Link
            to="/admin/about-edit"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'about-edit' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Info size={16} />
            <span>About Page Edit</span>
          </Link>

          <Link
            to="/admin/team-edit"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'team-edit' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Users size={16} />
            <span>Our Team Edit</span>
          </Link>

          <Link
            to="/admin/services-edit"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'services-edit' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Layers size={16} />
            <span>Services & Form Edit</span>
          </Link>

          <Link
            to="/admin/contact-edit"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'contact-edit' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Mail size={16} />
            <span>Contact Page Edit</span>
          </Link>

          <Link
            to="/admin/gallery-edit"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'gallery-edit' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Image size={16} />
            <span>Gallery Page Edit</span>
          </Link>

          <Link
            to="/admin/terms-edit"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'terms-edit' ? 'bg-primary-blue text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <FileText size={16} />
            <span>Footer & Terms Edit</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            <span>Log Out Console</span>
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-grow p-6 md:p-10 max-w-7xl overflow-x-hidden">
        
        {/* Admin Header with Page Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200/80">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold uppercase tracking-wider">
              <span>Admin Console</span>
              <span>/</span>
              <span className="text-primary-blue">
                {activeTab === 'dashboard' && 'Dashboard Inquiries'}
                {activeTab === 'orders' && 'Service Requests'}
                {activeTab === 'services' && 'Manage Services'}
                {activeTab === 'add-service' && 'Add New Service'}
                {activeTab === 'home-edit' && 'Home Page Edit'}
                {activeTab === 'about-edit' && 'About Page Edit'}
                {activeTab === 'team-edit' && 'Our Team Edit'}
                {activeTab === 'services-edit' && 'Services & Form Edit'}
                {activeTab === 'contact-edit' && 'Contact Page Edit'}
                {activeTab === 'gallery-edit' && 'Gallery Page Edit'}
                {activeTab === 'terms-edit' && 'Footer & Terms Edit'}
              </span>
            </div>
            <h2 className="text-xl font-black text-premium-black font-heading mt-1">
              {activeTab === 'dashboard' && 'Inquiry Feed'}
              {activeTab === 'orders' && 'Service Orders'}
              {activeTab === 'services' && 'Marketing Channels'}
              {activeTab === 'add-service' && 'Configure New Channel'}
              {activeTab === 'home-edit' && 'Homepage Structure'}
              {activeTab === 'about-edit' && 'About Page Content'}
              {activeTab === 'team-edit' && 'Team Page Content'}
              {activeTab === 'services-edit' && 'Services & Form Config'}
              {activeTab === 'contact-edit' && 'Contact & Info Fields'}
              {activeTab === 'gallery-edit' && 'Portfolio Gallery Items'}
              {activeTab === 'terms-edit' && 'Legal Policy & Footer'}
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            {/* Status indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-xl border border-slate-200/50 text-[10px] font-black text-slate-500 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Connected</span>
            </div>

            {/* Refresh Button */}
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-primary-blue rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow active:scale-95 shrink-0"
              title="Refresh Page"
            >
              <RefreshCw size={13} />
              <span>Refresh Page</span>
            </button>
          </div>
        </div>

        {/* Router Paths rendering Subviews */}
        <Routes>
          <Route path="/" element={<DashboardSubView leads={leads} setLeads={setLeads} showToast={showToast} />} />
          <Route path="/orders" element={<OrdersSubView leads={leads} setLeads={setLeads} showToast={showToast} />} />
          <Route path="/contact-edit" element={<ContactEditSubView agencyInfo={agencyInfo} setAgencyInfo={setAgencyInfo} showToast={showToast} />} />
          <Route path="/services" element={<ServicesSubView services={services} setServices={setServices} showToast={showToast} />} />
          <Route path="/services/new" element={<AddServiceSubView showToast={showToast} loadAllData={loadAllData} />} />
          <Route path="/home-edit" element={<HomeEditSubView agencyInfo={agencyInfo} setAgencyInfo={setAgencyInfo} testimonials={testimonials} setTestimonials={setTestimonials} brands={brands} setBrands={setBrands} showToast={showToast} handleCloudinaryUpload={handleCloudinaryUpload} uploading={uploading} />} />
          <Route path="/about-edit" element={<AboutEditSubView agencyInfo={agencyInfo} setAgencyInfo={setAgencyInfo} team={team} setTeam={setTeam} showToast={showToast} handleCloudinaryUpload={handleCloudinaryUpload} uploading={uploading} />} />
          <Route path="/team-edit" element={<TeamEditSubView team={team} setTeam={setTeam} showToast={showToast} handleCloudinaryUpload={handleCloudinaryUpload} uploading={uploading} />} />
          <Route path="/services-edit" element={<ServicesIntroSubView services={services} showToast={showToast} />} />
          <Route path="/gallery-edit" element={<GalleryEditSubView gallery={gallery} setGallery={setGallery} showToast={showToast} handleCloudinaryUpload={handleCloudinaryUpload} uploading={uploading} />} />
          <Route path="/terms-edit" element={<TermsEditSubView terms={terms} setTerms={setTerms} agencyInfo={agencyInfo} setAgencyInfo={setAgencyInfo} showToast={showToast} handleCloudinaryUpload={handleCloudinaryUpload} uploading={uploading} />} />
        </Routes>
      </main>

    </div>
  );
}

// ==========================================
// SUBVIEW 1: DashboardInquiries
// ==========================================
function DashboardSubView({ leads, setLeads, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const handleUpdateStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'new' ? 'contacted' : currentStatus === 'contacted' ? 'converted' : 'closed';
    setUpdatingId(id);
    try {
      await siteDataManager.updateLeadStatus(id, nextStatus);
      setLeads(leads.map(l => l.id === id ? { ...l, status: nextStatus } : l));
      showToast('Lead status updated.');
    } catch (e) {
      showToast('Failed to update status on cloud.', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this lead inquiry?")) return;
    try {
      await siteDataManager.deleteLead(id);
      setLeads(leads.filter(l => l.id !== id));
      showToast('Lead deleted successfully.');
    } catch (e) {
      showToast('Failed to delete lead.', 'error');
    }
  };

  // Filter inquiries (only General Inquiries)
  const filteredLeads = leads.filter(lead => {
    // Search filter
    const matchesSearch = 
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm);
    
    if (!matchesSearch) return false;

    // Filter out specific service order requests
    return lead.service === 'General Growth Consultation' || !lead.message?.includes('Custom Inquiry');
  });

  const totalGeneral = filteredLeads.length;
  const newGeneral = filteredLeads.filter(l => l.status === 'new').length;
  const contactedGeneral = filteredLeads.filter(l => l.status === 'contacted').length;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-premium-black font-heading leading-none">Inquiries Dashboard</h1>
        <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Monitor live incoming customer general contact inquiries</p>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center shrink-0">
            <Mail size={18} />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Total Inquiries</span>
            <span className="text-2xl font-black text-slate-800 leading-none mt-1 inline-block">{totalGeneral}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock size={18} />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">New Inquiries</span>
            <span className="text-2xl font-black text-slate-800 leading-none mt-1 inline-block">
              {newGeneral}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Handled Leads</span>
            <span className="text-2xl font-black text-slate-800 leading-none mt-1 inline-block">
              {contactedGeneral}
            </span>
          </div>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-xs font-semibold"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4 text-left">Customer Profile</th>
              <th className="px-6 py-4 text-left">Channel/Interest</th>
              <th className="px-6 py-4 text-left">Requirements Message</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Submitted</th>
              <th className="px-6 py-4 text-center">Controls</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-premium-black">{lead.name}</div>
                  <div className="text-xs text-slate-400">{lead.phone}</div>
                  <div className="text-xs text-slate-400">{lead.email}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                    lead.service === 'General Growth Consultation' ? 'bg-slate-100 text-slate-600' : 'bg-blue-50 text-primary-blue font-bold'
                  }`}>
                    {lead.service}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs max-w-xs whitespace-pre-line text-slate-500 leading-relaxed font-light">
                  {lead.message || 'No additional note.'}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-lg ${
                    lead.status === 'new' 
                      ? 'bg-rose-50 text-rose-600' 
                      : lead.status === 'contacted' 
                      ? 'bg-blue-50 text-primary-blue' 
                      : lead.status === 'converted'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-slate-100 text-slate-400'
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
                      disabled={updatingId === lead.id}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-primary-blue transition-colors"
                      title="Update status"
                    >
                      {updatingId === lead.id ? <RefreshCw size={14} className="animate-spin" /> : <CheckCircle2 size={15} />}
                    </button>
                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-rose-500 transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-12 text-slate-400 text-xs uppercase font-bold">No inquiry matches.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

// ==========================================
// SUBVIEW 2: ServicesSubView (CRUD Table)
// ==========================================
function ServicesSubView({ services, setServices, showToast }) {
  const [editingService, setEditingService] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const handleDeleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service? All slug pathways will break.")) return;
    try {
      await siteDataManager.deleteService(id);
      setServices(services.filter(s => s.id !== id));
      showToast('Service deleted from database.');
    } catch (e) {
      showToast('Error deleting service.', 'error');
    }
  };

  const handleEditClick = (service) => {
    setEditingService({
      ...service,
      benefitsText: service.benefits ? service.benefits.join('\n') : ''
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setLoadingId(editingService.id);
    const parsedBenefits = editingService.benefitsText.split('\n').filter(b => b.trim() !== '');

    const updatedPayload = {
      title: editingService.title,
      slug: editingService.slug,
      description: editingService.description,
      icon: editingService.icon,
      order_index: parseInt(editingService.order_index) || 0,
      benefits: parsedBenefits
    };

    try {
      await siteDataManager.updateService(editingService.id, updatedPayload);
      setServices(services.map(s => s.id === editingService.id ? { ...s, ...updatedPayload } : s));
      showToast('Service edits updated successfully.');
      setEditingService(null);
    } catch (err) {
      showToast('Failed to update service.', 'error');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-premium-black font-heading leading-none">Services Management</h1>
        <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Direct database CRUD controls for services catalog</p>
      </div>

      {editingService ? (
        // Editing Form Card
        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
            <h3 className="text-lg font-bold text-premium-black">Edit Service: {editingService.title}</h3>
            <button onClick={() => setEditingService(null)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400"><X size={20} /></button>
          </div>

          <form onSubmit={handleSaveEdit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Service Title</label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Url Slug (unique)</label>
                <input
                  type="text"
                  required
                  value={editingService.slug}
                  onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Lucide Icon Name</label>
                <select
                  value={editingService.icon}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-sm"
                >
                  <option value="Google">Google Ads Icon</option>
                  <option value="Meta">Meta Ads Icon</option>
                  <option value="Search">Search / SEO</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Monitor">Monitor / PPC</option>
                  <option value="Code">Code / Web Dev</option>
                  <option value="Sparkles">Sparkles / AI Tools</option>
                  <option value="BarChart3">BarChart / Analytics</option>
                  <option value="Award">Award / Branding</option>
                  <option value="Mail">Mail / Newsletter</option>
                  <option value="Shield">Shield / Reputation</option>
                  <option value="UserPlus">UserPlus / Lead Gen</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Order Sequence Index</label>
                <input
                  type="number"
                  value={editingService.order_index}
                  onChange={(e) => setEditingService({ ...editingService, order_index: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Brief Description</label>
              <textarea
                rows="3"
                value={editingService.description}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-sm resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Benefits (One benefit per line)</label>
              <textarea
                rows="5"
                value={editingService.benefitsText}
                onChange={(e) => setEditingService({ ...editingService, benefitsText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-sm font-mono leading-relaxed"
                placeholder="e.g. Hyper-targeted customized audiences&#10;A/B split testing campaigns&#10;Monthly ROI tracking audits"
              ></textarea>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loadingId === editingService.id}
                className="px-5 py-2.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase flex items-center gap-1.5"
              >
                {loadingId === editingService.id ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Grid display of services
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(s => (
            <div key={s.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-blue-50 text-primary-blue text-[10px] font-black uppercase px-2.5 py-1 rounded-lg">Sequence index: {s.order_index}</span>
                  <div className="flex gap-1.5">
                    <button 
                      onClick={() => handleEditClick(s)} 
                      className="p-2 bg-slate-50 text-slate-600 hover:text-primary-blue rounded-xl hover:bg-blue-50 border border-slate-100 transition-colors"
                      title="Edit Service"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteService(s.id)} 
                      className="p-2 bg-slate-50 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50 border border-slate-100 transition-colors"
                      title="Delete Service"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-premium-black font-heading">{s.title}</h3>
                <p className="text-slate-400 text-xs font-mono font-medium">Slug: /services/{s.slug}</p>
                <p className="text-slate-500 text-xs leading-relaxed font-light line-clamp-2">{s.description}</p>
              </div>

              {s.benefits && s.benefits.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {s.benefits.slice(0, 3).map((b, i) => (
                    <span key={i} className="text-[10px] bg-slate-50 border border-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">{b}</span>
                  ))}
                  {s.benefits.length > 3 && <span className="text-[9px] text-slate-400 self-center font-bold">+{s.benefits.length - 3} more</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// SUBVIEW 3: AddNewServiceSubView
// ==========================================
function AddServiceSubView({ showToast, loadAllData }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Google');
  const [orderIndex, setOrderIndex] = useState('0');
  const [benefitsText, setBenefitsText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Auto-generate slug from title
  useEffect(() => {
    const generated = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // remove special chars
      .replace(/[\s_]+/g, '-')  // replace spaces with hyphens
      .replace(/^-+|-+$/g, ''); // trim hyphens
    setSlug(generated);
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !slug || !description) {
      showToast('Please fill out all fields.', 'error');
      return;
    }

    setSubmitting(true);
    const parsedBenefits = benefitsText.split('\n').filter(b => b.trim() !== '');

    const newService = {
      title,
      slug,
      description,
      icon,
      order_index: parseInt(orderIndex) || 0,
      benefits: parsedBenefits
    };

    try {
      await siteDataManager.addService(newService);
      showToast('New service published to cloud directory.');
      await loadAllData();
      navigate('/admin/services');
    } catch (e) {
      showToast('Failed to insert service.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-premium-black font-heading leading-none">Add New Service</h1>
        <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Publish a new marketing service node</p>
      </div>

      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Service Title</label>
              <input
                type="text"
                required
                placeholder="e.g. WhatsApp Automation"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">URL Slug Pathway (Auto-generated)</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Lucide Icon Class</label>
              <select
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-sm animate-none"
              >
                <option value="Google">Google Ads Icon</option>
                <option value="Meta">Meta Ads Icon</option>
                <option value="Search">Search / SEO</option>
                <option value="Instagram">Instagram</option>
                <option value="Monitor">Monitor / PPC</option>
                <option value="Code">Code / Web Dev</option>
                <option value="Sparkles">Sparkles / AI Tools</option>
                <option value="BarChart3">BarChart / Analytics</option>
                <option value="Award">Award / Branding</option>
                <option value="Mail">Mail / Newsletter</option>
                <option value="Shield">Shield / Reputation</option>
                <option value="UserPlus">UserPlus / Lead Gen</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Order Sequence Number</label>
              <input
                type="number"
                value={orderIndex}
                onChange={(e) => setOrderIndex(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Description Summary</label>
            <textarea
              rows="3"
              required
              placeholder="Short elevator pitch explaining what this service delivers and how it helps the customer's metrics..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-sm resize-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Key Deliverables / Benefits (One per line)</label>
            <textarea
              rows="5"
              placeholder="e.g. Integration with customer CRM database&#10;No-code dashboard builder&#10;Custom WhatsApp chat triggers"
              value={benefitsText}
              onChange={(e) => setBenefitsText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-sm font-mono leading-relaxed"
            ></textarea>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase flex items-center gap-2 shadow-lg shadow-blue-500/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              {submitting ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
              <span>Publish Service</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const defaultProcessTabs = {
  b2c: {
    label: "B2C — Consumer",
    columns: [
      { title: "CHANNELS", items: ["Meta Ads", "Google Ads", "YouTube", "Instagram", "Website SEO", "WhatsApp Broadcast"] },
      { title: "CAPTURE", items: ["Landing Page", "Lead Form", "WhatsApp Opt-in", "Chat Widget", "Click-to-Call"] },
      { title: "CRM", items: ["Auto-Synced to CRM", "Lead Scored", "Segment Tagged"] },
      { title: "NURTURE", items: ["WhatsApp Sequence", "Email Drip", "Retargeting Ads", "Offer SMS", "Video Follow-up"] },
      { title: "CLOSE", items: ["Consultation Call", "Site Visit / Demo", "DEAL WON 🎉", "— Upsell & Referral"] }
    ]
  },
  b2b: {
    label: "B2B — Business",
    columns: [
      { title: "CHANNELS", items: ["LinkedIn Ads", "Google Search", "SEO / Blog", "Email Outreach", "YouTube", "Referral Network"] },
      { title: "CAPTURE", items: ["Contact / RFQ Form", "Free Audit Offer", "Whitepaper Download", "Webinar Sign-up", "Direct Inquiry"] },
      { title: "CRM", items: ["Auto-Synced to CRM", "MQL → SQL", "Account Research"] },
      { title: "NURTURE", items: ["Email Sequence", "Case Study Share", "Discovery Call", "Proposal Draft", "LinkedIn Follow-up"] },
      { title: "CLOSE", items: ["Strategy Presentation", "Proposal Review", "Contract Signed", "DEAL WON 🎉"] }
    ]
  },
  d2c: {
    label: "D2C — Direct to Consumer",
    columns: [
      { title: "CHANNELS", items: ["Instagram Ads", "Meta / Reels", "Google Shopping", "YouTube Shorts", "Influencer Collab", "WhatsApp Catalog"] },
      { title: "CAPTURE", items: ["Product Landing Page", "Add to Cart / COD", "WhatsApp Shop", "Abandoned Cart Trigger", "Offer Pop-up"] },
      { title: "CRM / DATA", items: ["Auto-Synced to CRM", "Pixel Tracking", "Cohort Segmented"] },
      { title: "NURTURE", items: ["Cart Recovery SMS", "WhatsApp Offers", "Dynamic Retargeting", "UGC + Reviews", "Loyalty Points"] },
      { title: "CLOSE & RETAIN", items: ["First Purchase", "DEAL WON 🎉", "Repeat Purchase", "— Referral Program"] }
    ]
  }
};

// ==========================================
// SUBVIEW 4: HomeEditSubView (Agency Info & Testimonials)
// ==========================================
function HomeEditSubView({ agencyInfo, setAgencyInfo, testimonials, setTestimonials, brands = [], setBrands, showToast, handleCloudinaryUpload, uploading }) {
  const [submitting, setSubmitting] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('coords'); // coords, hero, stats, values, journey, process, brands, testimonials
  
  // Hero Content state
  const [heroBadge, setHeroBadge] = useState(agencyInfo?.hero_badge || "Leading Performance Marketing Agency");
  const [heroTitle, setHeroTitle] = useState(agencyInfo?.hero_title || "Scale Your Business With Performance-Driven Digital Marketing");
  const [heroSubtitle, setHeroSubtitle] = useState(agencyInfo?.hero_subtitle || "Google Ads, Meta Ads, SEO, Social Media Marketing, Branding & Website Development Solutions designed to generate verified leads and drive explosive revenue growth.");
  const [heroCtaText, setHeroCtaText] = useState(agencyInfo?.hero_cta_text || "Get Free Consultation");
  const [heroSecondaryCtaText, setHeroSecondaryCtaText] = useState(agencyInfo?.hero_secondary_cta_text || "View All Services");
  const [heroImageUrl, setHeroImageUrl] = useState(agencyInfo?.hero_image_url || "");

  // Process Flow states
  const [processTag, setProcessTag] = useState(agencyInfo?.process_tag || "How Leads Flow");
  const [processTitle, setProcessTitle] = useState(agencyInfo?.process_title || "Our Digital Marketing Process — Click To Conversion");
  const [processSubtitle, setProcessSubtitle] = useState(agencyInfo?.process_subtitle || "Our end-to-end lead generation engine — from demand creation to closed deals.");
  const [processFlow, setProcessFlow] = useState(agencyInfo?.process_flow || defaultProcessTabs);

  // Local helper editing states for Process Flow tab
  const [activeProcessEditTab, setActiveProcessEditTab] = useState('b2c');
  const [editingColumnIdx, setEditingColumnIdx] = useState(null);
  const [editingColumnTitle, setEditingColumnTitle] = useState('');
  const [newColumnTitle, setNewColumnTitle] = useState('');
  
  // Item edit states
  const [editingItemIdx, setEditingItemIdx] = useState(null); // { colIdx: number, itemIdx: number }
  const [editingItemVal, setEditingItemVal] = useState('');
  const [newItemVal, setNewItemVal] = useState('');
  const [newItemInputColIdx, setNewItemInputColIdx] = useState(null);

  // Stats widgets state
  const [heroStats, setHeroStats] = useState(agencyInfo?.hero_stats || [
    { value: '50+', label: 'Happy Clients' },
    { value: '500+', label: 'Projects' },
    { value: '4+ Yrs', label: 'Industry Exp' }
  ]);
  const [editingStat, setEditingStat] = useState(null);
  const [newStat, setNewStat] = useState({ value: '', label: '' });

  // Why choose us (values) state
  const [values, setValues] = useState(agencyInfo?.values || [
    { title: "Absolute ROI Focus", description: "We align all marketing strategies with actual sales revenue and cashflow, rather than clicks or branding impressions.", icon: "Target" },
    { title: "Data Transparency", description: "No hidden spreadsheets. Our partners see live conversion data routed directly from platforms like Google Ads and Meta Pixel.", icon: "BarChart3" },
    { title: "High Integrity", description: "We are selective about partnerships. If we believe a product is not ready to scale, we state it transparently.", icon: "ShieldCheck" },
    { title: "Creative Innovation", description: "Dynamic ad creative styles are changed consistently to combat audience fatigue and reduce conversion prices.", icon: "Zap" }
  ]);
  const [editingValue, setEditingValue] = useState(null);
  const [newValue, setNewValue] = useState({ title: '', description: '', icon: 'Target' });

  // Industries We Serve state
  const [industries, setIndustries] = useState(() => {
    try { return JSON.parse(localStorage.getItem('industries')) || []; } catch { return []; }
  });
  const [editingIndustry, setEditingIndustry] = useState(null);
  const [newIndustry, setNewIndustry] = useState({ title: '', desc: '', icon: 'Globe', color: 'bg-blue-50 text-blue-500 border-blue-100' });
  const [submittingIndustries, setSubmittingIndustries] = useState(false);

  // FAQs state
  const [faqs, setFaqs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('faqs')) || []; } catch { return []; }
  });
  const [editingFaq, setEditingFaq] = useState(null);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [submittingFaqs, setSubmittingFaqs] = useState(false);

  const industryColorOptions = [
    { label: 'Blue', value: 'bg-blue-50 text-blue-500 border-blue-100' },
    { label: 'Red', value: 'bg-red-50 text-red-500 border-red-100' },
    { label: 'Green', value: 'bg-green-50 text-green-500 border-green-100' },
    { label: 'Indigo', value: 'bg-indigo-50 text-indigo-500 border-indigo-100' },
    { label: 'Amber', value: 'bg-amber-50 text-amber-500 border-amber-100' },
    { label: 'Yellow', value: 'bg-yellow-50 text-yellow-600 border-yellow-100' },
    { label: 'Cyan', value: 'bg-cyan-50 text-cyan-500 border-cyan-100' },
    { label: 'Slate', value: 'bg-slate-50 text-slate-600 border-slate-200' },
    { label: 'Pink', value: 'bg-pink-50 text-pink-500 border-pink-100' },
    { label: 'Rose', value: 'bg-rose-50 text-rose-500 border-rose-100' },
    { label: 'Purple', value: 'bg-purple-50 text-purple-500 border-purple-100' },
    { label: 'Teal', value: 'bg-teal-50 text-teal-500 border-teal-100' },
  ];

  const handleAddIndustry = async (e) => {
    e.preventDefault();
    if (!newIndustry.title.trim()) return;
    const item = { id: Date.now().toString(), ...newIndustry };
    const updated = [...industries, item];
    setIndustries(updated);
    setNewIndustry({ title: '', desc: '', icon: 'Globe', color: 'bg-blue-50 text-blue-500 border-blue-100' });
    await siteDataManager.saveIndustries(updated);
  };

  const handleUpdateIndustry = async (e) => {
    e.preventDefault();
    if (!editingIndustry) return;
    const updated = industries.map((ind, i) => i === editingIndustry.index ? { ...ind, title: editingIndustry.title, desc: editingIndustry.desc, icon: editingIndustry.icon, color: editingIndustry.color } : ind);
    setIndustries(updated);
    setEditingIndustry(null);
    await siteDataManager.saveIndustries(updated);
  };

  const handleDeleteIndustry = async (idx) => {
    const updated = industries.filter((_, i) => i !== idx);
    setIndustries(updated);
    await siteDataManager.saveIndustries(updated);
  };

  const handleSaveIndustriesBulk = async () => {
    setSubmittingIndustries(true);
    await siteDataManager.saveIndustries(industries);
    setSubmittingIndustries(false);
    showToast('Industries saved to Supabase.');
  };

  const handleAddFaq = async (e) => {
    e.preventDefault();
    if (!newFaq.question.trim()) return;
    const item = { id: Date.now().toString(), ...newFaq };
    const updated = [...faqs, item];
    setFaqs(updated);
    setNewFaq({ question: '', answer: '' });
    await siteDataManager.saveFaqs(updated);
  };

  const handleUpdateFaq = async (e) => {
    e.preventDefault();
    if (!editingFaq) return;
    const updated = faqs.map((f, i) => i === editingFaq.index ? { ...f, question: editingFaq.question, answer: editingFaq.answer } : f);
    setFaqs(updated);
    setEditingFaq(null);
    await siteDataManager.saveFaqs(updated);
  };

  const handleDeleteFaq = async (idx) => {
    const updated = faqs.filter((_, i) => i !== idx);
    setFaqs(updated);
    await siteDataManager.saveFaqs(updated);
  };

  const handleSaveFaqsBulk = async () => {
    setSubmittingFaqs(true);
    await siteDataManager.saveFaqs(faqs);
    setSubmittingFaqs(false);
    showToast('FAQs saved to Supabase.');
  };

  // Timeline journey state
  const [journey, setJourney] = useState(agencyInfo?.journey || [
    { year: "2023", title: "The Inception", desc: "Digital Ads World was founded in Hyderabad by K Charan with a single goal: driving performance-first results." },
    { year: "2024", title: "Scaling Up", desc: "G Sri Ram joined to spearhead Digital Marketing, expanding ad management capacity by 300%." },
    { year: "2025", title: "Global Client Base", desc: "Serviced over 50+ clients globally, managing over $2.4 Million in cumulative ad spend." },
    { year: "2026", title: "Dynamic Lead Systems", desc: "Launched automated conversation funnels integrating client databases with immediate WhatsApp routing." }
  ]);
  const [editingJourney, setEditingJourney] = useState(null);
  const [newJourney, setNewJourney] = useState({ year: '', title: '', desc: '' });

  // Testimonial state
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [newTestimonial, setNewTestimonial] = useState(null);

  // Brands state
  const [editingBrand, setEditingBrand] = useState(null);
  const [newBrand, setNewBrand] = useState(null);

  const handleSaveInfo = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const updatedInfo = {
        ...agencyInfo,
        hero_badge: heroBadge,
        hero_title: heroTitle,
        hero_subtitle: heroSubtitle,
        hero_cta_text: heroCtaText,
        hero_secondary_cta_text: heroSecondaryCtaText,
        hero_image_url: heroImageUrl,
        hero_stats: heroStats,
        values: values,
        journey: journey,
        process_tag: processTag,
        process_title: processTitle,
        process_subtitle: processSubtitle,
        process_flow: processFlow
      };
      await siteDataManager.saveAgencyInfo(updatedInfo);
      setAgencyInfo(updatedInfo);
      showToast('Homepage static & layout settings saved to Supabase.');
    } catch (err) {
      showToast('Error saving homepage variables.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTestimonialSave = async (e) => {
    e.preventDefault();
    if (!editingTestimonial.name || !editingTestimonial.feedback) return;
    try {
      await siteDataManager.updateTestimonial(editingTestimonial.id, editingTestimonial);
      setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? editingTestimonial : t));
      showToast('Testimonial reviews updated.');
      setEditingTestimonial(null);
    } catch (err) {
      showToast('Failed to save testimonial changes.', 'error');
    }
  };

  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.feedback) return;
    try {
      const added = await siteDataManager.addTestimonial(newTestimonial);
      setTestimonials([...testimonials, added]);
      showToast('New testimonial published.');
      setNewTestimonial(null);
    } catch (err) {
      showToast('Failed to append testimonial.', 'error');
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Delete this customer testimonial review?")) return;
    try {
      await siteDataManager.deleteTestimonial(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
      showToast('Testimonial removed.');
    } catch (err) {
      showToast('Error removing testimonial.', 'error');
    }
  };

  const handleUploadTestimonialPic = async (e, mode) => {
    const url = await handleCloudinaryUpload(e);
    if (!url) return;
    if (mode === 'edit') {
      setEditingTestimonial({ ...editingTestimonial, image_url: url });
    } else {
      setNewTestimonial({ ...newTestimonial, image_url: url });
    }
  };

  // Stats Counters CRUD functions
  const handleAddStat = (e) => {
    e.preventDefault();
    if (!newStat.value || !newStat.label) return;
    const updated = [...heroStats, { id: Date.now().toString(), value: newStat.value, label: newStat.label }];
    setHeroStats(updated);
    setNewStat({ value: '', label: '' });
    showToast('Counter added (Click Save to commit changes)');
  };

  const handleUpdateStat = (e) => {
    e.preventDefault();
    if (!editingStat.value || !editingStat.label) return;
    const updated = heroStats.map((st, i) => i === editingStat.index ? { ...st, value: editingStat.value, label: editingStat.label } : st);
    setHeroStats(updated);
    setEditingStat(null);
    showToast('Counter updated (Click Save to commit changes)');
  };

  const handleDeleteStat = (index) => {
    const updated = heroStats.filter((_, i) => i !== index);
    setHeroStats(updated);
    showToast('Counter removed (Click Save to commit changes)');
  };

  // Why Choose Us CRUD functions
  const handleAddValue = (e) => {
    e.preventDefault();
    if (!newValue.title || !newValue.description) return;
    const updated = [...values, { id: Date.now().toString(), title: newValue.title, description: newValue.description, icon: newValue.icon }];
    setValues(updated);
    setNewValue({ title: '', description: '', icon: 'Target' });
    showToast('Value added (Click Save to commit)');
  };

  const handleUpdateValue = (e) => {
    e.preventDefault();
    if (!editingValue.title || !editingValue.description) return;
    const updated = values.map((v, i) => i === editingValue.index ? { ...v, title: editingValue.title, description: editingValue.description, icon: editingValue.icon } : v);
    setValues(updated);
    setEditingValue(null);
    showToast('Value updated (Click Save to commit)');
  };

  const handleDeleteValue = (index) => {
    const updated = values.filter((_, i) => i !== index);
    setValues(updated);
    showToast('Value removed (Click Save to commit)');
  };

  // Timeline Journey CRUD functions
  const handleAddJourney = (e) => {
    e.preventDefault();
    if (!newJourney.year || !newJourney.title) return;
    const updated = [...journey, { id: Date.now().toString(), year: newJourney.year, title: newJourney.title, desc: newJourney.desc }];
    setJourney(updated);
    setNewJourney({ year: '', title: '', desc: '' });
    showToast('Milestone added (Click Save to commit)');
  };

  const handleUpdateJourney = (e) => {
    e.preventDefault();
    if (!editingJourney.year || !editingJourney.title) return;
    const updated = journey.map((item, i) => i === editingJourney.index ? { ...item, year: editingJourney.year, title: editingJourney.title, desc: editingJourney.desc } : item);
    setJourney(updated);
    setEditingJourney(null);
    showToast('Milestone updated (Click Save to commit)');
  };

  const handleDeleteJourney = (index) => {
    const updated = journey.filter((_, i) => i !== index);
    setJourney(updated);
    showToast('Milestone removed (Click Save to commit)');
  };

  // Brands CRUD functions
  const handleAddBrand = async (e) => {
    e.preventDefault();
    if (!newBrand || !newBrand.name || !newBrand.logo) {
      showToast('Brand name and logo are required.', 'error');
      return;
    }
    const updated = [...brands, { id: 'b-' + Date.now().toString(), name: newBrand.name, logo: newBrand.logo }];
    try {
      await siteDataManager.saveBrands(updated);
      setBrands(updated);
      setNewBrand(null);
      showToast('Brand logo added and synced successfully.');
    } catch (err) {
      showToast('Error adding brand logo.', 'error');
    }
  };

  const handleUpdateBrand = async (e) => {
    e.preventDefault();
    if (!editingBrand || !editingBrand.name || !editingBrand.logo) {
      showToast('Brand name and logo are required.', 'error');
      return;
    }
    const updated = brands.map(b => b.id === editingBrand.id ? { ...b, name: editingBrand.name, logo: editingBrand.logo } : b);
    try {
      await siteDataManager.saveBrands(updated);
      setBrands(updated);
      setEditingBrand(null);
      showToast('Brand logo updated successfully.');
    } catch (err) {
      showToast('Error updating brand logo.', 'error');
    }
  };

  const handleDeleteBrand = async (id) => {
    if (!window.confirm("Remove this brand logo from the website?")) return;
    const updated = brands.filter(b => b.id !== id);
    try {
      await siteDataManager.saveBrands(updated);
      setBrands(updated);
      showToast('Brand logo removed successfully.');
    } catch (err) {
      showToast('Error removing brand logo.', 'error');
    }
  };

  const handleUploadBrandLogo = async (e, mode) => {
    const url = await handleCloudinaryUpload(e);
    if (!url) return;
    if (mode === 'edit') {
      setEditingBrand({ ...editingBrand, logo: url });
    } else {
      setNewBrand({ ...newBrand, logo: url });
    }
  };

  if (!agencyInfo) return null;

  return (
    <div className="space-y-8 text-left font-body">
      <div>
        <h1 className="text-3xl font-black text-premium-black font-heading leading-none">Home Page Content Suite</h1>
        <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Manage hero layouts, counters, mission values, timeline journey, and reviews</p>
      </div>

      {/* Nested Switcher Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'coords', label: 'Corporate Coordinates', icon: Settings },
          { id: 'hero', label: 'Hero Copy & CTAs', icon: Sparkles },
          { id: 'stats', label: 'Stats Counters', icon: BarChart3 },
          { id: 'values', label: 'Core Values', icon: ShieldCheck },
          { id: 'journey', label: 'Journey Timeline', icon: Clock },
          { id: 'process', label: 'Leads Flow', icon: Layers },
          { id: 'brands', label: 'Brand Logos', icon: Briefcase },
          { id: 'testimonials', label: 'Client Reviews', icon: Users },
          { id: 'industries', label: 'Industries We Serve', icon: Globe },
          { id: 'faqs', label: 'FAQs', icon: MessageCircle }
        ].map(sub => {
          const SubIcon = sub.icon;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubTab(sub.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 ${
                activeSubTab === sub.id 
                  ? 'bg-primary-blue text-white shadow-md shadow-blue-500/10' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <SubIcon size={14} />
              <span>{sub.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TAB CONTENTS */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        
        {/* 1. CORE COORDINATES */}
        {activeSubTab === 'coords' && (
          <form onSubmit={handleSaveInfo} className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 font-heading border-b border-slate-50 pb-3">Corporate Coordinates</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Company Name</label>
                <input
                  type="text"
                  required
                  value={agencyInfo.name}
                  onChange={(e) => setAgencyInfo({ ...agencyInfo, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Tagline</label>
                <input
                  type="text"
                  required
                  value={agencyInfo.tagline}
                  onChange={(e) => setAgencyInfo({ ...agencyInfo, tagline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Phone Number</label>
                <input
                  type="text"
                  required
                  value={agencyInfo.phone}
                  onChange={(e) => setAgencyInfo({ ...agencyInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">WhatsApp Link ID</label>
                <input
                  type="text"
                  required
                  value={agencyInfo.whatsapp}
                  onChange={(e) => setAgencyInfo({ ...agencyInfo, whatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Corporate Email</label>
                <input
                  type="email"
                  required
                  value={agencyInfo.email}
                  onChange={(e) => setAgencyInfo({ ...agencyInfo, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Office Physical Address</label>
              <textarea
                rows="2"
                required
                value={agencyInfo.address}
                onChange={(e) => setAgencyInfo({ ...agencyInfo, address: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700 resize-none"
              ></textarea>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-6">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">SEO Engine Variables</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">SEO Title Metadata</label>
                  <input
                    type="text"
                    required
                    value={agencyInfo.seo?.title || ''}
                    onChange={(e) => setAgencyInfo({
                      ...agencyInfo,
                      seo: { ...agencyInfo.seo, title: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">SEO Description</label>
                  <textarea
                    rows="2"
                    required
                    value={agencyInfo.seo?.description || ''}
                    onChange={(e) => setAgencyInfo({
                      ...agencyInfo,
                      seo: { ...agencyInfo.seo, description: e.target.value }
                    })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700 resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10"
            >
              {submitting ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
              <span>Save Coordinates</span>
            </button>
          </form>
        )}

        {/* 2. HERO COPY & CTAS */}
        {activeSubTab === 'hero' && (
          <form onSubmit={handleSaveInfo} className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 font-heading border-b border-slate-50 pb-3">Hero Content Editor</h3>
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Hero Top Badge Text</label>
              <input
                type="text"
                required
                value={heroBadge}
                onChange={(e) => setHeroBadge(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Hero Big Main Heading Title</label>
              <textarea
                rows="2"
                required
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Hero Subtitle Paragraph Description</label>
              <textarea
                rows="3"
                required
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Hero Section Image</label>
              <div className="flex gap-4 items-start">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200 bg-slate-50 relative">
                  <img src={heroImageUrl || marketingTeamImg} alt="Hero Preview" className="w-full h-full object-cover" />
                  {!heroImageUrl && (
                    <div className="absolute inset-0 bg-slate-950/50 flex items-center justify-center text-[9px] font-black uppercase text-white tracking-widest text-center px-1">
                      Default
                    </div>
                  )}
                </div>
                <div className="flex-grow space-y-2">
                  <input
                    type="text"
                    placeholder="Paste direct image URL..."
                    value={heroImageUrl}
                    onChange={(e) => setHeroImageUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer text-xs font-bold transition-all w-fit">
                    <Upload size={12} />
                    <span>{uploading ? "Uploading..." : "Upload to Cloudinary"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const url = await handleCloudinaryUpload(e);
                        if (url) setHeroImageUrl(url);
                      }}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Primary CTA Button Text</label>
                <input
                  type="text"
                  required
                  value={heroCtaText}
                  onChange={(e) => setHeroCtaText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">Secondary CTA Button Text</label>
                <input
                  type="text"
                  required
                  value={heroSecondaryCtaText}
                  onChange={(e) => setHeroSecondaryCtaText(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-primary-blue text-xs font-semibold text-slate-700"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase flex items-center justify-center gap-2 shadow-lg"
            >
              {submitting ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
              <span>Save Hero Content</span>
            </button>
          </form>
        )}

        {/* 3. STATS COUNTERS */}
        {activeSubTab === 'stats' && (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 font-heading border-b border-slate-50 pb-3">Hero Statistics Counters Builder</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Existing List */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Active Counters (Max 5)</span>
                {heroStats.map((st, idx) => (
                  <div key={st.id || idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-black text-primary-blue leading-none">{st.value}</p>
                      <p className="text-xs font-semibold text-slate-600 mt-1">{st.label}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setEditingStat({ index: idx, value: st.value, label: st.label })}
                        className="p-2 bg-white hover:bg-blue-50 text-slate-400 hover:text-primary-blue border border-slate-200 rounded-xl transition-all"
                        title="Edit Counter"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDeleteStat(idx)}
                        className="p-2 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-xl transition-all"
                        title="Delete Counter"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
                {heroStats.length === 0 && <p className="text-xs font-medium text-slate-400">No counters defined.</p>}
              </div>

              {/* Add/Edit form */}
              <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 self-start">
                {editingStat ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-black uppercase text-primary-blue tracking-wider">Edit Counter</h4>
                      <button onClick={() => setEditingStat(null)} className="text-slate-400 hover:text-slate-700 text-xs font-bold uppercase">Cancel</button>
                    </div>
                    <form onSubmit={handleUpdateStat} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Value (e.g. 50+)</label>
                        <input
                          type="text"
                          required
                          value={editingStat.value}
                          onChange={(e) => setEditingStat({ ...editingStat, value: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Label Name (e.g. Happy Clients)</label>
                        <input
                          type="text"
                          required
                          value={editingStat.label}
                          onChange={(e) => setEditingStat({ ...editingStat, label: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider"
                      >
                        Update counter
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-4">Add Counter</h4>
                    <form onSubmit={handleAddStat} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Value (e.g. 50+)</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 50+"
                          value={newStat.value}
                          onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Label Name (e.g. Happy Clients)</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Happy Clients"
                          value={newStat.label}
                          onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={heroStats.length >= 5}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider disabled:opacity-50"
                      >
                        Add to counters list
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <button
                onClick={handleSaveInfo}
                disabled={submitting}
                className="px-6 py-2.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase flex items-center justify-center gap-2 shadow-lg"
              >
                {submitting ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                <span>Save Counters Layout</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. CORE VALUES / WHY CHOOSE US */}
        {activeSubTab === 'values' && (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 font-heading border-b border-slate-50 pb-3">Why Choose Us / Core Values</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Existing Values List */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Active Values (Max 4)</span>
                {values.map((v, idx) => (
                  <div key={v.id || idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3 justify-between">
                    <div className="flex gap-3 text-left">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary-blue flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        {v.icon}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm leading-tight">{v.title}</p>
                        <p className="text-slate-500 text-xs font-light mt-1.5 leading-relaxed">{v.description}</p>
                      </div>
                    </div>
                    <div className="flex gap-1.5 shrink-0 ml-4">
                      <button
                        onClick={() => setEditingValue({ index: idx, title: v.title, description: v.description, icon: v.icon })}
                        className="p-1.5 bg-white hover:bg-blue-50 text-slate-400 hover:text-primary-blue border border-slate-200 rounded-lg"
                        title="Edit Value"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteValue(idx)}
                        className="p-1.5 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-lg"
                        title="Delete Value"
                      >
                        <Trash size={12} />
                      </button>
                    </div>
                  </div>
                ))}
                {values.length === 0 && <p className="text-xs font-medium text-slate-400">No values defined.</p>}
              </div>

              {/* Add/Edit form */}
              <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 self-start">
                {editingValue ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-black uppercase text-primary-blue tracking-wider">Edit Value Feature</h4>
                      <button onClick={() => setEditingValue(null)} className="text-slate-400 hover:text-slate-700 text-xs font-bold uppercase">Cancel</button>
                    </div>
                    <form onSubmit={handleUpdateValue} className="space-y-4 text-left">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Value Title</label>
                        <input
                          type="text"
                          required
                          value={editingValue.title}
                          onChange={(e) => setEditingValue({ ...editingValue, title: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Value Description</label>
                        <textarea
                          rows="2"
                          required
                          value={editingValue.description}
                          onChange={(e) => setEditingValue({ ...editingValue, description: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold resize-none"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Lucide Icon Name Key</label>
                        <select
                          value={editingValue.icon}
                          onChange={(e) => setEditingValue({ ...editingValue, icon: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white"
                        >
                          <option value="Target">Target (Bullseye)</option>
                          <option value="BarChart3">BarChart (Data/Stats)</option>
                          <option value="ShieldCheck">ShieldCheck (Security/Trust)</option>
                          <option value="Zap">Zap (Lightning/Speed)</option>
                          <option value="Sparkles">Sparkles (Quality/AI)</option>
                          <option value="Trophy">Trophy (Success/Winner)</option>
                          <option value="Award">Award (Achievement)</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider"
                      >
                        Update Value
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-4">Add Value Feature</h4>
                    <form onSubmit={handleAddValue} className="space-y-4 text-left">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Value Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. High Integrity"
                          value={newValue.title}
                          onChange={(e) => setNewValue({ ...newValue, title: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Value Description</label>
                        <textarea
                          rows="2"
                          required
                          placeholder="Details on what this standard guarantees..."
                          value={newValue.description}
                          onChange={(e) => setNewValue({ ...newValue, description: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold resize-none"
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Lucide Icon Name Key</label>
                        <select
                          value={newValue.icon}
                          onChange={(e) => setNewValue({ ...newValue, icon: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white"
                        >
                          <option value="Target">Target (Bullseye)</option>
                          <option value="BarChart3">BarChart (Data/Stats)</option>
                          <option value="ShieldCheck">ShieldCheck (Security/Trust)</option>
                          <option value="Zap">Zap (Lightning/Speed)</option>
                          <option value="Sparkles">Sparkles (Quality/AI)</option>
                          <option value="Trophy">Trophy (Success/Winner)</option>
                          <option value="Award">Award (Achievement)</option>
                        </select>
                      </div>
                      <button
                        type="submit"
                        disabled={values.length >= 4}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider disabled:opacity-50"
                      >
                        Add Value block
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <button
                onClick={handleSaveInfo}
                disabled={submitting}
                className="px-6 py-2.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase flex items-center justify-center gap-2 shadow-lg"
              >
                {submitting ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                <span>Save Values List</span>
              </button>
            </div>
          </div>
        )}

        {/* 5. JOURNEY TIMELINE */}
        {activeSubTab === 'journey' && (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 font-heading border-b border-slate-50 pb-3">Journey Timeline</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Timeline List */}
              <div className="space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Active Milestones</span>
                {journey.map((item, idx) => (
                  <div key={item.id || idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-primary-blue text-[10px] font-black">{item.year}</span>
                      <h4 className="font-bold text-slate-800 text-sm mt-1">{item.title}</h4>
                      <p className="text-slate-500 text-xs font-light mt-1 leading-relaxed">{item.desc || item.description}</p>
                    </div>
                    <div className="flex gap-1.5 shrink-0 ml-4">
                      <button
                        onClick={() => setEditingJourney({ index: idx, year: item.year, title: item.title, desc: item.desc || item.description })}
                        className="p-1.5 bg-white hover:bg-blue-50 text-slate-400 hover:text-primary-blue border border-slate-200 rounded-lg"
                        title="Edit Milestone"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteJourney(idx)}
                        className="p-1.5 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-lg shrink-0"
                        title="Delete Milestone"
                      >
                        <Trash size={12} />
                      </button>
                    </div>
                  </div>
                ))}
                {journey.length === 0 && <p className="text-xs font-medium text-slate-400">No milestones defined.</p>}
              </div>

              {/* Add/Edit form */}
              <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 self-start text-left">
                {editingJourney ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-black uppercase text-primary-blue tracking-wider">Edit Journey Milestone</h4>
                      <button onClick={() => setEditingJourney(null)} className="text-slate-400 hover:text-slate-700 text-xs font-bold uppercase">Cancel</button>
                    </div>
                    <form onSubmit={handleUpdateJourney} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Milestone Year (e.g. 2026)</label>
                        <input
                          type="text"
                          required
                          value={editingJourney.year}
                          onChange={(e) => setEditingJourney({ ...editingJourney, year: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Milestone Title</label>
                        <input
                          type="text"
                          required
                          value={editingJourney.title}
                          onChange={(e) => setEditingJourney({ ...editingJourney, title: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Milestone Description Summary</label>
                        <textarea
                          rows="3"
                          required
                          value={editingJourney.desc}
                          onChange={(e) => setEditingJourney({ ...editingJourney, desc: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold resize-none"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider"
                      >
                        Update Milestone
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-4">Add Journey Milestone</h4>
                    <form onSubmit={handleAddJourney} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Milestone Year (e.g. 2026)</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 2026"
                          value={newJourney.year}
                          onChange={(e) => setNewJourney({ ...newJourney, year: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Milestone Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Dynamic Funnel Launch"
                          value={newJourney.title}
                          onChange={(e) => setNewJourney({ ...newJourney, title: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Milestone Description Summary</label>
                        <textarea
                          rows="3"
                          required
                          placeholder="Summarize achievements or scaling metrics..."
                          value={newJourney.desc}
                          onChange={(e) => setNewJourney({ ...newJourney, desc: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold resize-none"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider"
                      >
                        Add Milestone
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <button
                onClick={handleSaveInfo}
                disabled={submitting}
                className="px-6 py-2.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase flex items-center justify-center gap-2 shadow-lg"
              >
                {submitting ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                <span>Save Milestones Timeline</span>
              </button>
            </div>
          </div>
        )}

        {/* 5b. LEADS FLOW PROCESS */}
        {activeSubTab === 'process' && (
          <div className="space-y-8 text-left font-body">
            <h3 className="text-lg font-black text-slate-800 font-heading border-b border-slate-50 pb-3">Leads Flow Process Editor</h3>
            
            {/* 1. Header and Subtitles Section */}
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl space-y-4">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-2">Section Header Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Section Tag *</label>
                  <input
                    type="text"
                    required
                    value={processTag}
                    onChange={(e) => setProcessTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-blue transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Section Title *</label>
                  <input
                    type="text"
                    required
                    value={processTitle}
                    onChange={(e) => setProcessTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-blue transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Section Subtitle / Description *</label>
                <textarea
                  rows="2"
                  required
                  value={processSubtitle}
                  onChange={(e) => setProcessSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-blue transition-colors resize-none"
                />
              </div>
            </div>

            {/* 2. Tabs Selector & Customizer */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex gap-2">
                  {Object.keys(processFlow).map((tabKey) => (
                    <button
                      key={tabKey}
                      type="button"
                      onClick={() => {
                        setActiveProcessEditTab(tabKey);
                        setEditingColumnIdx(null);
                        setEditingItemIdx(null);
                      }}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                        activeProcessEditTab === tabKey
                          ? 'bg-primary-blue text-white shadow'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-500'
                      }`}
                    >
                      {processFlow[tabKey].label}
                    </button>
                  ))}
                </div>

                {/* Tab Label Rename Input */}
                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Rename Tab Label:</label>
                  <input
                    type="text"
                    value={processFlow[activeProcessEditTab]?.label || ''}
                    onChange={(e) => {
                      const updated = { ...processFlow };
                      updated[activeProcessEditTab].label = e.target.value;
                      setProcessFlow(updated);
                    }}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-primary-blue w-48"
                  />
                </div>
              </div>

              {/* Columns Editor Workspace */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Process Flow Steps</span>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="NEW STEP TITLE..."
                      value={newColumnTitle}
                      onChange={(e) => setNewColumnTitle(e.target.value)}
                      className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-primary-blue w-40"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newColumnTitle.trim()) return;
                        const updated = { ...processFlow };
                        updated[activeProcessEditTab].columns.push({
                          title: newColumnTitle.toUpperCase(),
                          items: []
                        });
                        setProcessFlow(updated);
                        setNewColumnTitle('');
                        showToast('New column step added.');
                      }}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-primary-blue rounded-xl text-xs font-bold uppercase flex items-center gap-1"
                    >
                      <Plus size={12} />
                      <span>Add Step</span>
                    </button>
                  </div>
                </div>

                {/* Horizontal steps columns view */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
                  {processFlow[activeProcessEditTab]?.columns.map((column, cIdx) => (
                    <div key={cIdx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-3 min-h-[300px]">
                      {/* Step Header */}
                      <div className="flex items-center justify-between border-b border-slate-200/50 pb-2">
                        {editingColumnIdx === cIdx ? (
                          <input
                            type="text"
                            value={editingColumnTitle}
                            onBlur={() => {
                              if (editingColumnTitle.trim()) {
                                const updated = { ...processFlow };
                                updated[activeProcessEditTab].columns[cIdx].title = editingColumnTitle.toUpperCase();
                                setProcessFlow(updated);
                              }
                              setEditingColumnIdx(null);
                            }}
                            onChange={(e) => setEditingColumnTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                if (editingColumnTitle.trim()) {
                                  const updated = { ...processFlow };
                                  updated[activeProcessEditTab].columns[cIdx].title = editingColumnTitle.toUpperCase();
                                  setProcessFlow(updated);
                                }
                                setEditingColumnIdx(null);
                              }
                            }}
                            autoFocus
                            className="w-full px-2 py-0.5 border border-slate-300 rounded text-[10px] font-black uppercase text-slate-800"
                          />
                        ) : (
                          <span
                            onClick={() => {
                              setEditingColumnIdx(cIdx);
                              setEditingColumnTitle(column.title);
                            }}
                            className="text-[10px] font-black text-slate-600 tracking-wider uppercase cursor-pointer hover:text-primary-blue hover:underline"
                            title="Click to rename"
                          >
                            {column.title}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            if (!window.confirm(`Delete "${column.title}" column?`)) return;
                            const updated = { ...processFlow };
                            updated[activeProcessEditTab].columns = updated[activeProcessEditTab].columns.filter((_, idx) => idx !== cIdx);
                            setProcessFlow(updated);
                            showToast('Column deleted.');
                          }}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-0.5 rounded"
                          title="Delete Step"
                        >
                          <Trash size={12} />
                        </button>
                      </div>

                      {/* Step Items list */}
                      <div className="flex-grow flex flex-col gap-1.5 overflow-y-auto">
                        {column.items.map((item, iIdx) => (
                          <div
                            key={iIdx}
                            className="bg-white border border-slate-200/60 rounded-xl p-2 flex items-center justify-between text-left shadow-sm group hover:border-slate-300 relative"
                          >
                            {editingItemIdx?.colIdx === cIdx && editingItemIdx?.itemIdx === iIdx ? (
                              <input
                                type="text"
                                value={editingItemVal}
                                onBlur={() => {
                                  if (editingItemVal.trim()) {
                                    const updated = { ...processFlow };
                                    updated[activeProcessEditTab].columns[cIdx].items[iIdx] = editingItemVal;
                                    setProcessFlow(updated);
                                  }
                                  setEditingItemIdx(null);
                                }}
                                onChange={(e) => setEditingItemVal(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    if (editingItemVal.trim()) {
                                      const updated = { ...processFlow };
                                      updated[activeProcessEditTab].columns[cIdx].items[iIdx] = editingItemVal;
                                      setProcessFlow(updated);
                                    }
                                    setEditingItemIdx(null);
                                  }
                                }}
                                autoFocus
                                className="w-full px-1.5 py-0.5 border border-slate-200 rounded text-xs text-slate-700"
                              />
                            ) : (
                              <>
                                <span className="text-[11px] font-semibold text-slate-700 leading-tight pr-2">
                                  {item}
                                </span>
                                <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white pl-1 absolute right-1">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingItemIdx({ colIdx: cIdx, itemIdx: iIdx });
                                      setEditingItemVal(item);
                                    }}
                                    className="p-1 text-slate-400 hover:text-blue-500 hover:bg-slate-100 rounded"
                                    title="Edit Item"
                                  >
                                    <Edit2 size={10} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = { ...processFlow };
                                      updated[activeProcessEditTab].columns[cIdx].items = updated[activeProcessEditTab].columns[cIdx].items.filter((_, idx) => idx !== iIdx);
                                      setProcessFlow(updated);
                                    }}
                                    className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded"
                                    title="Remove Item"
                                  >
                                    <X size={10} />
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Add Item Trigger */}
                      <div className="mt-auto pt-2 border-t border-slate-200/50">
                        {newItemInputColIdx === cIdx ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="text"
                              placeholder="New task..."
                              value={newItemVal}
                              onChange={(e) => setNewItemVal(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  if (newItemVal.trim()) {
                                    const updated = { ...processFlow };
                                    updated[activeProcessEditTab].columns[cIdx].items.push(newItemVal.trim());
                                    setProcessFlow(updated);
                                    setNewItemVal('');
                                  }
                                  setNewItemInputColIdx(null);
                                }
                              }}
                              autoFocus
                              className="w-full px-2 py-1 border border-slate-200 rounded-lg text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (newItemVal.trim()) {
                                  const updated = { ...processFlow };
                                  updated[activeProcessEditTab].columns[cIdx].items.push(newItemVal.trim());
                                  setProcessFlow(updated);
                                  setNewItemVal('');
                                }
                                setNewItemInputColIdx(null);
                              }}
                              className="p-1 bg-primary-blue text-white rounded-lg hover:bg-blue-600"
                            >
                              <Check size={11} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setNewItemInputColIdx(cIdx);
                              setNewItemVal('');
                            }}
                            className="w-full py-1 bg-white hover:bg-slate-100 border border-slate-200/60 rounded-xl text-[10px] font-black text-slate-500 uppercase flex items-center justify-center gap-1 transition-colors"
                          >
                            <Plus size={11} />
                            <span>Add Item</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="border-t border-slate-100 pt-6">
              <button
                onClick={handleSaveInfo}
                disabled={submitting}
                className="px-6 py-2.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                {submitting ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                <span>Save Lead Flow Process</span>
              </button>
            </div>
          </div>
        )}

        {/* 6. BRAND LOGOS */}
        {activeSubTab === 'brands' && (
          <div className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 font-heading border-b border-slate-50 pb-3">Trusted Brand Logos</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Brands grid list (Col-span 2) */}
              <div className="lg:col-span-2 space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Active Brand Partners</span>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {brands.map((brand, idx) => (
                    <div key={brand.id || idx} className="bg-white border border-slate-200/60 shadow-sm rounded-2xl p-4 flex flex-col items-center justify-between group relative min-h-[140px] hover:shadow-md transition-all">
                      <div className="h-16 flex items-center justify-center mb-2 w-full overflow-hidden">
                        <img 
                          src={brand.logo} 
                          alt={brand.name} 
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700 text-center line-clamp-1">{brand.name}</span>
                      
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setEditingBrand({ ...brand })}
                          className="p-1 bg-white hover:bg-blue-50 text-slate-400 hover:text-primary-blue border border-slate-200 rounded-lg shadow-sm"
                          title="Edit Brand"
                        >
                          <Edit2 size={11} />
                        </button>
                        <button
                          onClick={() => handleDeleteBrand(brand.id)}
                          className="p-1 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-lg shadow-sm animate-none"
                          title="Delete Brand"
                        >
                          <Trash size={11} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {brands.length === 0 && <p className="text-xs font-medium text-slate-400 col-span-full">No brands added.</p>}
                </div>
              </div>

              {/* Form panel (Col-span 1) */}
              <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 self-start text-left animate-none">
                {editingBrand ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-black uppercase text-primary-blue tracking-wider">Edit Brand Partner</h4>
                      <button onClick={() => setEditingBrand(null)} className="text-slate-400 hover:text-slate-700 text-xs font-bold uppercase">Cancel</button>
                    </div>
                    <form onSubmit={handleUpdateBrand} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Brand Partner Name</label>
                        <input
                          type="text"
                          required
                          value={editingBrand.name}
                          onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Upload Brand Logo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleUploadBrandLogo(e, 'edit')}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white"
                        />
                        {uploading && <p className="text-[10px] text-primary-blue font-bold mt-1 animate-pulse">Uploading file to Cloudinary...</p>}
                        {editingBrand.logo && (
                          <div className="mt-2 h-16 border border-slate-200 rounded-xl flex items-center justify-center p-2 bg-white overflow-hidden">
                            <img src={editingBrand.logo} alt="Preview" className="max-h-full object-contain" />
                          </div>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={uploading}
                        className="w-full py-2 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider disabled:opacity-50"
                      >
                        Update Brand
                      </button>
                    </form>
                  </>
                ) : (
                  <>
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-4">Add Brand Partner</h4>
                    <form onSubmit={handleAddBrand} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Brand Partner Name</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. NSR Developers"
                          value={newBrand?.name || ''}
                          onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Upload Brand Logo</label>
                        <input
                          type="file"
                          accept="image/*"
                          required={!newBrand?.logo}
                          onChange={(e) => handleUploadBrandLogo(e, 'add')}
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white"
                        />
                        {uploading && <p className="text-[10px] text-primary-blue font-bold mt-1 animate-pulse">Uploading file to Cloudinary...</p>}
                        {newBrand?.logo && (
                          <div className="mt-2 h-16 border border-slate-200 rounded-xl flex items-center justify-center p-2 bg-white overflow-hidden">
                            <img src={newBrand.logo} alt="Preview" className="max-h-full object-contain" />
                          </div>
                        )}
                      </div>
                      <button
                        type="submit"
                        disabled={uploading || !newBrand?.logo || !newBrand?.name}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider disabled:opacity-50"
                      >
                        Add Brand
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 7. CLIENT TESTIMONIALS */}
        {activeSubTab === 'testimonials' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* CRUD fields (Add/Edit testimonial) */}
            <div className="space-y-6 self-start">
              {editingTestimonial && (
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                    <h4 className="font-bold text-premium-black text-xs uppercase tracking-wider">Edit Review</h4>
                    <button onClick={() => setEditingTestimonial(null)} className="text-slate-400 hover:text-premium-black"><X size={16} /></button>
                  </div>

                  <form onSubmit={handleTestimonialSave} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Reviewer Name"
                        value={editingTestimonial.name}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                      <input
                        type="text"
                        placeholder="Designation (e.g. CEO)"
                        value={editingTestimonial.designation}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, designation: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Company / Location"
                        value={editingTestimonial.company}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                      <input
                        type="number"
                        max="5"
                        min="1"
                        value={editingTestimonial.rating || 5}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) || 5 })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold"
                        placeholder="Rating Star (1-5)"
                      />
                    </div>

                    <div>
                      <textarea
                        rows="3"
                        required
                        placeholder="Client feedback review text..."
                        value={editingTestimonial.feedback}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, feedback: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold resize-none"
                      ></textarea>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Client Profile Avatar (Optional)</label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="text"
                          placeholder="Image URL"
                          value={editingTestimonial.image_url || ''}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, image_url: e.target.value })}
                          className="flex-grow px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                        <label className="p-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 cursor-pointer text-xs flex gap-1.5 items-center font-bold">
                          <Upload size={14} />
                          <span>Upload</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleUploadTestimonialPic(e, 'edit')} 
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="w-full py-2.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md">
                      Update Testimonial
                    </button>
                  </form>
                </div>
              )}

              {newTestimonial ? (
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                    <h4 className="font-bold text-premium-black text-xs uppercase tracking-wider">Add New Testimonial</h4>
                    <button onClick={() => setNewTestimonial(null)} className="text-slate-400 hover:text-premium-black"><X size={16} /></button>
                  </div>

                  <form onSubmit={handleAddTestimonial} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Reviewer Name *"
                        value={newTestimonial.name || ''}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                      <input
                        type="text"
                        placeholder="Designation (e.g. Founder)"
                        value={newTestimonial.designation || ''}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, designation: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Company / Location"
                        value={newTestimonial.company || ''}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold"
                      />
                      <input
                        type="number"
                        max="5"
                        min="1"
                        value={newTestimonial.rating || 5}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) || 5 })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold"
                        placeholder="Star Rating (1-5)"
                      />
                    </div>

                    <div>
                      <textarea
                        rows="3"
                        required
                        placeholder="Client feedback review text..."
                        value={newTestimonial.feedback || ''}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, feedback: e.target.value })}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold resize-none"
                      ></textarea>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Client Profile Avatar (Optional)</label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="text"
                          placeholder="Image URL"
                          value={newTestimonial.image_url || ''}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, image_url: e.target.value })}
                          className="flex-grow px-3.5 py-2 border border-slate-200 rounded-xl text-xs font-semibold"
                        />
                        <label className="p-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 cursor-pointer text-xs flex gap-1.5 items-center font-bold">
                          <Upload size={14} />
                          <span>Upload</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => handleUploadTestimonialPic(e, 'add')} 
                            className="hidden" 
                          />
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="w-full py-2.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md">
                      Publish Testimonial
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Publish Client Review</span>
                  <button 
                    onClick={() => setNewTestimonial({ name: '', designation: '', company: '', rating: 5, feedback: '', image_url: '' })}
                    className="px-3 py-1.5 bg-primary-blue hover:bg-blue-700 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Plus size={14} />
                    <span>Add Review</span>
                  </button>
                </div>
              )}
            </div>

            {/* Testimonials List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Active Testimonial Reviews</span>
              {testimonials.map(t => (
                <div key={t.id} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-800">{t.name}</span>
                      <span className="text-slate-400 text-xs font-medium">— {t.designation || 'Client'}</span>
                    </div>
                    <p className="text-slate-500 text-xs italic font-light mt-1.5 leading-relaxed">"{t.feedback}"</p>
                  </div>
                  
                  <div className="flex flex-col gap-1.5 shrink-0 justify-center">
                    <button 
                      onClick={() => setEditingTestimonial(t)} 
                      className="p-1.5 bg-white hover:bg-blue-50 text-slate-500 hover:text-primary-blue rounded-lg border border-slate-200"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button 
                      onClick={() => handleDeleteTestimonial(t.id)} 
                      className="p-1.5 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg border border-slate-200"
                    >
                      <Trash size={13} />
                    </button>
                  </div>
                </div>
              ))}
              {testimonials.length === 0 && <p className="text-xs font-medium text-slate-400">No testimonials published.</p>}
            </div>

          </div>
        )}

        {/* 8. INDUSTRIES WE SERVE */}
        {activeSubTab === 'industries' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-800 font-heading">Industries We Serve</h3>
              <button
                onClick={handleSaveIndustriesBulk}
                disabled={submittingIndustries}
                className="px-5 py-2 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-[10px] uppercase flex items-center gap-2"
              >
                {submittingIndustries ? <RefreshCw size={12} className="animate-spin" /> : <Check size={12} />}
                Save All to Supabase
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Industry List */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Active Industries ({industries.length})</span>
                <div className="max-h-[420px] overflow-y-auto space-y-2 pr-1">
                  {industries.map((ind, idx) => (
                    <div key={ind.id || idx} className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-lg flex items-center justify-center border text-xs font-black shrink-0 ${ind.color}`}>{ind.icon?.charAt(0)}</span>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{ind.title}</p>
                          <p className="text-xs text-slate-400 font-medium">{ind.desc}</p>
                        </div>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => setEditingIndustry({ index: idx, title: ind.title, desc: ind.desc, icon: ind.icon, color: ind.color })}
                          className="p-1.5 bg-white hover:bg-blue-50 text-slate-400 hover:text-primary-blue border border-slate-200 rounded-lg"
                          title="Edit"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteIndustry(idx)}
                          className="p-1.5 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-lg"
                          title="Delete"
                        >
                          <Trash size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {industries.length === 0 && <p className="text-xs font-medium text-slate-400">No industries defined. Add one.</p>}
                </div>
              </div>

              {/* Add / Edit Form */}
              <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 self-start">
                {editingIndustry ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-black uppercase text-primary-blue tracking-wider">Edit Industry</h4>
                      <button onClick={() => setEditingIndustry(null)} className="text-slate-400 hover:text-slate-700 text-xs font-bold uppercase">Cancel</button>
                    </div>
                    <form onSubmit={handleUpdateIndustry} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Industry Name *</label>
                        <input type="text" required value={editingIndustry.title} onChange={e => setEditingIndustry({ ...editingIndustry, title: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Sub-description</label>
                        <input type="text" value={editingIndustry.desc} onChange={e => setEditingIndustry({ ...editingIndustry, desc: e.target.value })} placeholder="e.g. Hospitals • Clinics • Pharma" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Lucide Icon Name</label>
                        <input type="text" value={editingIndustry.icon} onChange={e => setEditingIndustry({ ...editingIndustry, icon: e.target.value })} placeholder="e.g. Activity, Globe, Users" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Color Theme</label>
                        <select value={editingIndustry.color} onChange={e => setEditingIndustry({ ...editingIndustry, color: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white">
                          {industryColorOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                      </div>
                      <button type="submit" className="w-full py-2 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider">Update Industry</button>
                    </form>
                  </>
                ) : (
                  <>
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-4">Add Industry Card</h4>
                    <form onSubmit={handleAddIndustry} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Industry Name *</label>
                        <input type="text" required value={newIndustry.title} onChange={e => setNewIndustry({ ...newIndustry, title: e.target.value })} placeholder="e.g. Automotive" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Sub-description</label>
                        <input type="text" value={newIndustry.desc} onChange={e => setNewIndustry({ ...newIndustry, desc: e.target.value })} placeholder="e.g. Dealers • OEMs • Parts" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Lucide Icon Name</label>
                        <input type="text" value={newIndustry.icon} onChange={e => setNewIndustry({ ...newIndustry, icon: e.target.value })} placeholder="e.g. Car, Globe, Zap" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Color Theme</label>
                        <select value={newIndustry.color} onChange={e => setNewIndustry({ ...newIndustry, color: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold bg-white">
                          {industryColorOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                      </div>
                      <button type="submit" className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider">Add Industry</button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 9. FAQS */}
        {activeSubTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-800 font-heading">Frequently Asked Questions</h3>
              <button
                onClick={handleSaveFaqsBulk}
                disabled={submittingFaqs}
                className="px-5 py-2 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-[10px] uppercase flex items-center gap-2"
              >
                {submittingFaqs ? <RefreshCw size={12} className="animate-spin" /> : <Check size={12} />}
                Save All to Supabase
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* FAQ List */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide block">Published FAQs ({faqs.length})</span>
                <div className="max-h-[420px] overflow-y-auto space-y-2 pr-1">
                  {faqs.map((faq, idx) => (
                    <div key={faq.id || idx} className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-800 leading-snug">{faq.question}</p>
                        <p className="text-xs text-slate-400 font-light mt-1 leading-relaxed line-clamp-2">{faq.answer}</p>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => setEditingFaq({ index: idx, question: faq.question, answer: faq.answer })}
                          className="p-1.5 bg-white hover:bg-blue-50 text-slate-400 hover:text-primary-blue border border-slate-200 rounded-lg"
                          title="Edit FAQ"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteFaq(idx)}
                          className="p-1.5 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-lg"
                          title="Delete FAQ"
                        >
                          <Trash size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {faqs.length === 0 && <p className="text-xs font-medium text-slate-400">No FAQs added yet.</p>}
                </div>
              </div>

              {/* Add / Edit FAQ Form */}
              <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 self-start">
                {editingFaq ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xs font-black uppercase text-primary-blue tracking-wider">Edit FAQ</h4>
                      <button onClick={() => setEditingFaq(null)} className="text-slate-400 hover:text-slate-700 text-xs font-bold uppercase">Cancel</button>
                    </div>
                    <form onSubmit={handleUpdateFaq} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Question *</label>
                        <input type="text" required value={editingFaq.question} onChange={e => setEditingFaq({ ...editingFaq, question: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Answer *</label>
                        <textarea rows="5" required value={editingFaq.answer} onChange={e => setEditingFaq({ ...editingFaq, answer: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold resize-none"></textarea>
                      </div>
                      <button type="submit" className="w-full py-2 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider">Update FAQ</button>
                    </form>
                  </>
                ) : (
                  <>
                    <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-4">Add New FAQ</h4>
                    <form onSubmit={handleAddFaq} className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Question *</label>
                        <input type="text" required value={newFaq.question} onChange={e => setNewFaq({ ...newFaq, question: e.target.value })} placeholder="e.g. What is your minimum budget?" className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Answer *</label>
                        <textarea rows="5" required value={newFaq.answer} onChange={e => setNewFaq({ ...newFaq, answer: e.target.value })} placeholder="Type the detailed answer here..." className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold resize-none"></textarea>
                      </div>
                      <button type="submit" className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[10px] uppercase tracking-wider">Add FAQ</button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ==========================================
// SUBVIEW 5: AboutEditSubView (Story & Team CRUD)
// ==========================================
function AboutEditSubView({ agencyInfo, setAgencyInfo, team, setTeam, showToast, handleCloudinaryUpload, uploading }) {
  const [activeTab, setActiveTab] = useState('copy'); // copy, team
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState(null);
  const [saving, setSaving] = useState(false);
  const [submittingCopy, setSubmittingCopy] = useState(false);

  // About Copy States
  const [bannerTag, setBannerTag] = useState(agencyInfo?.about_banner_tag || "Who We Are");
  const [bannerTitle, setBannerTitle] = useState(agencyInfo?.about_banner_title || "Meet the Results-Driven Agency");
  const [bannerSubtitle, setBannerSubtitle] = useState(agencyInfo?.about_banner_subtitle || "We are a group of developers, copywriters, and media buyers who don't run ads, but drive verified growth.");
  
  const [philTag, setPhilTag] = useState(agencyInfo?.about_philosophy_tag || "Our Philosophy");
  const [philTitle, setPhilTitle] = useState(agencyInfo?.about_philosophy_title || "Empowering Businesses To Break Through Stagnation.");
  const [philText, setPhilText] = useState(agencyInfo?.about_philosophy_text || "Traditional marketing models rely heavily on generic brand awareness campaigns that fail to justify their cost. At Digital Ads World, we operate on a completely different model: performance-based customer acquisition. We construct custom digital pipelines for each of our clients, syncing highly persuasive ad copies, landing pages, and email lists to deliver high-converting inquiries.");
  const [philBulletsText, setPhilBulletsText] = useState(agencyInfo?.about_philosophy_bullets ? agencyInfo.about_philosophy_bullets.join('\n') : "Custom optimization cycles\nDedicated account managers\nDaily budget checks\nROI matching models");
  const [philImageUrl, setPhilImageUrl] = useState(agencyInfo?.about_philosophy_image_url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80");

  const [missionTitle, setMissionTitle] = useState(agencyInfo?.about_mission_title || "Our Mission");
  const [missionText, setMissionText] = useState(agencyInfo?.about_mission_text || "To construct scalable customer acquisition channels that transform marketing budgets into transparent, compounding sales pipelines. We resolve to elevate industry benchmarks through data-driven campaigns.");
  
  const [visionTitle, setVisionTitle] = useState(agencyInfo?.about_vision_title || "Our Vision");
  const [visionText, setVisionText] = useState(agencyInfo?.about_vision_text || "To be recognized as the premier global standard for ROI-centric performance marketing, helping over 1,000 businesses break past digital plateaus using specialized funnel designs.");

  const handleSaveAboutCopy = async (e) => {
    e.preventDefault();
    setSubmittingCopy(true);
    try {
      const updatedInfo = {
        ...agencyInfo,
        about_banner_tag: bannerTag,
        about_banner_title: bannerTitle,
        about_banner_subtitle: bannerSubtitle,
        about_philosophy_tag: philTag,
        about_philosophy_title: philTitle,
        about_philosophy_text: philText,
        about_philosophy_bullets: philBulletsText.split('\n').map(s => s.trim()).filter(Boolean),
        about_philosophy_image_url: philImageUrl,
        about_mission_title: missionTitle,
        about_mission_text: missionText,
        about_vision_title: visionTitle,
        about_vision_text: visionText
      };
      await siteDataManager.saveAgencyInfo(updatedInfo);
      setAgencyInfo(updatedInfo);
      showToast('About Page copy updated successfully.');
    } catch (err) {
      showToast('Failed to save About Page content.', 'error');
    } finally {
      setSubmittingCopy(false);
    }
  };

  const handleMemberSave = async (e) => {
    e.preventDefault();
    if (!editingMember.name || !editingMember.designation) return;
    try {
      await siteDataManager.updateTeamMember(editingMember.id, editingMember);
      setTeam(team.map(t => t.id === editingMember.id ? editingMember : t));
      showToast('Team member updated successfully.');
      setEditingMember(null);
    } catch (err) {
      showToast('Error updating team member.', 'error');
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.designation) return;
    try {
      const added = await siteDataManager.addTeamMember(newMember);
      setTeam([...team, added]);
      showToast('New team member registered.');
      setNewMember(null);
    } catch (err) {
      showToast('Failed to create team member.', 'error');
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm("Permanently delete this team member card?")) return;
    try {
      await siteDataManager.deleteTeamMember(id);
      setTeam(team.filter(t => t.id !== id));
      showToast('Team member deleted.');
    } catch (err) {
      showToast('Failed to delete member.', 'error');
    }
  };

  const handleUploadMemberPhoto = async (e, mode) => {
    const url = await handleCloudinaryUpload(e);
    if (!url) return;
    if (mode === 'edit') {
      setEditingMember({ ...editingMember, image_url: url });
    } else {
      setNewMember({ ...newMember, image_url: url });
    }
  };

  return (
    <div className="space-y-8 text-left font-body">
      <div>
        <h1 className="text-3xl font-black text-premium-black font-heading leading-none">About Page Details</h1>
        <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Configure About section narrative, mission, philosophy copy, values & founders rosters</p>
      </div>

      {/* Sub tabs selector */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('copy')}
          className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === 'copy' ? 'border-primary-blue text-primary-blue font-black' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          About Copy Details
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
            activeTab === 'team' ? 'border-primary-blue text-primary-blue font-black' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Founders Team Cards
        </button>
      </div>

      {/* VIEW 1: ABOUT STORY COPY */}
      {activeTab === 'copy' && (
        <form onSubmit={handleSaveAboutCopy} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Left Side fields */}
            <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
              <h3 className="text-base font-black text-slate-800 font-heading border-b border-slate-50 pb-2">1. Header Banner & Philosophy Copy</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Banner Tag</label>
                  <input
                    type="text"
                    required
                    value={bannerTag}
                    onChange={(e) => setBannerTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Banner Heading Title</label>
                  <input
                    type="text"
                    required
                    value={bannerTitle}
                    onChange={(e) => setBannerTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Banner Description Paragraph</label>
                <textarea
                  rows="2"
                  required
                  value={bannerSubtitle}
                  onChange={(e) => setBannerSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold text-slate-700 resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Philosophy Tag</label>
                  <input
                    type="text"
                    required
                    value={philTag}
                    onChange={(e) => setPhilTag(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold text-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Philosophy Title Heading</label>
                  <input
                    type="text"
                    required
                    value={philTitle}
                    onChange={(e) => setPhilTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Philosophy Main Text Paragraph</label>
                <textarea
                  rows="4"
                  required
                  value={philText}
                  onChange={(e) => setPhilText(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold text-slate-700 resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Philosophy Checkmark list (One item per line)</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Custom optimization cycles&#10;Dedicated account managers"
                  value={philBulletsText}
                  onChange={(e) => setPhilBulletsText(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold text-slate-700 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Right Side fields */}
            <div className="space-y-6">
              {/* Image config */}
              <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
                <h3 className="text-base font-black text-slate-800 font-heading border-b border-slate-50 pb-2">2. Philosophy Image Illustration</h3>
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200 bg-slate-50 relative">
                    <img src={philImageUrl} alt="Phil preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow space-y-2">
                    <input
                      type="text"
                      placeholder="Paste image URL..."
                      value={philImageUrl}
                      onChange={(e) => setPhilImageUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold text-slate-700"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer text-xs font-bold transition-all w-fit font-body">
                      <Upload size={12} />
                      <span>{uploading ? "Uploading..." : "Upload to Cloudinary"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const url = await handleCloudinaryUpload(e);
                          if (url) setPhilImageUrl(url);
                        }}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Mission & Vision */}
              <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
                <h3 className="text-base font-black text-slate-800 font-heading border-b border-slate-50 pb-2">3. Mission & Vision Statics</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Mission Header</label>
                      <input
                        type="text"
                        required
                        value={missionTitle}
                        onChange={(e) => setMissionTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Vision Header</label>
                      <input
                        type="text"
                        required
                        value={visionTitle}
                        onChange={(e) => setVisionTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold text-slate-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Our Mission Description Text</label>
                    <textarea
                      rows="3"
                      required
                      value={missionText}
                      onChange={(e) => setMissionText(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold text-slate-700 resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1">Our Vision Description Text</label>
                    <textarea
                      rows="3"
                      required
                      value={visionText}
                      onChange={(e) => setVisionText(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold text-slate-700 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Submit button copy */}
              <button
                type="submit"
                disabled={submittingCopy}
                className="w-full py-3.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                {submittingCopy ? <RefreshCw size={13} className="animate-spin" /> : <Check size={13} />}
                <span>Save About Page Content</span>
              </button>
            </div>

          </div>
        </form>
      )}

      {/* VIEW 2: TEAM CARD LIST (Existing Dynamic CRUD) */}
      {activeTab === 'team' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Team Editor View */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Dynamic Team Roster</span>
            {!newMember && (
              <button 
                onClick={() => setNewMember({ name: '', designation: '', bio: '', image_url: '', order_index: team.length + 1, social_links: { linkedin: '', twitter: '', facebook: '' } })}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-primary-blue rounded-xl text-xs font-bold uppercase flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Add Member</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            {team.map(m => (
              <div key={m.id} className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm flex gap-4 text-left">
                {m.image_url && (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
                    <img src={m.image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-grow space-y-1">
                  <h4 className="font-bold text-premium-black text-sm">{m.name}</h4>
                  <p className="text-primary-blue text-[10px] font-black uppercase tracking-wider">{m.designation}</p>
                  <p className="text-slate-500 text-xs font-light leading-relaxed line-clamp-2 mt-1">{m.bio}</p>
                </div>

                <div className="flex flex-col gap-1.5 justify-center shrink-0">
                  <button 
                    onClick={() => setEditingMember(m)}
                    className="p-1.5 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-primary-blue rounded-lg border border-slate-100"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button 
                    onClick={() => handleDeleteMember(m.id)}
                    className="p-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg border border-slate-100"
                  >
                    <Trash size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Column: Member Forms */}
        <div className="lg:col-span-5 space-y-6">
          {editingMember && (
            <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-xl space-y-4 text-left animate-slide-in">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h4 className="font-bold text-premium-black text-sm">Edit: {editingMember.name}</h4>
                <button onClick={() => setEditingMember(null)} className="text-slate-400 hover:text-premium-black"><X size={16} /></button>
              </div>

              <form onSubmit={handleMemberSave} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
                />

                <input
                  type="text"
                  required
                  placeholder="Designation / Role"
                  value={editingMember.designation}
                  onChange={(e) => setEditingMember({ ...editingMember, designation: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
                />

                <textarea
                  rows="3"
                  required
                  placeholder="Brief biography..."
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs resize-none"
                ></textarea>

                <div className="space-y-1">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Member Photo</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Photo URL"
                      value={editingMember.image_url || ''}
                      onChange={(e) => setEditingMember({ ...editingMember, image_url: e.target.value })}
                      className="flex-grow px-3.5 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                    <label className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer text-xs font-bold flex gap-1 items-center shrink-0">
                      <Upload size={12} />
                      <span>Cloudinary</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleUploadMemberPhoto(e, 'edit')} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="LinkedIn Profile URL"
                    value={editingMember.social_links?.linkedin || ''}
                    onChange={(e) => setEditingMember({
                      ...editingMember,
                      social_links: { ...editingMember.social_links, linkedin: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
                  />
                  <input
                    type="number"
                    placeholder="Order Index"
                    value={editingMember.order_index}
                    onChange={(e) => setEditingMember({ ...editingMember, order_index: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <button type="submit" className="w-full py-2.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase">
                  Update Member Profile
                </button>
              </form>
            </div>
          )}

          {newMember && (
            <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-xl space-y-4 text-left animate-slide-in">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h4 className="font-bold text-premium-black text-sm">Add Team Member</h4>
                <button onClick={() => setNewMember(null)} className="text-slate-400 hover:text-premium-black"><X size={16} /></button>
              </div>

              <form onSubmit={handleAddMember} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
                />

                <input
                  type="text"
                  required
                  placeholder="Designation / Role *"
                  value={newMember.designation}
                  onChange={(e) => setNewMember({ ...newMember, designation: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
                />

                <textarea
                  rows="3"
                  required
                  placeholder="Brief biography bio..."
                  value={newMember.bio}
                  onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs resize-none"
                ></textarea>

                <div className="space-y-1">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Member Photo</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Photo URL"
                      value={newMember.image_url || ''}
                      onChange={(e) => setNewMember({ ...newMember, image_url: e.target.value })}
                      className="flex-grow px-3.5 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                    <label className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer text-xs font-bold flex gap-1 items-center shrink-0">
                      <Upload size={12} />
                      <span>Cloudinary</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleUploadMemberPhoto(e, 'add')} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="LinkedIn Profile URL"
                    value={newMember.social_links?.linkedin || ''}
                    onChange={(e) => setNewMember({
                      ...newMember,
                      social_links: { ...newMember.social_links, linkedin: e.target.value }
                    })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
                  />
                  <input
                    type="number"
                    placeholder="Order Index"
                    value={newMember.order_index}
                    onChange={(e) => setNewMember({ ...newMember, order_index: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <button type="submit" className="w-full py-2.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase">
                  Register Member Profile
                </button>
              </form>
            </div>
          )}
        </div>

      </div>
      )}
    </div>
  );
}

// ==========================================
// SUBVIEW 5b: TeamEditSubView (Dedicated Our Team Page CRUD)
// ==========================================
function TeamEditSubView({ team, setTeam, showToast, handleCloudinaryUpload, uploading }) {
  const [editingMember, setEditingMember] = useState(null);
  const [newMember, setNewMember] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleMemberSave = async (e) => {
    e.preventDefault();
    if (!editingMember.name || !editingMember.designation) return;
    setSaving(true);
    try {
      await siteDataManager.updateTeamMember(editingMember.id, editingMember);
      setTeam(team.map(t => t.id === editingMember.id ? editingMember : t));
      showToast('Team member updated successfully.');
      setEditingMember(null);
    } catch (err) {
      showToast('Error updating team member.', 'error');
    } finally { setSaving(false); }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.designation) return;
    setSaving(true);
    try {
      const added = await siteDataManager.addTeamMember(newMember);
      setTeam([...team, added]);
      showToast('New team member added successfully.');
      setNewMember(null);
    } catch (err) {
      showToast('Failed to add team member.', 'error');
    } finally { setSaving(false); }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm('Permanently remove this team member?')) return;
    try {
      await siteDataManager.deleteTeamMember(id);
      setTeam(team.filter(t => t.id !== id));
      if (editingMember?.id === id) setEditingMember(null);
      showToast('Team member removed.');
    } catch (err) {
      showToast('Failed to delete member.', 'error');
    }
  };

  const handlePhotoUpload = async (e, mode) => {
    const url = await handleCloudinaryUpload(e);
    if (!url) return;
    if (mode === 'edit') setEditingMember({ ...editingMember, image_url: url });
    else setNewMember({ ...newMember, image_url: url });
  };

  const blankMember = { name: '', designation: '', bio: '', image_url: '', order_index: team.length + 1, social_links: { linkedin: '', twitter: '' } };

  return (
    <div className="space-y-8 text-left font-body">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-black text-premium-black font-heading leading-none">Our Team Page Editor</h1>
        <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Full CRUD management for team members — changes reflect on both the About page and the /team page</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT: Members Grid List */}
        <div className="lg:col-span-7 space-y-4">
          {/* Toolbar */}
          <div className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-5 py-3 shadow-sm">
            <div>
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Team Roster</span>
              <span className="ml-2 bg-blue-50 text-primary-blue text-[10px] font-black px-2 py-0.5 rounded-full">{team.length} members</span>
            </div>
            {!newMember && (
              <button
                onClick={() => { setNewMember(blankMember); setEditingMember(null); }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-blue hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase transition-colors"
              >
                <Plus size={13} />
                <span>Add Member</span>
              </button>
            )}
          </div>

          {/* Member Cards */}
          <div className="space-y-3">
            {team.length === 0 && (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-sm font-medium">
                No team members yet. Click "Add Member" to get started.
              </div>
            )}
            {[...team].sort((a, b) => (a.order_index || 0) - (b.order_index || 0)).map(m => (
              <div
                key={m.id}
                className={`bg-white border rounded-2xl p-4 flex gap-4 text-left shadow-sm transition-all group hover:shadow-md ${editingMember?.id === m.id ? 'border-primary-blue ring-2 ring-blue-500/10' : 'border-slate-100'}`}
              >
                {/* Avatar */}
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-100 bg-slate-100 flex items-center justify-center">
                  {m.image_url
                    ? <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                    : <Users size={24} className="text-slate-300" />
                  }
                </div>

                {/* Info */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-premium-black text-sm leading-tight">{m.name}</h4>
                      <span className="text-[10px] font-black uppercase text-primary-blue tracking-wider">{m.designation}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300 shrink-0">#{m.order_index || '—'}</span>
                  </div>
                  <p className="text-slate-500 text-xs font-light leading-relaxed mt-1 line-clamp-2">{m.bio}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    {m.social_links?.linkedin && <span className="text-[10px] text-primary-blue font-bold">LinkedIn ✓</span>}
                    {m.social_links?.twitter && <span className="text-[10px] text-primary-blue font-bold">Twitter ✓</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1.5 justify-center shrink-0">
                  <button
                    onClick={() => { setEditingMember({ ...m }); setNewMember(null); }}
                    className="p-1.5 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-primary-blue rounded-lg border border-slate-100 transition-colors"
                    title="Edit member"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => handleDeleteMember(m.id)}
                    className="p-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg border border-slate-100 transition-colors"
                    title="Delete member"
                  >
                    <Trash size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>


          {/* Right Column: Member Form */}
          <div className="lg:col-span-5 sticky top-6">
            {(editingMember || newMember) ? (
              <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-6 md:p-8 space-y-5 text-left">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-premium-black font-heading">
                    {editingMember ? 'Edit Team Card' : 'Register New Member'}
                  </h3>
                  <button 
                    onClick={() => { setEditingMember(null); setNewMember(null); }}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full"
                  >
                    <X size={15} />
                  </button>
                </div>

                <form onSubmit={editingMember ? handleMemberSave : handleAddMember} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. K Charan"
                      value={(editingMember || newMember).name}
                      onChange={e => editingMember 
                        ? setEditingMember({ ...editingMember, name: e.target.value })
                        : setNewMember({ ...newMember, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue transition-colors font-semibold"
                    />
                  </div>

                  {/* Designation */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Designation</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Founder & CEO"
                      value={(editingMember || newMember).designation}
                      onChange={e => editingMember 
                        ? setEditingMember({ ...editingMember, designation: e.target.value })
                        : setNewMember({ ...newMember, designation: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue transition-colors font-semibold"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Biography</label>
                    <textarea
                      rows="4"
                      placeholder="Short professional biography..."
                      value={(editingMember || newMember).bio}
                      onChange={e => editingMember
                        ? setEditingMember({ ...editingMember, bio: e.target.value })
                        : setNewMember({ ...newMember, bio: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs resize-none focus:outline-none focus:border-primary-blue transition-colors"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Profile Photo</label>
                    <div className="flex gap-2 items-start">
                      {(editingMember || newMember).image_url && (
                        <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                          <img src={(editingMember || newMember).image_url} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-grow space-y-1.5">
                        <input
                          type="text"
                          placeholder="Paste image URL..."
                          value={(editingMember || newMember).image_url || ''}
                          onChange={e => editingMember
                            ? setEditingMember({ ...editingMember, image_url: e.target.value })
                            : setNewMember({ ...newMember, image_url: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue transition-colors font-semibold text-slate-700"
                        />
                        <label className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer text-xs font-bold w-fit transition-colors">
                          <Upload size={11} />
                          <span>{uploading ? 'Uploading...' : 'Upload to Cloudinary'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleUploadMemberPhoto(e, editingMember ? 'edit' : 'add')}
                            className="hidden"
                            disabled={uploading}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Social Links</label>
                    <input
                      type="url"
                      placeholder="LinkedIn Profile URL"
                      value={(editingMember || newMember).social_links?.linkedin || ''}
                      onChange={e => editingMember
                        ? setEditingMember({ ...editingMember, social_links: { ...editingMember.social_links, linkedin: e.target.value } })
                        : setNewMember({ ...newMember, social_links: { ...newMember.social_links, linkedin: e.target.value } })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue transition-colors"
                    />
                    <input
                      type="url"
                      placeholder="Twitter / X Profile URL"
                      value={(editingMember || newMember).social_links?.twitter || ''}
                      onChange={e => editingMember
                        ? setEditingMember({ ...editingMember, social_links: { ...editingMember.social_links, twitter: e.target.value } })
                        : setNewMember({ ...newMember, social_links: { ...newMember.social_links, twitter: e.target.value } })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue transition-colors"
                    />
                  </div>

                  {/* Display Order */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Display Order Index</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="1"
                      value={(editingMember || newMember).order_index || ''}
                      onChange={e => editingMember
                        ? setEditingMember({ ...editingMember, order_index: parseInt(e.target.value) || 1 })
                        : setNewMember({ ...newMember, order_index: parseInt(e.target.value) || 1 })
                      }
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue transition-colors"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={saving || uploading}
                    className="w-full py-3 bg-primary-blue hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/10"
                  >
                    {saving ? <RefreshCw size={13} className="animate-spin" /> : <Check size={13} />}
                    <span>{editingMember ? 'Update Member Profile' : 'Register New Member'}</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">
                  <Users size={22} className="text-primary-blue" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">Select a member to edit</p>
                  <p className="text-xs text-slate-400 font-light mt-1">Click the pencil icon on any member card, or add a new member using the button above.</p>
                </div>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}

// ==========================================
// SUBVIEW 6: ServicesIntroSubView
// ==========================================
function ServicesIntroSubView({ services, showToast }) {
  const [selectedSlug, setSelectedSlug] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [newField, setNewField] = useState({ name: '', label: '', type: 'text', placeholder: '', required: false, optionsString: '' });
  const [editingField, setEditingField] = useState(null); // stores active field under edit
  const [loading, setLoading] = useState(false);

  const handleStartEditField = (field) => {
    setEditingField({
      originalName: field.name,
      name: field.name,
      label: field.label,
      type: field.type,
      placeholder: field.placeholder || '',
      required: field.required || false,
      optionsString: field.options ? field.options.join(', ') : ''
    });
  };

  const handleUpdateField = async (e) => {
    e.preventDefault();
    if (!editingField.name || !editingField.label) {
      showToast('Name Key and Field Label are required.', 'error');
      return;
    }

    const fieldKey = editingField.name.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
    if (fieldKey !== editingField.originalName && formFields.some(f => f.name === fieldKey)) {
      showToast('A field with this name key already exists.', 'error');
      return;
    }

    let parsedOptions = [];
    if (editingField.type === 'select' && editingField.optionsString) {
      parsedOptions = editingField.optionsString.split(',').map(s => s.trim()).filter(Boolean);
    }

    const updatedField = {
      name: fieldKey,
      label: editingField.label,
      type: editingField.type,
      placeholder: editingField.placeholder,
      required: editingField.required,
      options: parsedOptions.length > 0 ? parsedOptions : undefined
    };

    const updatedFields = formFields.map(f => f.name === editingField.originalName ? updatedField : f);
    setFormFields(updatedFields);
    try {
      await siteDataManager.saveServiceInquiryFields(selectedSlug, updatedFields);
      showToast('Question field updated successfully.');
      setEditingField(null);
    } catch (err) {
      showToast('Failed to update inquiry field.', 'error');
    }
  };

  // Default initial slug selector
  useEffect(() => {
    if (services && services.length > 0 && !selectedSlug) {
      setSelectedSlug(services[0].slug);
    }
  }, [services]);

  // Load fields when selected service changes
  useEffect(() => {
    if (selectedSlug) {
      loadFields(selectedSlug);
    }
  }, [selectedSlug]);

  const loadFields = async (slug) => {
    setLoading(true);
    try {
      const fields = await siteDataManager.getServiceInquiryFields(slug);
      if (fields) {
        setFormFields(fields);
      } else {
        setFormFields([]);
      }
    } catch (e) {
      console.error(`Error loading service inquiry fields for ${slug}:`, e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddField = async (e) => {
    e.preventDefault();
    if (!newField.name || !newField.label) {
      showToast('Name Key and Field Label are required.', 'error');
      return;
    }

    const fieldKey = newField.name.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
    if (formFields.some(f => f.name === fieldKey)) {
      showToast('A field with this name key already exists.', 'error');
      return;
    }

    let parsedOptions = [];
    if (newField.type === 'select' && newField.optionsString) {
      parsedOptions = newField.optionsString.split(',').map(s => s.trim()).filter(Boolean);
    }

    const fieldToAdd = {
      name: fieldKey,
      label: newField.label,
      type: newField.type,
      placeholder: newField.placeholder,
      required: newField.required,
      options: parsedOptions.length > 0 ? parsedOptions : undefined
    };

    const updatedFields = [...formFields, fieldToAdd];
    setFormFields(updatedFields);
    try {
      await siteDataManager.saveServiceInquiryFields(selectedSlug, updatedFields);
      showToast(`Question added to ${selectedSlug} intake form.`);
      setNewField({ name: '', label: '', type: 'text', placeholder: '', required: false, optionsString: '' });
    } catch (err) {
      showToast('Failed to add inquiry field.', 'error');
    }
  };

  const handleDeleteField = async (name) => {
    if (!window.confirm(`Permanently remove the custom question field "${name}"?`)) return;

    const updatedFields = formFields.filter(f => f.name !== name);
    setFormFields(updatedFields);
    try {
      await siteDataManager.saveServiceInquiryFields(selectedSlug, updatedFields);
      showToast('Question field deleted.');
    } catch (err) {
      showToast('Failed to delete field.', 'error');
    }
  };

  const selectedService = services.find(s => s.slug === selectedSlug);

  return (
    <div className="space-y-8 text-left font-body">
      <div>
        <h1 className="text-3xl font-black text-premium-black font-heading leading-none">Services & Inquiry Form Setup</h1>
        <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Configure dynamic intake questionnaire fields for each marketing channel separately</p>
      </div>

      {/* Service Selector Pills Row */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-sm space-y-3 text-left">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Select Service Channel to Configure:</span>
        <div className="flex flex-wrap gap-2">
          {services.map(s => (
            <button
              key={s.slug}
              type="button"
              onClick={() => {
                setSelectedSlug(s.slug);
                setNewField({ name: '', label: '', type: 'text', placeholder: '', required: false, optionsString: '' });
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all uppercase tracking-wider ${
                selectedSlug === s.slug
                  ? 'bg-primary-blue text-white shadow-md shadow-blue-500/10'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: INFO & CURRENT FORM FIELDS LIST */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm text-left space-y-4">
            <h3 className="text-lg font-black text-premium-black font-heading">
              Page Info: {selectedService?.title || 'Selected Service'}
            </h3>
            <p className="text-slate-400 text-xs font-light leading-relaxed">
              These customized fields will be loaded dynamically on the public inquiry page for <strong>{selectedService?.title}</strong> (e.g. `/services/{selectedSlug}`). 
              Each marketing channel has its own separate questionnaire to match its intake specifications.
            </p>
            <div className="p-4 bg-slate-50 border border-slate-100 text-slate-500 text-xs rounded-xl flex gap-2.5 font-medium leading-relaxed">
              <Info size={16} className="shrink-0 text-primary-blue mt-0.5" />
              <span>Intake details will automatically route to the **Service Requests** lead feed and fire formatted WhatsApp short messages to your admin phone.</span>
            </div>
          </div>

          {/* Current Fields list */}
          <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm text-left space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="text-base font-black text-slate-800 font-heading">Active Intake Questions</h3>
              <span className="text-[10px] bg-blue-50 text-primary-blue font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {formFields.length} Custom Fields
              </span>
            </div>

            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-10 text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Loading Fields...</span>
                </div>
              ) : (
                <>
                  {formFields.length === 0 && (
                    <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-400 text-xs font-semibold">
                      No custom questions configured. Fallback defaults (Website URL, Primary Goals) will be shown.
                    </div>
                  )}
                  {formFields.map((field, idx) => (
                    <div key={field.name} className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs">
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-700">{field.label}</span>
                          {field.required && (
                            <span className="bg-rose-50 text-rose-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">Required</span>
                          )}
                        </div>
                        <div className="flex gap-4 text-[10px] text-slate-400 font-medium">
                          <span>Key: <code className="text-slate-600 font-mono">{field.name}</code></span>
                          <span>Type: <span className="uppercase text-primary-blue font-bold">{field.type}</span></span>
                        </div>
                        {field.options && (
                          <p className="text-[9px] text-slate-400 font-light mt-0.5">
                            Options: {field.options.join(', ')}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleStartEditField(field)}
                          className={`p-1.5 rounded-lg border border-slate-200 transition-colors ${
                            editingField?.originalName === field.name
                              ? 'bg-primary-blue text-white hover:bg-blue-600'
                              : 'bg-white hover:bg-blue-50 text-slate-400 hover:text-primary-blue'
                          }`}
                          title="Edit Field"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => handleDeleteField(field.name)}
                          className="p-1.5 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg border border-slate-200 transition-colors"
                          title="Remove Field"
                        >
                          <Trash size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FIELD CREATOR / EDITOR FORM */}
        <div className="lg:col-span-5 sticky top-6">
          <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-6 md:p-8 space-y-4 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-premium-black font-heading">
                  {editingField ? 'Edit Dynamic Question Field' : 'Add Dynamic Question Field'}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                  {editingField ? 'Update dynamic intake question parameters' : 'Append new baseline input parameters for this channel'}
                </p>
              </div>
              {editingField && (
                <button
                  type="button"
                  onClick={() => setEditingField(null)}
                  className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-50 rounded-lg text-xs font-bold uppercase transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>

            <form onSubmit={editingField ? handleUpdateField : handleAddField} className="space-y-4">
              {/* Field Label */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Question Label *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monthly Marketing Budget?"
                  value={editingField ? editingField.label : newField.label}
                  onChange={(e) => editingField
                    ? setEditingField({ ...editingField, label: e.target.value })
                    : setNewField({ ...newField, label: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold"
                />
              </div>

              {/* Field Name Key */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Database Name Key * (Unique alphanumeric)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. monthly_budget"
                  value={editingField ? editingField.name : newField.name}
                  onChange={(e) => editingField
                    ? setEditingField({ ...editingField, name: e.target.value })
                    : setNewField({ ...newField, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold"
                />
              </div>

              {/* Field Type */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Input Field Type *</label>
                <select
                  value={editingField ? editingField.type : newField.type}
                  onChange={(e) => editingField
                    ? setEditingField({ ...editingField, type: e.target.value })
                    : setNewField({ ...newField, type: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold"
                >
                  <option value="text">Text Box (Short Answer)</option>
                  <option value="textarea">Textarea Box (Long bio/goals)</option>
                  <option value="select">Select Dropdown (List choices)</option>
                  <option value="email">Email Address</option>
                  <option value="tel">Telephone / Mobile</option>
                  <option value="file">File Attachment / PDF Upload</option>
                </select>
              </div>

              {/* Optional: Options String for Select drop-down */}
              {((editingField ? editingField.type : newField.type) === 'select') && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Select Dropdown Options * (Comma separated)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Under 50k, 50k - 1Lac, Above 1Lac"
                    value={editingField ? editingField.optionsString : newField.optionsString}
                    onChange={(e) => editingField
                      ? setEditingField({ ...editingField, optionsString: e.target.value })
                      : setNewField({ ...newField, optionsString: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold"
                  />
                </div>
              )}

              {/* Placeholder text */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Placeholder text preview</label>
                <input
                  type="text"
                  placeholder="e.g. select budget limit..."
                  value={editingField ? editingField.placeholder : newField.placeholder}
                  onChange={(e) => editingField
                    ? setEditingField({ ...editingField, placeholder: e.target.value })
                    : setNewField({ ...newField, placeholder: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue font-semibold"
                />
              </div>

              {/* Required status check */}
              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="field_required_check"
                  checked={editingField ? editingField.required : newField.required}
                  onChange={(e) => editingField
                    ? setEditingField({ ...editingField, required: e.target.checked })
                    : setNewField({ ...newField, required: e.target.checked })
                  }
                  className="rounded border-slate-300 text-primary-blue focus:ring-primary-blue"
                />
                <label htmlFor="field_required_check" className="text-xs font-bold text-slate-600 uppercase select-none cursor-pointer">
                  Mandatory Required Field
                </label>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/10 transition-colors"
              >
                {editingField ? <Check size={13} /> : <Plus size={13} />}
                <span>{editingField ? 'Update Question' : 'Add Question to Form'}</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// SUBVIEW 6b: GalleryEditSubView (CRUD Portfolio Gallery)
// ==========================================
function GalleryEditSubView({ gallery, setGallery, showToast, handleCloudinaryUpload, uploading }) {
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState(null);
  const [saving, setSaving] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [
    { label: 'Campaign Results', value: 'campaign' },
    { label: 'Ad Creatives', value: 'creative' },
    { label: 'Branding & Designs', value: 'branding' },
    { label: 'Websites', value: 'website' },
    { label: 'Video Projects', value: 'video' }
  ];

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    if (!editingItem.title || !editingItem.category || !editingItem.image_url) {
      showToast('Title, category, and photo URL are required.', 'error');
      return;
    }
    setSaving(true);
    try {
      await siteDataManager.updateGalleryItem(editingItem.id, editingItem);
      setGallery(gallery.map(item => item.id === editingItem.id ? editingItem : item));
      showToast('Portfolio item updated successfully.');
      setEditingItem(null);
    } catch (err) {
      showToast('Failed to update portfolio item.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.category || !newItem.image_url) {
      showToast('Title, category, and photo URL are required.', 'error');
      return;
    }
    setSaving(true);
    try {
      const added = await siteDataManager.addGalleryItem(newItem);
      setGallery([added, ...gallery]);
      showToast('New portfolio item registered.');
      setNewItem(null);
    } catch (err) {
      showToast('Failed to create portfolio item.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm("Permanently delete this item from the portfolio gallery?")) return;
    try {
      await siteDataManager.deleteGalleryItem(id);
      setGallery(gallery.filter(item => item.id !== id));
      if (editingItem?.id === id) setEditingItem(null);
      showToast('Portfolio item deleted.');
    } catch (err) {
      showToast('Failed to delete item.', 'error');
    }
  };

  const handlePhotoUpload = async (e, mode) => {
    const url = await handleCloudinaryUpload(e);
    if (!url) return;
    if (mode === 'edit') {
      setEditingItem({ ...editingItem, image_url: url });
    } else {
      setNewItem({ ...newItem, image_url: url });
    }
  };

  const filteredGallery = categoryFilter === 'all'
    ? gallery
    : gallery.filter(item => item.category === categoryFilter);

  const blankItem = { title: '', category: 'campaign', image_url: '' };

  return (
    <div className="space-y-8 text-left font-body">
      <div>
        <h1 className="text-3xl font-black text-premium-black font-heading leading-none">Portfolio Gallery Editor</h1>
        <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Full CRUD management for projects, ad graphics, case results, and websites</p>
      </div>

      {/* Categories filter bar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
            categoryFilter === 'all'
              ? 'bg-primary-blue text-white shadow'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-500'
          }`}
        >
          All Items
        </button>
        {categories.map(cat => (
          <button
            key={cat.value}
            onClick={() => setCategoryFilter(cat.value)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
              categoryFilter === cat.value
                ? 'bg-primary-blue text-white shadow'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-500'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: Cards list */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between bg-white border border-slate-100 rounded-2xl px-5 py-3 shadow-sm">
            <div>
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Gallery Catalog</span>
              <span className="ml-2 bg-blue-50 text-primary-blue text-[10px] font-black px-2 py-0.5 rounded-full">{filteredGallery.length} Items</span>
            </div>
            {!newItem && (
              <button
                onClick={() => { setNewItem(blankItem); setEditingItem(null); }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-blue hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase transition-colors"
              >
                <Plus size={13} />
                <span>Add Portfolio Item</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGallery.length === 0 && (
              <div className="col-span-2 bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-xs font-semibold">
                No items found. Click "Add Portfolio Item" to append new designs or results.
              </div>
            )}
            {filteredGallery.map(item => (
              <div
                key={item.id}
                className={`bg-white border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between transition-all group hover:shadow-md ${
                  editingItem?.id === item.id ? 'border-primary-blue ring-2 ring-blue-500/10' : 'border-slate-100'
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                  <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-slate-900/60 backdrop-blur-md text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-full">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 flex-grow flex flex-col justify-between gap-3 text-left">
                  <h4 className="font-bold text-premium-black text-xs sm:text-sm line-clamp-2 leading-tight">
                    {item.title}
                  </h4>
                  
                  <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Active'}
                    </span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => { setEditingItem({ ...item }); setNewItem(null); }}
                        className="p-1.5 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-primary-blue rounded-lg border border-slate-100 transition-colors"
                        title="Edit Item"
                      >
                        <Edit2 size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg border border-slate-100 transition-colors"
                        title="Delete Item"
                      >
                        <Trash size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Edit / Add Form */}
        <div className="lg:col-span-5 sticky top-6">
          {(editingItem || newItem) ? (
            <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-6 space-y-4 text-left">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-black text-premium-black text-sm font-heading">
                    {editingItem ? 'Editing Portfolio Item' : 'New Portfolio Item'}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                    {editingItem ? 'Update the details and graphic file' : 'Fill in portfolio specifications'}
                  </p>
                </div>
                <button
                  onClick={() => { setEditingItem(null); setNewItem(null); }}
                  className="text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Item Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lead Gen Campaign for NRS Developers"
                    value={(editingItem || newItem).title}
                    onChange={e => editingItem
                      ? setEditingItem({ ...editingItem, title: e.target.value })
                      : setNewItem({ ...newItem, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-blue transition-colors"
                  />
                </div>

                {/* Category Selector */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Category *</label>
                  <select
                    value={(editingItem || newItem).category}
                    onChange={e => editingItem
                      ? setEditingItem({ ...editingItem, category: e.target.value })
                      : setNewItem({ ...newItem, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-primary-blue transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Photo upload / paste */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Portfolio Graphic / Image</label>
                  <div className="flex gap-3 items-start">
                    {(editingItem || newItem).image_url && (
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                        <img src={(editingItem || newItem).image_url} alt="" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-grow space-y-1.5">
                      <input
                        type="text"
                        placeholder="Paste image URL..."
                        value={(editingItem || newItem).image_url || ''}
                        onChange={e => editingItem
                          ? setEditingItem({ ...editingItem, image_url: e.target.value })
                          : setNewItem({ ...newItem, image_url: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue transition-colors"
                      />
                      <label className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer text-xs font-bold w-fit transition-colors">
                        <Upload size={11} />
                        <span>{uploading ? 'Uploading...' : 'Upload to Cloudinary'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => handlePhotoUpload(e, editingItem ? 'edit' : 'add')}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="w-full py-3 bg-primary-blue hover:bg-blue-700 disabled:opacity-60 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/10"
                >
                  {saving ? <RefreshCw size={13} className="animate-spin" /> : <Check size={13} />}
                  <span>{editingItem ? 'Update Portfolio Item' : 'Register Portfolio Item'}</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-3xl p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto">
                <Image size={22} className="text-primary-blue" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700">Select a project to edit</p>
                <p className="text-xs text-slate-400 font-light mt-1">Click the pencil icon on any item card, or add a new one using the button above.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TermsEditSubView({ terms, setTerms, agencyInfo, setAgencyInfo, showToast, handleCloudinaryUpload, uploading }) {
  const [submitting, setSubmitting] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [sectionContent, setSectionContent] = useState('');

  const handleSaveTerms = async () => {
    setSubmitting(true);
    try {
      await siteDataManager.saveTermsAndConditions(terms);
      showToast('Terms and Conditions sections synced to cloud.');
    } catch (e) {
      showToast('Failed to update terms.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSection = (id, currentText) => {
    setEditingSectionId(id);
    setSectionContent(currentText);
  };

  const handleSaveSectionText = (id) => {
    setTerms(terms.map(t => t.id === id ? { ...t, content: sectionContent } : t));
    setEditingSectionId(null);
    showToast('Section modified. Remember to click "Sync Terms to Database" to finalize changes.', 'info');
  };

  const handleUploadDocumentAttachment = async (e) => {
    const url = await handleCloudinaryUpload(e);
    if (!url) return;
    
    // Auto append document link to acceptance section or footer
    if (terms && terms.length > 0) {
      const updatedTerms = terms.map((t, idx) => 
        idx === 0 
          ? { ...t, content: t.content + `\n\nDownload Official legal PDF copy: [Terms and Conditions Attachment PDF](${url})` } 
          : t
      );
      setTerms(updatedTerms);
      showToast('Attachment PDF link appended to Acceptance of Terms section!', 'success');
    }
  };

  return (
    <div className="space-y-8 font-body">
      <div>
        <h1 className="text-3xl font-black text-premium-black font-heading leading-none">Footer & Terms and Conditions</h1>
        <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Edits terms content blocks and upload legal PDF attachments via Cloudinary</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Terms Sections List */}
        <div className="lg:col-span-8 bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm text-left space-y-6">
          <div className="flex justify-between items-center border-b border-slate-50 pb-4">
            <div>
              <h3 className="text-lg font-black text-premium-black font-heading">Interactive Sections Editor</h3>
              <p className="text-slate-400 text-[10px] font-bold uppercase mt-0.5">Edit inline text blocks dynamically</p>
            </div>
            <button 
              onClick={handleSaveTerms} 
              disabled={submitting}
              className="px-4 py-2 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase flex items-center gap-1.5 shadow-md shadow-blue-500/10"
            >
              {submitting ? <RefreshCw size={12} className="animate-spin" /> : <CheckCircle2 size={14} />}
              <span>Sync Terms to Database</span>
            </button>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {terms.map(t => (
              <div key={t.id} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-800 text-sm">{t.title}</h4>
                  {editingSectionId !== t.id ? (
                    <button 
                      onClick={() => handleEditSection(t.id, t.content)} 
                      className="text-xs text-primary-blue font-bold uppercase tracking-wider hover:text-blue-700 transition-colors flex items-center gap-1"
                    >
                      <Edit2 size={12} />
                      <span>Edit</span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleSaveSectionText(t.id)} 
                        className="text-xs text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1 hover:text-emerald-700"
                      >
                        <Check size={12} />
                        <span>Update</span>
                      </button>
                      <button 
                        onClick={() => setEditingSectionId(null)} 
                        className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 hover:text-slate-600"
                      >
                        <X size={12} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                {editingSectionId === t.id ? (
                  <textarea
                    rows="4"
                    value={sectionContent}
                    onChange={(e) => setSectionContent(e.target.value)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-blue leading-relaxed text-slate-700"
                  ></textarea>
                ) : (
                  <p className="text-slate-500 text-xs leading-relaxed font-light whitespace-pre-line">{t.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: PDF Attachment Upload */}
        <div className="lg:col-span-4 bg-white border border-slate-100 p-6 md:p-8 rounded-3xl shadow-sm text-left space-y-6">
          <h3 className="text-lg font-black text-premium-black font-heading border-b border-slate-50 pb-3">Legal PDF Upload</h3>
          <p className="text-slate-500 text-xs font-light leading-relaxed">You can upload official legal agreement PDF documents or custom media attachments to Cloudinary. The file link will automatically generate and append to the "1. Acceptance of Terms" clause.</p>

          <div className="space-y-4">
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl flex flex-col gap-3">
              <span className="text-[10px] font-black text-primary-blue uppercase tracking-wider">Cloudinary document loader</span>
              
              <label className="w-full py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 border-dashed cursor-pointer text-xs flex flex-col items-center justify-center gap-2 font-bold transition-all shadow-sm">
                <Upload className="text-slate-400" size={20} />
                <span>Upload PDF / Attachment File</span>
                <span className="text-[10px] text-slate-400 font-normal mt-0.5">Supports PDF, DOCX, ZIP, MP4, PNG</span>
                <input 
                  type="file" 
                  onChange={handleUploadDocumentAttachment} 
                  className="hidden" 
                />
              </label>
            </div>
            
            {uploading && (
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 animate-pulse">
                <RefreshCw size={14} className="animate-spin text-primary-blue" />
                <span>Synchronizing Cloudinary Stream...</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// SUBVIEW 1B: Service Orders Management
// ==========================================
function OrdersSubView({ leads, setLeads, showToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const handleUpdateStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'new' ? 'contacted' : currentStatus === 'contacted' ? 'converted' : 'closed';
    setUpdatingId(id);
    try {
      await siteDataManager.updateLeadStatus(id, nextStatus);
      setLeads(leads.map(l => l.id === id ? { ...l, status: nextStatus } : l));
      showToast('Order status updated.');
    } catch (e) {
      showToast('Failed to update status on cloud.', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this order?")) return;
    try {
      await siteDataManager.deleteLead(id);
      setLeads(leads.filter(l => l.id !== id));
      showToast('Order deleted successfully.');
    } catch (e) {
      showToast('Failed to delete order.', 'error');
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.service?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    return lead.service !== 'General Growth Consultation' && lead.message?.includes('Custom Inquiry');
  });

  const totalOrders = filteredLeads.length;
  const newOrders = filteredLeads.filter(l => l.status === 'new').length;
  const contactedOrders = filteredLeads.filter(l => l.status === 'contacted').length;

  return (
    <div className="space-y-8 text-left font-body">
      <div>
        <h1 className="text-3xl font-black text-premium-black font-heading leading-none">Service Orders Management</h1>
        <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Manage incoming marketing service requests and custom specs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-primary-blue flex items-center justify-center shrink-0">
            <Layers size={18} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Total Orders</p>
            <p className="text-2xl font-black text-slate-800 leading-tight">{totalOrders}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Clock size={18} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">New Requests</p>
            <p className="text-2xl font-black text-slate-800 leading-tight">{newOrders}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
            <CheckCircle2 size={18} />
          </div>
          <div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Followed Up</p>
            <p className="text-2xl font-black text-slate-800 leading-tight">{contactedOrders}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-3 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-xs font-semibold"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100 text-left">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Requested Service</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Requirements details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 text-sm">{lead.name}</p>
                      <p className="text-slate-400 text-xs font-medium mt-0.5">{lead.email}</p>
                      <p className="text-slate-400 text-[10px] font-semibold mt-0.5 tracking-wider">{lead.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-primary-blue text-xs font-semibold">
                        {lead.service}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600 text-xs max-w-xs font-light leading-relaxed space-y-1 text-left">
                        {(() => {
                          if (!lead.message) return null;
                          const lines = lead.message.split('\n');
                          return lines.map((line, idx) => {
                            const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
                            if (urlMatch) {
                              const url = urlMatch[0];
                              const labelPart = line.substring(0, line.indexOf(url));
                              let downloadUrl = url;
                              if (url.includes('res.cloudinary.com')) {
                                downloadUrl = url.replace('/upload/', '/upload/fl_attachment/');
                              }
                              return (
                                <div key={idx} className="break-all mt-2">
                                  <span className="text-slate-500 block mb-1 font-semibold">{labelPart}</span>
                                  <div className="flex flex-wrap gap-1.5 mt-0.5">
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 text-primary-blue hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-100/50 rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all"
                                    >
                                      <Eye size={10} className="shrink-0" />
                                      <span>View</span>
                                    </a>
                                    <a
                                      href={downloadUrl}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-100/50 rounded-lg px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all"
                                    >
                                      <Download size={10} className="shrink-0" />
                                      <span>Download</span>
                                    </a>
                                  </div>
                                </div>
                              );
                            }
                            return <div key={idx} className="text-slate-600">{line}</div>;
                          });
                        })()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        lead.status === 'new' ? 'bg-amber-100 text-amber-700' :
                        lead.status === 'contacted' ? 'bg-indigo-100 text-indigo-700' :
                        lead.status === 'converted' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          disabled={updatingId === lead.id}
                          onClick={() => handleUpdateStatus(lead.id, lead.status)}
                          className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                        >
                          {updatingId === lead.id ? '...' : 'Status'}
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-2 border border-slate-200 hover:border-rose-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400 text-xs font-medium uppercase tracking-wider">
                    No service orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUBVIEW 7: Contact Page Edit
// ==========================================
function ContactEditSubView({ agencyInfo, setAgencyInfo, showToast }) {
  const [formFields, setFormFields] = useState([]);
  const [saving, setSaving] = useState(false);
  const [phone, setPhone] = useState(agencyInfo?.phone || '');
  const [whatsapp, setWhatsapp] = useState(agencyInfo?.whatsapp || '');
  const [floatingWhatsapp, setFloatingWhatsapp] = useState(agencyInfo?.floating_whatsapp || '');
  const [email, setEmail] = useState(agencyInfo?.email || '');
  const [address, setAddress] = useState(agencyInfo?.address || '');
  const [mapsEmbed, setMapsEmbed] = useState(agencyInfo?.googleMapsEmbedUrl || '');
  const [mapsDir, setMapsDir] = useState(agencyInfo?.googleMapsDirectionsUrl || '');
  const [instagram, setInstagram] = useState(agencyInfo?.social?.instagram || '');
  const [facebook, setFacebook] = useState(agencyInfo?.social?.facebook || '');
  const [linkedin, setLinkedin] = useState(agencyInfo?.social?.linkedin || '');

  // Dynamic fields state
  const [newField, setNewField] = useState({ name: '', label: '', type: 'text', placeholder: '', required: false, optionsString: '' });

  useEffect(() => {
    loadFields();
  }, []);

  const loadFields = async () => {
    try {
      const fields = await siteDataManager.getContactFormFields();
      if (fields) setFormFields(fields);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveContactPage = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updatedInfo = {
        ...agencyInfo,
        phone,
        whatsapp,
        floating_whatsapp: floatingWhatsapp,
        email,
        address,
        googleMapsEmbedUrl: mapsEmbed,
        googleMapsDirectionsUrl: mapsDir,
        social: {
          ...agencyInfo.social,
          instagram,
          facebook,
          linkedin
        }
      };
      await siteDataManager.saveAgencyInfo(updatedInfo);
      setAgencyInfo(updatedInfo);
      showToast('Contact Page settings saved.');
    } catch (err) {
      showToast('Failed to save settings.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddField = async (e) => {
    e.preventDefault();
    if (!newField.name || !newField.label) {
      showToast('Name and Label are required.', 'error');
      return;
    }

    const fieldKey = newField.name.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
    if (formFields.some(f => f.name === fieldKey)) {
      showToast('A field with this name key already exists.', 'error');
      return;
    }

    let parsedOptions = [];
    if (newField.type === 'select' && newField.optionsString) {
      parsedOptions = newField.optionsString.split(',').map(s => s.trim()).filter(Boolean);
    }

    const fieldToAdd = {
      name: fieldKey,
      label: newField.label,
      type: newField.type,
      placeholder: newField.placeholder,
      required: newField.required,
      options: parsedOptions.length > 0 ? parsedOptions : undefined
    };

    const updatedFields = [...formFields, fieldToAdd];
    setFormFields(updatedFields);
    try {
      await siteDataManager.saveContactFormFields(updatedFields);
      showToast('Field added to contact form.');
      setNewField({ name: '', label: '', type: 'text', placeholder: '', required: false, optionsString: '' });
    } catch (err) {
      showToast('Failed to update form fields.', 'error');
    }
  };

  const handleDeleteField = async (name) => {
    if (['name', 'phone', 'email'].includes(name)) {
      showToast('Name, Phone, and Email are core fields and cannot be deleted.', 'warning');
      return;
    }
    if (!window.confirm(`Are you sure you want to delete the form field "${name}"?`)) return;

    const updatedFields = formFields.filter(f => f.name !== name);
    setFormFields(updatedFields);
    try {
      await siteDataManager.saveContactFormFields(updatedFields);
      showToast('Field deleted.');
    } catch (err) {
      showToast('Failed to delete field.', 'error');
    }
  };

  return (
    <div className="space-y-10 text-left font-body">
      <div>
        <h1 className="text-3xl font-black text-premium-black font-heading leading-none">Contact Page Edit</h1>
        <p className="text-slate-400 text-xs mt-1.5 font-bold uppercase tracking-wider">Configure client coordinates, Google maps coordinates and custom form fields</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* LEFT COLUMN: CONTACT INFO & SOCIALS */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-800 font-heading">Contact Coordinates</h2>
          
          <form onSubmit={handleSaveContactPage} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 text-xs font-bold uppercase mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-slate-500 text-xs font-bold uppercase mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 text-xs font-bold uppercase mb-1">Floating WhatsApp Number (CTAs)</label>
              <input
                type="text"
                placeholder="Leave blank to fallback to general WhatsApp"
                value={floatingWhatsapp}
                onChange={(e) => setFloatingWhatsapp(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-slate-500 text-xs font-bold uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-slate-500 text-xs font-bold uppercase mb-1">Office Address</label>
              <textarea
                rows="2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-xs font-semibold resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-slate-500 text-xs font-bold uppercase mb-1">Google Maps Embed iframe URL</label>
              <textarea
                rows="2"
                value={mapsEmbed}
                onChange={(e) => setMapsEmbed(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-[10px] font-semibold resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-500 text-xs font-bold uppercase mb-1">Instagram Link</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-[10px] font-semibold"
                />
              </div>
              <div>
                <label className="block text-slate-500 text-xs font-bold uppercase mb-1">Facebook Link</label>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-[10px] font-semibold"
                />
              </div>
              <div>
                <label className="block text-slate-500 text-xs font-bold uppercase mb-1">LinkedIn Link</label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-[10px] font-semibold"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-primary-blue hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM FIELDS BUILDER */}
        <div className="space-y-6">
          
          {/* Active Fields Table */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-800 font-heading">Contact Form Fields Manager</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-[10px] uppercase font-bold">
                    <th className="py-2">Label</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Required</th>
                    <th className="py-2 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {formFields.map(field => (
                    <tr key={field.name} className="hover:bg-slate-50/40">
                      <td className="py-3 font-semibold text-slate-700">{field.label}</td>
                      <td className="py-3 text-slate-500 capitalize">{field.type}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${field.required ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'}`}>
                          {field.required ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {!['name', 'phone', 'email'].includes(field.name) ? (
                          <button
                            onClick={() => handleDeleteField(field.name)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-300 font-medium">Core Field</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add New Field Box */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm text-left">
            <h3 className="text-sm font-bold text-slate-800 font-heading mb-4">Add Custom Form Field</h3>
            
            <form onSubmit={handleAddField} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 text-[10px] font-bold uppercase mb-1">Field Name Key (alphanumeric)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. business_budget"
                    value={newField.name}
                    onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 text-[10px] font-bold uppercase mb-1">Field Label (visible name)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Monthly Budget"
                    value={newField.label}
                    onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-500 text-[10px] font-bold uppercase mb-1">Field Input Type</label>
                  <select
                    value={newField.type}
                    onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-xs font-semibold bg-white"
                  >
                    <option value="text">Text Input</option>
                    <option value="tel">Telephone / Phone</option>
                    <option value="email">Email</option>
                    <option value="select">Dropdown Options Select</option>
                    <option value="textarea">Textarea Box</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-slate-500 text-[10px] font-bold uppercase mb-1">Placeholder Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Enter your monthly marketing budget..."
                    value={newField.placeholder}
                    onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-xs font-semibold"
                  />
                </div>
              </div>

              {newField.type === 'select' && (
                <div>
                  <label className="block text-slate-500 text-[10px] font-bold uppercase mb-1">Dropdown Options (comma separated)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. $1000-$5000, $5000-$10000, $10000+"
                    value={newField.optionsString}
                    onChange={(e) => setNewField({ ...newField, optionsString: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-blue text-xs font-semibold"
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="field_required"
                  checked={newField.required}
                  onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                  className="rounded border-slate-200 text-primary-blue focus:ring-primary-blue"
                />
                <label htmlFor="field_required" className="text-slate-600 text-xs font-bold uppercase select-none cursor-pointer">
                  Is this field required?
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Create Field
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
