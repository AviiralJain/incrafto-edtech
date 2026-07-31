const User = require('../models/User')
const Teacher = require('../models/Teacher')
const Student = require('../models/Student')
const Batch = require('../models/Batch')
const Assignment = require('../models/Assignment')
const Content = require('../models/Content')

/**
 * GET /api/teacher/dashboard
 *
 * Returns all data required by the teacher dashboard in a single response.
 * Auth: protect() + authorizeRoles('teacher') applied in the route file.
 *
 * Response contract (always consistent shape):
 *   - profile        : always present (authentication guarantees a valid User exists)
 *   - teacher        : Teacher document or null (if no Teacher record matches the User email)
 *   - stats          : always present; all counts default to 0 if collections are empty
 *   - batches        : array (empty if none) — system-wide (no teacherId on Batch model)
 *   - assignments    : array (empty if none) — system-wide (no teacherId on Assignment model)
 *   - recentStudents : array (empty if none) — most recent active students
 *
 * Architectural note:
 *   Batch, Student, and Assignment have no teacherId field. All lists and counts
 *   are therefore system-wide for the current phase. This is an accepted limitation
 *   documented in the Phase 3 implementation plan.
 *
 * HTTP status:
 *   200 — authenticated request, shape always consistent
 *   401 — no/invalid token (handled by protect() before this function runs)
 *   403 — wrong role (handled by authorizeRoles() before this function runs)
 *   500 — genuine server/database failure only
 */
async function getTeacherDashboard(req, res) {
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

    // ── Step 2: Look up the Teacher record by email (the only link between ──
    // the User and Teacher collections — no foreign key exists)
    const teacher = await Teacher.findOne({
      email: user.email.trim().toLowerCase(),
    })

    // ── Step 3: Run all remaining queries in parallel ─────────────────────────
    // None of these queries depend on the Teacher lookup result.
    // Promise.all() avoids sequential waterfall latency.
    const [
      totalStudents,
      activeStudents,
      totalBatches,
      totalAssignments,
      totalContent,
      batches,
      assignments,
      recentStudents,
    ] = await Promise.all([
      Student.countDocuments(),
      Student.countDocuments({ status: 'active' }),
      Batch.countDocuments(),
      Assignment.countDocuments(),
      Content.countDocuments(),
      Batch.find()
        .populate('courseId', 'name status')
        .sort({ createdAt: -1 })
        .limit(10),
      Assignment.find().sort({ createdAt: -1 }).limit(10),
      Student.find({ status: 'active' })
        .populate('courseId', 'name')
        .sort({ createdAt: -1 })
        .limit(8),
    ])

    // ── Step 4: Assemble consistent response ──────────────────────────────────
    // Shape is always identical regardless of which records exist.
    // Null is used for missing objects; [] is used for missing arrays.
    // stats always returns an object — counts default to 0 if collections are empty.
    return res.status(200).json({
      success: true,
      data: {
        profile: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
        teacher: teacher
          ? {
              firstName: teacher.firstName,
              lastName: teacher.lastName,
              specialization: teacher.specialization,
              status: teacher.status,
            }
          : null,
        stats: {
          totalStudents,
          activeStudents,
          totalBatches,
          totalAssignments,
          totalContent,
        },
        batches: batches.map((b) => ({
          _id: b._id,
          name: b.name,
          course: b.courseId
            ? { name: b.courseId.name, status: b.courseId.status }
            : null,
          startDate: b.startDate,
          endDate: b.endDate,
          status: b.status,
        })),
        assignments: assignments.map((a) => ({
          _id: a._id,
          title: a.title,
          dueDate: a.dueDate,
          submissions: a.submissions,
          totalStudents: a.totalStudents,
          status: a.status,
        })),
        recentStudents: recentStudents.map((s) => ({
          _id: s._id,
          firstName: s.firstName,
          lastName: s.lastName,
          email: s.email,
          course: s.courseId ? { name: s.courseId.name } : null,
          attendance: s.attendance,
          placementStatus: s.placementStatus,
          status: s.status,
        })),
      },
    })
  } catch (err) {
    console.error('TEACHER DASHBOARD ERROR:', err)
    return res.status(500).json({
      success: false,
      message: 'Server error loading teacher dashboard',
    })
  }
}

module.exports = { getTeacherDashboard }
