/**
 * PRODUCTION-READY SERVER FOR HANGUK BITES RESTAURANT
 * =====================================================
 * 
 * MongoDB-based secure server with:
 * - Real database (MongoDB) with Mongoose ODM
 * - JWT authentication with token management
 * - Input validation and sanitization
 * - Rate limiting to prevent abuse
 * - Security headers (helmet)
 * - Audit logging for security tracking
 * - Error handling
 * - HTTPS-ready
 * 
 * IMPORTANT: Read MONGODB-SETUP-GUIDE.md for setup instructions!
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Import database and models
const { connectDB } = require('./config/database');
const { Admin, Booking, AuthToken, AuditLog } = require('./models');

// Import middleware
const { 
  authenticateToken, 
  generateToken,
  logAudit 
} = require('./middleware/auth');
const {
  validateBooking,
  validateBookingUpdate,
  validateLogin,
  sanitizeOutput
} = require('./middleware/validation');

const app = express();
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ===========================
// SECURITY MIDDLEWARE
// ===========================

// Helmet - sets various HTTP headers for security
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.CORS_ORIGINS 
      ? process.env.CORS_ORIGINS.split(',')
      : ['http://localhost:5173', 'http://localhost:5174'];
    
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging (use combined format in production)
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// Rate limiting for all routes
const generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requests per window
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(generalLimiter);

// Stricter rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 login attempts per 15 minutes
  message: { success: false, message: 'Too many login attempts, please try again later.' },
  skipSuccessfulRequests: true, // Don't count successful logins
});

// ===========================
// PUBLIC ROUTES
// ===========================

// Health check (for monitoring)
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    status: 'ok', 
    message: 'HanGuk Bites API is running',
    environment: NODE_ENV,
    database: 'MongoDB',
    timestamp: new Date().toISOString()
  });
});

// Create new booking (PUBLIC - anyone can book)
app.post('/api/bookings', validateBooking, async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, specialRequests } = req.body;
    
    // Check if time slot is already fully booked (optional capacity check)
    const existingBookingsCount = await Booking.countDocuments({
      date: new Date(date),
      time: time,
      status: { $in: ['pending', 'confirmed'] }
    });
    
    // Assuming max 50 guests per time slot (adjust based on restaurant capacity)
    if (existingBookingsCount >= 50) {
      return res.status(400).json({
        success: false,
        message: 'Sorry, this time slot is fully booked. Please choose another time.'
      });
    }
    
    // Create booking
    const booking = await Booking.create({
      name,
      email,
      phone,
      date: new Date(date),
      time,
      guests,
      specialRequests: specialRequests || '',
      status: 'pending'
    });
    
    // Convert ObjectId to string
    const bookingData = booking.toObject();
    bookingData._id = bookingData._id.toString();
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully! We will contact you shortly to confirm.',
      booking: sanitizeOutput(bookingData)
    });
    
  } catch (error) {
    console.error('Create booking error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create booking. Please try again.'
    });
  }
});

// ===========================
// AUTHENTICATION ROUTES
// ===========================

// Admin login
app.post('/api/admin/login', authLimiter, validateLogin, async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Get admin from database
    const admin = await Admin.findOne({ username, isActive: true });
    
    if (!admin) {
      await logAudit(null, 'login_failed', 'admins', null, null, { username }, req);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Compare password
    const isPasswordValid = await admin.comparePassword(password);
    
    if (!isPasswordValid) {
      await logAudit(admin._id, 'login_failed', 'admins', admin._id, null, null, req);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate JWT token
    const token = generateToken({
      adminId: admin._id.toString(),
      username: admin.username,
      role: admin.role
    });
    
    // Store token in database
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours
    
    await AuthToken.create({
      adminId: admin._id,
      token,
      expiresAt,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent')
    });
    
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();
    
    // Log successful login
    await logAudit(admin._id, 'login_success', 'admins', admin._id, null, null, req);
    
    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

// Admin logout
app.post('/api/admin/logout', authenticateToken, async (req, res) => {
  try {
    // Remove token from database
    await AuthToken.deleteOne({ token: req.token });
    
    await logAudit(req.admin._id, 'logout', 'admins', req.admin._id, null, null, req);
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

// Get admin profile (PROTECTED)
app.get('/api/admin/profile', authenticateToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-password');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    res.json({
      success: true,
      admin: {
        username: admin.username,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt,
        lastLogin: admin.lastLogin
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile'
    });
  }
});

// ===========================
// PROTECTED ADMIN ROUTES
// ===========================

// Get all bookings (PROTECTED)
app.get('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const { status, date, limit = 100, offset = 0 } = req.query;
    
    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (date) {
      query.date = new Date(date);
    }
    
    const bookings = await Booking.find(query)
      .sort({ date: -1, time: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset))
      .populate('confirmedBy', 'username email');
    
    const count = await Booking.countDocuments(query);
    
    // Convert ObjectIds and Dates to strings for proper JSON serialization
    const bookingsData = bookings.map(b => {
      const obj = b.toObject();
      obj._id = obj._id.toString();
      obj.id = obj._id; // Add string id for compatibility
      obj.date = obj.date ? obj.date.toISOString().split('T')[0] : obj.date; // Format date as YYYY-MM-DD
      if (obj.confirmedBy && obj.confirmedBy._id) {
        obj.confirmedBy._id = obj.confirmedBy._id.toString();
      }
      if (obj.createdAt) obj.createdAt = obj.createdAt.toISOString();
      if (obj.updatedAt) obj.updatedAt = obj.updatedAt.toISOString();
      if (obj.confirmedAt) obj.confirmedAt = obj.confirmedAt.toISOString();
      return obj;
    });
    
    res.json({
      success: true,
      bookings: sanitizeOutput(bookingsData),
      count,
      total: count
    });
    
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings'
    });
  }
});

// Get single booking (PROTECTED)
app.get('/api/bookings/:id', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('confirmedBy', 'username email');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Convert ObjectIds and Dates to strings
    const bookingData = booking.toObject();
    bookingData._id = bookingData._id.toString();
    bookingData.id = bookingData._id; // Add string id
    bookingData.date = bookingData.date ? bookingData.date.toISOString().split('T')[0] : bookingData.date;
    if (bookingData.confirmedBy && bookingData.confirmedBy._id) {
      bookingData.confirmedBy._id = bookingData.confirmedBy._id.toString();
    }
    if (bookingData.createdAt) bookingData.createdAt = bookingData.createdAt.toISOString();
    if (bookingData.updatedAt) bookingData.updatedAt = bookingData.updatedAt.toISOString();
    if (bookingData.confirmedAt) bookingData.confirmedAt = bookingData.confirmedAt.toISOString();
    
    res.json({
      success: true,
      booking: sanitizeOutput(bookingData)
    });
    
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking'
    });
  }
});

// Update booking status (PROTECTED)
app.patch('/api/bookings/:id', authenticateToken, validateBookingUpdate, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const bookingId = req.params.id;
    
    // Get old booking data for audit log
    const oldBooking = await Booking.findById(bookingId);
    
    if (!oldBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Update booking
    oldBooking.status = status;
    if (notes !== undefined) oldBooking.notes = notes;
    oldBooking.confirmedBy = req.admin._id;
    
    await oldBooking.save();
    
    // Log audit
    await logAudit(
      req.admin._id,
      'booking_updated',
      'bookings',
      bookingId,
      { status: oldBooking.status },
      { status, notes },
      req
    );
    
    res.json({
      success: true,
      message: 'Booking updated successfully',
      booking: sanitizeOutput(oldBooking.toObject())
    });
    
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking'
    });
  }
});

// Delete booking (PROTECTED)
app.delete('/api/bookings/:id', authenticateToken, async (req, res) => {
  try {
    const bookingId = req.params.id;
    
    // Get booking for audit log
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Delete booking
    await Booking.findByIdAndDelete(bookingId);
    
    // Log audit
    await logAudit(
      req.admin._id,
      'booking_deleted',
      'bookings',
      bookingId,
      booking.toObject(),
      null,
      req
    );
    
    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking'
    });
  }
});

// ===========================
// ERROR HANDLING
// ===========================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: NODE_ENV === 'production' 
      ? 'An error occurred' 
      : err.message,
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ===========================
// START SERVER
// ===========================

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    
    // Check if any admin exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log('\n⚠️  WARNING: No admin users found in database!');
      console.log('📝 Please create an admin user by running:');
      console.log('   npm run create-admin\n');
      console.log('⏸️  Server will continue, but you won\'t be able to login until an admin is created.\n');
    }
    
    // Start Express server
    app.listen(PORT, () => {
      console.log('='.repeat(60));
      console.log(`🔥 HanGuk Bites API Server`);
      console.log('='.repeat(60));
      console.log(`✅ Environment: ${NODE_ENV}`);
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`✅ Database: MongoDB (${process.env.MONGODB_URI ? 'Cloud' : 'Local'})`);
      console.log('='.repeat(60));
      console.log('📊 Endpoints:');
      console.log(`   GET    /api/health - Health check`);
      console.log(`   POST   /api/bookings - Create booking (PUBLIC)`);
      console.log(`   POST   /api/admin/login - Admin login`);
      console.log(`   GET    /api/bookings - Get all bookings (PROTECTED)`);
      console.log(`   PATCH  /api/bookings/:id - Update booking (PROTECTED)`);
      console.log(`   DELETE /api/bookings/:id - Delete booking (PROTECTED)`);
      console.log('='.repeat(60));
      
      if (NODE_ENV === 'development') {
        console.log('⚠️  WARNING: Running in DEVELOPMENT mode');
        console.log('⚠️  Make sure to:');
        console.log('   1. Set NODE_ENV=production in production');
        console.log('   2. Change default admin password');
        console.log('   3. Use HTTPS in production');
        console.log('   4. Set strong JWT_SECRET in .env');
        console.log('='.repeat(60));
      }
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
