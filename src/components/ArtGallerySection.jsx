import React, { useState, useEffect } from 'react';
import { ARTWORKS } from '../data/artworks';
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function ArtGallerySection({ onSelectArtwork }) {
  const [filterStyle, setFilterStyle] = useState('All');
  const [scrollPos, setScrollPos] = useState(0);

  const [hasDraggedFar, setHasDraggedFar] = useState(false);

  const [isHoldingLeft, setIsHoldingLeft] = useState(false);
  const [isHoldingRight, setIsHoldingRight] = useState(false);

  const trackRef = React.useRef(null);
  const animRef = React.useRef(null);
  const scrollPosRef = React.useRef(0);
  const targetScrollPosRef = React.useRef(null);
  const lastMouseXRef = React.useRef(0);
  const isDraggingRef = React.useRef(false);
  const isHoveredRef = React.useRef(false);
  const touchStartXRef = React.useRef(0);
  const touchStartYRef = React.useRef(0);
  const touchDirectionRef = React.useRef(null);

  const categories = ['All', 'Bharni', 'Kachni', 'Godna', 'Traditional'];

  const filteredArtworks = ARTWORKS.filter(item => {
    if (filterStyle === 'All') return true;
    const cat = item.styleCategory.toLowerCase();
    const target = filterStyle.toLowerCase();
    if (target === 'kachni') {
      return cat.includes('kachni') || cat.includes('katchni');
    }
    return cat.includes(target);
  });

  // Triple-cloned array for seamless infinite marquee scrolling in both directions
  const displayArtworks = filteredArtworks.length > 0 
    ? [...filteredArtworks, ...filteredArtworks, ...filteredArtworks] 
    : [];

  // Helper to calculate exact card width + gap dynamically
  const getCardPitch = () => {
    if (trackRef.current && trackRef.current.children[0]) {
      const firstCard = trackRef.current.children[0];
      const style = window.getComputedStyle(trackRef.current);
      const gap = parseFloat(style.gap || style.gridGap || '24') || 24;
      return firstCard.offsetWidth + gap;
    }
    return 340;
  };

  // Helper to normalize position continuously without cuts
  const updateScrollPos = (newPos) => {
    let pos = newPos;
    if (trackRef.current) {
      const oneSetWidth = trackRef.current.scrollWidth / 3;
      if (oneSetWidth > 0) {
        while (pos < 0) {
          pos += oneSetWidth;
          if (targetScrollPosRef.current !== null) targetScrollPosRef.current += oneSetWidth;
        }
        while (pos >= oneSetWidth) {
          pos -= oneSetWidth;
          if (targetScrollPosRef.current !== null) targetScrollPosRef.current -= oneSetWidth;
        }
      }
    }
    scrollPosRef.current = pos;
    setScrollPos(pos);
  };

  // Reset scrollPos if filter category changes
  useEffect(() => {
    targetScrollPosRef.current = null;
    updateScrollPos(0);
  }, [filterStyle]);

  // Continuous linear movement & smooth card-by-card navigation
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      if (trackRef.current) {
        if (isHoldingLeft) {
          targetScrollPosRef.current = null;
          updateScrollPos(scrollPosRef.current - 0.45 * delta);
        } else if (isHoldingRight) {
          targetScrollPosRef.current = null;
          updateScrollPos(scrollPosRef.current + 0.45 * delta);
        } else if (targetScrollPosRef.current !== null) {
          const diff = targetScrollPosRef.current - scrollPosRef.current;
          if (Math.abs(diff) < 0.5) {
            updateScrollPos(targetScrollPosRef.current);
            targetScrollPosRef.current = null;
          } else {
            // Smooth ease-out glide to target card without cuts
            updateScrollPos(scrollPosRef.current + diff * 0.14);
          }
        } else if (!isDraggingRef.current && !isHoveredRef.current) {
          updateScrollPos(scrollPosRef.current + 0.03 * delta);
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isHoldingLeft, isHoldingRight, filteredArtworks.length]);

  // 1:1 Incremental Touch Drag Handlers with vertical scroll passthrough
  const handleTouchStart = (e) => {
    if (!e.touches || !e.touches[0]) return;
    targetScrollPosRef.current = null;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    lastMouseXRef.current = e.touches[0].clientX;
    touchDirectionRef.current = null;
    isDraggingRef.current = false;
    setHasDraggedFar(false);
  };

  const handleTouchMove = (e) => {
    if (!e.touches || !e.touches[0]) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    if (!touchDirectionRef.current) {
      const diffX = Math.abs(currentX - touchStartXRef.current);
      const diffY = Math.abs(currentY - touchStartYRef.current);
      if (diffX > 8 || diffY > 8) {
        if (diffX > diffY) {
          touchDirectionRef.current = 'horizontal';
          isDraggingRef.current = true;
          lastMouseXRef.current = currentX;
        } else {
          touchDirectionRef.current = 'vertical';
          isDraggingRef.current = false;
          return;
        }
      } else {
        return;
      }
    }

    if (touchDirectionRef.current === 'horizontal' && isDraggingRef.current) {
      const dx = lastMouseXRef.current - currentX;
      lastMouseXRef.current = currentX;

      if (Math.abs(dx) > 0.5) {
        setHasDraggedFar(true);
        updateScrollPos(scrollPosRef.current + dx);
      }
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    touchDirectionRef.current = null;
  };

  const handleNext = () => {
    const pitch = getCardPitch();
    const current = targetScrollPosRef.current !== null ? targetScrollPosRef.current : scrollPosRef.current;
    const nextTarget = (Math.floor((current + 4) / pitch) + 1) * pitch;
    targetScrollPosRef.current = nextTarget;
  };

  const handlePrev = () => {
    const pitch = getCardPitch();
    const current = targetScrollPosRef.current !== null ? targetScrollPosRef.current : scrollPosRef.current;
    const prevTarget = (Math.ceil((current - 4) / pitch) - 1) * pitch;
    targetScrollPosRef.current = prevTarget;
  };

  return (
    <section id="gallery" className="pt-5 sm:pt-7 lg:pt-8 pb-7 sm:pb-9 lg:pb-10 bg-transparent relative overflow-hidden border-b border-[#E7E0D2] scroll-mt-20 sm:scroll-mt-24">
      
      {/* Ambient Lights */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C87A38]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#9A3412]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5 sm:space-y-6">
        
        {/* Gallery Section Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
            ART GALLERY
          </h2>
          <div className="w-16 h-[2.5px] bg-[#C87A38] mx-auto rounded-full mt-1.5" />
          <p className="text-xs xs:text-sm sm:text-base text-[#5C5652] leading-relaxed max-w-2xl mx-auto font-light pt-1">
            Browse original hand-painted Madhubani canvases across classical traditions.
          </p>
        </div>

        {/* 🎨 CATEGORY FILTER PILLS (Responsive horizontal strip with smooth snap & touch-scroll) */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 xs:gap-2 overflow-x-auto no-scrollbar py-1 px-1 -mx-4 sm:mx-0 px-4 sm:px-0">
          {categories.map((cat) => {
            const isActive = filterStyle === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilterStyle(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap min-h-[38px] flex items-center cursor-pointer select-none active:scale-95 ${
                  isActive
                    ? 'bg-[#1C1917] text-white shadow-sm border border-[#1C1917]'
                    : 'bg-[#FFFDF9] text-[#78716C] hover:text-[#1C1917] border border-[#E7E0D2] hover:border-[#C87A38]/50 active:bg-[#F3EFE6]'
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* 📍 CONTINUOUS SLOW MOVING TRACK (SIDE HOLDABLE < AND > BUTTONS FOR PC, TOUCH SWIPE FOR MOBILE) */}
        <div 
          className="relative overflow-hidden py-3 px-1 rounded-xl select-none group/carousel"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; }}
        >
            {/* Holdable Left Side Button (<) - Desktop/Tablet */}
            <button
              onMouseDown={(e) => { e.stopPropagation(); setIsHoldingLeft(true); }}
              onMouseUp={(e) => { e.stopPropagation(); setIsHoldingLeft(false); }}
              onMouseLeave={() => setIsHoldingLeft(false)}
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className={`hidden sm:flex absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1917]/85 hover:bg-[#C87A38] text-white items-center justify-center border border-white/30 shadow-2xl backdrop-blur-md transition-all active:scale-95 cursor-pointer ${
                isHoldingLeft ? 'bg-[#C87A38] scale-110 shadow-inner' : ''
              }`}
              aria-label="Move left / previous"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Holdable Right Side Button (>) - Desktop/Tablet */}
            <button
              onMouseDown={(e) => { e.stopPropagation(); setIsHoldingRight(true); }}
              onMouseUp={(e) => { e.stopPropagation(); setIsHoldingRight(false); }}
              onMouseLeave={() => setIsHoldingRight(false)}
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className={`hidden sm:flex absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1C1917]/85 hover:bg-[#C87A38] text-white items-center justify-center border border-white/30 shadow-2xl backdrop-blur-md transition-all active:scale-95 cursor-pointer ${
                isHoldingRight ? 'bg-[#C87A38] scale-110 shadow-inner' : ''
              }`}
              aria-label="Move right / next"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            {/* Sliding Track with continuous requestAnimationFrame translate3d */}
            <div 
              ref={trackRef}
              className="flex gap-3.5 sm:gap-6 w-max"
              style={{
                transform: `translate3d(-${scrollPos}px, 0, 0)`,
                willChange: 'transform'
              }}
            >
              {displayArtworks.map((artwork, index) => (
                <div
                  key={`${artwork.id}-${index}`}
                  onClick={() => {
                    if (!hasDraggedFar && onSelectArtwork) {
                      onSelectArtwork(artwork);
                    }
                  }}
                  className="w-[230px] xxs:w-[255px] xs:w-[285px] sm:w-[315px] lg:w-[330px] min-w-[230px] xxs:min-w-[255px] xs:min-w-[285px] sm:min-w-[315px] lg:min-w-[330px] shrink-0 deckled-frame bg-[#FFFDF9] border-2 border-[#E7E0D2] hover:border-[#C87A38] rounded-xl p-3 sm:p-3.5 shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col justify-between h-[390px] xxs:h-[400px] xs:h-[415px] sm:h-[425px]"
                >
                  <div className="space-y-2">
                    
                    {/* Artwork Image Frame with Uniform Symmetric Red Border */}
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#E7E0D2] bg-[#FAF8F3]">
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={artwork.image}
                          alt={artwork.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>

                      <div className="absolute inset-0 bg-[#1C1917]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#1C1917] text-xs font-bold shadow-md">
                          <Sparkles className="w-3.5 h-3.5 text-[#C87A38]" />
                          <span>VIEW DETAILS</span>
                        </div>
                      </div>
                    </div>

                    {/* Artwork Titles & Details */}
                    <div className="space-y-1 text-left">
                      <div className="flex items-center justify-between gap-2 h-6 sm:h-6.5">
                        <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1917] group-hover:text-[#C87A38] transition-colors truncate">
                          {artwork.title}
                        </h4>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-[#78716C] bg-[#FAF8F3] px-2 py-0.5 rounded border border-[#E7E0D2] shrink-0">
                          {artwork.dimensions}
                        </span>
                      </div>

                      <p className="text-[11px] sm:text-xs text-[#78716C] italic font-serif truncate h-4 sm:h-4.5 flex items-center">
                        {artwork.medium}
                      </p>

                      {/* 📍 BRIEF 2-3 LINES OF EQUAL LENGTH (UNIFORM COMPACT BOX) */}
                      {artwork.brief ? (
                        <div className="pt-1.5 border-t border-[#E7E0D2]/60 space-y-1">
                          <span className="text-[9px] font-bold tracking-widest text-[#C87A38] uppercase block">
                            ARTWORK BRIEF:
                          </span>
                          <div className="h-[52px] sm:h-[56px] bg-[#FAF8F3] p-2 rounded border border-[#E7E0D2]/80 flex items-center overflow-hidden">
                            <p className="text-[11px] sm:text-xs text-[#292524] font-medium leading-relaxed line-clamp-3">
                              {artwork.brief}
                            </p>
                          </div>
                        </div>
                      ) : null}

                    </div>

                  </div>

                  {/* Card Footer */}
                  <div className="pt-2 sm:pt-2.5 mt-auto border-t border-[#E7E0D2] flex items-center justify-between text-xs">
                    <span className="font-bold text-[#C87A38] text-[11px] sm:text-xs">
                      {artwork.price}
                    </span>
                    <div className="inline-flex items-center gap-1 text-[#1C1917] group-hover:text-[#C87A38] font-bold tracking-wider uppercase text-[10.5px] sm:text-[11px]">
                      <span>VIEW STORY</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Mobile Carousel Navigation Controls */}
          <div className="flex sm:hidden items-center justify-center gap-4 pt-2">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-[#1C1917]/85 text-white flex items-center justify-center border border-white/20 shadow-md active:scale-95 cursor-pointer"
              aria-label="Previous artwork"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-[11px] font-semibold text-[#78716C] uppercase tracking-wider">
              Swipe or Tap
            </span>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-[#1C1917]/85 text-white flex items-center justify-center border border-white/20 shadow-md active:scale-95 cursor-pointer"
              aria-label="Next artwork"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

      </div>
    </section>
  );
}
