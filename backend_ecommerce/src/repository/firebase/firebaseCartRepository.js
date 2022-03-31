import { admin, tables } from "../../config/fireabseConfig.js";

class FirebaseCartRepository {
  constructor() {
    this.db = admin.firestore();
  }

  async save(cart) {
    let newId = this._obtainNewId(await this.getAllIds());
    let doc = this.db.collection(tables.TBL_CART).doc(`${newId}`);
    return await doc.create(cart);
  }

  async update(id, productId) {
    const doc = this.db.collection(tables.TBL_CART).doc(`${id}`);
    const item = await doc.get();
    let data = item.data() || [];

    if (data.products.length === 0) {
      data.products.push({ id: productId, q: 1 });
    } else {
      let prodToUpd = data.products.find((prod) => prod.id === productId);
      if (prodToUpd) {
        prodToUpd.q += 1;
      } else {
        prodToUpd = { id: productId, q: 1 };
      }
      const oldProdsInCart = data.products.filter(
        (prod) => prod.id !== productId
      );
      data.products = [...oldProdsInCart, prodToUpd];
    }
    return await doc.update(data);
  }

  async getById(id) {
    const doc = this.db.collection(tables.TBL_CART).doc(`${id}`);
    const item = await doc.get();
    if (item.data()) {
      let data = item.data();
      data.id = id;
      return data;
    }
    return [];
  }

  async deleteCartById(id) {
    const doc = this.db.collection(tables.TBL_CART).doc(`${id}`);
    const item = await doc.delete();
    return item;
  }

  async deleteProductFromCartById(id, prodId) {
    const doc = this.db.collection(tables.TBL_CART).doc(`${id}`);
    const item = await doc.get();
    if (item.data()) {
      let data = item.data();
      const oldProdsInCart = data.products.filter((prod) => prod.id !== prodId);
      data.products = [...oldProdsInCart];
      return await doc.update(data);
    }
    console.log("Nathing to remove");
    return;
  }

  async getAllIds() {
    const snapshot = await this.db.collection(tables.TBL_CART).get();
    let docs = snapshot.docs;
    const data = docs.map((doc) => ({
      id: doc.id,
    }));
    return data;
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

export { FirebaseCartRepository as repository };
