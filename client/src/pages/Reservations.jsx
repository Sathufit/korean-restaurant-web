import { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl, logger, RESTAURANT_CONFIG } from '../utils/config';

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Convert guests to integer before sending
      const bookingData = {
        ...formData,
        guests: parseInt(formData.guests, 10)
      };
      
      logger.log('📤 Sending booking data:', bookingData);
      
      const response = await axios.post(getApiUrl('/bookings'), bookingData);
      
      logger.log('✅ Booking response:', response.data);
      
      setStatus({
        type: 'success',
        message: 'Reservation submitted successfully! We will contact you shortly to confirm.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        specialRequests: ''
      });
    } catch (error) {
      logger.error('❌ Booking error:', error.response?.data);
      setStatus({
        type: 'error',
        message: error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Failed to submit reservation. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header - Enhanced Animation */}
      <div className="bg-deep-black text-warm-white py-20 sm:py-24 lg:py-28 relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 animate-pulse-slow" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Animated decorative line */}
          <div className={`inline-flex items-center gap-3 mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="w-12 h-px bg-gold"></div>
            <span className="text-gold font-body text-sm tracking-[0.3em] uppercase">Reservations</span>
            <div className="w-12 h-px bg-gold"></div>
          </div>
          
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6 transition-all duration-700 delay-150 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Reserve Your Table
          </h1>
          <p className={`text-warm-white/70 font-body text-base sm:text-lg max-w-2xl mx-auto transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            Book your table and prepare for an unforgettable Korean dining experience
          </p>
        </div>
      </div>

      {/* Form Section - Enhanced Mobile UX */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className={`bg-white shadow-lg hover:shadow-xl transition-shadow duration-500 p-6 sm:p-8 lg:p-12 border border-charcoal/5 ${
          isVisible ? 'animate-fade-in' : ''
        }`}>
          
          {/* Status Messages - Enhanced with animation */}
          {status.message && (
            <div className={`mb-6 p-4 sm:p-5 animate-slide-in-right rounded-md ${
              status.type === 'success' 
                ? 'bg-green-50 border-l-4 border-green-500 text-green-800 shadow-sm' 
                : 'bg-red-50 border-l-4 border-red-500 text-red-800 shadow-sm'
            }`}>
              <div className="flex items-center">
                {status.type === 'success' ? (
                  <svg className="w-6 h-6 mr-3 animate-bounce-slow flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
                <p className="font-body text-sm sm:text-base font-medium">{status.message}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Name & Email - Enhanced Mobile Touch Targets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-body font-semibold text-charcoal mb-2 transition-colors group-focus-within:text-gold">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 text-base border-2 border-charcoal/20 rounded-none
                           focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 
                           font-body transition-all duration-300 
                           hover:border-charcoal/30 active:scale-[0.99]
                           min-h-[48px] bg-white"
                  placeholder="John Doe"
                />
              </div>

              <div className="group">
                <label htmlFor="email" className="block text-sm font-body font-semibold text-charcoal mb-2 transition-colors group-focus-within:text-gold">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 text-base border-2 border-charcoal/20 rounded-none
                           focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 
                           font-body transition-all duration-300 
                           hover:border-charcoal/30 active:scale-[0.99]
                           min-h-[48px] bg-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Phone & Guests - Enhanced Mobile Touch Targets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div className="group">
                <label htmlFor="phone" className="block text-sm font-body font-semibold text-charcoal mb-2 transition-colors group-focus-within:text-gold">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 text-base border-2 border-charcoal/20 rounded-none
                           focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 
                           font-body transition-all duration-300 
                           hover:border-charcoal/30 active:scale-[0.99]
                           min-h-[48px] bg-white"
                  placeholder="+61 400 000 000"
                />
              </div>

              <div className="group">
                <label htmlFor="guests" className="block text-sm font-body font-semibold text-charcoal mb-2 transition-colors group-focus-within:text-gold">
                  Number of Guests *
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 text-base border-2 border-charcoal/20 rounded-none
                           focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 
                           font-body transition-all duration-300 
                           hover:border-charcoal/30 active:scale-[0.99]
                           min-h-[48px] bg-white appearance-none cursor-pointer
                           bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkw4IDEwTDEyIDYiIHN0cm9rZT0iIzFDMUMxQyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] 
                           bg-no-repeat bg-[center_right_1rem]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time - Enhanced Mobile Touch Targets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div className="group">
                <label htmlFor="date" className="block text-sm font-body font-semibold text-charcoal mb-2 transition-colors group-focus-within:text-gold">
                  Date *
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={getMinDate()}
                  required
                  className="w-full px-4 py-4 text-base border-2 border-charcoal/20 rounded-none
                           focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 
                           font-body transition-all duration-300 
                           hover:border-charcoal/30 active:scale-[0.99]
                           min-h-[48px] bg-white"
                />
              </div>

              <div className="group">
                <label htmlFor="time" className="block text-sm font-body font-semibold text-charcoal mb-2 transition-colors group-focus-within:text-gold">
                  Time *
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 text-base border-2 border-charcoal/20 rounded-none
                           focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 
                           font-body transition-all duration-300 
                           hover:border-charcoal/30 active:scale-[0.99]
                           min-h-[48px] bg-white appearance-none cursor-pointer
                           bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNkw4IDEwTDEyIDYiIHN0cm9rZT0iIzFDMUMxQyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] 
                           bg-no-repeat bg-[center_right_1rem]"
                >
                  <option value="">Select a time</option>
                  {RESTAURANT_CONFIG.TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Special Requests - Enhanced */}
            <div className="group">
              <label htmlFor="specialRequests" className="block text-sm font-body font-semibold text-charcoal mb-2 transition-colors group-focus-within:text-gold">
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-4 text-base border-2 border-charcoal/20 rounded-none
                         focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 
                         font-body resize-none transition-all duration-300 
                         hover:border-charcoal/30 
                         min-h-[100px] bg-white"
                placeholder="Any dietary restrictions, allergies, or special occasions?"
              ></textarea>
            </div>

            {/* Submit Button - Enhanced with Loading Animation */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative w-full py-5 sm:py-6 font-body font-bold uppercase tracking-widest 
                       text-sm sm:text-base transition-all duration-300 
                       transform active:scale-[0.98] overflow-hidden
                       ${
                isSubmitting
                  ? 'bg-charcoal/60 text-warm-white cursor-not-allowed' 
                  : 'bg-gold text-deep-black hover:bg-gold/90 shadow-lg hover:shadow-xl active:shadow-md'
              }`}
            >
              {/* Loading spinner */}
              {isSubmitting && (
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/80">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-3 border-gold/30 border-t-gold rounded-full animate-spin"></div>
                    <span className="text-warm-white font-semibold">Submitting...</span>
                  </div>
                </div>
              )}
              
              <span className={isSubmitting ? 'opacity-30' : ''}>
                {isSubmitting ? 'Please Wait' : '✨ Reserve Table'}
              </span>
            </button>

            {/* Info Text - Enhanced */}
            <p className="text-center text-sm sm:text-base text-charcoal/60 font-body pt-4 border-t border-charcoal/10">
              Need immediate assistance? Call us at{' '}
              <a 
                href="tel:+61390001234" 
                className="text-gold hover:text-gold/80 font-semibold hover:underline transition-all duration-300 inline-flex items-center gap-1"
              >
                <span>📞</span>
                +61 3 9000 1234
              </a>
            </p>
          </form>
        </div>

        {/* Additional Info - Enhanced with Animation */}
        <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="group text-center bg-white p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-charcoal/5 hover:border-gold/30 transform hover:-translate-y-1">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 inline-block">📞</div>
            <h3 className="font-heading font-bold text-lg text-charcoal mb-2 group-hover:text-gold transition-colors">Call Us</h3>
            <a href="tel:+61390001234" className="text-sm text-charcoal/70 font-body hover:text-gold transition-colors">
              +61 3 9000 1234
            </a>
          </div>
          
          <div className="group text-center bg-white p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-charcoal/5 hover:border-gold/30 transform hover:-translate-y-1">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 inline-block">⏰</div>
            <h3 className="font-heading font-bold text-lg text-charcoal mb-2 group-hover:text-gold transition-colors">Dining Hours</h3>
            <p className="text-sm text-charcoal/70 font-body leading-relaxed">
              Mon-Thu: 5:30pm-10pm<br/>
              Fri-Sat: 5:30pm-11pm<br/>
              Sunday: 5:00pm-9:30pm
            </p>
          </div>
          
          <div className="group text-center bg-white p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-charcoal/5 hover:border-gold/30 transform hover:-translate-y-1">
            <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 inline-block">📍</div>
            <h3 className="font-heading font-bold text-lg text-charcoal mb-2 group-hover:text-gold transition-colors">Location</h3>
            <p className="text-sm text-charcoal/70 font-body leading-relaxed">
              123 Korean Lane<br/>
              Melbourne VIC 3000<br/>
              Australia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
