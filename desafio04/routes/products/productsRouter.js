import Express from "express";
import { ProductosManager } from "../../model/products/products.js";
import { validateProduct, ApiError } from "./productsMiddleware.js";

const productsService = new ProductosManager();

const ProductRoutes = new Express.Router();

ProductRoutes.get("/", (req, res) => {
  res.json(productsService.getAll());
});

ProductRoutes.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const prod = productsService.getById(id);
  if (prod === null) {
    throw new ApiError("Product not found");
  } else {
    res.json(prod);
  }
});

ProductRoutes.post("/", validateProduct, (req, res) => {
  console.log("BODY", req.body);
  const prod = req.body;
  const result = productsService.save(prod);
  res.status(200).json({ created_id: result });
});

ProductRoutes.put("/:id", validateProduct, (req, res) => {
  const id = parseInt(req.params.id);
  const prod = req.body;
  const result = productsService.update(id, prod);
  if (result === null) {
    throw new ApiError("Product not found");
  }
  res.status(200).json({ updated_id: result });
});

ProductRoutes.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = productsService.deleteById(id);
  if (result === null) {
    throw new ApiError("Product not found");
  }
  res.status(200).json({ deleted_id: result });
});

export { ProductRoutes };
