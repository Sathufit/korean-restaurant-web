import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-deep-black/95 backdrop-blur-xl shadow-luxury border-b border-gold/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo - More elegant */}
          <Link to="/" className="group flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gold to-accent-red blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2 px-4 py-2 bg-deep-black border border-gold/30">
                <span className="text-3xl font-korean font-bold text-gold">한국</span>
                <div className="w-px h-8 bg-gold/30"></div>
                <div className="flex flex-col">
                  <span className="text-xl font-heading font-bold text-warm-white leading-none">HanGuk</span>
                  <span className="text-xs font-body text-gold tracking-widest">BITES</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-6 py-2 font-body text-sm tracking-wide transition-all duration-300 group ${
                  isActive(link.path)
                    ? 'text-gold'
                    : 'text-warm-white hover:text-gold'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-accent-red transform origin-left transition-transform duration-300 ${
                  isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/reservations"
              className="group relative px-8 py-3 bg-gradient-to-r from-gold to-accent-red text-deep-black font-body font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:shadow-gold hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Reserve Table
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 text-warm-white focus:outline-none group"
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1.5">
              <span className={`block w-6 h-0.5 bg-gold transform transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`block w-6 h-0.5 bg-gold transform transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-500 ease-out ${
        isOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-deep-black/98 backdrop-blur-xl border-t border-gold/10">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-6 py-4 font-body text-base transition-all duration-300 border-l-4 ${
                  isActive(link.path)
                    ? 'border-gold text-gold bg-gold/5'
                    : 'border-transparent text-warm-white hover:border-gold hover:bg-gold/5 hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/reservations"
              onClick={() => setIsOpen(false)}
              className="block px-6 py-4 mt-4 text-center bg-gradient-to-r from-gold to-accent-red text-deep-black font-body font-semibold hover:shadow-gold transition-all duration-300"
            >
              Reserve Your Table
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
