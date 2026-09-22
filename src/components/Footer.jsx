import React, { useState } from 'react';
import { 
  Mail, 
  ChevronUp, 
  Phone,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.84L0 24l6.344-1.498A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.84 0-3.567-.492-5.064-1.353l-.363-.21-3.76.888.888-3.66-.232-.375A9.957 9.957 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
  </svg>
);

export default function Footer({ onNavigate }) {
  const [category, setCategory] = useState('Artwork Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Artwork Inquiry', 
    'Custom Commission', 
    'Workshops', 
    'Exhibitions',
    'General Enquiry',
    'Other'
  ];

  const indexLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'art', label: 'ART' },
    { id: 'artist', label: 'ARTIST' },
    { id: 'gallery', label: 'ART GALLERY' },
    { id: 'workshops', label: 'WORKSHOPS' },
    { id: 'exhibitions', label: 'EXHIBITIONS' },
    { id: 'faqs', label: 'FAQS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const formattedText = `Hello Rashmi,\n\nI am inquiring about: *${category}*\n${message.trim() ? message.trim() : 'Please share available collection catalog and details.'}`;
    const waUrl = `https://wa.me/919971399395?text=${encodeURIComponent(formattedText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleLinkClick = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) {
        const navOffset = 84;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className="w-full text-[#1C1917] overflow-hidden relative z-20 bg-[#1C1613] border-t border-[#3D302A]">

      {/* FOOTER & WHATSAPP QUICK INQUIRY */}
      <section id="contact" className="bg-[#1C1613] text-[#EBE5DF] py-6 sm:py-8 lg:py-9 px-4 sm:px-6 lg:px-8 pb-safe pb-8 sm:pb-10 scroll-mt-20 sm:scroll-mt-24">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Main 2-Column Compact Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            
            {/* Left Column: Brand & Direct Contact */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Logo & Brand */}
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="bg-white p-2 rounded-2xl shadow-md shrink-0 flex items-center justify-center border border-white/20">
                  <img 
                    src="/images/logo-footer.png" 
                    alt="Kalapravah Logo" 
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-xl" 
                  />
                </div>
                <div>
                  <span className="font-serif text-xl xs:text-2xl sm:text-3xl font-bold tracking-widest text-white uppercase block leading-none" style={{ color: '#ffffff' }}>
                    KALAPRAVAH
                  </span>
                </div>
              </div>

              {/* Navigation Index Links */}
              <div className="flex flex-wrap gap-1.5 xs:gap-2.5 sm:gap-3.5 pt-1">
                {indexLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className="text-xs font-semibold tracking-widest text-[#D98A48] hover:text-white uppercase transition-colors cursor-pointer py-1.5 px-1.5 min-h-[40px] flex items-center active:scale-95"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Direct Links (Email, Insta, WhatsApp) */}
              <div className="space-y-2 pt-2 text-xs text-[#C2B7AC]">
                <a
                  href="mailto:kalapravah2025@gmail.com"
                  className="flex items-center gap-2.5 hover:text-[#FAF8F3] transition-colors py-1"
                >
                  <Mail className="w-3.5 h-3.5 text-[#D98A48] shrink-0" />
                  <span className="break-all sm:break-normal">kalapravah2025@gmail.com</span>
                </a>

                <a
                  href="https://www.instagram.com/kalapravah2025?igsh=MWJ4N3ZubzBzczBodg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#FAF8F3] transition-colors py-1"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#D98A48] shrink-0" />
                  <span>@kalapravah2025</span>
                </a>

                <a
                  href="https://wa.me/919971399395"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-[#FAF8F3] transition-colors py-1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>+91 99713 99395</span>
                </a>
              </div>
            </div>

            {/* Right Column: Compact WhatsApp Inquiry Box */}
            <div className="lg:col-span-7 bg-[#251E1A] border border-[#3D312B] p-4 xs:p-5 sm:p-6 rounded-lg shadow-sm space-y-3.5 sm:space-y-4">
              <div className="border-b border-[#3D312B] pb-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#D98A48]" />
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#D98A48]">
                    DIRECT INQUIRY • MESSAGE THE ARTIST
                  </span>
                </div>
              </div>

              <form onSubmit={handleSendWhatsApp} className="space-y-3">
                {/* Topic Pills */}
                <div className="flex flex-wrap gap-1.5 xs:gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-2.5 xs:px-3 py-1.5 text-[10.5px] xs:text-[11px] font-medium tracking-wide rounded-md border transition-all cursor-pointer min-h-[38px] flex items-center ${
                        category === cat
                          ? 'bg-[#D98A48] text-[#1C1613] border-[#D98A48] font-semibold shadow-xs'
                          : 'bg-[#1C1613] text-[#C2B7AC] border-[#3D312B] hover:border-[#D98A48] hover:text-[#FAF8F3]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Compact Note input */}
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Optional: Note, painting size, or details..."
                  className="w-full px-3.5 py-2.5 bg-[#1C1613] border border-[#3D312B] focus:border-[#D98A48] rounded-md text-base sm:text-xs text-[#FAF8F3] placeholder:text-[#78716C] focus:outline-none transition-colors min-h-[44px]"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-between px-4 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-[#1C1613] rounded-md text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 group cursor-pointer shadow-sm min-h-[44px]"
                >
                  <div className="flex items-center gap-2">
                    <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
                    <span>SEND MESSAGE</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              </form>

              {submitted && (
                <p className="text-[11px] font-semibold text-[#25D366] text-center">
                  ✓ Opening WhatsApp message...
                </p>
              )}
            </div>

          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-4 border-t border-[#362C26] flex flex-col sm:flex-row items-center justify-between text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] text-[#8C8277] gap-3 text-center sm:text-left">
            <p>© 2026 KALAPRAVAH • ART BY RASHMI DHAR</p>

            <div className="flex items-center gap-4">
              <span>100% ORIGINAL ART GUARANTEE</span>
              <span>•</span>
              <button 
                onClick={() => handleLinkClick('home')} 
                className="inline-flex items-center gap-1 hover:text-[#FAF8F3] text-[#D98A48] cursor-pointer transition-colors"
              >
                <span>TOP</span>
                <ChevronUp className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </footer>
  );
}
