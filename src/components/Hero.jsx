import React, { useState, useEffect } from 'react';
import { 
  Sparkles
} from 'lucide-react';
import LunarGravityCard from './ui/lunar-gravity-card';

export default function Hero({ onExploreArtworks, onExploreArtist }) {
  // 3 AI Generated Full-Bleed Interior Decor Backgrounds featuring Rashmi Dhar's authentic artworks
  const decorHeroSlides = [
    {
      id: 'slide1',
      bgImage: '/images/hero_decor_1.jpg',
      title: 'Radha Krishna: Pure Kachni Mandala',
      artworkTag: 'FEATURED MANDALA'
    },
    {
      id: 'slide2',
      bgImage: '/images/hero_decor_2.jpg',
      title: 'Matsya Raas: Sacred Fish Dance',
      artworkTag: 'GALLERY EXHIBITION'
    },
    {
      id: 'slide3',
      bgImage: '/images/hero_decor_3.jpg',
      title: 'Vighnaharta: Seated Ganesha',
      artworkTag: 'CANVAS COLLECTION'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = React.useRef(0);
  const touchStartY = React.useRef(0);
  const isSwiping = React.useRef(false);

  // Auto-changing slideshow every 3 seconds (pauses when user interacts)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % decorHeroSlides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [decorHeroSlides.length, isPaused]);

  // Touch Swipe Handlers for Mobile / Tablets
  const handleTouchStart = (e) => {
    if (!e.touches || !e.touches[0]) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = true;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping.current || !e.touches || !e.touches[0]) return;
    const diffX = touchStartX.current - e.touches[0].clientX;
    const diffY = touchStartY.current - e.touches[0].clientY;
    // If predominantly horizontal swipe, prevent accidental vertical page pull
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      if (e.cancelable) e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    const endX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : touchStartX.current;
    const diffX = touchStartX.current - endX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // Swiped Left -> Next Slide
        setCurrentSlide((prev) => (prev + 1) % decorHeroSlides.length);
      } else {
        // Swiped Right -> Previous Slide
        setCurrentSlide((prev) => (prev - 1 + decorHeroSlides.length) % decorHeroSlides.length);
      }
    }
    // Resume auto-rotation after brief delay
    setTimeout(() => setIsPaused(false), 2000);
  };

  return (
    <section id="home" className="w-full relative overflow-hidden border-b border-[#E7E0D2]">
      
      {/* ========================================================================= */}
      {/* 1. FULL-BLEED 100VW SLIDESHOW HERO BANNER                                */}
      {/* ========================================================================= */}
      <div 
        className="relative w-full h-[84svh] xs:h-[88svh] sm:h-screen min-h-[460px] xs:min-h-[500px] sm:min-h-[580px] md:min-h-[620px] flex items-center justify-center text-center overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Full-Bleed 100% Background Slideshow with Horizontal Swipe Left Animation */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="flex w-full h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {decorHeroSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className="w-full h-full shrink-0 relative"
              >
                <img
                  src={slide.bgImage}
                  alt={slide.title}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>

          {/* Calibrated Dark Overlay for Enhanced Artwork Visibility and Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/35 sm:from-black/60 sm:via-black/35 sm:to-black/25 z-10 pointer-events-none" />
        </div>

        {/* OVERLAID CENTERED HERO CONTENT */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 xs:pt-10 sm:pt-12 space-y-4 xs:space-y-5 sm:space-y-8">
          
          {/* Centered High-Impact Headline */}
          <div className="space-y-2 xs:space-y-3">
            <h1 className="font-serif text-2xl xxs:text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15] drop-shadow-xl text-center">
              Traditional Elegance <br className="hidden xxs:inline" />
              For <span className="font-serif italic font-normal text-[#F59E0B]">Contemporary</span> Spaces
            </h1>
          </div>

          {/* Centered Narrative Subtitle */}
          <p className="text-xs xxs:text-[13px] xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed font-light max-w-2xl mx-auto text-center drop-shadow-md px-1">
            Bringing ancient storytelling of traditional <strong className="font-semibold text-white">Madhubani folk art</strong> directly into modern living spaces.
          </p>

          {/* Centered Action Buttons */}
          <div className="flex flex-col xs:flex-row items-center justify-center gap-2.5 xs:gap-3 sm:gap-4 pt-1 xs:pt-3 sm:pt-4 w-full max-w-xs xs:max-w-none mx-auto">
            <button
              onClick={onExploreArtworks}
              className="w-full xs:w-auto text-center px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-transparent hover:bg-white/15 text-white border-2 border-white/80 hover:border-white text-[10.5px] xs:text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-all shadow-lg cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap min-h-[44px]"
            >
              EXPLORE ART GALLERY
            </button>

            <button
              onClick={onExploreArtist}
              className="w-full xs:w-auto text-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#C87A38] hover:bg-[#b56929] text-white text-[10.5px] xs:text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-all shadow-2xl hover:scale-105 active:scale-95 cursor-pointer border border-[#C87A38] whitespace-nowrap min-h-[44px]"
            >
              ABOUT THE ARTIST
            </button>
          </div>

          {/* Subtle Slide Indicator Bars at Bottom with Comfortable Hit Targets */}
          <div className="pt-2 sm:pt-4 flex justify-center">
            <div className="flex items-center gap-1.5 xs:gap-2">
              {decorHeroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className="p-1.5 cursor-pointer group"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'w-6 xs:w-7 bg-white/95 shadow-sm' : 'w-2 bg-white/40 group-hover:bg-white/70'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. ABOUT KALAPRAVAH (SEAMLESS BRAND MISSION & CELESTIAL SPHERE)          */}
      {/* ========================================================================= */}
      <div id="welcome-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8 pt-7 sm:pt-9 lg:pt-10 pb-5 sm:pb-6">
        
        <div id="about" className="space-y-8">
          
          {/* Main Section Banner Header - Center Aligned */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
              KALAPRAVAH
            </h2>
            <div className="w-16 h-[2.5px] bg-[#C87A38] mx-auto rounded-full mt-1.5" />
            <p className="font-serif text-base sm:text-xl text-[#1C1917] italic leading-relaxed font-normal pt-1">
              Where Heritage Meets Contemporary Calm
            </p>
          </div>

          {/* 2-Column Grid Layout: Text on Left, 3D Sphere on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center max-w-6xl mx-auto pt-2">
            
            {/* LEFT COLUMN: NARRATIVE (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
              <p className="text-sm sm:text-base text-[#5C5652] leading-relaxed font-light">
                Kalapravah translates to the continuous flow of art. This venture is more than a collection of paintings - it is a sacred bridge connecting our rich civilizational roots with the modern world.
              </p>
              
              <p className="text-sm sm:text-base text-[#5C5652] leading-relaxed font-light">
                At its core, Kalapravah is more than just an art initiative; it serves as a living link between ancient heritage and contemporary spaces. In a world thriving on the digital and the disposable, there is something profoundly enriching about engaging with art that has been crafted by hand. Each piece tells a story, holding within it collective memories and traditions, making them accessible to everyone.
              </p>
            </div>

            {/* RIGHT COLUMN: 3D CELESTIAL GLOBE SPHERE (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4 sm:space-y-5 text-center">
              
              {/* Circular Background Container */}
              <div className="relative">
                <div className="w-[185px] h-[185px] xxs:w-[220px] xxs:h-[220px] xs:w-[260px] xs:h-[260px] sm:w-[300px] sm:h-[300px] lg:w-[340px] lg:h-[340px] max-w-[calc(100vw-2.5rem)] max-h-[calc(100vw-2.5rem)] rounded-full bg-[#FFFDF9] border-2 border-[#C87A38]/40 shadow-2xl relative overflow-hidden flex items-center justify-center">
                  <LunarGravityCard
                    className="w-full h-full"
                    artTextureUrl="/images/artwork_sphere_surya_chandra.jpg"
                    ringColor="#C87A38"
                    hintText=""
                  />
                </div>
              </div>

              {/* High-Contrast Editorial Caption Card */}
              <div className="bg-[#FFFDF9] border border-[#E7E0D2] shadow-lg rounded-2xl px-3 sm:px-5 py-2.5 sm:py-3.5 w-full max-w-[calc(100vw-2.5rem)] xs:max-w-sm mx-auto flex items-center justify-center gap-2 xs:gap-2.5 sm:gap-3 backdrop-blur-md transition-all hover:border-[#C87A38]">
                <Sparkles className="w-4 h-4 xs:w-5 xs:h-5 text-[#C87A38] shrink-0" />
                <p className="text-[11px] xxs:text-xs sm:text-sm text-[#1C1917] font-serif italic leading-relaxed text-center font-normal">
                  In Madhubani folklore, celestial bodies like the <strong className="text-[#C87A38] not-italic font-bold">Sun, Moon, and Stars</strong> represent cosmic balance.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
