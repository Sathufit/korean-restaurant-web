const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// In-memory database (dummy data)
let bookings = [
  {
    id: 1,
    name: 'Sarah Kim',
    email: 'sarah@example.com',
    phone: '+61 400 123 456',
    date: '2025-11-15',
    time: '19:00',
    guests: '4',
    specialRequests: 'Window seat please',
    status: 'confirmed',
    createdAt: new Date('2025-11-10')
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '+61 400 789 012',
    date: '2025-11-16',
    time: '18:30',
    guests: '2',
    specialRequests: '',
    status: 'pending',
    createdAt: new Date('2025-11-11')
  },
  {
    id: 3,
    name: 'Emma Watson',
    email: 'emma@example.com',
    phone: '+61 400 345 678',
    date: '2025-11-14',
    time: '20:00',
    guests: '6',
    specialRequests: 'Celebrating anniversary',
    status: 'confirmed',
    createdAt: new Date('2025-11-09')
  }
];

let nextBookingId = 4;

// Routes

// Get all bookings
app.get('/api/bookings', (req, res) => {
  // Sort by date and time
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = new Date(a.date + ' ' + a.time);
    const dateB = new Date(b.date + ' ' + b.time);
    return dateB - dateA;
  });
  
  res.json(sortedBookings);
});

// Get single booking
app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  
  res.json(booking);
});

// Create new booking
app.post('/api/bookings', (req, res) => {
  const { name, email, phone, date, time, guests, specialRequests } = req.body;
  
  // Validation
  if (!name || !email || !phone || !date || !time || !guests) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }
  
  const newBooking = {
    id: nextBookingId++,
    name,
    email,
    phone,
    date,
    time,
    guests,
    specialRequests: specialRequests || '',
    status: 'pending',
    createdAt: new Date()
  };
  
  bookings.push(newBooking);
  
  res.status(201).json({
    message: 'Booking created successfully',
    booking: newBooking
  });
});

// Update booking status
app.patch('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const { status } = req.body;
  
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  
  if (bookingIndex === -1) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  
  // Validate status
  const validStatuses = ['pending', 'confirmed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  
  bookings[bookingIndex].status = status;
  
  res.json({
    message: 'Booking updated successfully',
    booking: bookings[bookingIndex]
  });
});

// Delete booking
app.delete('/api/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);
  
  if (bookingIndex === -1) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  
  bookings.splice(bookingIndex, 1);
  
  res.json({ message: 'Booking deleted successfully' });
});

// Admin login (demo only - in production use proper auth)
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  // Demo credentials
  if (username === 'admin' && password === 'hanguk2024') {
    res.json({
      message: 'Login successful',
      token: 'demo-token-123',
      user: { username: 'admin' }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'HanGuk Bites API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔥 HanGuk Bites API running on http://localhost:${PORT}`);
  console.log(`📊 Bookings endpoint: http://localhost:${PORT}/api/bookings`);
  console.log(`🔐 Admin login: http://localhost:${PORT}/api/admin/login`);
});
