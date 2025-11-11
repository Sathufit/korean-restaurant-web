// Export all models from one place for easy importing
const Admin = require('./Admin');
const Booking = require('./Booking');
const AuthToken = require('./AuthToken');
const AuditLog = require('./AuditLog');

module.exports = {
  Admin,
  Booking,
  AuthToken,
  AuditLog
};
