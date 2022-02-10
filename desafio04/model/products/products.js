class ProductosManager {
  constructor() {
    this.products = [];
  }

  save(product) {
    product.id = this._obtainNewId();
    this.products = [...this.products, product];
    return product.id;
  }

  update(id, product) {
    let prodToUpdate = this.products.find((p) => p.id === id);
    if (prodToUpdate === undefined) {
      return null;
    }
    prodToUpdate.title = product.title;
    prodToUpdate.price = product.price;
    prodToUpdate.thumbnail = product.thumbnail;

    const oldProds = this.products.filter((prod) => prod.id !== id);

    this.products = [...oldProds, prodToUpdate];
    return prodToUpdate.id;
  }

  getById(id) {
    try {
      const prod = this.products.find((p) => p.id === id);
      if (prod !== undefined) {
        return prod;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  getAll() {
    try {
      return this.products;
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  getAllIds() {
    try {
      const ids = this.products.map((p) => p.id);
      return ids;
    } catch (error) {
      console.log("ERROR: ", error);
    }
  }

  deleteById(id) {
    if (this.products.length === 0) {
      return null;
    }

    const prodToDel = this.products.find((prod) => prod.id === id);
    if (prodToDel === undefined) {
      return null;
    }
    const newProds = this.products.filter((prod) => prod.id !== id);
    this.products = newProds;
    return prodToDel.id;
  }

  deleteAll() {
    this.products = [];
    console.log("All products deleted");
  }

  _obtainNewId() {
    if (this.products.length === 0) return 1;
    else {
      let maxId = -1;
      for (const prod of this.products) {
        if (prod.id >= maxId) {
          maxId = prod.id;
        }
      }
      return maxId + 1;
    }
  }
}

export { ProductosManager };
