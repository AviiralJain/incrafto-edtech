const mongoose = require('mongoose')

const Batch = require('../models/Batch')
const Course = require('../models/Course')
const {
  buildValidationError,
  normalizeText,
  paginateQuery,
  buildPagination,
  isValidObjectId,
} = require('../utils/apiHelpers')

function validateBatchPayload(payload, { partial = false } = {}) {
  const errors = []
  const requiredFields = ['name', 'courseId', 'startDate', 'endDate']

  for (const field of requiredFields) {
    if (!partial && !payload[field]) errors.push(`${field} is required`)
  }

  if (payload.name !== undefined && !normalizeText(payload.name)) {
    errors.push('name cannot be empty')
  }

  if (payload.courseId !== undefined && !mongoose.isValidObjectId(payload.courseId)) {
    errors.push('courseId must be a valid MongoDB ObjectId')
  }

  if (payload.startDate !== undefined && Number.isNaN(Date.parse(payload.startDate))) {
    errors.push('startDate must be a valid date')
  }

  if (payload.endDate !== undefined && Number.isNaN(Date.parse(payload.endDate))) {
    errors.push('endDate must be a valid date')
  }

  if (payload.status !== undefined) {
    const statuses = ['upcoming', 'ongoing', 'completed', 'paused']
    if (!statuses.includes(payload.status)) {
      errors.push(`status must be one of: ${statuses.join(', ')}`)
    }
  }

  return errors
}

async function ensureCourseExists(courseId) {
  return Course.findById(courseId)
}

function mapBatchPayload(payload, existing = {}) {
  const batch = {}
  if (payload.name !== undefined) batch.name = normalizeText(payload.name)
  if (payload.courseId !== undefined) batch.courseId = payload.courseId
  if (payload.startDate !== undefined) batch.startDate = new Date(payload.startDate)
  if (payload.endDate !== undefined) batch.endDate = new Date(payload.endDate)
  if (payload.status !== undefined) batch.status = payload.status
  else if (existing.status === undefined) batch.status = 'upcoming'
  return batch
}

async function getBatches(req, res) {
  try {
    const q = normalizeText(req.query.q || '')
    const filters = {}

    if (q) {
      filters.$or = [
        { name: { $regex: q, $options: 'i' } },
        { status: { $regex: q, $options: 'i' } },
      ]
    }

    if (req.query.status) filters.status = req.query.status
    if (req.query.courseId && isValidObjectId(req.query.courseId)) filters.courseId = req.query.courseId

    const { page, limit, query } = paginateQuery(Batch.find(filters).populate('courseId'), req)
    const [batches, total] = await Promise.all([query, Batch.countDocuments(filters)])

    return res.status(200).json({
      success: true,
      data: batches,
      pagination: buildPagination(page, limit, total),
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch batches' })
  }
}

async function getBatchById(req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json(buildValidationError('Invalid batch id'))

    const batch = await Batch.findById(id).populate('courseId')
    if (!batch) return res.status(404).json({ success: false, message: 'Batch not found' })

    return res.status(200).json({ success: true, data: batch })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch batch' })
  }
}

async function createBatch(req, res) {
  try {
    const errors = validateBatchPayload(req.body)
    if (errors.length) return res.status(400).json(buildValidationError('Validation failed', errors))

    const course = await ensureCourseExists(req.body.courseId)
    if (!course) return res.status(400).json({ success: false, message: 'Referenced course not found' })

    const batch = await Batch.create(mapBatchPayload(req.body))
    return res.status(201).json({ success: true, message: 'Batch created successfully', data: batch })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create batch' })
  }
}

async function updateBatch(req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json(buildValidationError('Invalid batch id'))

    const errors = validateBatchPayload(req.body, { partial: true })
    if (errors.length) return res.status(400).json(buildValidationError('Validation failed', errors))

    if (req.body.courseId) {
      const course = await ensureCourseExists(req.body.courseId)
      if (!course) return res.status(400).json({ success: false, message: 'Referenced course not found' })
    }

    const updatedBatch = await Batch.findByIdAndUpdate(id, mapBatchPayload(req.body), {
      new: true,
      runValidators: true,
    }).populate('courseId')

    if (!updatedBatch) return res.status(404).json({ success: false, message: 'Batch not found' })

    return res.status(200).json({ success: true, message: 'Batch updated successfully', data: updatedBatch })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update batch' })
  }
}

async function deleteBatch(req, res) {
  try {
    const { id } = req.params
    if (!isValidObjectId(id)) return res.status(400).json(buildValidationError('Invalid batch id'))

    const deletedBatch = await Batch.findByIdAndDelete(id)
    if (!deletedBatch) return res.status(404).json({ success: false, message: 'Batch not found' })

    return res.status(200).json({ success: true, message: 'Batch deleted successfully', data: deletedBatch })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete batch' })
  }
}

module.exports = {
  getBatches,
  getBatchById,
  createBatch,
  updateBatch,
  deleteBatch,
}
