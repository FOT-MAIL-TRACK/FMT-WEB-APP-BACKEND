// middleware/checkRole.js
const checkRole = (roles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role;

      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: "Access denied: insufficient permissions" });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Server error in role check", error });
    }
  };
};

module.exports = checkRole;
