const mongoose = require('mongoose')

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function buildValidationError(message, details = []) {
  return {
    success: false,
    message,
    errors: details,
  }
}

function paginateQuery(query, req, sort = { createdAt: -1 }) {
  const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1)
  const limit = Math.min(Math.max(Number.parseInt(req.query.limit, 10) || 10, 1), 100)
  const skip = (page - 1) * limit

  return {
    page,
    limit,
    skip,
    query: query.sort(sort).skip(skip).limit(limit),
  }
}

function buildPagination(page, limit, total) {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  }
}

function isValidObjectId(value) {
  return mongoose.isValidObjectId(value)
}

function validatePhone(phone) {
  return /^[0-9+\-()\s]{7,20}$/.test(phone)
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

module.exports = {
  normalizeText,
  buildValidationError,
  paginateQuery,
  buildPagination,
  isValidObjectId,
  validatePhone,
  validateEmail,
}
