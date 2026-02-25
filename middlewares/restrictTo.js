const APIError = require("../utils/APIError");
//TODO:
const restrictTo = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new APIError(
        "You do not have permission to perform this action",
        403,
      );
    }
    next();
  };
};

module.exports = restrictTo;
