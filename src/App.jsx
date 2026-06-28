import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { siteDataManager } from './data/siteDataManager';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCTAs from './components/FloatingCTAs';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Team from './pages/Team';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import ServiceInquiry from './pages/ServiceInquiry';
import TermsAndConditions from './pages/TermsAndConditions';

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const [agencyInfo, setAgencyInfo] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });

    // Load initial agency config
    async function loadSEO() {
      try {
        const info = await siteDataManager.getAgencyInfo();
        if (info) setAgencyInfo(info);
      } catch (e) {
        console.error("Error loading SEO info:", e);
      }
    }
    loadSEO();
  }, []);

  useEffect(() => {
    if (!agencyInfo) return;

    const path = location.pathname;
    let pageTitle = agencyInfo.seo?.title || "Digital Ads World | We Don't Run Ads, We Drive Results.";
    let pageDesc = agencyInfo.seo?.description || "Premium Performance Marketing Agency helping businesses scale.";
    let keywords = Array.isArray(agencyInfo.seo?.keywords) ? agencyInfo.seo.keywords.join(', ') : '';

    if (path === '/about') {
      pageTitle = `About Us | ${agencyInfo.name || 'Digital Ads World'}`;
      pageDesc = `Learn about our values, timeline milestone journey, and team.`;
    } else if (path === '/services') {
      pageTitle = `Our Marketing Services | ${agencyInfo.name || 'Digital Ads World'}`;
      pageDesc = `Explore premium performance marketing channels including Google Ads, Meta Ads, SEO, and Development.`;
    } else if (path === '/gallery') {
      pageTitle = `Client Work & Case Studies | ${agencyInfo.name || 'Digital Ads World'}`;
      pageDesc = `Browse our visual portfolio gallery of results-driven advertising campaigns.`;
    } else if (path === '/team') {
      pageTitle = `Meet the Specialists | ${agencyInfo.name || 'Digital Ads World'}`;
      pageDesc = `Meet our marketing planners, visual designers, and development team.`;
    } else if (path === '/contact') {
      pageTitle = `Contact Our Specialists | ${agencyInfo.name || 'Digital Ads World'}`;
      pageDesc = `Get a free Google Ads or Meta Ads strategy audit consultation.`;
    }

    // Update document title
    document.title = pageTitle;

    // Update or insert meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = pageDesc;

    // Update or insert meta keywords
    if (keywords) {
      let metaKey = document.querySelector('meta[name="keywords"]');
      if (!metaKey) {
        metaKey = document.createElement('meta');
        metaKey.name = 'keywords';
        document.head.appendChild(metaKey);
      }
      metaKey.content = keywords;
    }

    // Update or insert Google verification meta
    if (agencyInfo.seo?.googleSiteVerification) {
      let metaVerif = document.querySelector('meta[name="google-site-verification"]');
      if (!metaVerif) {
        metaVerif = document.createElement('meta');
        metaVerif.name = 'google-site-verification';
        document.head.appendChild(metaVerif);
      }
      metaVerif.content = agencyInfo.seo.googleSiteVerification;
    }
  }, [location, agencyInfo]);

  return (
    <div className="flex flex-col min-h-screen bg-light-gray-background">
      {/* Navigation Bar */}
      {!isAdminPath && <Header />}

      {/* Page Content Routes */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceInquiry />} />
          <Route path="/gallery" element={<Gallery />} />

          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/terms" element={<TermsAndConditions />} />
        </Routes>
      </main>

      {/* Footer info links */}
      {!isAdminPath && <Footer />}

      {!isAdminPath && <FloatingCTAs />}
    </div>
  );
}
