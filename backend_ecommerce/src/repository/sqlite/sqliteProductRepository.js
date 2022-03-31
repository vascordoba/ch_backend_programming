import { DB } from "../DB.js";
import { sqliteOptions } from "../../config/sqliteConfig.js";

class SqliteProductRepository {
  constructor() {
    this.db = new DB(sqliteOptions.options);
  }

  async save(product) {
    return await this.db.insert(sqliteOptions.TBL_PRODUCTS, product);
  }

  async update(id, product) {
    let prodExists = await this.db.select(sqliteOptions.TBL_PRODUCTS, { id });
    if (prodExists) {
      return await this.db.update(sqliteOptions.TBL_PRODUCTS, { id }, product);
    }
    console.log("Product not found. Nothing to update");
    return null;
  }

  async getById(id) {
    return await this.db.select(sqliteOptions.TBL_PRODUCTS, { id });
  }

  async getAll() {
    return await this.db.select(sqliteOptions.TBL_PRODUCTS);
  }

  async getAllIds() {
    const prods = await this.db.select(sqliteOptions.TBL_PRODUCTS);
    const ids = prods.map((p) => p.id);
    return ids;
  }

  async deleteById(id) {
    const productUsed = await this.db.select(sqliteOptions.TBL_CART_PRODUCTS, {
      product_id: id,
    });
    if (productUsed) {
      console.log("Products is being used in a cart. Cannot delete");
      return null;
    }
    return await this.db.remove(sqliteOptions.TBL_PRODUCTS, { id });
  }

  async deleteAll() {
    await this.db.remove(sqliteOptions.TBL_PRODUCTS);
    console.log("All products deleted");
  }
}

export { SqliteProductRepository as repository };
