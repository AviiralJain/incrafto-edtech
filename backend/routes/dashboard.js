const express = require('express')

const { getAdminDashboardSummary } = require('../controllers/dashboardController')
const { protect } = require('../middleware/authMiddleware')
const { requireAdmin } = require('../middleware/adminMiddleware')

const router = express.Router()

router.use(protect)
router.use(requireAdmin)

router.get('/summary', getAdminDashboardSummary)

module.exports = router
