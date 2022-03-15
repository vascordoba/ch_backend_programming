import { DB } from "../db/db.js";
import { mysqlOptions } from "../db/mysqlConfig.js";

class ProductosService {
  constructor() {
    this.ops = { ...mysqlOptions.options };
    this.ops.connection.database = mysqlOptions.databaseName;
    this.db = new DB(this.ops);
    console.log("Products services initialized");
  }

  async addProduct(product) {
    return await this.db.insert(mysqlOptions.TBL_PRODUCTS, product);
  }

  async getProducts() {
    return await this.db.select(mysqlOptions.TBL_PRODUCTS);
  }
}

export { ProductosService };
