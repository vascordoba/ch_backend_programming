class ApiError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = "ApiError";
    this.status = 500;
  }
}

const validateProduct = (req, res, next) => {
  const p = req.body;
  if (p === null || p === undefined) {
    throw new ApiError("Object cannot be null or empty");
  } else if (!("title" in p) || !("price" in p) || !("thumbnail" in p)) {
    throw new ApiError("Product object not found");
  }
  next();
};

export { validateProduct, ApiError };
