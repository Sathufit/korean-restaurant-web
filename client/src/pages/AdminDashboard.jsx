import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:5001/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Handle both array response and object with bookings property
      const bookingsData = Array.isArray(response.data) 
        ? response.data 
        : (response.data.bookings || []);
      
      setBookings(bookingsData);
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        setError('Failed to load bookings');
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`http://localhost:5001/api/bookings/${id}`, 
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      setBookings(bookings.map(booking => 
        booking._id === id ? { ...booking, status: newStatus } : booking
      ));
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        setError('Failed to update booking');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this booking?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5001/api/bookings/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setBookings(bookings.filter(booking => booking._id !== id));
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } else {
        setError('Failed to delete booking');
      }
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      // Call logout endpoint to invalidate token in database
      await axios.post('http://localhost:5001/api/admin/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err) {
      // Continue with logout even if API call fails
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

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
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-gold text-deep-black font-body font-semibold uppercase tracking-wider hover:bg-gold/90 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 shadow-md">
            <p className="text-sm font-body text-charcoal/60 uppercase tracking-wide">Total</p>
            <p className="text-3xl font-heading font-bold text-deep-black mt-2">{bookings.length}</p>
          </div>
          <div className="bg-white p-6 shadow-md">
            <p className="text-sm font-body text-charcoal/60 uppercase tracking-wide">Pending</p>
            <p className="text-3xl font-heading font-bold text-yellow-600 mt-2">
              {bookings.filter(b => b.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-6 shadow-md">
            <p className="text-sm font-body text-charcoal/60 uppercase tracking-wide">Confirmed</p>
            <p className="text-3xl font-heading font-bold text-green-600 mt-2">
              {bookings.filter(b => b.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-white p-6 shadow-md">
            <p className="text-sm font-body text-charcoal/60 uppercase tracking-wide">Cancelled</p>
            <p className="text-3xl font-heading font-bold text-red-600 mt-2">
              {bookings.filter(b => b.status === 'cancelled').length}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 font-body">
            {error}
          </div>
        )}

        {/* Bookings List */}
        <div className="bg-white shadow-md">
          <div className="px-4 sm:px-6 py-4 border-b border-charcoal/10">
            <h2 className="text-xl font-heading font-bold text-deep-black">All Reservations</h2>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-charcoal/60 font-body">No bookings yet</p>
            </div>
          ) : (
            <div className="divide-y divide-charcoal/10">
              {bookings.map((booking) => (
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
                          <span className="font-medium text-charcoal">Date:</span> {booking.date}
                        </div>
                        <div>
                          <span className="font-medium text-charcoal">Time:</span> {booking.time}
                        </div>
                        <div>
                          <span className="font-medium text-charcoal">ID:</span> #{booking._id.slice(-8)}
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
