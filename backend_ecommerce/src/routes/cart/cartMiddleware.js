import { ApiError } from "../../commons/errors.js";

const validateProductId = (req, res, next) => {
  const body = req.body;
  if (body === null || body === undefined) {
    throw new ApiError(
      400,
      -1,
      req.originalUrl,
      "Object cannot be null or empty"
    );
  } else if (!("id" in body)) {
    throw new ApiError(404, -2, req.originalUrl, "Product ID not found");
  }
  next();
};

export { validateProductId };
