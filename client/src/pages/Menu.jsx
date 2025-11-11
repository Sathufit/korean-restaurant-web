import { useState } from 'react';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'bbq', name: 'BBQ', icon: '🔥' },
    { id: 'noodles', name: 'Noodles', icon: '🍜' },
    { id: 'rice', name: 'Rice', icon: '🍚' },
    { id: 'drinks', name: 'Drinks', icon: '🍵' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' }
  ];

  const menuItems = [
    // BBQ
    {
      category: 'bbq',
      name: 'Galbi (갈비)',
      nameKorean: '소갈비구이',
      description: 'Premium marinated beef short ribs, grilled to perfection',
      price: 48
    },
    {
      category: 'bbq',
      name: 'Bulgogi (불고기)',
      nameKorean: '불고기',
      description: 'Thinly sliced marinated beef with sweet soy glaze',
      price: 42
    },
    {
      category: 'bbq',
      name: 'Samgyeopsal (삼겹살)',
      nameKorean: '삼겹살',
      description: 'Thick-cut pork belly, served with traditional accompaniments',
      price: 38
    },
    {
      category: 'bbq',
      name: 'Dak Galbi (닭갈비)',
      nameKorean: '닭갈비',
      description: 'Spicy stir-fried chicken with vegetables and rice cake',
      price: 36
    },
    // Noodles
    {
      category: 'noodles',
      name: 'Japchae (잡채)',
      nameKorean: '잡채',
      description: 'Stir-fried glass noodles with vegetables and beef',
      price: 28
    },
    {
      category: 'noodles',
      name: 'Jajangmyeon (짜장면)',
      nameKorean: '짜장면',
      description: 'Black bean sauce noodles with pork and vegetables',
      price: 24
    },
    {
      category: 'noodles',
      name: 'Naengmyeon (냉면)',
      nameKorean: '냉면',
      description: 'Cold buckwheat noodles in refreshing broth',
      price: 26
    },
    {
      category: 'noodles',
      name: 'Ramyeon (라면)',
      nameKorean: '한국식 라면',
      description: 'Korean-style ramen with vegetables and egg',
      price: 18
    },
    // Rice
    {
      category: 'rice',
      name: 'Bibimbap (비빔밥)',
      nameKorean: '비빔밥',
      description: 'Mixed rice bowl with vegetables, egg, and gochujang',
      price: 26
    },
    {
      category: 'rice',
      name: 'Dolsot Bibimbap (돌솥비빔밥)',
      nameKorean: '돌솥비빔밥',
      description: 'Sizzling stone pot bibimbap with crispy rice',
      price: 30
    },
    {
      category: 'rice',
      name: 'Kimchi Bokkeumbap (김치볶음밥)',
      nameKorean: '김치볶음밥',
      description: 'Kimchi fried rice with pork and vegetables',
      price: 22
    },
    {
      category: 'rice',
      name: 'Haemul Bokkeum Bap (해물볶음밥)',
      nameKorean: '해물볶음밥',
      description: 'Seafood fried rice with mixed vegetables',
      price: 28
    },
    // Drinks
    {
      category: 'drinks',
      name: 'Soju',
      nameKorean: '소주',
      description: 'Traditional Korean spirit - Original or Flavored',
      price: 12
    },
    {
      category: 'drinks',
      name: 'Makgeolli (막걸리)',
      nameKorean: '막걸리',
      description: 'Traditional rice wine, lightly sparkling',
      price: 14
    },
    {
      category: 'drinks',
      name: 'Boricha (보리차)',
      nameKorean: '보리차',
      description: 'Roasted barley tea, served hot or cold',
      price: 6
    },
    {
      category: 'drinks',
      name: 'Yujacha (유자차)',
      nameKorean: '유자차',
      description: 'Citron honey tea, refreshing and sweet',
      price: 8
    },
    // Desserts
    {
      category: 'desserts',
      name: 'Bingsu (빙수)',
      nameKorean: '빙수',
      description: 'Shaved ice with red beans, fruit, and condensed milk',
      price: 16
    },
    {
      category: 'desserts',
      name: 'Hodugwaja (호두과자)',
      nameKorean: '호두과자',
      description: 'Walnut cookies filled with sweet red bean paste',
      price: 10
    },
    {
      category: 'desserts',
      name: 'Tteok (떡)',
      nameKorean: '떡',
      description: 'Assorted rice cakes with various fillings',
      price: 12
    },
    {
      category: 'desserts',
      name: 'Hotteok (호떡)',
      nameKorean: '호떡',
      description: 'Sweet filled pancake with cinnamon and brown sugar',
      price: 10
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header - Mobile Responsive */}
      <div className="bg-deep-black text-warm-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 sm:w-12 h-px bg-gold"></div>
            <span className="text-gold font-body text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase">Our Menu</span>
            <div className="w-8 sm:w-12 h-px bg-gold"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6">
            Authentic Cuisine
          </h1>
          
          <p className="text-warm-white/70 font-body text-base sm:text-lg max-w-2xl mx-auto">
            Each dish is crafted with traditional techniques and the finest ingredients
          </p>
        </div>
      </div>

      {/* Category Filter - Mobile Responsive */}
      <div className="sticky top-16 sm:top-20 z-40 bg-warm-white/95 backdrop-blur-xl border-b border-gold/20 shadow-md py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 font-body text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gold text-white shadow-md'
                    : 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10 border border-charcoal/10'
                }`}
              >
                <span className="text-lg sm:text-xl mr-1 sm:mr-2">{category.icon}</span>
                <span className="uppercase tracking-wider">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items - Mobile Responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="group bg-white p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-charcoal/10 hover:border-gold/50"
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-l-2 border-gold/20 group-hover:border-gold transition-colors duration-300"></div>
              <div className="absolute bottom-0 right-0 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-r-2 border-gold/20 group-hover:border-gold transition-colors duration-300"></div>
              
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-charcoal group-hover:text-gold transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-sm sm:text-base text-charcoal/60 font-korean mt-1 sm:mt-2">
                    {item.nameKorean}
                  </p>
                </div>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-gold ml-4">
                  ${item.price}
                </div>
              </div>
              
              <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-gold mb-3 sm:mb-4"></div>
              
              <p className="text-charcoal/70 font-body text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Note Section - Mobile Responsive */}
      <div className="bg-deep-black text-warm-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-charcoal/50 border border-gold/20 px-6 sm:px-8 py-4 sm:py-6">
            <p className="font-body text-xs sm:text-sm text-warm-white/70 leading-relaxed">
              <span className="text-gold font-semibold">Note:</span> Prices are in AUD. Menu items subject to change.
              <br className="hidden sm:block" />
              Please inform our staff of any dietary requirements or allergies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
