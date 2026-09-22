import { Calendar, MapPin, Sparkles, ArrowRight } from 'lucide-react';

export default function ExhibitionsSection({ onInquireExhibition, _onSelectArtwork }) {
  return (
    <section id="exhibitions" className="pt-5 sm:pt-7 lg:pt-8 pb-7 sm:pb-9 lg:pb-10 bg-transparent relative overflow-hidden border-b border-[#E7E0D2] scroll-mt-20 sm:scroll-mt-24">
      {/* Decorative Spotlights */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#C87A38]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5 sm:space-y-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            EXHIBITIONS
          </h2>
          <div className="w-16 h-[2.5px] bg-[#C87A38] mx-auto rounded-full mt-1.5" />
          <p className="text-sm sm:text-base text-[#5C5652] leading-relaxed max-w-2xl mx-auto font-light pt-1">
            Showcasing authentic Madhubani canvases at premier national galleries, cultural institutions, and curated spaces.
          </p>
        </div>

        {/* 1. UPCOMING EXHIBITION SPOTLIGHT: INDIA HABITAT CENTRE (IHC) */}
        <div className="deckled-frame bg-[#FFFDF9] border border-[#E7E0D2] rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Featured Exhibition Venue */}
          <div className="lg:col-span-5 relative min-h-[220px] xs:min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] overflow-hidden bg-[#1C1917] border-b lg:border-b-0 lg:border-r border-[#E7E0D2]">
            <img
              src="/images/ihc_visual_art_gallery.jpg"
              alt="Visual Arts Gallery, India Habitat Centre (IHC), New Delhi"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />

            {/* Badge */}
            <div className="absolute top-3 left-3 xs:top-3.5 xs:left-3.5 z-10 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-0.5 xs:py-1 rounded-full bg-[#1C1917]/85 backdrop-blur-md text-white text-[9px] xs:text-[10px] font-bold uppercase tracking-widest border border-white/20 shadow-xs">
                VISUAL ARTS GALLERY • IHC NEW DELHI
              </span>
            </div>
          </div>

          {/* Exhibition Details */}
          <div className="lg:col-span-7 p-4 xs:p-5 sm:p-7 lg:p-8 xl:p-10 text-left space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C87A38]/10 text-[#C87A38] text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>UPCOMING GALLERY FEATURE</span>
            </div>

            <p className="text-base sm:text-lg text-[#1C1917] font-serif leading-relaxed font-normal">
              Kalapravah is proud to announce an upcoming exhibition at the prestigious <strong>Visual Art Gallery, India Habitat Centre (IHC), New Delhi</strong> featuring original Madhubani paintings.
            </p>

            <div className="space-y-2.5 text-xs sm:text-sm text-[#5C5652] pt-3 border-t border-[#E7E0D2]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C87A38] shrink-0" />
                <span><strong>Venue:</strong> Visual Arts Gallery, India Habitat Centre (IHC), Lodhi Road, New Delhi</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#C87A38] shrink-0" />
                <span><strong>Date:</strong> To be announced soon</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#C87A38] shrink-0" />
                <span><strong>Highlights:</strong> Original Madhubani Paintings, Private Viewing & Artist Talk</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                onClick={(e) => {
                  if (onInquireExhibition) {
                    e.preventDefault();
                    onInquireExhibition('IHC Exhibition Inquiries');
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-2.5 rounded-full bg-[#1C1917] hover:bg-[#C87A38] text-white text-xs font-bold tracking-widest uppercase transition-all shadow-md active:scale-95 cursor-pointer min-h-[44px]"
              >
                <span>Inquire About Exhibition Passes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>



      </div>
    </section>
  );
}
