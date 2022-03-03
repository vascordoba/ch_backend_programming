class ApiError extends Error {
  constructor(status, code, path, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.path = path;
  }
}

export { ApiError };
