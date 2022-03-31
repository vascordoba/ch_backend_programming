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

class RepoError extends Error {
  constructor(code, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RepoError);
    }

    this.name = "RepoError";
    this.code = code;
  }
}

export { ApiError, RepoError };
