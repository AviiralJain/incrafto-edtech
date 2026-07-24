const mongoose = require('mongoose')

const placementSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    package: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'interviewing', 'offered', 'placed', 'rejected'],
      default: 'pending',
    },
    placementDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Placement', placementSchema)
