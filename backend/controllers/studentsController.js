const mongoose = require('mongoose')

const Student = require('../models/Student')

function buildValidationError(message, details = []) {
  return {
    success: false,
    message,
    errors: details,
  }
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function validatePhone(phone) {
  return /^[0-9+\-()\s]{7,20}$/.test(phone)
}

function validatePayload(payload, { partial = false } = {}) {
  const errors = []
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'courseId', 'batchId']

  for (const field of requiredFields) {
    if (!partial && !payload[field]) {
      errors.push(`${field} is required`)
    }
  }

  if (payload.firstName !== undefined && !normalizeText(payload.firstName)) {
    errors.push('firstName cannot be empty')
  }

  if (payload.lastName !== undefined && !normalizeText(payload.lastName)) {
    errors.push('lastName cannot be empty')
  }

  if (payload.email !== undefined) {
    const email = normalizeText(payload.email).toLowerCase()
    if (!email) {
      errors.push('email cannot be empty')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('email format is invalid')
    }
  }

  if (payload.phone !== undefined) {
    const phone = normalizeText(payload.phone)
    if (!phone) {
      errors.push('phone cannot be empty')
    } else if (!validatePhone(phone)) {
      errors.push('phone format is invalid')
    }
  }

  if (payload.courseId !== undefined && !mongoose.isValidObjectId(payload.courseId)) {
    errors.push('courseId must be a valid MongoDB ObjectId')
  }

  if (payload.batchId !== undefined && !mongoose.isValidObjectId(payload.batchId)) {
    errors.push('batchId must be a valid MongoDB ObjectId')
  }

  if (payload.attendance !== undefined) {
    const attendance = Number(payload.attendance)
    if (Number.isNaN(attendance)) {
      errors.push('attendance must be a number')
    } else if (attendance < 0 || attendance > 100) {
      errors.push('attendance must be between 0 and 100')
    }
  }

  if (payload.placementStatus !== undefined) {
    const allowedPlacementStatuses = ['not-placed', 'in-progress', 'interviewing', 'placed']
    if (!allowedPlacementStatuses.includes(payload.placementStatus)) {
      errors.push(`placementStatus must be one of: ${allowedPlacementStatuses.join(', ')}`)
    }
  }

  if (payload.status !== undefined) {
    const allowedStatuses = ['active', 'inactive', 'graduated', 'suspended']
    if (!allowedStatuses.includes(payload.status)) {
      errors.push(`status must be one of: ${allowedStatuses.join(', ')}`)
    }
  }

  return errors
}

function mapStudentPayload(payload, existing = {}) {
  const student = {}

  if (payload.firstName !== undefined) {
    student.firstName = normalizeText(payload.firstName)
  }

  if (payload.lastName !== undefined) {
    student.lastName = normalizeText(payload.lastName)
  }

  if (payload.email !== undefined) {
    student.email = normalizeText(payload.email).toLowerCase()
  }

  if (payload.phone !== undefined) {
    student.phone = normalizeText(payload.phone)
  }

  if (payload.courseId !== undefined) {
    student.courseId = payload.courseId
  }

  if (payload.batchId !== undefined) {
    student.batchId = payload.batchId
  }

  if (payload.placementStatus !== undefined) {
    student.placementStatus = payload.placementStatus
  } else if (existing.placementStatus === undefined) {
    student.placementStatus = 'not-placed'
  }

  if (payload.attendance !== undefined) {
    student.attendance = Number(payload.attendance)
  } else if (existing.attendance === undefined) {
    student.attendance = 0
  }

  if (payload.status !== undefined) {
    student.status = payload.status
  } else if (existing.status === undefined) {
    student.status = 'active'
  }

  return student
}

async function getStudents(req, res) {
  try {
    const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1)
    const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 100)
    const q = normalizeText(req.query.q || '')

    const filters = {}

    if (q) {
      filters.$or = [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } },
      ]
    }

    if (req.query.status) {
      filters.status = req.query.status
    }

    if (req.query.placementStatus) {
      filters.placementStatus = req.query.placementStatus
    }

    const skip = (page - 1) * limit

    const [students, total] = await Promise.all([
      Student.find(filters)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Student.countDocuments(filters),
    ])

    return res.status(200).json({
      success: true,
      data: students,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch students',
    })
  }
}

async function getStudentById(req, res) {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json(buildValidationError('Invalid student id'))
    }

    const student = await Student.findById(id)

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: student,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch student',
    })
  }
}

async function createStudent(req, res) {
  try {
    const validationErrors = validatePayload(req.body)

    if (validationErrors.length > 0) {
      return res.status(400).json(
        buildValidationError('Validation failed', validationErrors),
      )
    }

    const email = normalizeText(req.body.email).toLowerCase()
    const existingStudent = await Student.findOne({ email })

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email already exists',
      })
    }

    const student = await Student.create(
      mapStudentPayload({
        ...req.body,
        email,
      }),
    )

    return res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student,
    })
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate field value',
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to create student',
    })
  }
}

async function updateStudent(req, res) {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json(buildValidationError('Invalid student id'))
    }

    const validationErrors = validatePayload(req.body, { partial: true })

    if (validationErrors.length > 0) {
      return res.status(400).json(
        buildValidationError('Validation failed', validationErrors),
      )
    }

    if (req.body.email) {
      const email = normalizeText(req.body.email).toLowerCase()
      const existingStudent = await Student.findOne({
        email,
        _id: { $ne: id },
      })

      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Student with this email already exists',
        })
      }
      req.body.email = email
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      mapStudentPayload(req.body),
      {
        new: true,
        runValidators: true,
      },
    )

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent,
    })
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate field value',
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to update student',
    })
  }
}

async function deleteStudent(req, res) {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json(buildValidationError('Invalid student id'))
    }

    const deletedStudent = await Student.findByIdAndDelete(id)

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete student',
    })
  }
}

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
}
