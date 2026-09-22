import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function ArtSection({ onSelectArtwork }) {
  return (
    <section id="art" className="pt-5 sm:pt-7 lg:pt-8 pb-7 sm:pb-9 lg:pb-10 bg-transparent relative overflow-hidden border-b border-[#E7E0D2] scroll-mt-20 sm:scroll-mt-24">
      {/* Soft Decorative Ambient Spotlights */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#C87A38]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5 sm:space-y-6">
        
        {/* Main Section Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            MADHUBANI ART
          </h2>
          <div className="w-16 h-[2.5px] bg-[#C87A38] mx-auto rounded-full mt-1.5" />
          <p className="text-sm sm:text-base text-[#5C5652] leading-relaxed max-w-2xl mx-auto font-light pt-1">
            Discover the centuries-old civilizational heritage of Madhubani art, defined by sacred Vedic motifs, double-line hatching, and organic pigments.
          </p>
        </div>

        {/* Open Organic Editorial Layout (No Boxy Containers) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 xl:gap-16 items-center pt-2 sm:pt-4">
          
          {/* Left Column: Narrative (Open & Flowing) */}
          <div className="lg:col-span-6 space-y-3.5 sm:space-y-4 text-sm sm:text-base text-[#332F2C] leading-relaxed font-light text-left">
            <p>
              Originating in northern Bihar's Madhubani region, <strong className="font-semibold text-[#1C1917]">Madhubani folk art</strong> is a centuries-old sacred tradition historically painted by women on domestic mud courtyard walls (<em>Bhitti Chitra</em>) during auspicious festivals, marriages, and harvest celebrations.
            </p>
            <p>
              Celebrated worldwide for bold double-line contours, fine bamboo nib penmanship, and natural pigments, every motif preserves ancient Vedic symbolism, ecological harmony, and living civilizational memory.
            </p>
            <p>
              Each canvas acts as a sacred visual bridge, translating timeless folklore and civilizational narratives into living art for modern residential and gallery spaces.
            </p>
          </div>

          {/* Right Column: Curated Masterwork Showcase (Floating Canvas, No Heavy Boxes) */}
          <div 
            onClick={() => {
              if (onSelectArtwork) {
                onSelectArtwork({
                  title: "Janak Phulwari: The Sacred Royal Garden",
                  image: "/images/janak_phulwari.jpg",
                  styleCategory: "Bharni & Kachni",
                  medium: "Natural pigments and acrylic on handmade cotton rag paper",
                  story: "Depicts Lord Rama and Lakshmana visiting King Janaka's sacred flower garden in Mithila, where Rama first beholds Sita surrounded by attendants. Intricately adorned with lush floral canopies, sacred peacocks, double-line hatching, and vibrant Bharni color fills.",
                  year: "2023",
                  dimensions: "22 × 15 in",
                  inStock: false
                });
              }
            }}
            className="lg:col-span-6 space-y-3 text-left group cursor-pointer"
          >
            {/* Masterwork Canvas with Dark Gallery Border Outline */}
            <div className="relative rounded-xl overflow-hidden bg-[#FAF8F3] border-2 border-[#1C1917] shadow-xl group-hover:shadow-2xl transition-all duration-500">
              <img
                src="/images/janak_phulwari.jpg"
                alt="Janak Phulwari: Traditional Madhubani Folk Artwork"
                className="w-full h-auto object-contain block group-hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Inspection Pill Hint (always visible on touch screens, hover on desktop) */}
              <div className="absolute bottom-2.5 right-2.5 xs:bottom-3 xs:right-3 transition-opacity opacity-90 sm:opacity-0 sm:group-hover:opacity-100">
                <span className="text-[10px] xs:text-[11px] font-medium text-white bg-[#1C1917]/85 backdrop-blur-md px-2.5 xs:px-3 py-1 rounded-full border border-white/20 shadow-sm">
                  Tap to inspect
                </span>
              </div>
            </div>

            {/* Minimalist Gallery Artwork Information */}
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 pt-1 px-1">
              <div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1917] group-hover:text-[#C87A38] transition-colors">
                  Janak Phulwari: Sacred Garden
                </h4>
                <p className="text-[11px] sm:text-xs text-[#78716C] font-light">
                  Natural pigments & acrylic on handmade cotton rag paper • 22 × 15 in
                </p>
              </div>

              <div className="flex items-center gap-2 self-start xs:self-auto shrink-0">
                <span className="text-[10px] font-bold text-[#C87A38] uppercase tracking-wider bg-[#C87A38]/10 px-2.5 py-0.5 rounded-full border border-[#C87A38]/20 shrink-0">
                  BHARNI & KACHNI
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#C87A38] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
