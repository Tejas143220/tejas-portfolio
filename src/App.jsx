import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import CertificateModal from './components/CertificateModal';
import TechPhysicsSandbox from './components/TechPhysicsSandbox';
import RightNavDock from './components/RightNavDock';
import MobileBottomDock from './components/MobileBottomDock';
import ScrollProgressBar from './components/ScrollProgressBar';
import CyberBackgroundCanvas from './components/CyberBackgroundCanvas';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [sandboxOpen, setSandboxOpen] = useState(false);
  const [activeCert, setActiveCert] = useState(null);

  return (
    <div className="min-h-screen bg-black text-slate-100 selection:bg-white selection:text-black font-sans relative">
      {/* Interactive Cyber Particle Canvas */}
      <CyberBackgroundCanvas />

      {/* Top Scroll Progress Neon Laser Bar */}
      <ScrollProgressBar />

      {/* Navbar */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenSandbox={() => setSandboxOpen(true)}
      />

      {/* Floating Right-Side Navigation Dock */}
      <RightNavDock />

      {/* Futuristic Floating Mobile Glass Dock */}
      <MobileBottomDock
        onOpenResume={() => setResumeOpen(true)}
        onOpenSandbox={() => setSandboxOpen(true)}
      />

      {/* Main Page Sections */}
      <main>
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          onOpenSandbox={() => setSandboxOpen(true)}
        />
        <About
          onOpenCert={(cert) => setActiveCert(cert)}
        />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      <CertificateModal
        cert={activeCert}
        onClose={() => setActiveCert(null)}
      />

      <TechPhysicsSandbox
        isOpen={sandboxOpen}
        onClose={() => setSandboxOpen(false)}
      />
    </div>
  );
}



