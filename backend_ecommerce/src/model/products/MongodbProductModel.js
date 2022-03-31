import mongoose from "mongoose";

const productCollection = "products";

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  nombre: { type: String, required: true, max: 50 },
  descripcion: { type: String, required: true, max: 250 },
  codigo: { type: String, required: true, max: 20 },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  foto: { type: String, required: true, max: 250 },
  timestamp: { type: Date, required: true },
});

export const productsModel = mongoose.model(productCollection, ProductSchema);
