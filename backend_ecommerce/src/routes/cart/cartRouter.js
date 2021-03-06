import Express from "express";
import { ApiError } from "../../commons/errors.js";
import { RepositoryFactory } from "../../repository/RepositoryFactory.js";
import { validateProductId } from "./cartMiddleware.js";

const storage = process.env.STORAGE || "file";

let cartService, productsService;

(async () => {
  cartService = await RepositoryFactory.getRepository("Cart", storage);
  productsService = await RepositoryFactory.getRepository("Product", storage);
})();

const CartRoutes = new Express.Router();

//get cart products
CartRoutes.get("/:id/productos", async (req, res, next) => {
  try {
    if (req.params["id"] !== undefined) {
      const id = parseInt(req.params.id);
      let cart = await cartService.getById(id);
      if (cart === null) {
        throw new ApiError(404, -2, req.originalUrl, "Cart not found");
      } else {
        if (Array.isArray(cart)) {
          cart = cart[0];
        }
        res.json(cart.products);
      }
    } else {
      throw new ApiError(404, -2, req.originalUrl, "Cart not found");
    }
  } catch (error) {
    next(error);
  }
});

//create cart
CartRoutes.post("/", async (req, res, next) => {
  try {
    const cart = { timestamp: Date.now(), products: [] };
    const result = await cartService.save(cart);
    res.status(200).json({ created_id: result });
  } catch (error) {
    next(error);
  }
});

//add or update products to a cart
CartRoutes.post("/:id/productos", validateProductId, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    let prod = await productsService.getById(req.body.id);
    if (Array.isArray(prod)) {
      prod = prod[0];
    }
    if (prod === null || prod === undefined) {
      throw new ApiError(404, -2, req.originalUrl, "Product not found");
    } else if (prod.stock === 0) {
      throw new ApiError(403, -5, req.originalUrl, "Product without stock");
    }
    const result = await cartService.update(id, prod.id);
    if (result === null) {
      throw new ApiError(404, -3, req.originalUrl, "Unable to update cart");
    }
    res.status(200).json({ updated_id: result });
  } catch (error) {
    next(error);
  }
});

//delete a cart
CartRoutes.delete("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const result = await cartService.deleteCartById(id);
    if (result === null || result === undefined) {
      throw new ApiError(404, -2, req.originalUrl, "Cart not found");
    }
    res.status(200).json({ deleted_id: result });
  } catch (error) {
    next(error);
  }
});

//remove a product from a cart
CartRoutes.delete("/:id/productos/:idprod", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const prodId = parseInt(req.params.idprod);
    const result = await cartService.deleteProductFromCartById(id, prodId);
    if (result === null) {
      throw new ApiError(404, -2, req.originalUrl, "Cart not found");
    }
    res.status(200).json({ deleted_id: result });
  } catch (error) {
    next(error);
  }
});

export { CartRoutes };
