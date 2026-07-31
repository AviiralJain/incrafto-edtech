const User = require('../models/User')
const Student = require('../models/Student')
const Placement = require('../models/Placement')
const Assignment = require('../models/Assignment')
const Content = require('../models/Content')

/**
 * GET /api/student/dashboard
 *
 * Returns all data required by the student dashboard in a single response.
 * Auth: protect() + authorizeRoles('student') applied in the route file.
 *
 * Response contract (always consistent shape):
 *   - profile     : always present (authentication guarantees a valid User exists)
 *   - student     : Student document or null (if no Student record matches the User email)
 *   - course      : populated Course or null
 *   - batch       : populated Batch or null
 *   - placement   : Placement document or null
 *   - assignments : array (empty if none)
 *   - content     : array (empty if none)
 *
 * HTTP status:
 *   200 — authenticated request, shape always consistent
 *   401 — no/invalid token (handled by protect() before this function runs)
 *   403 — wrong role (handled by authorizeRoles() before this function runs)
 *   500 — genuine server/database failure only
 */
async function getStudentDashboard(req, res) {
  try {
    // ── Step 1: Resolve the authenticated User by the id embedded in the JWT ──
    // req.user is set by protect() and contains { id, role }
    const user = await User.findById(req.user.id).select('-password')

    if (!user) {
      // This should never happen if protect() succeeded, but guard defensively
      return res.status(401).json({
        success: false,
        message: 'Authenticated user not found',
      })
    }

    // ── Step 2: Look up the Student record by email (the only link between ──
    // the User and Student collections — no foreign key exists)
    // Populate courseId and batchId in the same query to avoid extra round trips.
    const student = await Student.findOne({
      email: user.email.trim().toLowerCase(),
    })
      .populate('courseId', 'name description status')
      .populate('batchId', 'name startDate endDate status')

    // ── Step 3: Run remaining queries in parallel ─────────────────────────────
    // Placement lookup only makes sense if we have a Student._id.
    // Assignment and Content are independent of the Student record.
    const [placement, assignments, content] = await Promise.all([
      student
        ? Placement.findOne({ studentId: student._id })
        : Promise.resolve(null),
      Assignment.find().sort({ createdAt: -1 }).limit(10),
      Content.find().sort({ createdAt: -1 }).limit(20),
    ])

    // ── Step 4: Assemble consistent response ──────────────────────────────────
    // Shape is always identical regardless of which records exist.
    // Null is used for missing objects; [] is used for missing arrays.
    return res.status(200).json({
      success: true,
      data: {
        profile: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        student: student
          ? {
              attendance: student.attendance,
              placementStatus: student.placementStatus,
              status: student.status,
            }
          : null,
        course: student?.courseId
          ? {
              name: student.courseId.name,
              description: student.courseId.description,
              status: student.courseId.status,
            }
          : null,
        batch: student?.batchId
          ? {
              name: student.batchId.name,
              startDate: student.batchId.startDate,
              endDate: student.batchId.endDate,
              status: student.batchId.status,
            }
          : null,
        placement: placement
          ? {
              company: placement.company,
              package: placement.package,
              role: placement.role,
              status: placement.status,
              placementDate: placement.placementDate,
            }
          : null,
        assignments: assignments.map((a) => ({
          _id: a._id,
          title: a.title,
          dueDate: a.dueDate,
          submissions: a.submissions,
          totalStudents: a.totalStudents,
          status: a.status,
        })),
        content: content.map((c) => ({
          _id: c._id,
          title: c.title,
          description: c.description,
          type: c.type,
          className: c.className,
          week: c.week,
          fileName: c.fileName,
          uploadedBy: c.uploadedBy,
        })),
      },
    })
  } catch (err) {
    console.error('STUDENT DASHBOARD ERROR:', err)
    return res.status(500).json({
      success: false,
      message: 'Server error loading student dashboard',
    })
  }
}

module.exports = { getStudentDashboard }
