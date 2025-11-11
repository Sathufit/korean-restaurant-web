import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-deep-black/95 backdrop-blur-lg shadow-lg' 
        : 'bg-deep-black/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-heading font-bold text-warm-white group-hover:text-gold transition-colors duration-300">
              HanGuk
            </span>
            <span className="text-2xl font-heading font-bold text-gold">Bites</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-body text-sm uppercase tracking-wider transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-gold font-semibold'
                    : 'text-warm-white hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/reservations"
              className="px-6 py-2.5 bg-gold text-deep-black font-body text-sm font-semibold uppercase tracking-wider hover:bg-gold/90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Reserve
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-warm-white hover:text-gold transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-deep-black/98 backdrop-blur-lg border-t border-warm-white/10">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block font-body text-sm uppercase tracking-wider transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-gold'
                    : 'text-warm-white hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/reservations"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-6 py-3 bg-gold text-deep-black font-body text-sm font-medium uppercase tracking-wider"
            >
              Reserve Table
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
