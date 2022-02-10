import Express from "express";
import { ProductRoutes } from "./products/productsRouter.js";

const Routes = new Express.Router();

Routes.use("/products", ProductRoutes);

export { Routes };
