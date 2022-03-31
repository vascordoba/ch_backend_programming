import { DB } from "../DB.js";
import { sqliteOptions } from "../../config/sqliteConfig.js";

class SqliteCartRepository {
  constructor() {
    this.db = new DB(sqliteOptions.options);
  }

  async save(cart) {
    let cartObject = { timestamp: cart.timestamp };
    return await this.db.insert(sqliteOptions.TBL_CART, cartObject);
  }

  async update(id, productId) {
    let cartExists = await this.getById(id);
    if (cartExists.length > 0) {
      let prodExists = await this.db.select(sqliteOptions.TBL_CART_PRODUCTS, {
        cart_id: parseInt(id),
        product_id: parseInt(productId),
      });

      if (prodExists.length > 0) {
        return await this.db.update(
          sqliteOptions.TBL_CART_PRODUCTS,
          { cart_id: id, product_id: productId },
          { q: prodExists[0].q + 1 }
        );
      } else {
        return await this.db.insert(sqliteOptions.TBL_CART_PRODUCTS, {
          cart_id: id,
          product_id: productId,
          q: 1,
        });
      }
    }

    console.log("Carts DB is empty. Nothing to update");
    return null;
  }

  async getById(id) {
    let cartProducts = await this.db.select(sqliteOptions.TBL_CART_PRODUCTS, {
      cart_id: id,
    });
    let cart = await this.db.select(sqliteOptions.TBL_CART, { id });
    cart.products = cartProducts;
    return cart;
  }

  async deleteCartById(id) {
    await this.db.remove(sqliteOptions.TBL_CART_PRODUCTS, { cart_id: id });
    return await this.db.remove(sqliteOptions.TBL_CART, { id });
  }

  async deleteProductFromCartById(id, prodId) {
    return await this.db.remove(sqliteOptions.TBL_CART_PRODUCTS, {
      cart_id: id,
      product_id: prodId,
    });
  }
}

export { SqliteCartRepository as repository };
