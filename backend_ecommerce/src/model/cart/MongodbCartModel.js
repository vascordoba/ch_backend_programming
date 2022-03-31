import mongoose from "mongoose";

const cartCollection = "cart";

const CartSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  products: { type: Array, required: true },
  timestamp: { type: Date, required: true },
});

export const cartModel = mongoose.model(cartCollection, CartSchema);
