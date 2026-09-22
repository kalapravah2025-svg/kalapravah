import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Check, ArrowRight, BookOpen } from 'lucide-react';
import { BLOG_ARTICLES, ARTIST_FEATURE } from '../data/articles';
import Navbar from './Navbar';
import Footer from './Footer';
import MadhubaniFolkBackground from './MadhubaniFolkBackground';

export default function ArticlePage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  // Find article from dataset (either from blog articles or artist feature)
  const allContent = [ARTIST_FEATURE, ...BLOG_ARTICLES];
  const article = allContent.find(a => a.id === articleId) || BLOG_ARTICLES[0];

  // Dynamic SEO Meta Tags & Schema Injection
  useEffect(() => {
    if (!article) return;

    // 1. Update Document Title
    const originalTitle = document.title;
    document.title = `${article.title} | Kalapravah Folk Art Blog`;

    // 2. Meta Description Injection
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = article.excerpt || article.subtitle;

    // 3. Canonical Link Injection
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `https://www.kalapravah.in/blog/${article.id}`;

    // 4. Inject JSON-LD Schema for Google & AI Search Indexers
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://www.kalapravah.in/blog/${article.id}`
      },
      "headline": article.title,
      "description": article.excerpt || article.subtitle,
      "image": `https://www.kalapravah.in${article.image}`,
      "author": {
        "@type": "Person",
        "name": article.author || "Rashmi Dhar"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Kalapravah Madhubani Art Gallery",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.kalapravah.in/images/logo-emblem.png"
        }
      },
      "datePublished": article.date,
      "keywords": article.seoKeywords ? article.seoKeywords.join(", ") : "Madhubani art"
    };

    let scriptTag = document.getElementById('json-ld-article-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-article-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaData);

    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      document.title = originalTitle;
      if (scriptTag) scriptTag.remove();
    };
  }, [article]);

  // Smart related articles recommendation prioritizing same category
  const relatedArticles = React.useMemo(() => {
    const sameCategory = BLOG_ARTICLES.filter(a => a.id !== article.id && a.category === article.category);
    const others = BLOG_ARTICLES.filter(a => a.id !== article.id && a.category !== article.category);
    return [...sameCategory, ...others].slice(0, 3);
  }, [article.id, article.category]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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

      <article className="min-h-screen pt-24 sm:pt-28 pb-20 text-left relative z-10">
        
        {/* Top Navigation Bar & Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-3 pb-4 border-b border-[#E7E0D2]">
            
            {/* Back to Home / Blog link */}
            <button
              onClick={() => handleNavClick('blog')}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#1C1917] hover:text-[#C87A38] transition-colors cursor-pointer min-h-[36px]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>BACK TO KALAPRAVAH BLOG</span>
            </button>

            {/* Share Action */}
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFFDF9] border border-[#E7E0D2] text-xs font-semibold text-[#5C5652] hover:text-[#1C1917] hover:border-[#C87A38] transition-all shadow-sm cursor-pointer min-h-[36px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Link!' : 'Share Webpage'}</span>
            </button>

          </div>

          {/* Breadcrumb Trail */}
          <nav className="flex items-center gap-2 text-[11px] font-medium text-[#78716C] mt-3 sm:mt-4 uppercase tracking-wider">
            <span className="hover:text-[#1C1917] cursor-pointer" onClick={() => handleNavClick('home')}>Home</span>
            <span>/</span>
            <span className="hover:text-[#1C1917] cursor-pointer" onClick={() => handleNavClick('blog')}>Blog</span>
            <span>/</span>
            <span className="text-[#C87A38] font-semibold">{article.category || 'Article'}</span>
          </nav>
        </div>

        {/* Main Article Container */}
        <main className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          
          {/* Article Title & Subtitle Header */}
          <header className="space-y-3.5 sm:space-y-4">
            <span className="inline-block px-3 py-1 bg-[#1C1917]/80 backdrop-blur-md text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
              {article.category || 'BLOG ARTICLE'}
            </span>

            <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1917] leading-[1.15] tracking-tight">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-sm sm:text-lg lg:text-xl text-[#5C5652] font-normal leading-relaxed">
                {article.subtitle}
              </p>
            )}

            {/* Author & Publication Details */}
            <div className="flex flex-wrap items-center gap-3 xs:gap-4 sm:gap-6 pt-2.5 pb-4 text-xs font-semibold text-[#78716C] border-t border-b border-[#E7E0D2]">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#C87A38]" />
                <span>By {article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C87A38]" />
                <span>Published {article.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C87A38]" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </header>

          {/* Hero Featured Image */}
          {article.image && (
            <div className="relative aspect-[3/2] max-h-[500px] overflow-hidden rounded-2xl border border-[#E7E0D2] bg-[#FFFDF9] shadow-md">
              <img
                src={article.image}
                alt={article.title}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-[center_28%]"
              />
            </div>
          )}

          {/* Body HTML Content */}
          <div 
            className="prose prose-stone max-w-none text-[#44403C] text-base sm:text-lg leading-relaxed space-y-6 pt-2 font-light"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* CTA Box: Collection & Commission */}
          <section className="p-4 xs:p-5 sm:p-6 bg-[#FFFDF9] border border-[#E7E0D2] rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5 my-6 sm:my-8">
            <div className="space-y-1 flex-1 max-w-xl">
              <span className="text-[10px] font-bold tracking-widest text-[#C87A38] uppercase block">
                KALAPRAVAH FOLK ART GALLERY
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
                Acquire Original Madhubani Masterpieces
              </h3>
              <p className="text-xs sm:text-sm text-[#5C5652] leading-relaxed font-light">
                Hand-drawn on archival cotton paper using natural pigments. Inquire about available originals or commission a custom motif.
              </p>
            </div>

            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 shrink-0 w-full md:w-auto">
              <button
                onClick={() => handleNavClick('gallery')}
                className="w-full xs:w-auto px-4 py-2.5 rounded-lg border border-[#1C1917] text-xs font-semibold uppercase tracking-wider text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-all whitespace-nowrap cursor-pointer text-center min-h-[44px]"
              >
                Explore Artworks
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full xs:w-auto px-4 py-2.5 rounded-lg bg-[#1C1917] hover:bg-[#C87A38] text-white text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 cursor-pointer shadow-xs min-h-[44px]"
              >
                <span>Commission Custom Art</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>

          {/* Related Articles Navigation */}
          <section className="pt-10 border-t border-[#E7E0D2] space-y-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C87A38]" />
              <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
                More Articles from The Blog
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.id}`}
                  className="group cursor-pointer flex flex-col justify-between p-3.5 rounded-2xl bg-[#FFFDF9]/60 hover:bg-[#FFFDF9] border border-[#E7E0D2]/50 hover:border-[#E7E0D2] transition-all"
                >
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-3 bg-[#FAF8F3]">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="font-serif text-sm font-normal text-[#1C1917] group-hover:text-[#C87A38] transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                  </div>

                  <span className="text-[10px] font-semibold tracking-wider text-[#78716C] uppercase pt-2 border-t border-[#E7E0D2]/50">
                    {rel.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </section>

        </main>

      </article>

      {/* Footer */}
      <Footer onNavigate={handleNavClick} />

    </div>
  );
}
