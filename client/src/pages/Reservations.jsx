import { useState } from 'react';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:5001/api/bookings', formData);
      
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
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to submit reservation. Please try again.'
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

  const timeSlots = [
    '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <div className="bg-deep-black text-warm-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-4">
            Reserve Your Table
          </h1>
          <p className="mt-4 text-warm-white/70 font-body text-base sm:text-lg max-w-2xl mx-auto">
            Book your table and prepare for an unforgettable Korean dining experience
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="bg-white shadow-md p-6 sm:p-8 lg:p-12">
          
          {/* Status Messages */}
          {status.message && (
            <div className={`mb-6 p-4 ${
              status.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <p className="font-body text-sm">{status.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-body font-medium text-charcoal mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold font-body transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-body font-medium text-charcoal mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold font-body transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Phone & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-body font-medium text-charcoal mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold font-body transition-colors"
                  placeholder="+61 400 000 000"
                />
              </div>

              <div>
                <label htmlFor="guests" className="block text-sm font-body font-medium text-charcoal mb-2">
                  Number of Guests *
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold font-body transition-colors bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-body font-medium text-charcoal mb-2">
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
                  className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold font-body transition-colors"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-body font-medium text-charcoal mb-2">
                  Time *
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold font-body transition-colors bg-white"
                >
                  <option value="">Select a time</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-body font-medium text-charcoal mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold font-body resize-none transition-colors"
                placeholder="Any dietary restrictions, allergies, or special occasions?"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 font-body font-semibold uppercase tracking-wider transition-all duration-300 ${
                isSubmitting
                  ? 'bg-charcoal/50 text-warm-white cursor-not-allowed'
                  : 'bg-gold text-deep-black hover:bg-gold/90 shadow-md hover:shadow-lg'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Reserve Table'}
            </button>

            {/* Info Text */}
            <p className="text-center text-sm text-charcoal/60 font-body mt-4">
              Need immediate assistance? Call us at{' '}
              <a href="tel:+61390001234" className="text-gold hover:underline font-medium">
                +61 3 9000 1234
              </a>
            </p>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center">
            <div className="text-gold text-3xl mb-3">📞</div>
            <h3 className="font-heading font-semibold text-charcoal mb-2">Call Us</h3>
            <p className="text-sm text-charcoal/70 font-body">+61 3 9000 1234</p>
          </div>
          <div className="text-center">
            <div className="text-gold text-3xl mb-3">⏰</div>
            <h3 className="font-heading font-semibold text-charcoal mb-2">Dining Hours</h3>
            <p className="text-sm text-charcoal/70 font-body">Mon-Thu: 5:30pm-10pm<br/>Fri-Sat: 5:30pm-11pm</p>
          </div>
          <div className="text-center">
            <div className="text-gold text-3xl mb-3">📍</div>
            <h3 className="font-heading font-semibold text-charcoal mb-2">Location</h3>
            <p className="text-sm text-charcoal/70 font-body">123 Korean Lane<br/>Melbourne VIC 3000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
