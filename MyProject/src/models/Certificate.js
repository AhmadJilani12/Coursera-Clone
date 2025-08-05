const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course is required']
  },
  completionDate: {
    type: Date,
    required: [true, 'Completion date is required']
  },
  issuedDate: {
    type: Date,
    default: Date.now
  },
  grade: {
    type: String,
    enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F', 'Pass', 'Fail'],
    default: 'Pass'
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  completionRate: {
    type: Number,
    min: 0,
    max: 100,
    required: true
  },
  totalLessons: {
    type: Number,
    required: true
  },
  completedLessons: {
    type: Number,
    required: true
  },
  totalDuration: {
    type: Number,
    required: true
  },
  completedDuration: {
    type: Number,
    required: true
  },
  certificateUrl: {
    type: String,
    required: true
  },
  certificatePdf: {
    public_id: String,
    url: String
  },
  verificationUrl: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedAt: Date,
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  template: {
    type: String,
    default: 'default'
  },
  customFields: {
    type: Map,
    of: String
  },
  metadata: {
    type: Map,
    of: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  revokedAt: Date,
  revokedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  revocationReason: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for certificate status
certificateSchema.virtual('isRevoked').get(function() {
  return !!this.revokedAt;
});

// Virtual for certificate validity
certificateSchema.virtual('isValid').get(function() {
  return this.isActive && !this.isRevoked;
});

// Virtual for certificate age
certificateSchema.virtual('ageInDays').get(function() {
  return Math.floor((new Date() - this.issuedDate) / (1000 * 60 * 60 * 24));
});

// Indexes for better query performance
certificateSchema.index({ certificateId: 1 });
certificateSchema.index({ user: 1 });
certificateSchema.index({ course: 1 });
certificateSchema.index({ issuedDate: -1 });
certificateSchema.index({ completionDate: -1 });
certificateSchema.index({ isVerified: 1 });
certificateSchema.index({ isActive: 1 });

// Pre-save middleware to generate certificate ID
certificateSchema.pre('save', function(next) {
  if (this.isNew && !this.certificateId) {
    this.certificateId = 'CERT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

// Method to verify certificate
certificateSchema.methods.verify = function(verifiedBy) {
  this.isVerified = true;
  this.verifiedAt = new Date();
  this.verifiedBy = verifiedBy;
  return this.save();
};

// Method to revoke certificate
certificateSchema.methods.revoke = function(revokedBy, reason) {
  this.isActive = false;
  this.revokedAt = new Date();
  this.revokedBy = revokedBy;
  this.revocationReason = reason;
  return this.save();
};

// Method to reactivate certificate
certificateSchema.methods.reactivate = function() {
  this.isActive = true;
  this.revokedAt = null;
  this.revokedBy = null;
  this.revocationReason = null;
  return this.save();
};

// Static method to get certificates by user
certificateSchema.statics.getCertificatesByUser = function(userId, limit = 20) {
  return this.find({ user: userId, isActive: true })
    .populate('course', 'title thumbnail instructor')
    .sort({ issuedDate: -1 })
    .limit(limit);
};

// Static method to get certificates by course
certificateSchema.statics.getCertificatesByCourse = function(courseId, limit = 50) {
  return this.find({ course: courseId, isActive: true })
    .populate('user', 'firstName lastName email')
    .sort({ issuedDate: -1 })
    .limit(limit);
};

// Static method to verify certificate by ID
certificateSchema.statics.verifyCertificate = function(certificateId) {
  return this.findOne({ 
    certificateId, 
    isActive: true 
  })
  .populate('user', 'firstName lastName email')
  .populate('course', 'title instructor')
  .populate('instructor', 'firstName lastName');
};

// Static method to get certificate statistics
certificateSchema.statics.getCertificateStats = function(startDate, endDate) {
  const matchStage = {
    issuedDate: {
      $gte: startDate,
      $lte: endDate
    },
    isActive: true
  };

  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalCertificates: { $sum: 1 },
        averageScore: { $avg: '$score' },
        averageCompletionRate: { $avg: '$completionRate' }
      }
    }
  ]);
};

module.exports = mongoose.model('Certificate', certificateSchema); 