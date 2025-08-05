const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: [true, 'Order amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'paypal', 'bank_transfer', 'crypto'],
    required: [true, 'Payment method is required']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  stripePaymentIntentId: String,
  paypalPaymentId: String,
  transactionId: String,
  refundId: String,
  refundReason: String,
  refundAmount: Number,
  refundedAt: Date,
  billingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  taxAmount: {
    type: Number,
    default: 0
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  couponCode: String,
  couponDiscount: {
    type: Number,
    default: 0
  },
  subtotal: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  notes: String,
  metadata: {
    type: Map,
    of: String
  },
  ipAddress: String,
  userAgent: String,
  paymentAttempts: {
    type: Number,
    default: 0
  },
  lastPaymentAttempt: Date,
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for order status
orderSchema.virtual('isPaid').get(function() {
  return this.paymentStatus === 'completed';
});

// Virtual for order status
orderSchema.virtual('isRefunded').get(function() {
  return this.paymentStatus === 'refunded';
});

// Virtual for order status
orderSchema.virtual('isExpired').get(function() {
  return this.expiresAt && new Date() > this.expiresAt;
});

// Indexes for better query performance
orderSchema.index({ user: 1 });
orderSchema.index({ course: 1 });
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ stripePaymentIntentId: 1 });
orderSchema.index({ paypalPaymentId: 1 });

// Pre-save middleware to generate order number
orderSchema.pre('save', function(next) {
  if (this.isNew && !this.orderNumber) {
    this.orderNumber = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }
  next();
});

// Method to calculate totals
orderSchema.methods.calculateTotals = function() {
  this.subtotal = this.amount;
  this.total = this.subtotal + this.taxAmount - this.discountAmount - this.couponDiscount;
  return this.total;
};

// Method to mark as paid
orderSchema.methods.markAsPaid = function(transactionId) {
  this.paymentStatus = 'completed';
  this.orderStatus = 'confirmed';
  this.transactionId = transactionId;
  this.paidAt = new Date();
  return this.save();
};

// Method to mark as refunded
orderSchema.methods.markAsRefunded = function(refundId, refundAmount, reason) {
  this.paymentStatus = 'refunded';
  this.refundId = refundId;
  this.refundAmount = refundAmount;
  this.refundReason = reason;
  this.refundedAt = new Date();
  return this.save();
};

// Method to increment payment attempts
orderSchema.methods.incrementPaymentAttempts = function() {
  this.paymentAttempts += 1;
  this.lastPaymentAttempt = new Date();
  return this.save();
};

// Static method to get orders by user
orderSchema.statics.getOrdersByUser = function(userId, limit = 20) {
  return this.find({ user: userId })
    .populate('course', 'title thumbnail price')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to get orders by status
orderSchema.statics.getOrdersByStatus = function(status, limit = 50) {
  return this.find({ paymentStatus: status })
    .populate('user', 'firstName lastName email')
    .populate('course', 'title')
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Static method to get revenue statistics
orderSchema.statics.getRevenueStats = function(startDate, endDate) {
  const matchStage = {
    paymentStatus: 'completed',
    createdAt: {
      $gte: startDate,
      $lte: endDate
    }
  };

  return this.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$total' },
        totalOrders: { $sum: 1 },
        averageOrderValue: { $avg: '$total' }
      }
    }
  ]);
};

module.exports = mongoose.model('Order', orderSchema); 