import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  getApiUrl, 
  logger, 
  STORAGE_KEYS, 
  REFRESH_CONFIG, 
  STATUS_CONFIG,
  BOOKING_STATUS 
} from '../utils/config';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminProfile, setAdminProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchBookings();

    // Auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      logger.log('🔄 Auto-refreshing bookings...');
      fetchBookings();
    }, REFRESH_CONFIG.INTERVAL);

    // Fetch admin profile
    fetchProfile();

    return () => {
      clearInterval(refreshInterval);
    };
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      
      logger.log('🔍 Fetching bookings with token:', token ? 'Token exists' : 'No token');
      
      if (!token) {
        logger.error('❌ No token found, redirecting to login');
        navigate('/admin/login');
        return;
      }
      
      const response = await axios.get(getApiUrl('/bookings'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      logger.log('✅ Bookings response:', response.data);
      
      // Handle both array response and object with bookings property
      const bookingsData = Array.isArray(response.data) 
        ? response.data 
        : (response.data.bookings || []);
      
      setBookings(bookingsData);
      setError('');
    } catch (err) {
      logger.error('❌ Error fetching bookings:', err.response?.data || err.message);
      
      if (err.response?.status === 401) {
        // Token expired or invalid
        logger.log('🔄 Token invalid, clearing and redirecting to login');
        localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
        navigate('/admin/login');
      } else {
        setError('Failed to load bookings');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      if (!token) return;
      
      const response = await axios.get(getApiUrl('/admin/profile'), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setAdminProfile(response.data.admin);
    } catch (err) {
      logger.error('❌ Error fetching profile:', err.response?.data || err.message);
      // Don't redirect on profile error, main functionality still works
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      await axios.patch(getApiUrl(`/bookings/${id}`), 
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      // Update local state
      setBookings(bookings.map(booking => 
        booking._id === id ? { ...booking, status: newStatus } : booking
      ));
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
        navigate('/admin/login');
      } else {
        setError('Failed to update booking');
      }
    }
  };  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    
    try {
      const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      await axios.delete(getApiUrl(`/bookings/${id}`), {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setBookings(bookings.filter(booking => booking._id !== id));
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
        navigate('/admin/login');
      } else {
        setError('Failed to delete booking');
      }
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
      // Call logout endpoint to invalidate token in database
      await axios.post(getApiUrl('/admin/logout'), {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err) {
      // Continue with logout even if API call fails
      logger.error('Logout error:', err);
    } finally {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
      navigate('/admin/login');
    }
  };

  const getStatusColor = (status) => {
    return STATUS_CONFIG[status]?.color || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  // Filter bookings based on status, date, and search query
  const filteredBookings = bookings.filter(booking => {
    // Status filter
    if (statusFilter !== 'all' && booking.status !== statusFilter) {
      return false;
    }

    // Date filter
    if (dateFilter !== 'all') {
      const bookingDate = new Date(booking.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dateFilter === 'today') {
        const todayStr = today.toISOString().split('T')[0];
        const bookingStr = bookingDate.toISOString().split('T')[0];
        if (todayStr !== bookingStr) return false;
      } else if (dateFilter === 'upcoming') {
        if (bookingDate < today) return false;
      } else if (dateFilter === 'past') {
        if (bookingDate >= today) return false;
      }
    }

    // Search filter (name or email)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = booking.name.toLowerCase().includes(query);
      const matchesEmail = booking.email.toLowerCase().includes(query);
      if (!matchesName && !matchesEmail) return false;
    }

    return true;
  }).sort((a, b) => {
    // Sort bookings: upcoming first (nearest date first), then past (most recent first)
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const isAUpcoming = dateA >= today;
    const isBUpcoming = dateB >= today;
    
    // If one is upcoming and one is past, upcoming comes first
    if (isAUpcoming && !isBUpcoming) return -1;
    if (!isAUpcoming && isBUpcoming) return 1;
    
    // If both are upcoming, sort by nearest date first (ascending)
    if (isAUpcoming && isBUpcoming) {
      const dateDiff = dateA - dateB;
      // If same date, sort by time
      if (dateDiff === 0) {
        return a.time.localeCompare(b.time);
      }
      return dateDiff;
    }
    
    // If both are past, sort by most recent first (descending)
    const dateDiff = dateB - dateA;
    if (dateDiff === 0) {
      return b.time.localeCompare(a.time);
    }
    return dateDiff;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-charcoal font-body">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <div className="bg-deep-black text-warm-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold">Admin Dashboard</h1>
            <p className="text-warm-white/60 font-body mt-1">Manage your reservations</p>
          </div>
          <div className="flex items-center gap-4">
            {adminProfile && (
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="px-4 py-2 bg-charcoal text-warm-white font-body font-semibold uppercase tracking-wider hover:bg-charcoal/80 transition-colors flex items-center gap-2"
              >
                <span className="text-gold">👤</span>
                <span className="hidden sm:inline">{adminProfile.username}</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-gold text-deep-black font-body font-semibold uppercase tracking-wider hover:bg-gold/90 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Card */}
        {showProfile && adminProfile && (
          <div className="bg-white shadow-lg mb-6 p-6 border-l-4 border-gold">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-heading font-bold text-deep-black">Admin Profile</h2>
              <button
                onClick={() => setShowProfile(false)}
                className="text-charcoal hover:text-deep-black text-2xl"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-body text-charcoal/60 uppercase tracking-wide mb-1">Username</p>
                <p className="text-lg font-body text-deep-black font-semibold">{adminProfile.username}</p>
              </div>
              <div>
                <p className="text-sm font-body text-charcoal/60 uppercase tracking-wide mb-1">Email</p>
                <p className="text-lg font-body text-deep-black">{adminProfile.email}</p>
              </div>
              <div>
                <p className="text-sm font-body text-charcoal/60 uppercase tracking-wide mb-1">Role</p>
                <p className="text-lg font-body text-deep-black capitalize">{adminProfile.role}</p>
              </div>
              <div>
                <p className="text-sm font-body text-charcoal/60 uppercase tracking-wide mb-1">Account Created</p>
                <p className="text-lg font-body text-deep-black">
                  {new Date(adminProfile.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 shadow-md">
            <p className="text-sm font-body text-charcoal/60 uppercase tracking-wide">Total</p>
            <p className="text-3xl font-heading font-bold text-deep-black mt-2">{bookings.length}</p>
          </div>
          <div className="bg-white p-6 shadow-md">
            <p className="text-sm font-body text-charcoal/60 uppercase tracking-wide">Pending</p>
            <p className="text-3xl font-heading font-bold text-yellow-600 mt-2">
              {bookings.filter(b => b.status === BOOKING_STATUS.PENDING).length}
            </p>
          </div>
          <div className="bg-white p-6 shadow-md">
            <p className="text-sm font-body text-charcoal/60 uppercase tracking-wide">Confirmed</p>
            <p className="text-3xl font-heading font-bold text-green-600 mt-2">
              {bookings.filter(b => b.status === BOOKING_STATUS.CONFIRMED).length}
            </p>
          </div>
          <div className="bg-white p-6 shadow-md">
            <p className="text-sm font-body text-charcoal/60 uppercase tracking-wide">Cancelled</p>
            <p className="text-3xl font-heading font-bold text-red-600 mt-2">
              {bookings.filter(b => b.status === BOOKING_STATUS.CANCELLED).length}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 font-body">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white shadow-md p-4 sm:p-6 mb-6">
          <h2 className="text-lg font-heading font-bold text-deep-black mb-4">Filter Bookings</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-body font-medium text-charcoal mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/20 focus:border-gold focus:ring-1 focus:ring-gold font-body"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-body font-medium text-charcoal mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/20 focus:border-gold focus:ring-1 focus:ring-gold font-body"
              >
                <option value="all">All Statuses</option>
                {Object.entries(STATUS_CONFIG).map(([status, config]) => (
                  <option key={status} value={status}>{config.label}</option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-body font-medium text-charcoal mb-2">
                Date
              </label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-charcoal/20 focus:border-gold focus:ring-1 focus:ring-gold font-body"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('all');
                  setDateFilter('all');
                }}
                className="w-full px-4 py-2 bg-charcoal text-warm-white font-body font-semibold uppercase tracking-wider hover:bg-deep-black transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 pt-4 border-t border-charcoal/10">
            <p className="text-sm font-body text-charcoal/60">
              Showing <span className="font-semibold text-deep-black">{filteredBookings.length}</span> of{' '}
              <span className="font-semibold text-deep-black">{bookings.length}</span> bookings
            </p>
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-white shadow-md">
          <div className="px-4 sm:px-6 py-4 border-b border-charcoal/10">
            <h2 className="text-xl font-heading font-bold text-deep-black">All Reservations</h2>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-charcoal/60 font-body">
                {bookings.length === 0 ? 'No bookings yet' : 'No bookings match your filters'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-charcoal/10">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="p-4 sm:p-6 hover:bg-warm-white/50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Booking Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-body font-semibold text-deep-black">{booking.name}</h3>
                        <span className={`px-3 py-1 text-xs font-body font-medium uppercase tracking-wide border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm font-body text-charcoal/70">
                        <div>
                          <span className="font-medium text-charcoal">Email:</span> {booking.email}
                        </div>
                        <div>
                          <span className="font-medium text-charcoal">Phone:</span> {booking.phone}
                        </div>
                        <div>
                          <span className="font-medium text-charcoal">Guests:</span> {booking.guests}
                        </div>
                        <div>
                          <span className="font-medium text-charcoal">Date:</span> {
                            typeof booking.date === 'string' 
                              ? booking.date 
                              : booking.date && new Date(booking.date).toLocaleDateString()
                          }
                        </div>
                        <div>
                          <span className="font-medium text-charcoal">Time:</span> {booking.time}
                        </div>
                        <div>
                          <span className="font-medium text-charcoal">ID:</span> #{
                            typeof booking._id === 'string' 
                              ? booking._id.slice(-8) 
                              : booking.id?.slice(-8) || 'N/A'
                          }
                        </div>
                      </div>

                      {booking.specialRequests && (
                        <div className="text-sm font-body">
                          <span className="font-medium text-charcoal">Special Requests:</span>
                          <p className="text-charcoal/70 mt-1">{booking.specialRequests}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-row lg:flex-col gap-2 lg:min-w-[140px]">
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                          className="flex-1 lg:flex-none px-4 py-2 bg-green-600 text-white text-sm font-body font-medium uppercase tracking-wide hover:bg-green-700 transition-colors"
                        >
                          Confirm
                        </button>
                      )}
                      {booking.status === 'confirmed' && (
                        <button
                          onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                          className="flex-1 lg:flex-none px-4 py-2 bg-yellow-600 text-white text-sm font-body font-medium uppercase tracking-wide hover:bg-yellow-700 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="flex-1 lg:flex-none px-4 py-2 bg-red-600 text-white text-sm font-body font-medium uppercase tracking-wide hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
