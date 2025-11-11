const About = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-warm-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          
          {/* Image Side - Mobile Responsive */}
          <div className="relative group order-2 lg:order-1">
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-charcoal/10 to-gold/10 overflow-hidden shadow-xl">
              {/* Placeholder for restaurant image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-deep-black/5 to-gold/5">
                <div className="text-center p-6 sm:p-8 transform group-hover:scale-105 transition-transform duration-500">
                  <div className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6">🏮</div>
                  <p className="text-charcoal/60 font-body text-xs sm:text-sm tracking-wider uppercase">Restaurant Interior</p>
                </div>
              </div>
              
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-gold"></div>
              <div className="absolute bottom-0 right-0 w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-gold"></div>
            </div>
            
            {/* Floating badge - Adjusted for mobile */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-8 bg-gold p-6 sm:p-8 shadow-xl transform group-hover:rotate-6 transition-transform duration-500">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-heading font-bold text-deep-black">10+</div>
                <div className="text-xs text-deep-black/80 font-body tracking-wider uppercase">Years</div>
              </div>
            </div>
          </div>

          {/* Content Side - Mobile Responsive */}
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            {/* Section label */}
            <div className="inline-flex items-center gap-2 sm:gap-3">
              <div className="w-8 sm:w-12 h-px bg-gold"></div>
              <span className="text-gold font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase">Our Story</span>
            </div>

            {/* Main heading - Mobile Responsive */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-charcoal leading-tight mb-4 sm:mb-6">
                A Journey Through{' '}
                <span className="text-gold">Korean Flavors</span>
              </h2>
              
              {/* Decorative line */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-gold"></div>
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gold rounded-full"></div>
              </div>
            </div>

            {/* Content - Mobile Responsive */}
            <div className="space-y-4 sm:space-y-6 text-charcoal/80 font-body leading-relaxed text-base sm:text-lg">
              <p>
                In the heart of Melbourne, <span className="font-semibold text-gold">HanGuk Bites</span> brings the essence of Korean culinary 
                tradition to life. Our name, <span className="font-korean text-lg sm:text-xl">한국</span> (HanGuk), meaning Korea, reflects our 
                commitment to authenticity and cultural heritage.
              </p>
              <p>
                Every dish tells a story—from the <span className="font-semibold">sizzling BBQ</span> that brings families together, 
                to the comforting warmth of <span className="font-semibold">handmade noodles</span>. We honor centuries-old recipes 
                while embracing modern refinement.
              </p>
              <p className="hidden sm:block">
                Our ingredients are carefully sourced, our techniques time-honored, and our 
                passion unwavering. We invite you to experience Korea through every bite.
              </p>
            </div>

            {/* Stats - Mobile Responsive */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-charcoal/10">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gold mb-1 sm:mb-2">10+</div>
                <div className="text-xs sm:text-sm text-charcoal/60 font-body uppercase tracking-wide">Years</div>
              </div>
              <div className="text-center border-x border-charcoal/10">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gold mb-1 sm:mb-2">50+</div>
                <div className="text-xs sm:text-sm text-charcoal/60 font-body uppercase tracking-wide">Dishes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gold mb-1 sm:mb-2">100%</div>
                <div className="text-xs sm:text-sm text-charcoal/60 font-body uppercase tracking-wide">Authentic</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
