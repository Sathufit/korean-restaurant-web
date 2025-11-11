/**
 * Server Configuration
 * Centralized configuration for the server application
 */

// Environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';
const IS_DEVELOPMENT = NODE_ENV === 'development';

// Server Configuration
const SERVER_CONFIG = {
  PORT: process.env.PORT || 5001,
  NODE_ENV,
  IS_PRODUCTION,
  IS_DEVELOPMENT,
};

// Database Configuration
const DB_CONFIG = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/hanguk_bites',
  IS_CLOUD: !!process.env.MONGODB_URI,
};

// JWT Configuration
const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  EXPIRES_IN: '24h',
};

// Rate Limiting Configuration
const RATE_LIMIT_CONFIG = {
  GENERAL: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  AUTH: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 login attempts per windowMs
  },
};

// Restaurant Business Configuration
const RESTAURANT_CONFIG = {
  NAME: 'HanGuk Bites',
  MAX_GUESTS_PER_SLOT: 50,
  MAX_GUESTS_PER_BOOKING: 20,
  OPENING_TIME: '17:30',
  CLOSING_TIME: '22:00',
  MAX_BOOKING_MONTHS_AHEAD: 3,
};

// Booking Status Constants
const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  NO_SHOW: 'no_show',
};

// Audit Log Actions
const AUDIT_ACTIONS = {
  LOGIN: 'login',
  LOGIN_FAILED: 'login_failed',
  LOGOUT: 'logout',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
};

// Conditional logger that respects environment
const logger = {
  info: (...args) => {
    console.log(...args);
  },
  error: (...args) => {
    console.error(...args);
  },
  warn: (...args) => {
    if (IS_DEVELOPMENT) {
      console.warn(...args);
    }
  },
  debug: (...args) => {
    if (IS_DEVELOPMENT) {
      console.log(...args);
    }
  },
};

module.exports = {
  SERVER_CONFIG,
  DB_CONFIG,
  JWT_CONFIG,
  RATE_LIMIT_CONFIG,
  RESTAURANT_CONFIG,
  BOOKING_STATUS,
  AUDIT_ACTIONS,
  logger,
};
