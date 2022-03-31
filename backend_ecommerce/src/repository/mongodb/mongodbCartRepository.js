import { uri } from "../../config/mongodbConfig.js";
import mongoose from "mongoose";
import { cartModel } from "../../model/cart/MongodbCartModel.js";

class MongodbCartRepository {
  constructor() {
    this.db = mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async save(cart) {
    let newId = this._obtainNewId(await this.getAllIds());
    cart.id = newId;
    let newProduct = new cartModel(cart);
    return await newProduct.save();
  }

  async update(id, productId) {
    let cart = await this.getById(id);
    if (cart) {
      if (Array.isArray(cart)) {
        cart = cart[0];
      }
      if (cart.products.length === 0) {
        cart.products.push({ id: productId, q: 1 });
      } else {
        let prodToUpd = cart.products.find((prod) => prod.id === productId);
        if (prodToUpd.id) {
          prodToUpd.q += 1;
        } else {
          prodToUpd = { id: productId, q: 1 };
        }
        const oldProdsInCart = cart.products.filter(
          (prod) => prod.id !== productId
        );
        cart.products = [...oldProdsInCart, prodToUpd];
      }
      return await cartModel.updateOne({ id }, cart);
    }
    console.log("Cart does not exists");
    return;
  }

  async getById(id) {
    let cart = await cartModel.find({ id });
    if (cart.length === 0) {
      return null;
    }
    return cart;
  }

  async deleteCartById(id) {
    return await cartModel.deleteOne({ id });
  }

  async deleteProductFromCartById(id, prodId) {
    let cart = await this.getById(id);
    if (cart) {
      if (Array.isArray(cart)) {
        cart = cart[0];
      }
      const oldProdsInCart = cart.products.filter((prod) => prod.id !== prodId);
      cart.products = [...oldProdsInCart];

      return await cartModel.updateOne({ id }, cart);
    }
    console.log("Cart does not exists");
    return;
  }

  async getAllIds() {
    const data = await cartModel.find({});
    console.log(data);
    return data;
  }

  _obtainNewId(objs) {
    if (objs.length === 0) return 1;
    else {
      let maxId = -1;
      for (const obj of objs) {
        if (obj.id >= maxId) {
          maxId = obj.id;
        }
      }
      return maxId + 1;
    }
  }
}

export { MongodbCartRepository as repository };
