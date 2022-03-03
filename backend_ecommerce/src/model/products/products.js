import { ApiError } from "../../commons/errors.js";
import { FileStorage } from "../../data/fileStorage.js";

class ProductosManager {
  constructor() {
    this.storage = new FileStorage("products/productos.json");
  }

  async save(product) {
    let products = await this.storage.loadFile();
    if (!this._validateCodeDuplication(products, product)) {
      throw new ApiError(400, -4, "/api/productos", "Duplicated product code");
    }
    product.id = this._obtainNewId(products);
    products = [...products, product];
    await this.storage.saveFile(products);
    return product.id;
  }

  async update(id, product) {
    let products = await this.storage.loadFile();
    if (products.length === 0) {
      console.log("Products DB is empty. Nothing to update");
      return null;
    }

    const prodToUpd = products.find((prod) => prod.id === id);
    if (prodToUpd !== undefined || prodToUpd !== null) {
      Object.assign(prodToUpd, product);

      const oldProds = products.filter((prod) => prod.id !== id);

      await this.storage.saveFile([...oldProds, prodToUpd]);
      console.log("Product updated successfully");
      return prodToUpd.id;
    }
    console.log("Product not found. Nothing to update");
    return null;
  }

  async getById(id) {
    try {
      const products = await this.storage.loadFile();
      const prod = products.find((p) => p.id === id);
      if (prod !== undefined && prod !== null) {
        return prod;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.storage.loadFile();
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  async getAllIds() {
    try {
      const prods = await this.storage.loadFile();
      const ids = prods.map((p) => p.id);
      return ids;
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  async deleteById(id) {
    let products = await this.storage.loadFile();
    if (products.length === 0) {
      console.log("Products DB is empty. Nothing to delete");
      return null;
    }

    const prodToDel = products.find((prod) => prod.id === id);
    if (prodToDel !== undefined) {
      const newProds = products.filter((prod) => prod.id !== id);
      await this.storage.saveFile(newProds);
      console.log("Product deleted successfully");
      return prodToDel.id;
    }
    console.log("Product not found. Nothing to delete");
    return null;
  }

  async deleteAll() {
    await this.storage.saveFile([]);
    console.log("All products deleted");
  }

  _obtainNewId(products) {
    if (products.length === 0) return 1;
    else {
      let maxId = -1;
      for (const prod of products) {
        if (prod.id >= maxId) {
          maxId = prod.id;
        }
      }
      return maxId + 1;
    }
  }

  _validateCodeDuplication(prods, prod) {
    for (const p of prods) {
      if (p.codigo === prod.codigo) {
        return false;
      }
    }
    return true;
  }
}

export { ProductosManager };
