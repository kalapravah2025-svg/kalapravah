import React, { useEffect, useState } from 'react';
import { 
  X, Sparkles, Feather, MessageSquare, Frame, ZoomIn, Image as ImageIcon 
} from 'lucide-react';

export default function ArtworkLightbox({ artwork, onClose, _onOpenCommission }) {
  const [viewMode, setViewMode] = useState('framed'); // 'framed' | 'scan' | 'room'

  // Reset to framed view on artwork change
  useEffect(() => {
    setViewMode('framed');
  }, [artwork?.id]);

  // Keyboard navigation & close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!artwork) return null;

  const isSimplePhoto = artwork.isWorkshop || artwork.styleCategory === 'Workshop Photo' || artwork.isPhotoOnly;

  if (isSimplePhoto) {
    return (
      <div 
        className="fixed inset-0 bg-[#1C1917]/90 backdrop-blur-md z-50 flex items-center justify-center p-3 xs:p-4 sm:p-6"
        onClick={onClose}
      >
        <div 
          className="relative max-w-5xl max-h-[92dvh] sm:max-h-[90vh] flex flex-col items-center justify-center select-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Floating Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:-top-12 sm:right-0 md:-right-10 w-11 h-11 rounded-full bg-[#1C1917]/90 text-white hover:bg-[#B94A2D] flex items-center justify-center transition-colors shadow-lg cursor-pointer z-50 border border-white/20"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Full Clean Image */}
          <div className="relative rounded-lg overflow-hidden border border-[#C4B9A3]/30 shadow-2xl bg-black/40">
            <img
              src={artwork.originalImage || artwork.image}
              alt={artwork.title || "Workshop photo"}
              className="max-h-[80vh] sm:max-h-[85vh] max-w-[92vw] sm:max-w-[85vw] w-auto h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  }

  const activeImageSrc = 
    viewMode === 'framed'
      ? (artwork.framedImage || artwork.originalImage || artwork.image)
      : viewMode === 'scan'
        ? (artwork.originalImage || artwork.image)
        : (artwork.image || artwork.originalImage);

  return (
    <div 
      className="fixed inset-0 bg-[#1C1917]/85 backdrop-blur-md z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 md:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF8F3] border border-[#C4B9A3] w-full max-w-5xl max-h-[92dvh] sm:max-h-[90vh] rounded-xl shadow-2xl overflow-y-auto relative my-auto flex flex-col touch-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-sm border-b border-[#E7E0D2] px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] xs:text-[11px] font-bold uppercase tracking-widest text-[#B94A2D] bg-[#B94A2D]/10 px-2.5 py-1 rounded">
              Artwork Details
            </span>
            <span className="hidden sm:inline text-xs text-[#78716C] font-mono truncate max-w-xs">
              • {artwork.title}
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full bg-[#1C1917] text-white hover:bg-[#B94A2D] flex items-center justify-center transition-colors shadow cursor-pointer active:scale-95"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-grow">
          
          {/* Left Column: Museum Gallery Presentation */}
          <div className="lg:col-span-6 p-2.5 xs:p-3 sm:p-5 md:p-6 bg-gradient-to-b from-[#F3EDE2] via-[#EFE8DC] to-[#E5DECE] flex flex-col justify-between items-center border-b lg:border-b-0 lg:border-r border-[#E7E0D2] relative select-none min-h-[260px] xs:min-h-[300px] sm:min-h-[420px] lg:min-h-[520px] overflow-hidden">
            
            {/* Subtle Gallery Overhead Spotlight Glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-4/5 h-44 bg-[#FFFDF5]/40 blur-2xl rounded-full pointer-events-none" />

            {/* View Mode Toggle Pill Bar */}
            <div className="relative z-20 flex items-center gap-1 bg-[#FAF8F3]/90 backdrop-blur-md p-1 rounded-full border border-[#D5CABB] shadow-sm mb-3">
              <button
                type="button"
                onClick={() => setViewMode('framed')}
                className={`px-3 py-1 text-[10px] xs:text-[11px] font-semibold tracking-wider uppercase rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'framed'
                    ? 'bg-[#1C1917] text-[#FAF8F3] shadow-sm'
                    : 'text-[#6B6560] hover:text-[#1C1917] hover:bg-black/5'
                }`}
              >
                <Frame className="w-3 h-3 text-[#C87A38]" />
                <span>Framed View</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('scan')}
                className={`px-3 py-1 text-[10px] xs:text-[11px] font-semibold tracking-wider uppercase rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'scan'
                    ? 'bg-[#1C1917] text-[#FAF8F3] shadow-sm'
                    : 'text-[#6B6560] hover:text-[#1C1917] hover:bg-black/5'
                }`}
              >
                <ZoomIn className="w-3 h-3 text-[#C87A38]" />
                <span>Authentic Canvas</span>
              </button>

              {artwork.image && (
                <button
                  type="button"
                  onClick={() => setViewMode('room')}
                  className={`hidden sm:flex px-3 py-1 text-[10px] xs:text-[11px] font-semibold tracking-wider uppercase rounded-full items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === 'room'
                      ? 'bg-[#1C1917] text-[#FAF8F3] shadow-sm'
                      : 'text-[#6B6560] hover:text-[#1C1917] hover:bg-black/5'
                  }`}
                >
                  <ImageIcon className="w-3 h-3 text-[#C87A38]" />
                  <span>Room Setting</span>
                </button>
              )}
            </div>

            {/* Artwork Display Container */}
            <div className="relative z-10 w-full flex-grow flex items-center justify-center p-1 sm:p-2">
              <img
                src={activeImageSrc}
                alt={`${artwork.title} - ${viewMode}`}
                className={`max-h-[36vh] xs:max-h-[42vh] sm:max-h-[54vh] lg:max-h-[66vh] w-auto max-w-full object-contain select-none pointer-events-none transition-all duration-300 ${
                  viewMode === 'framed'
                    ? 'rounded-sm drop-shadow-[0_16px_28px_rgba(28,25,23,0.30)]'
                    : viewMode === 'scan'
                      ? 'rounded shadow-md border border-[#C4B9A3]/50 bg-[#FFFDF9]'
                      : 'rounded-lg shadow-xl border border-[#C4B9A3]/60'
                }`}
              />
            </div>

            {/* Exhibition Subtitle Plaque */}
            <div className="relative z-10 mt-2 text-center">
              <span className="inline-block text-[10px] xs:text-[11px] text-[#78716C] font-mono tracking-wider bg-[#FAF8F3]/80 px-2.5 py-0.5 rounded-full border border-[#E7E0D2]">
                {viewMode === 'framed' && 'Handcrafted Walnut Moulding • Beveled Ivory Mat'}
                {viewMode === 'scan' && 'Authentic Handmade Paper Scan • Original Penwork'}
                {viewMode === 'room' && 'Gallery Wall Setting'}
              </span>
            </div>

          </div>

          {/* Right Column: Specifications & Story Details */}
          <div className="lg:col-span-6 p-3.5 xs:p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-5 text-left flex flex-col justify-between bg-[#FFFDF9] relative min-h-0">
            
            <div className="space-y-5 flex-grow flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#B94A2D] block">
                    {artwork.styleCategory || artwork.style || "Madhubani Folk Art"}
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
                    {artwork.title}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#78716C] font-mono mt-1">
                    Created {artwork.year || "2026"} • Artist: Rashmi Dhar
                  </p>
                </div>

                {/* Artwork Specifications Box */}
                <div className="bg-[#FAF8F3] border border-[#E7E0D2] rounded-md p-3 sm:p-4 text-xs space-y-2 shadow-sm">
                  <div className="flex justify-between py-1 border-b border-[#E7E0D2]/60">
                    <span className="text-[#78716C]">Year</span>
                    <span className="font-semibold text-[#1C1917]">{artwork.year || "2026"}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#E7E0D2]/60">
                    <span className="text-[#78716C]">Style</span>
                    <span className="font-semibold text-[#1C1917]">{artwork.styleCategory || artwork.style || "Madhubani Folk Art"}</span>
                  </div>
                  {artwork.dimensions && (
                    <div className="flex justify-between py-1 border-b border-[#E7E0D2]/60">
                      <span className="text-[#78716C]">Dimensions</span>
                      <span className="font-semibold text-[#1C1917]">{artwork.dimensions}</span>
                    </div>
                  )}
                  {artwork.medium && (
                    <div className="flex justify-between py-1 border-b border-[#E7E0D2]/60">
                      <span className="text-[#78716C]">Medium</span>
                      <span className="font-semibold text-[#1C1917] text-right max-w-[60%]">{artwork.medium}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 pt-1.5">
                    <span className="text-[#78716C]">Authenticity</span>
                    <span className="font-semibold text-[#1C1917] flex items-center gap-1">
                      <Feather className="w-3 h-3 text-[#B94A2D]" />
                      <span>Kalapravah Original • Signed by Rashmi Dhar</span>
                    </span>
                  </div>
                </div>

                {/* Story Paragraph */}
                {(artwork.story || artwork.fullStory || artwork.brief) && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#1C1917] flex items-center gap-1.5">
                      <Feather className="w-3.5 h-3.5 text-[#B94A2D]" />
                      <span>Cultural Story & Backstory</span>
                    </span>
                    <p className="text-xs sm:text-sm text-[#5C5652] leading-relaxed italic bg-[#FDFBF7] p-3 rounded border border-[#E7E0D2]/60">
                      {artwork.story || artwork.fullStory || artwork.brief}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons Container */}
              <div className="pt-4 sm:pt-6 pb-2 pb-safe space-y-2 border-t border-[#E7E0D2]">
                <button
                  onClick={() => {
                    const text = `Hello Rashmi,\n\nI am inquiring about the artwork: *${artwork.title}*\nStyle: ${artwork.styleCategory || artwork.style || 'Madhubani'}\nDimensions: ${artwork.dimensions || 'N/A'}\nMedium: ${artwork.medium || 'Natural pigments on handmade paper'}\n\nPlease let me know if this original is available.`;
                    window.open(`https://wa.me/919971399395?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
                    onClose();
                  }}
                  className="w-full min-h-[44px] py-3 px-4 bg-[#1C1917] hover:bg-[#B94A2D] text-white rounded-sm font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#C87A38]" />
                  <span>Inquire / Reserve Painting</span>
                </button>

                <button
                  onClick={() => {
                    const text = `Hello Rashmi,\n\nI am interested in commissioning a bespoke artwork inspired by: *${artwork.title}* (${artwork.styleCategory || artwork.style || 'Madhubani'}).\n\nPlease let me know how we can discuss sizing and details.`;
                    window.open(`https://wa.me/919971399395?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
                    onClose();
                  }}
                  className="w-full min-h-[44px] py-2.5 px-4 bg-transparent border border-[#C87A38] text-[#C87A38] hover:bg-[#C87A38]/10 rounded-sm font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Commission Similar Custom Artwork</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
