const Contact = () => {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <div className="bg-deep-black text-warm-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-heading font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-warm-white/70 font-body text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Visit us or get in touch.
          </p>
        </div>
      </div>

      {/* Contact Info & Map */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-heading font-bold text-charcoal mb-4">
                HanGuk Bites
              </h2>
              <p className="text-charcoal/70 font-body text-lg leading-relaxed">
                Experience authentic Korean cuisine in the heart of Melbourne. 
                We look forward to welcoming you.
              </p>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4 group">
              <div className="text-gold text-2xl mt-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-charcoal mb-2">
                  Location
                </h3>
                <p className="text-charcoal/70 font-body leading-relaxed">
                  123 Korean Lane<br />
                  Melbourne VIC 3000<br />
                  Australia
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4 group">
              <div className="text-gold text-2xl mt-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-charcoal mb-2">
                  Phone
                </h3>
                <a 
                  href="tel:+61390001234" 
                  className="text-charcoal/70 font-body hover:text-gold transition-colors text-lg"
                >
                  +61 3 9000 1234
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4 group">
              <div className="text-gold text-2xl mt-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-charcoal mb-2">
                  Email
                </h3>
                <a 
                  href="mailto:info@hangukbites.com.au" 
                  className="text-charcoal/70 font-body hover:text-gold transition-colors text-lg"
                >
                  info@hangukbites.com.au
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start space-x-4 group">
              <div className="text-gold text-2xl mt-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading font-semibold text-charcoal mb-3">
                  Opening Hours
                </h3>
                <div className="space-y-2 text-charcoal/70 font-body">
                  <div className="flex justify-between">
                    <span>Monday - Thursday</span>
                    <span className="font-medium">5:30pm - 10:00pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Friday - Saturday</span>
                    <span className="font-medium">5:30pm - 11:00pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">5:00pm - 9:30pm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4 border-t border-charcoal/10">
              <h3 className="text-lg font-heading font-semibold text-charcoal mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-12 h-12 bg-charcoal/10 text-charcoal flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-charcoal/10 text-charcoal flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-charcoal/10 text-charcoal flex items-center justify-center hover:bg-gold hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-charcoal/5 h-[600px] flex items-center justify-center border border-charcoal/10">
            <div className="text-center p-8">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-charcoal/50 font-body text-lg mb-2">
                Map Integration
              </p>
              <p className="text-sm text-charcoal/40 font-body">
                123 Korean Lane, Melbourne VIC 3000
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-deep-black text-warm-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            Ready to Experience Authentic Korean Cuisine?
          </h2>
          <p className="text-warm-white/70 font-body text-lg mb-8">
            Book your table now and embark on a culinary journey
          </p>
          <a
            href="/reservations"
            className="inline-block px-8 py-4 bg-gold text-deep-black font-body font-semibold uppercase tracking-wider hover:bg-gold/90 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Make a Reservation
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
