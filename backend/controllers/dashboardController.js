const Student = require('../models/Student')
const Teacher = require('../models/Teacher')
const Course = require('../models/Course')
const Batch = require('../models/Batch')
const Placement = require('../models/Placement')

async function getAdminDashboardSummary(req, res) {
  try {
    const [totalStudents, totalTeachers, totalCourses, totalBatches, totalPlacements] =
      await Promise.all([
        Student.countDocuments(),
        Teacher.countDocuments(),
        Course.countDocuments(),
        Batch.countDocuments(),
        Placement.countDocuments(),
      ])

    return res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalTeachers,
        totalCourses,
        totalBatches,
        totalPlacements,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to load dashboard summary',
    })
  }
}

module.exports = {
  getAdminDashboardSummary,
}
