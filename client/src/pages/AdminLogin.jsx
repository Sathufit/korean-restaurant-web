import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getApiUrl, logger, STORAGE_KEYS } from '../utils/config';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setShakeError(false);

    logger.log('🔐 Attempting login with username:', credentials.username);

    try {
      // Call real API
      const response = await axios.post(getApiUrl('/admin/login'), credentials);
      
      logger.log('✅ Login response:', response.data);
      
      if (response.data.success && response.data.token) {
        logger.log('💾 Saving token to localStorage');
        localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, response.data.token);
        logger.log('🔍 Token saved, length:', response.data.token.length);
        logger.log('🚀 Navigating to dashboard');
        navigate('/admin/dashboard');
      } else {
        logger.error('❌ Login successful but no token received');
        setError('Invalid credentials');
        setShakeError(true);
        setTimeout(() => setShakeError(false), 500);
      }
    } catch (err) {
      logger.error('❌ Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-gold animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-gold animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-gold animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className={`text-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-px bg-gold animate-fade-in"></div>
            <div className="w-2 h-2 bg-gold rounded-full"></div>
            <div className="w-16 h-px bg-gold animate-fade-in"></div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-warm-white mb-2">
            Admin Portal
          </h1>
          <p className="text-warm-white/60 font-body">HanGuk Bites Management</p>
        </div>

        <div className={`bg-white p-8 sm:p-10 shadow-2xl transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${shakeError ? 'animate-shake' : ''}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-body font-medium text-charcoal mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
                className="w-full min-h-[48px] px-4 py-3 border-2 border-charcoal/20 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20 font-body transition-all duration-300 hover:border-charcoal/40"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-body font-medium text-charcoal mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="w-full min-h-[48px] px-4 py-3 border-2 border-charcoal/20 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/20 font-body transition-all duration-300 hover:border-charcoal/40"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-300 text-red-800 text-sm font-body animate-slide-in-right flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`relative w-full min-h-[48px] py-4 font-body font-semibold uppercase tracking-wider transition-all duration-300 touch-manipulation ${
                isLoading
                  ? 'bg-charcoal/50 text-warm-white cursor-not-allowed'
                  : 'bg-gold text-deep-black hover:bg-gold/90 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-deep-black/20 border-t-deep-black rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-charcoal/10 text-center">
            <p className="text-sm text-charcoal/60 font-body">
              Contact your system administrator for login credentials
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
