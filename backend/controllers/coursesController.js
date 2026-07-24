const Course = require('../models/Course')
const {
  buildValidationError,
  normalizeText,
  paginateQuery,
  buildPagination,
  isValidObjectId,
} = require('../utils/apiHelpers')

function validateCoursePayload(payload, { partial = false } = {}) {
  const errors = []

  if (!partial && !payload.name) errors.push('name is required')

  if (payload.name !== undefined && !normalizeText(payload.name)) {
    errors.push('name cannot be empty')
  }

  if (payload.status !== undefined) {
    const statuses = ['active', 'inactive', 'draft']
    if (!statuses.includes(payload.status)) {
      errors.push(`status must be one of: ${statuses.join(', ')}`)
    }
  }

  return errors
}

function mapCoursePayload(payload, existing = {}) {
  const course = {}
  if (payload.name !== undefined) course.name = normalizeText(payload.name)
  if (payload.description !== undefined) course.description = normalizeText(payload.description)
  else if (existing.description === undefined) course.description = ''
  if (payload.status !== undefined) course.status = payload.status
  else if (existing.status === undefined) course.status = 'active'
  return course
}

async function getCourses(req, res) {
  try {
    const q = normalizeText(req.query.q || '')
    const filters = {}

    if (q) {
      filters.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ]
    }

    if (req.query.status) filters.status = req.query.status

    const { page, limit, query } = paginateQuery(Course.find(filters), req)
    const [courses, total] = await Promise.all([query, Course.countDocuments(filters)])

    return res.status(200).json({
      success: true,
      data: courses,
      pagination: buildPagination(page, limit, total),
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch courses' })
  }
}

async function getCourseById(req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json(buildValidationError('Invalid course id'))

    const course = await Course.findById(id)
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' })

    return res.status(200).json({ success: true, data: course })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch course' })
  }
}

async function createCourse(req, res) {
  try {
    const errors = validateCoursePayload(req.body)
    if (errors.length) return res.status(400).json(buildValidationError('Validation failed', errors))

    const course = await Course.create(mapCoursePayload(req.body))
    return res.status(201).json({ success: true, message: 'Course created successfully', data: course })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create course' })
  }
}

async function updateCourse(req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json(buildValidationError('Invalid course id'))

    const errors = validateCoursePayload(req.body, { partial: true })
    if (errors.length) return res.status(400).json(buildValidationError('Validation failed', errors))

    const updatedCourse = await Course.findByIdAndUpdate(id, mapCoursePayload(req.body), {
      new: true,
      runValidators: true,
    })

    if (!updatedCourse) return res.status(404).json({ success: false, message: 'Course not found' })

    return res.status(200).json({ success: true, message: 'Course updated successfully', data: updatedCourse })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update course' })
  }
}

async function deleteCourse(req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json(buildValidationError('Invalid course id'))

    const deletedCourse = await Course.findByIdAndDelete(id)
    if (!deletedCourse) return res.status(404).json({ success: false, message: 'Course not found' })

    return res.status(200).json({ success: true, message: 'Course deleted successfully', data: deletedCourse })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete course' })
  }
}

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
}
