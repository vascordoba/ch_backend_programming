import { FileStorage } from "../../data/fileStorage.js";

class CarritoManager {
  constructor() {
    this.storage = new FileStorage("cart/carrito.json");
  }

  async save(cart) {
    let carts = await this.storage.loadFile();
    cart.id = this._obtainNewId(carts);
    carts = [...carts, cart];
    await this.storage.saveFile(carts);
    return cart.id;
  }

  async update(id, productId) {
    let carts = await this.storage.loadFile();
    if (carts.length === 0) {
      console.log("Carts DB is empty. Nothing to update");
      return null;
    }

    const cartToUpd = carts.find((cart) => cart.id === id);
    if (cartToUpd !== undefined && cartToUpd !== null) {
      let prodToUpd = cartToUpd.products.find((prod) => prod.id === productId);
      if (prodToUpd === undefined || prodToUpd === null) {
        const newProd = { id: productId, quantity: 1 };
        cartToUpd.products.push(newProd);
      } else {
        const oldProdsInCart = cartToUpd.products.filter(
          (prod) => prod.id !== productId
        );
        prodToUpd.quantity++;
        cartToUpd.products = [...oldProdsInCart, prodToUpd];
      }

      const oldCarts = carts.filter((cart) => cart.id !== id);

      await this.storage.saveFile([...oldCarts, cartToUpd]);
      console.log("Cart updated successfully");
      return cartToUpd.id;
    }
    console.log("Cart not found. Nothing to update");
    return null;
  }

  async getById(id) {
    try {
      const carts = await this.storage.loadFile();
      const cart = carts.find((c) => c.id === id);
      if (cart !== undefined && cart !== null) {
        return cart;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async deleteCartById(id) {
    let carts = await this.storage.loadFile();
    if (carts.length === 0) {
      console.log("Carts DB is empty. Nothing to delete");
      return null;
    }

    const cartToDel = carts.find((cart) => cart.id === id);
    if (cartToDel !== undefined) {
      const newCarts = carts.filter((cart) => cart.id !== id);
      await this.storage.saveFile(newCarts);
      console.log("Cart deleted successfully");
      return cartToDel.id;
    }
    console.log("Cart not found. Nothing to delete");
    return null;
  }

  async deleteProductFromCartById(id, prodId) {
    let carts = await this.storage.loadFile();
    if (carts.length === 0) {
      console.log("Carts DB is empty. Nothing to update");
      return null;
    }

    const cartToUpd = carts.find((cart) => cart.id === id);
    if (cartToUpd !== undefined || cartToUpd !== null) {
      let prodToUpd = cartToUpd.products.find((prod) => prod.id === prodId);

      const oldProdsInCart = cartToUpd.products.filter(
        (prod) => prod.id !== prodId
      );
      cartToUpd.products = [...oldProdsInCart];

      const oldCarts = carts.filter((cart) => cart.id !== id);
      await this.storage.saveFile([...oldCarts, cartToUpd]);
      if (prodToUpd === undefined || prodToUpd === null) {
        console.log("Product not found in cart. Nothing to update");
      } else {
        console.log("Cart product deleted successfully");
      }

      return prodId;
    }
    console.log("Cart not found. Nothing to update");
    return null;
  }

  _obtainNewId(carts) {
    if (carts.length === 0) return 1;
    else {
      let maxId = -1;
      for (const cart of carts) {
        if (cart.id >= maxId) {
          maxId = cart.id;
        }
      }
      return maxId + 1;
    }
  }
}

export { CarritoManager };
