const { authorizeRoles } = require('./authMiddleware')

const requireAdmin = authorizeRoles('admin')

module.exports = {
  requireAdmin,
}
