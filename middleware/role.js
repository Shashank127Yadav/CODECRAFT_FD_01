const roleCheck = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ msg: "Access denied: insufficient rights" });
    }
    next();
  };
};
module.exports = roleCheck;
