// Authentication middleware and utilities
const jwt = require('jsonwebtoken');
const { Admin, AuthToken, AuditLog } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'CHANGE_THIS_SECRET_IN_PRODUCTION';
const JWT_EXPIRES_IN = '24h'; // Token expires in 24 hours

/**
 * Generate JWT token
 */
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verify JWT token
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

/**
 * Middleware to protect routes - requires valid JWT token
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Access denied. No token provided.' 
      });
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid or expired token.' 
      });
    }

    // Check if token exists in database and is not expired
    const tokenDoc = await AuthToken.findOne({
      token: token,
      expiresAt: { $gt: new Date() }
    });

    if (!tokenDoc) {
      return res.status(401).json({ 
        success: false,
        message: 'Token has been revoked or expired.' 
      });
    }

    // Get admin details
    const admin = await Admin.findById(decoded.adminId).select('-password');

    if (!admin || !admin.isActive) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found or inactive.' 
      });
    }

    // Attach admin info to request
    req.admin = admin;
    req.token = token;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Authentication failed.' 
    });
  }
};

/**
 * Log audit trail for security tracking
 */
const logAudit = async (adminId, action, resourceType, resourceId, oldValues, newValues, req) => {
  try {
    await AuditLog.create({
      adminId: adminId || null,
      action,
      resourceType,
      resourceId: resourceId || null,
      oldValues,
      newValues,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent')
    });
  } catch (error) {
    console.error('Audit log error:', error);
    // Don't fail the request if audit log fails
  }
};

module.exports = {
  generateToken,
  verifyToken,
  authenticateToken,
  logAudit
};
