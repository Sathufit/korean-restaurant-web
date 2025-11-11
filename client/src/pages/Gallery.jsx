import { useState } from 'react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header - Mobile Responsive */}
      <div className="bg-deep-black text-warm-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-px bg-gold"></div>
            <span className="text-gold font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase">Gallery</span>
            <div className="w-8 sm:w-12 h-px bg-gold"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6">
            Visual Journey
          </h1>
          
          <p className="text-warm-white/70 font-body text-base sm:text-lg max-w-2xl mx-auto">
            Experience the ambiance and artistry of HanGuk Bites
          </p>
        </div>
      </div>

      {/* Gallery Grid - Mobile Responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(item)}
              className="group relative aspect-square bg-charcoal/5 overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 border border-charcoal/10 hover:border-gold/50 transform hover:scale-[1.02]"
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-l-2 border-gold/30 z-10"></div>
              <div className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-r-2 border-gold/30 z-10"></div>

              {/* Placeholder Image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-charcoal/10 to-gold/10">
                <span className="text-6xl sm:text-7xl lg:text-8xl group-hover:scale-110 transition-transform duration-300">
                  {item.placeholder}
                </span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 sm:p-6 w-full">
                  <span className="inline-block px-3 py-1 bg-gold text-deep-black text-xs font-body font-semibold uppercase mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-heading font-bold text-warm-white mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <div className="w-8 sm:w-12 h-0.5 bg-gold mb-2"></div>
                  <p className="text-xs sm:text-sm text-warm-white/80 font-body">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal - Mobile Responsive */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-deep-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full bg-warm-white p-6 sm:p-8 lg:p-10 shadow-xl"
               onClick={(e) => e.stopPropagation()}>
            
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-charcoal/10 hover:bg-gold text-charcoal hover:text-white flex items-center justify-center text-2xl sm:text-3xl transition-all duration-300"
            >
              ×
            </button>
            
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-gold"></div>
            <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-gold"></div>
            
            <div className="aspect-video bg-gradient-to-br from-charcoal/10 to-gold/10 flex items-center justify-center mb-6 sm:mb-8 border-2 border-gold/20">
              <span className="text-7xl sm:text-8xl lg:text-9xl">{selectedImage.placeholder}</span>
            </div>
            
            <div>
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-gold text-deep-black text-xs font-body font-semibold uppercase mb-3 sm:mb-4">
                {selectedImage.category}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-charcoal mb-2 sm:mb-3">
                {selectedImage.title}
              </h3>
              <div className="w-16 sm:w-20 h-0.5 sm:h-1 bg-gold mb-3 sm:mb-4"></div>
              <p className="text-charcoal/70 font-body text-base sm:text-lg">
                {selectedImage.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Note - Mobile Responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20 text-center">
        <div className="inline-block bg-charcoal/5 border border-gold/20 px-6 sm:px-8 py-3 sm:py-4">
          <p className="text-xs sm:text-sm text-charcoal/60 font-body">
            <span className="text-gold font-semibold">Note:</span> All images are placeholders. Replace with actual photography.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
