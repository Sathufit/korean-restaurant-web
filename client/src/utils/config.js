/**
 * Application Configuration
 * Centralized configuration for the client application
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5001',
  BASE_PATH: import.meta.env.VITE_API_BASE_PATH || '/api',
  TIMEOUT: 10000, // 10 seconds
};

// Get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.BASE_PATH}${endpoint}`;
};

// Debug Configuration
export const DEBUG_CONFIG = {
  ENABLED: import.meta.env.VITE_ENABLE_DEBUG === 'true',
};

// Conditional logging - only logs if debug is enabled
export const logger = {
  log: (...args) => {
    if (DEBUG_CONFIG.ENABLED) {
      console.log(...args);
    }
  },
  error: (...args) => {
    if (DEBUG_CONFIG.ENABLED) {
      console.error(...args);
    }
  },
  warn: (...args) => {
    if (DEBUG_CONFIG.ENABLED) {
      console.warn(...args);
    }
  },
};

// Restaurant Configuration
export const RESTAURANT_CONFIG = {
  NAME: 'HanGuk Bites',
  OPENING_TIME: '17:30',
  CLOSING_TIME: '22:00',
  MAX_GUESTS_PER_BOOKING: 20,
  MAX_BOOKING_MONTHS_AHEAD: 3,
  TIME_SLOTS: [
    '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ],
};

// Booking Status Configuration
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  NO_SHOW: 'no_show',
};

// Status Display Configuration
export const STATUS_CONFIG = {
  [BOOKING_STATUS.PENDING]: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  [BOOKING_STATUS.CONFIRMED]: {
    label: 'Confirmed',
    color: 'bg-green-100 text-green-800 border-green-200',
  },
  [BOOKING_STATUS.CANCELLED]: {
    label: 'Cancelled',
    color: 'bg-red-100 text-red-800 border-red-200',
  },
  [BOOKING_STATUS.COMPLETED]: {
    label: 'Completed',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  [BOOKING_STATUS.NO_SHOW]: {
    label: 'No Show',
    color: 'bg-gray-100 text-gray-800 border-gray-200',
  },
};

// Auto-refresh Configuration
export const REFRESH_CONFIG = {
  INTERVAL: 30000, // 30 seconds
};

// Storage Keys
export const STORAGE_KEYS = {
  ADMIN_TOKEN: 'adminToken',
};
