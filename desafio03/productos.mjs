import fs from "fs/promises";

class ProductosManager {
  constructor() {
    this.filePath = "./productos.txt";
  }

  async save(product) {
    let products = await this._loadFile();
    product.id = this._obtainNewId(products);
    products = [...products, product];
    await this._saveFile(products);
    return product.id;
  }

  async getById(id) {
    try {
      const products = await this._loadFile();
      const prod = products.find((p) => p.id === id);
      if (prod !== undefined) {
        return prod;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await this._loadFile();
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  async getAllIds() {
    try {
      const prods = await this._loadFile();
      const ids = prods.map((p) => p.id);
      return ids;
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  async deleteById(id) {
    let products = await this._loadFile();
    if (products.length === 0) {
      console.log("The file is empty. Nothing to delete");
      return;
    }

    const prodToDel = products.find((prod) => prod.id === id);
    if (prodToDel !== undefined) {
      const newProds = products.filter((prod) => prod.id !== id);
      await this._saveFile(newProds);
      console.log("Product deleted successfully");
      return prodToDel;
    }
    console.log("Product not found. Nothing to delete");
  }

  async deleteAll() {
    await this._saveFile([]);
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

  async _loadFile() {
    try {
      const data = await fs.readFile(this.filePath);
      return JSON.parse(data);
    } catch (error) {
      console.log("File not found, creating a new one");
      return [];
    }
  }

  async _saveFile(content) {
    try {
      const data = await fs.writeFile(this.filePath, JSON.stringify(content));
      return true;
    } catch (error) {
      console.log(
        "Error saving file, please check write access to the containing folder"
      );
    }
  }
}

export { ProductosManager };
