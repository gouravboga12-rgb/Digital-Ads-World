import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

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
