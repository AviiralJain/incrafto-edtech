const mongoose = require('mongoose')

const Teacher = require('../models/Teacher')
const {
  buildValidationError,
  normalizeText,
  paginateQuery,
  buildPagination,
  validateEmail,
  validatePhone,
  isValidObjectId,
} = require('../utils/apiHelpers')

function validateTeacherPayload(payload, { partial = false } = {}) {
  const errors = []
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'specialization']

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
    } else if (!validateEmail(email)) {
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

  if (payload.status !== undefined) {
    const statuses = ['active', 'inactive', 'on-leave']
    if (!statuses.includes(payload.status)) {
      errors.push(`status must be one of: ${statuses.join(', ')}`)
    }
  }

  return errors
}

function mapTeacherPayload(payload, existing = {}) {
  const teacher = {}

  if (payload.firstName !== undefined) teacher.firstName = normalizeText(payload.firstName)
  if (payload.lastName !== undefined) teacher.lastName = normalizeText(payload.lastName)
  if (payload.email !== undefined) teacher.email = normalizeText(payload.email).toLowerCase()
  if (payload.phone !== undefined) teacher.phone = normalizeText(payload.phone)
  if (payload.specialization !== undefined) teacher.specialization = normalizeText(payload.specialization)
  if (payload.status !== undefined) teacher.status = payload.status
  else if (existing.status === undefined) teacher.status = 'active'

  return teacher
}

async function getTeachers(req, res) {
  try {
    const q = normalizeText(req.query.q || '')
    const filters = {}

    if (q) {
      filters.$or = [
        { firstName: { $regex: q, $options: 'i' } },
        { lastName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { specialization: { $regex: q, $options: 'i' } },
      ]
    }

    if (req.query.status) filters.status = req.query.status

    const { page, limit, query } = paginateQuery(Teacher.find(filters), req)
    const [teachers, total] = await Promise.all([query, Teacher.countDocuments(filters)])

    return res.status(200).json({
      success: true,
      data: teachers,
      pagination: buildPagination(page, limit, total),
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch teachers' })
  }
}

async function getTeacherById(req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) {
      return res.status(400).json(buildValidationError('Invalid teacher id'))
    }

    const teacher = await Teacher.findById(id)
    if (!teacher) return res.status(404).json({ success: false, message: 'Teacher not found' })

    return res.status(200).json({ success: true, data: teacher })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch teacher' })
  }
}

async function createTeacher(req, res) {
  try {
    const errors = validateTeacherPayload(req.body)
    if (errors.length) {
      return res.status(400).json(buildValidationError('Validation failed', errors))
    }

    const email = normalizeText(req.body.email).toLowerCase()
    const existingTeacher = await Teacher.findOne({ email })
    if (existingTeacher) {
      return res.status(400).json({ success: false, message: 'Teacher with this email already exists' })
    }

    const teacher = await Teacher.create(mapTeacherPayload({ ...req.body, email }))
    return res.status(201).json({ success: true, message: 'Teacher created successfully', data: teacher })
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Duplicate field value' })
    }
    return res.status(500).json({ success: false, message: 'Failed to create teacher' })
  }
}

async function updateTeacher(req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) {
      return res.status(400).json(buildValidationError('Invalid teacher id'))
    }

    const errors = validateTeacherPayload(req.body, { partial: true })
    if (errors.length) {
      return res.status(400).json(buildValidationError('Validation failed', errors))
    }

    if (req.body.email) {
      const email = normalizeText(req.body.email).toLowerCase()
      const existingTeacher = await Teacher.findOne({ email, _id: { $ne: id } })
      if (existingTeacher) {
        return res.status(400).json({ success: false, message: 'Teacher with this email already exists' })
      }
      req.body.email = email
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, mapTeacherPayload(req.body), {
      new: true,
      runValidators: true,
    })

    if (!updatedTeacher) {
      return res.status(404).json({ success: false, message: 'Teacher not found' })
    }

    return res.status(200).json({ success: true, message: 'Teacher updated successfully', data: updatedTeacher })
  } catch (error) {
    if (error && error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Duplicate field value' })
    }
    return res.status(500).json({ success: false, message: 'Failed to update teacher' })
  }
}

async function deleteTeacher(req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) {
      return res.status(400).json(buildValidationError('Invalid teacher id'))
    }

    const deletedTeacher = await Teacher.findByIdAndDelete(id)
    if (!deletedTeacher) return res.status(404).json({ success: false, message: 'Teacher not found' })

    return res.status(200).json({ success: true, message: 'Teacher deleted successfully', data: deletedTeacher })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete teacher' })
  }
}

module.exports = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
}
