import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Call real API
      const response = await axios.post('http://localhost:5001/api/admin/login', credentials);
      
      if (response.data.success && response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-black flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-warm-white mb-2">
            Admin Portal
          </h1>
          <p className="text-warm-white/60 font-body">HanGuk Bites Management</p>
        </div>

        <div className="bg-white p-8 sm:p-10 shadow-lg">
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
                className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold font-body transition-colors"
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
                className="w-full px-4 py-3 border border-charcoal/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold font-body transition-colors"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm font-body">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 font-body font-semibold uppercase tracking-wider transition-all duration-300 ${
                isLoading
                  ? 'bg-charcoal/50 text-warm-white cursor-not-allowed'
                  : 'bg-gold text-deep-black hover:bg-gold/90 shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-charcoal/10 text-center">
            <p className="text-sm text-charcoal/60 font-body">
              Default credentials: <span className="font-medium">admin</span> / <span className="font-medium">ChangeMe123!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
