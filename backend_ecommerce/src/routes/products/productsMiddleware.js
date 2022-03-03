import { ApiError } from "../../commons/errors.js";

const validateProduct = (req, res, next) => {
  const p = req.body;
  if (p === null || p === undefined) {
    throw new ApiError(
      400,
      -1,
      req.originalUrl,
      "Object cannot be null or empty"
    );
  } else if (
    !("nombre" in p) ||
    !("descripcion" in p) ||
    !("codigo" in p) ||
    !("foto" in p) ||
    !("precio" in p) ||
    !("stock" in p)
  ) {
    throw new ApiError(
      404,
      -2,
      req.originalUrl,
      "Product object not identified"
    );
  }
  next();
};
export { validateProduct };
