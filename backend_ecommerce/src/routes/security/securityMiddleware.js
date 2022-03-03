import { ApiError } from "../../commons/errors.js";

const validateUserRole = (req, res, next) => {
  const adminProfile = req.query.admin;

  if (adminProfile === null || adminProfile === undefined) {
    throw new ApiError(
      401,
      -10,
      req.originalUrl,
      "User not authorized for this operation"
    );
  }
  next();
};

export { validateUserRole };
