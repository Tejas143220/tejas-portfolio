import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { personalData } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, submitted: false, error: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitting: false, submitted: false, error: true });
      return;
    }

    setStatus({ submitting: true, submitted: false, error: false });

    try {
      // Send form data to Web3Forms public contact endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Users can paste their free key here, or fallback
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New Portfolio Message from ${formData.name}`,
          message: formData.message,
          to: personalData.email
        })
      });

      const resData = await response.json();
      if (resData.success) {
        setStatus({ submitting: false, submitted: true, error: false });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback: trigger mailto directly if API key is unconfigured
        const mailtoSubject = encodeURIComponent(formData.subject || 'Portfolio Inquiry');
        const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:${personalData.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
        setStatus({ submitting: false, submitted: true, error: false });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (err) {
      // Fallback: open user email client directly
      const mailtoSubject = encodeURIComponent(formData.subject || 'Portfolio Inquiry');
      const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:${personalData.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
      setStatus({ submitting: false, submitted: true, error: false });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Ambient Background Light */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= EDITORIAL AWWWARDS CTA CARD (Reference Image Match) ================= */}
        <div className="mb-16 bg-slate-950 p-6 sm:p-12 rounded-3xl border border-slate-800/90 shadow-2xl space-y-6 text-left relative overflow-hidden font-mono">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-6xl font-extrabold text-white font-heading tracking-tight leading-tight max-w-2xl">
            Let's create something great together .
          </h2>

          <div className="text-xs text-slate-400 font-semibold uppercase tracking-widest pt-2">
            BASED IN NASHIK, INDIA • WORKING WORLDWIDE
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80">
            <a
              href={`mailto:${personalData.email}`}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 font-black text-sm tracking-wider uppercase shadow-xl transition-all hover:scale-105"
            >
              <span>→ SEND ME AN EMAIL</span>
            </a>

            <div className="text-xs font-mono text-slate-300 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 font-bold">
              LOCAL TIME • 05:30 PM IST
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between pt-6 text-xs text-slate-400 font-semibold border-t border-slate-800/80 gap-3">
            <div className="flex items-center gap-4">
              <a href={personalData.github} target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">GitHub</a>
              <a href={personalData.linkedin} target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">LinkedIn</a>
              <a href={`mailto:${personalData.email}`} className="hover:text-sky-400 transition-colors">Email</a>
            </div>
            <span className="text-[10px] text-slate-500">© 2026 TEJAS THAKARE</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaPaperPlane className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Direct <span className="text-gradient">Message</span>
          </h2>
          <p className="text-slate-400 max-w-xl text-center mt-3 text-base sm:text-lg">
            Send a message directly to my inbox for project inquiries or Python & web development opportunities.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 shadow-xl">
              <h3 className="text-2xl font-bold text-white font-heading mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Email Item */}
                <a
                  href={`mailto:${personalData.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl group-hover:scale-110 transition-transform">
                    <FaEnvelope />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Email Address</span>
                    <span className="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                      {personalData.email}
                    </span>
                  </div>
                </a>

                {/* Phone Item */}
                <a
                  href={`tel:${personalData.phone}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl group-hover:scale-110 transition-transform">
                    <FaPhone />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Phone Number</span>
                    <span className="text-sm sm:text-base font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                      {personalData.phone}
                    </span>
                  </div>
                </a>

                {/* Location Item */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-mono">Location</span>
                    <span className="text-sm sm:text-base font-semibold text-slate-200">
                      {personalData.location}
                    </span>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-4 border-t border-slate-800">
                  <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold block mb-4">
                    Social Channels
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={personalData.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-slate-300 hover:text-cyan-400 text-sm font-semibold transition-all"
                    >
                      <FaGithub className="w-4 h-4" /> GitHub
                    </a>
                    <a
                      href={personalData.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-900 border border-slate-800 hover:border-cyan-500/40 rounded-xl text-slate-300 hover:text-cyan-400 text-sm font-semibold transition-all"
                    >
                      <FaLinkedin className="w-4 h-4" /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-panel p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-xl relative">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-6">
                Send a Message
              </h3>

              {status.submitted && (
                <div className="mb-6 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center gap-3 text-sm">
                  <FaCheckCircle className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span>Thank you! Your message has been received. I'll get back to you shortly.</span>
                </div>
              )}

              {status.error && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 flex items-center gap-3 text-sm">
                  <FaExclamationCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>Please fill in all required fields (Name, Email, and Message).</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Smith"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi Tejas, I'd like to discuss..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full py-4 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-base disabled:opacity-50"
                >
                  {status.submitting ? (
                    <span className="animate-pulse">Sending Message...</span>
                  ) : (
                    <>
                      <FaPaperPlane className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
