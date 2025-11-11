const Features = () => {
  const features = [
    {
      icon: '🔥',
      title: 'Premium BBQ',
      description: 'Table-side grilling with premium cuts of marinated meats.'
    },
    {
      icon: '🍜',
      title: 'Handmade Noodles',
      description: 'Traditional noodles crafted daily with time-honored techniques.'
    },
    {
      icon: '🍚',
      title: 'Authentic Flavors',
      description: 'Rice bowls and traditional dishes using regional Korean recipes.'
    },
    {
      icon: '🥘',
      title: 'Seasonal Specials',
      description: 'Rotating menu featuring seasonal ingredients and celebrations.'
    },
    {
      icon: '🍵',
      title: 'Traditional Drinks',
      description: 'Curated selection of Korean teas, soju, and makgeolli.'
    },
    {
      icon: '🍰',
      title: 'Korean Desserts',
      description: 'Sweet treats including bingsu, tteok, and modern pastries.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-deep-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Mobile Responsive */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 sm:gap-3">
            <div className="w-8 sm:w-12 h-px bg-gold"></div>
            <span className="text-gold font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase">What We Offer</span>
            <div className="w-8 sm:w-12 h-px bg-gold"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold leading-tight">
            <span className="text-warm-white">Culinary</span><br />
            <span className="text-gold">Excellence</span>
          </h2>
        </div>

        {/* Features Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-charcoal p-6 sm:p-8 lg:p-10 border border-gold/10 hover:border-gold/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-t-2 border-l-2 border-gold/30 group-hover:border-gold transition-colors duration-300"></div>
              <div className="absolute bottom-0 right-0 w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 border-b-2 border-r-2 border-gold/30 group-hover:border-gold transition-colors duration-300"></div>

              {/* Icon */}
              <div className="text-5xl sm:text-6xl lg:text-7xl mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 inline-block">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-warm-white mb-3 sm:mb-4 group-hover:text-gold transition-colors duration-300">
                {feature.title}
              </h3>
              
              {/* Underline */}
              <div className="w-10 sm:w-12 h-0.5 sm:h-1 bg-gold mb-3 sm:mb-4 transform origin-left group-hover:scale-x-150 transition-transform duration-300"></div>

              {/* Description */}
              <p className="text-warm-white/70 font-body text-sm sm:text-base leading-relaxed group-hover:text-warm-white/90 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
