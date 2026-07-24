const express = require('express')

const {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} = require('../controllers/teachersController')
const { protect } = require('../middleware/authMiddleware')
const { requireAdmin } = require('../middleware/adminMiddleware')

const router = express.Router()

router.use(protect)
router.use(requireAdmin)

router.get('/', getTeachers)
router.get('/:id', getTeacherById)
router.post('/', createTeacher)
router.put('/:id', updateTeacher)
router.delete('/:id', deleteTeacher)

module.exports = router
