// Audit Log Model (for security tracking)
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null
  },
  action: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  resourceType: {
    type: String,
    trim: true,
    maxlength: 50
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  oldValues: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  },
  newValues: {
    type: mongoose.Schema.Types.Mixed,
    default: null
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
  timestamps: { createdAt: true, updatedAt: false },  // Only track creation time
  collection: 'audit_logs'
});

// Indexes for faster queries
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ adminId: 1, createdAt: -1 });
auditLogSchema.index({ createdAt: -1 });

// TTL index - auto-delete logs older than 90 days (optional)
auditLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 });  // 90 days

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
