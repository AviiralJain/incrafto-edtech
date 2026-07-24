const express = require('express')

const {
  getBatches,
  getBatchById,
  createBatch,
  updateBatch,
  deleteBatch,
} = require('../controllers/batchesController')
const { protect } = require('../middleware/authMiddleware')
const { requireAdmin } = require('../middleware/adminMiddleware')

const router = express.Router()

router.use(protect)
router.use(requireAdmin)

router.get('/', getBatches)
router.get('/:id', getBatchById)
router.post('/', createBatch)
router.put('/:id', updateBatch)
router.delete('/:id', deleteBatch)

module.exports = router
