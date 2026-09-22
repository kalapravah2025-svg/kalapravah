import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BLOG_ARTICLES } from '../data/articles';
import Navbar from './Navbar';
import Footer from './Footer';
import MadhubaniFolkBackground from './MadhubaniFolkBackground';

export default function BlogIndexPage() {
  const navigate = useNavigate();

  // Dynamic SEO Meta Tags & Schema Injection
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Kalapravah Blog | Madhubani Art History, Techniques & Motif Guides';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = 'Explore the complete Kalapravah journal: in-depth articles on Madhubani art history, 5 core styles, natural pigments, and sacred Madhubani symbolism.';

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = 'https://www.kalapravah.in/blog';

    // Inject JSON-LD Schema for Blog Index
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.kalapravah.in/blog"
      },
      "name": "Kalapravah Folk Art Journal & Blog",
      "description": "Authentic research, guides, and stories on traditional Madhubani art by Rashmi Dhar.",
      "publisher": {
        "@type": "Organization",
        "name": "Kalapravah Madhubani Art Gallery",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.kalapravah.in/images/logo-emblem.png"
        }
      }
    };

    let scriptTag = document.getElementById('json-ld-blog-index-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-blog-index-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaData);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = originalTitle;
      if (scriptTag) scriptTag.remove();
    };
  }, []);

  const handleNavClick = (sectionId) => {
    navigate('/', { state: { scrollTo: sectionId } });
  };

  return (
    <div className="min-h-screen bg-transparent font-sans selection:bg-[#C87A38] selection:text-white text-[#44403C] relative">
      
      {/* Background Canvas Texture */}
      <MadhubaniFolkBackground />

      {/* Header Navigation */}
      <Navbar
        activeSection="blog"
        setActiveSection={handleNavClick}
      />

      <main className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 text-left relative z-10">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-5 sm:space-y-8">
          
          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-2 text-[11px] font-medium text-[#78716C] uppercase tracking-wider">
            <span className="hover:text-[#1C1917] cursor-pointer" onClick={() => handleNavClick('home')}>Home</span>
            <span>/</span>
            <span className="text-[#C87A38] font-semibold">Blog Archive</span>
          </nav>

          {/* Main Banner Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2.5">
            <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1917] tracking-tight">
              THE KALAPRAVAH BLOG
            </h1>

            <p className="text-xs xs:text-sm sm:text-base text-[#5C5652] leading-relaxed max-w-2xl mx-auto font-light">
              Explore our complete collection of heritage articles, pigment guides, traditional line art styles, and motif symbolism.
            </p>

            <div className="w-20 h-[2px] bg-[#C87A38] mx-auto rounded-full mt-2" />
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8">
            {BLOG_ARTICLES.map((article) => (
              <Link
                key={article.id}
                to={`/blog/${article.id}`}
                className="group cursor-pointer text-left flex flex-col justify-between transition-all p-3.5 xs:p-4 rounded-2xl bg-[#FFFDF9]/80 hover:bg-[#FFFDF9] border border-transparent hover:border-[#E7E0D2] shadow-xs hover:shadow-md block"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-500 bg-[#FAF8F3]">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute bottom-2.5 left-2.5 bg-[#1C1917]/85 backdrop-blur-md text-white text-[9px] font-semibold px-2.5 py-1 rounded-full tracking-wider uppercase">
                      {article.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-normal text-[#1C1917] leading-snug group-hover:text-[#C87A38] transition-colors mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C5652] leading-relaxed mb-4 line-clamp-3 font-light">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7E0D2]/60 flex items-center justify-between text-[10px] font-semibold text-[#78716C] tracking-wider uppercase">
                  <span>{article.date}</span>
                  <span className="flex items-center gap-1 group-hover:text-[#C87A38] transition-colors">
                    {article.readTime}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavClick} />

    </div>
  );
}
