import Express from "express";
import { ApiError } from "../../commons/errors.js";
import { validateUserRole } from "../security/securityMiddleware.js";
import { RepositoryFactory } from "../../repository/RepositoryFactory.js";
import { validateProduct } from "./productsMiddleware.js";

const storage = process.env.STORAGE || "file";

let productsService;
(async () => {
  productsService = await RepositoryFactory.getRepository("Product", storage);
})();

const ProductRoutes = new Express.Router();

ProductRoutes.get("/:id?", async (req, res, next) => {
  try {
    if (req.params["id"] !== undefined) {
      const id = parseInt(req.params.id);
      const prod = await productsService.getById(id);
      if (prod === null) {
        throw new ApiError(404, -2, req.originalUrl, "Product not found");
      } else {
        res.json(prod);
      }
    } else {
      return res.json(await productsService.getAll());
    }
  } catch (error) {
    next(error);
  }
});

ProductRoutes.post(
  "/",
  validateUserRole,
  validateProduct,
  async (req, res, next) => {
    try {
      let prod = req.body;
      prod.timestamp = Date.now();
      const result = await productsService.save(prod);
      res.status(200).json({ created_id: result });
    } catch (error) {
      next(error);
    }
  }
);

ProductRoutes.put(
  "/:id",
  validateUserRole,
  validateProduct,
  async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const prod = req.body;
      const result = await productsService.update(id, prod);
      if (result === null) {
        throw new ApiError(404, -2, req.originalUrl, "Product not found");
      }
      res.status(200).json({ updated_id: result });
    } catch (error) {
      next(error);
    }
  }
);

ProductRoutes.delete("/:id", validateUserRole, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await productsService.deleteById(id);
    if (result === null) {
      throw new ApiError(404, -2, req.originalUrl, "Product not found");
    }
    res.status(200).json({ deleted_id: result });
  } catch (error) {
    next(error);
  }
});

export { ProductRoutes };
