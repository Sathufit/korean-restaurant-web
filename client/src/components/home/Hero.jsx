import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-deep-black overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
        {/* Top label - Mobile Responsive */}
        <div className={`inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="h-px w-8 sm:w-12 bg-gold"></div>
          <span className="text-gold text-xs font-body uppercase tracking-[0.2em] sm:tracking-[0.25em]">Melbourne</span>
          <div className="h-px w-8 sm:w-12 bg-gold"></div>
        </div>

        {/* Main heading - Mobile Responsive */}
        <h1 className={`transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-heading font-bold text-warm-white mb-4 sm:mb-6 tracking-tight leading-none">
            HanGuk Bites
          </div>
          <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-korean text-gold mb-6 sm:mb-8">
            한국의 맛
          </div>
        </h1>

        {/* Description - Mobile Responsive */}
        <p className={`text-base sm:text-lg text-warm-white/60 font-body max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          Authentic Korean cuisine in the heart of Melbourne.
          <br className="hidden sm:block"/>
          Where tradition meets excellence.
        </p>

        {/* CTA buttons - Enhanced with Better Touch Targets */}
        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 transition-all duration-700 delay-450 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Link 
            to="/reservations"
            className="min-h-[48px] px-8 sm:px-10 py-3 sm:py-4 bg-gold text-deep-black font-body font-medium uppercase tracking-wider text-sm hover:bg-gold/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation"
          >
            Book a Table
          </Link>
          <Link 
            to="/menu"
            className="min-h-[48px] px-8 sm:px-10 py-3 sm:py-4 border-2 border-warm-white/20 text-warm-white font-body font-medium uppercase tracking-wider text-sm hover:border-gold hover:text-gold hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation"
          >
            View Menu
          </Link>
        </div>

        {/* Stats - Mobile Responsive */}
        <div className={`mt-16 sm:mt-24 flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 lg:gap-16 transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center">
            <div className="text-2xl font-heading text-gold mb-1">10+</div>
            <div className="text-xs text-warm-white/40 uppercase tracking-wider">Years</div>
          </div>
          <div className="text-center sm:border-l sm:border-r border-warm-white/10 sm:px-12 lg:px-16">
            <div className="text-2xl font-heading text-gold mb-1">Authentic</div>
            <div className="text-xs text-warm-white/40 uppercase tracking-wider">Korean</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading text-gold mb-1">★★★</div>
            <div className="text-xs text-warm-white/40 uppercase tracking-wider">Rated</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
        <div className="w-6 h-10 border-2 border-warm-white/20 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-gold rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
