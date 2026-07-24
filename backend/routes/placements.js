const express = require('express')

const {
  getPlacements,
  getPlacementById,
  createPlacement,
  updatePlacement,
  deletePlacement,
} = require('../controllers/placementsController')
const { protect } = require('../middleware/authMiddleware')
const { requireAdmin } = require('../middleware/adminMiddleware')

const router = express.Router()

router.use(protect)
router.use(requireAdmin)

router.get('/', getPlacements)
router.get('/:id', getPlacementById)
router.post('/', createPlacement)
router.put('/:id', updatePlacement)
router.delete('/:id', deletePlacement)

module.exports = router
