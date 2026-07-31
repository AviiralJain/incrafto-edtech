const express = require('express')
const { protect, authorizeRoles } = require('../middleware/authMiddleware')
const { getStudentDashboard } = require('../controllers/studentPortalController')

const router = express.Router()

// GET /api/student/dashboard
// Auth: valid JWT required (protect) + role must be 'student' (authorizeRoles)
router.get('/dashboard', protect, authorizeRoles('student'), getStudentDashboard)

module.exports = router
