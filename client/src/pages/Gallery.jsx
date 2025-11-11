import { useState, useEffect } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const galleryItems = [
    {
      category: 'Restaurant',
      title: 'Main Dining Hall',
      description: 'Elegant seating with traditional Korean accents',
      placeholder: '🏮'
    },
    {
      category: 'Food',
      title: 'Galbi BBQ',
      description: 'Premium beef short ribs on the grill',
      placeholder: '🥩'
    },
    {
      category: 'Restaurant',
      title: 'Private Room',
      description: 'Intimate dining experience for special occasions',
      placeholder: '🪔'
    },
    {
      category: 'Food',
      title: 'Bibimbap',
      description: 'Colorful rice bowl with fresh vegetables',
      placeholder: '🍚'
    },
    {
      category: 'Food',
      title: 'Fresh Ingredients',
      description: 'Locally sourced vegetables and premium meats',
      placeholder: '🥬'
    },
    {
      category: 'Restaurant',
      title: 'Bar Area',
      description: 'Curated selection of Korean spirits',
      placeholder: '🍶'
    },
    {
      category: 'Food',
      title: 'Japchae',
      description: 'Glass noodles with colorful vegetables',
      placeholder: '🍜'
    },
    {
      category: 'Restaurant',
      title: 'Entrance',
      description: 'Traditional Korean welcome',
      placeholder: '🎎'
    },
    {
      category: 'Food',
      title: 'Bingsu Dessert',
      description: 'Shaved ice with sweet toppings',
      placeholder: '🧊'
    },
    {
      category: 'Restaurant',
      title: 'Kitchen',
      description: 'Where tradition meets culinary excellence',
      placeholder: '👨‍🍳'
    },
    {
      category: 'Food',
      title: 'Banchan',
      description: 'Traditional Korean side dishes',
      placeholder: '🥘'
    },
    {
      category: 'Restaurant',
      title: 'Night Ambience',
      description: 'Warm lighting and cozy atmosphere',
      placeholder: '✨'
    }
  ];

  const categories = ['All', 'Food', 'Restaurant'];
  const filteredItems = filter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header - Enhanced Animation */}
      <div className="bg-deep-black text-warm-white py-20 sm:py-24 lg:py-28 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 animate-pulse-slow" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`inline-flex items-center gap-3 mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="w-12 h-px bg-gold"></div>
            <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">Gallery</span>
            <div className="w-12 h-px bg-gold"></div>
          </div>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Visual Journey
          </h1>
          
          <p className={`text-warm-white/70 font-body text-base sm:text-lg max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Experience the ambiance and artistry of HanGuk Bites
          </p>
        </div>
      </div>

      {/* Filter Buttons - Mobile Optimized */}
      <div className="sticky top-20 z-40 bg-warm-white/95 backdrop-blur-md shadow-md border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`flex-shrink-0 px-6 py-3 font-body text-sm font-semibold uppercase tracking-wider 
                          transition-all duration-300 transform active:scale-95 min-h-[48px]
                          ${filter === category
                            ? 'bg-gold text-deep-black shadow-lg'
                            : 'bg-white text-charcoal hover:bg-charcoal/5 border-2 border-charcoal/10 hover:border-gold/50'
                          }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid - Enhanced with Stagger Animation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(item)}
              style={{ animationDelay: `${index * 50}ms` }}
              className="group relative aspect-square bg-charcoal/5 overflow-hidden cursor-pointer 
                       shadow-lg hover:shadow-2xl transition-all duration-500 
                       border-2 border-charcoal/10 hover:border-gold/50 
                       transform hover:scale-[1.03] active:scale-[0.98]
                       animate-fade-in"
            >
              {/* Corner decorations - Enhanced */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40 
                            group-hover:border-gold transition-all duration-300 z-10 
                            group-hover:w-12 group-hover:h-12"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/40 
                            group-hover:border-gold transition-all duration-300 z-10
                            group-hover:w-12 group-hover:h-12"></div>

              {/* Placeholder Image with zoom effect */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-charcoal/10 to-gold/10
                            group-hover:scale-110 transition-transform duration-700">
                <span className="text-7xl sm:text-8xl lg:text-9xl 
                               transform group-hover:scale-125 group-hover:rotate-6
                               transition-all duration-500">
                  {item.placeholder}
                </span>
              </div>

              {/* Overlay - Smoother transition */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/95 via-deep-black/60 to-transparent 
                            opacity-0 group-hover:opacity-100 
                            transition-all duration-500 ease-out
                            flex items-end">
                <div className="p-5 sm:p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1.5 bg-gold text-deep-black text-xs font-body font-bold uppercase mb-2
                                 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    {item.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-warm-white mb-2">
                    {item.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-gold mb-2 transform scale-x-0 group-hover:scale-x-100 
                                transition-transform duration-500 origin-left"></div>
                  <p className="text-sm text-warm-white/90 font-body">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Tap indicator for mobile */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-gold/20 rounded-full 
                            flex items-center justify-center backdrop-blur-sm
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300
                            sm:hidden">
                <span className="text-gold text-xl">👆</span>
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-charcoal/60 font-body text-lg">No items found in this category</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal - Enhanced Mobile Experience */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-deep-black/97 backdrop-blur-md 
                   flex items-center justify-center p-4 sm:p-6 
                   animate-fade-in overflow-y-auto"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full bg-warm-white shadow-2xl
                        transform transition-all duration-500 animate-slide-in-right
                        max-h-[90vh] overflow-y-auto"
               onClick={(e) => e.stopPropagation()}>
            
            {/* Close button - Enhanced */}
            <button
              onClick={() => setSelectedImage(null)}
              className="sticky top-4 right-4 float-right z-10
                       w-12 h-12 sm:w-14 sm:h-14 
                       bg-charcoal/90 hover:bg-gold 
                       text-warm-white hover:text-deep-black 
                       flex items-center justify-center 
                       text-3xl sm:text-4xl font-light
                       transition-all duration-300 
                       transform hover:rotate-90 hover:scale-110 active:scale-95
                       shadow-lg"
              aria-label="Close modal"
            >
              ×
            </button>
            
            <div className="p-6 sm:p-8 lg:p-12">
              {/* Corner decorations - Animated */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-gold
                            animate-fade-in"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-gold
                            animate-fade-in"></div>
              
              {/* Image container with zoom effect */}
              <div className="aspect-video bg-gradient-to-br from-charcoal/10 to-gold/10 
                            flex items-center justify-center mb-6 sm:mb-8 
                            border-2 border-gold/30 overflow-hidden
                            transform hover:scale-[1.02] transition-transform duration-500">
                <span className="text-8xl sm:text-9xl lg:text-[12rem] 
                               transform hover:scale-110 transition-transform duration-700">
                  {selectedImage.placeholder}
                </span>
              </div>
              
              {/* Content - Enhanced typography */}
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-gold text-deep-black 
                               text-xs sm:text-sm font-body font-bold uppercase 
                               shadow-md">
                  {selectedImage.category}
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-charcoal 
                             leading-tight">
                  {selectedImage.title}
                </h3>
                <div className="w-20 h-1 bg-gold"></div>
                <p className="text-charcoal/80 font-body text-lg sm:text-xl leading-relaxed">
                  {selectedImage.description}
                </p>
              </div>

              {/* Swipe indicator for mobile */}
              <div className="mt-8 text-center sm:hidden">
                <p className="text-charcoal/40 text-sm font-body flex items-center justify-center gap-2">
                  <span>←</span> Swipe to close <span>→</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note - Enhanced Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 text-center">
        <div className="inline-block bg-white border-2 border-gold/30 px-8 py-4 shadow-lg
                      hover:shadow-xl hover:border-gold/50 transition-all duration-300
                      transform hover:-translate-y-1">
          <p className="text-sm text-charcoal/70 font-body flex items-center gap-2 justify-center">
            <span className="text-gold text-lg">ℹ️</span>
            <span><span className="text-gold font-bold">Note:</span> All images are placeholders. Replace with actual photography.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Add CSS for hiding scrollbar
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}

export default Gallery;
