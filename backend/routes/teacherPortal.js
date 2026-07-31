const express = require('express')
const { protect, authorizeRoles } = require('../middleware/authMiddleware')
const { getTeacherDashboard } = require('../controllers/teacherPortalController')

const router = express.Router()

// GET /api/teacher/dashboard
// Auth: valid JWT required (protect) + role must be 'teacher' (authorizeRoles)
router.get('/dashboard', protect, authorizeRoles('teacher'), getTeacherDashboard)

module.exports = router
