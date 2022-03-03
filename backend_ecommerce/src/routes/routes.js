import Express from "express";
import { ProductRoutes } from "./products/productsRouter.js";
import { CartRoutes } from "./cart/cartRouter.js";

const Routes = new Express.Router();

Routes.use("/productos", ProductRoutes);
Routes.use("/carrito", CartRoutes);

export { Routes };
