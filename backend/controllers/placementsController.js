const mongoose = require('mongoose')

const Placement = require('../models/Placement')
const Student = require('../models/Student')
const {
  buildValidationError,
  normalizeText,
  paginateQuery,
  buildPagination,
  isValidObjectId,
} = require('../utils/apiHelpers')

function validatePlacementPayload(payload, { partial = false } = {}) {
  const errors = []
  const requiredFields = ['studentId', 'company', 'package', 'role', 'placementDate']

  for (const field of requiredFields) {
    if (!partial && !payload[field]) errors.push(`${field} is required`)
  }

  if (payload.studentId !== undefined && !mongoose.isValidObjectId(payload.studentId)) {
    errors.push('studentId must be a valid MongoDB ObjectId')
  }

  if (payload.company !== undefined && !normalizeText(payload.company)) {
    errors.push('company cannot be empty')
  }

  if (payload.package !== undefined && !normalizeText(payload.package)) {
    errors.push('package cannot be empty')
  }

  if (payload.role !== undefined && !normalizeText(payload.role)) {
    errors.push('role cannot be empty')
  }

  if (payload.placementDate !== undefined && Number.isNaN(Date.parse(payload.placementDate))) {
    errors.push('placementDate must be a valid date')
  }

  if (payload.status !== undefined) {
    const statuses = ['pending', 'interviewing', 'offered', 'placed', 'rejected']
    if (!statuses.includes(payload.status)) {
      errors.push(`status must be one of: ${statuses.join(', ')}`)
    }
  }

  return errors
}

async function ensureStudentExists(studentId) {
  return Student.findById(studentId)
}

function mapPlacementPayload(payload, existing = {}) {
  const placement = {}
  if (payload.studentId !== undefined) placement.studentId = payload.studentId
  if (payload.company !== undefined) placement.company = normalizeText(payload.company)
  if (payload.package !== undefined) placement.package = normalizeText(payload.package)
  if (payload.role !== undefined) placement.role = normalizeText(payload.role)
  if (payload.status !== undefined) placement.status = payload.status
  else if (existing.status === undefined) placement.status = 'pending'
  if (payload.placementDate !== undefined) placement.placementDate = new Date(payload.placementDate)
  return placement
}

async function getPlacements(req, res) {
  try {
    const q = normalizeText(req.query.q || '')
    const filters = {}

    if (q) {
      filters.$or = [
        { company: { $regex: q, $options: 'i' } },
        { package: { $regex: q, $options: 'i' } },
        { role: { $regex: q, $options: 'i' } },
        { status: { $regex: q, $options: 'i' } },
      ]
    }

    if (req.query.status) filters.status = req.query.status
    if (req.query.studentId && isValidObjectId(req.query.studentId)) filters.studentId = req.query.studentId

    const { page, limit, query } = paginateQuery(Placement.find(filters).populate('studentId'), req)
    const [placements, total] = await Promise.all([query, Placement.countDocuments(filters)])

    return res.status(200).json({
      success: true,
      data: placements,
      pagination: buildPagination(page, limit, total),
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch placements' })
  }
}

async function getPlacementById(req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json(buildValidationError('Invalid placement id'))

    const placement = await Placement.findById(id).populate('studentId')
    if (!placement) return res.status(404).json({ success: false, message: 'Placement not found' })

    return res.status(200).json({ success: true, data: placement })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch placement' })
  }
}

async function createPlacement(req, res) {
  try {
    const errors = validatePlacementPayload(req.body)
    if (errors.length) return res.status(400).json(buildValidationError('Validation failed', errors))

    const student = await ensureStudentExists(req.body.studentId)
    if (!student) return res.status(400).json({ success: false, message: 'Referenced student not found' })

    const placement = await Placement.create(mapPlacementPayload(req.body))
    return res.status(201).json({ success: true, message: 'Placement created successfully', data: placement })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create placement' })
  }
}

async function updatePlacement(req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json(buildValidationError('Invalid placement id'))

    const errors = validatePlacementPayload(req.body, { partial: true })
    if (errors.length) return res.status(400).json(buildValidationError('Validation failed', errors))

    if (req.body.studentId) {
      const student = await ensureStudentExists(req.body.studentId)
      if (!student) return res.status(400).json({ success: false, message: 'Referenced student not found' })
    }

    const updatedPlacement = await Placement.findByIdAndUpdate(id, mapPlacementPayload(req.body), {
      new: true,
      runValidators: true,
    }).populate('studentId')

    if (!updatedPlacement) return res.status(404).json({ success: false, message: 'Placement not found' })

    return res.status(200).json({ success: true, message: 'Placement updated successfully', data: updatedPlacement })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update placement' })
  }
}

async function deletePlacement(req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json(buildValidationError('Invalid placement id'))

    const deletedPlacement = await Placement.findByIdAndDelete(id)
    if (!deletedPlacement) return res.status(404).json({ success: false, message: 'Placement not found' })

    return res.status(200).json({ success: true, message: 'Placement deleted successfully', data: deletedPlacement })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete placement' })
  }
}

module.exports = {
  getPlacements,
  getPlacementById,
  createPlacement,
  updatePlacement,
  deletePlacement,
}
