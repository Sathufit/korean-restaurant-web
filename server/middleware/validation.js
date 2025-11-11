// Input validation middleware using express-validator
const { body, param, validationResult } = require('express-validator');

/**
 * Middleware to check validation results
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

/**
 * Validation rules for booking creation
 */
const validateBooking = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2-100 characters')
    .matches(/^[a-zA-Z\s'-]+$/).withMessage('Name can only contain letters, spaces, hyphens and apostrophes'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address')
    .normalizeEmail()
    .isLength({ max: 100 }).withMessage('Email is too long'),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[\d\s\+\-\(\)]+$/).withMessage('Invalid phone number format')
    .isLength({ min: 10, max: 20 }).withMessage('Phone number must be between 10-20 characters'),
  
  body('date')
    .notEmpty().withMessage('Date is required')
    .isISO8601().withMessage('Invalid date format')
    .custom((value) => {
      const bookingDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (bookingDate < today) {
        throw new Error('Cannot book a date in the past');
      }
      
      // Limit bookings to 3 months in advance
      const maxDate = new Date();
      maxDate.setMonth(maxDate.getMonth() + 3);
      if (bookingDate > maxDate) {
        throw new Error('Cannot book more than 3 months in advance');
      }
      
      return true;
    }),
  
  body('time')
    .notEmpty().withMessage('Time is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Invalid time format (use HH:MM)')
    .custom((value) => {
      const [hours, minutes] = value.split(':').map(Number);
      // Restaurant hours: 17:30 - 22:00
      if (hours < 17 || (hours === 17 && minutes < 30) || hours > 22) {
        throw new Error('Restaurant is open from 17:30 to 22:00');
      }
      return true;
    }),
  
  body('guests')
    .notEmpty().withMessage('Number of guests is required')
    .isInt({ min: 1, max: 20 }).withMessage('Number of guests must be between 1 and 20'),
  
  body('specialRequests')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Special requests cannot exceed 500 characters')
    .escape(), // Prevent XSS attacks
  
  validate
];

/**
 * Validation rules for booking status update
 */
const validateBookingUpdate = [
  param('id')
    .isInt({ min: 1 }).withMessage('Invalid booking ID'),
  
  body('status')
    .notEmpty().withMessage('Status is required')
    .isIn(['pending', 'confirmed', 'cancelled', 'completed', 'no_show'])
    .withMessage('Invalid status value'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters')
    .escape(),
  
  validate
];

/**
 * Validation rules for admin login
 */
const validateLogin = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 50 }).withMessage('Username must be between 3-50 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers and underscores'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  
  validate
];

/**
 * Validation rules for password change
 */
const validatePasswordChange = [
  body('currentPassword')
    .notEmpty().withMessage('Current password is required'),
  
  body('newPassword')
    .notEmpty().withMessage('New password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase, one lowercase, one number and one special character'),
  
  body('confirmPassword')
    .notEmpty().withMessage('Password confirmation is required')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  
  validate
];

/**
 * Sanitize output to prevent XSS attacks
 */
const sanitizeOutput = (data) => {
  if (typeof data === 'string') {
    return data.replace(/[<>]/g, '');
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeOutput);
  }
  if (typeof data === 'object' && data !== null) {
    const sanitized = {};
    for (const key in data) {
      sanitized[key] = sanitizeOutput(data[key]);
    }
    return sanitized;
  }
  return data;
};

module.exports = {
  validateBooking,
  validateBookingUpdate,
  validateLogin,
  validatePasswordChange,
  sanitizeOutput
};
