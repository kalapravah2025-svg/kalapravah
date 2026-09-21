import React from 'react';
import { MessageSquare, Quote, MapPin } from 'lucide-react';

export default function ArtistSection({ onContactArtist }) {
  return (
    <section id="artist" className="pt-5 sm:pt-7 lg:pt-8 pb-7 sm:pb-9 lg:pb-10 bg-transparent relative overflow-hidden border-b border-[#E7E0D2] scroll-mt-20 sm:scroll-mt-24">
      {/* Soft Decorative Ambient Spotlights */}
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#9A3412]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5 sm:space-y-6">
        
        {/* Main Section Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            ARTIST
          </h2>
          <div className="w-16 h-[2.5px] bg-[#C87A38] mx-auto rounded-full mt-1.5" />
          <p className="text-sm sm:text-base text-[#5C5652] leading-relaxed max-w-2xl mx-auto font-light pt-1">
            Rashmi Dhar - Traditional Madhubani practitioner, workshop facilitator, and founder of Kalapravah, dedicated to keeping Madhubani heritage vibrant.
          </p>
        </div>

        {/* Artist Details & Photo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center pt-1">
          
          {/* 📍 ARTIST PHOTO */}
          <div className="lg:col-span-5 relative flex flex-col max-w-md mx-auto w-full lg:max-w-none">
            <div className="bg-[#FFFDF9] border border-[#E7E0D2] p-3.5 sm:p-4 rounded-2xl shadow-md space-y-4 h-full flex flex-col justify-between">

              <div className="relative flex-1 min-h-[260px] xs:min-h-[300px] sm:min-h-[360px] aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto rounded-xl overflow-hidden border border-[#E7E0D2] bg-[#FAF8F3] shadow-inner group">
                <img
                  src="/images/rashmi_dhar.jpg"
                  alt="Rashmi Dhar at IGNCA, New Delhi"
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 via-transparent to-transparent opacity-95 flex flex-col justify-end p-3.5 sm:p-5 text-white">
                  <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#FAF8F3] font-medium tracking-wide">
                    <MapPin className="w-3.5 h-3.5 text-[#C87A38] shrink-0" />
                    <span>IGNCA, New Delhi</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Direct Chat Button */}
              <div className="pt-2 border-t border-[#E7E0D2]">
                <a
                  href="https://wa.me/919971399395?text=Hello%20Rashmi%2C%20I%20would%20like%20to%20chat%20and%20inquire%20about%20your%20artworks."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 min-h-[44px] py-2.5 sm:py-3 px-2.5 sm:px-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-[10.5px] xs:text-[11px] sm:text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg active:scale-95 text-center leading-snug cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current shrink-0" />
                  <span>Have questions about an artwork? Let's chat</span>
                </a>
              </div>

            </div>
          </div>

          {/* Artist Journey Copy (Un-boxed Seamless Narrative) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            
            {/* Open Detailed Narrative */}
            <div className="space-y-3.5 sm:space-y-4 py-1">
              <p className="text-sm sm:text-base lg:text-lg text-[#332F2C] leading-relaxed font-light">
                Drawing and painting have been her lifelong passion. As she pursued her academics, creative pursuits temporarily took a backseat to the demands of everyday life. However, a deep longing to create and express never truly left her. When she returned to art, she found profound solace in Madhubani art.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-[#332F2C] leading-relaxed font-light">
                Madhubani art is a sacred tradition that draws its narratives from ancient civilization, mythology, and nature. Over the past 6 years, she has dedicated herself to learning and practicing this timeless art form directly under master artists who inherited these techniques through generations of family tradition.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-[#332F2C] leading-relaxed font-light">
                Her primary mediums are acrylics and natural pigments on handmade paper and canvas. Through her creative space, she founded the art initiative, <strong>Kalapravah</strong>, where she strives to keep this living heritage vibrant and thriving.
              </p>
            </div>

            {/* 🌟 UN-BOXED EDITORIAL PULL-QUOTE JOURNEY STATEMENT */}
            <div className="relative pl-3.5 sm:pl-6 lg:pl-8 border-l-2 border-[#C87A38] space-y-2.5 sm:space-y-3 py-1.5 sm:py-2 my-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#C87A38] uppercase tracking-widest">
                <Quote className="w-4 h-4 fill-current shrink-0" />
                <span>HERITAGE & MINDFUL WORKSHOPS</span>
              </div>

              <div className="space-y-3 text-sm sm:text-base lg:text-lg text-[#44403C] font-serif leading-relaxed font-normal">
                <p className="not-italic">
                  Art is meant to be shared, which is why a vital part of her journey involves conducting hands-on Madhubani workshops. She designs these sessions especially for the younger generation and busy modern minds, providing a peaceful sanctuary away from screens and offering a calming, therapeutic space to unwind, reset, and find joy.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
