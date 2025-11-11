// Authentication Token Model (for JWT token management)
const mongoose = require('mongoose');

const authTokenSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }  // TTL index - MongoDB will auto-delete expired documents
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'auth_tokens'
});

// Index for faster token lookups
authTokenSchema.index({ token: 1 });
authTokenSchema.index({ adminId: 1 });

const AuthToken = mongoose.model('AuthToken', authTokenSchema);

module.exports = AuthToken;
