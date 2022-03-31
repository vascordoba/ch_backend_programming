import { admin, tables } from "../../config/fireabseConfig.js";

class FirebaseProductRepository {
  constructor() {
    this.db = admin.firestore();
  }

  async save(product) {
    let newId = this._obtainNewId(await this.getAllIds());
    let doc = this.db.collection(tables.TBL_PRODUCTS).doc(`${newId}`);
    return await doc.create(product);
  }

  async update(id, product) {
    const doc = this.db.collection(tables.TBL_PRODUCTS).doc(`${id}`);
    const item = await doc.get();
    if (item.data()) {
      return await doc.update(product);
    }
    console.log("Product not found");
    return;
  }

  async getById(id) {
    const doc = this.db.collection(tables.TBL_PRODUCTS).doc(`${id}`);
    const item = await doc.get();
    if (item.data()) {
      let data = item.data();
      data.id = id;
      return data;
    }
    return {};
  }

  async getAll() {
    const snapshot = await this.db.collection(tables.TBL_PRODUCTS).get();
    let docs = snapshot.docs;
    const data = docs.map((doc) => ({
      id: doc.id,
      nombre: doc.data().nombre,
      descripcion: doc.data().descripcion,
      codigo: doc.data().codigo,
      precio: doc.data().precio,
      stock: doc.data().stock,
      foto: doc.data().foto,
      timestamp: doc.data().timestamp,
    }));
    return data;
  }

  async getAllIds() {
    const snapshot = await this.db.collection(tables.TBL_PRODUCTS).get();
    let docs = snapshot.docs;
    const data = docs.map((doc) => ({
      id: doc.id,
    }));
    return data;
  }

  async deleteById(id) {
    const doc = this.db.collection(tables.TBL_PRODUCTS).doc(`${id}`);
    const item = await doc.get();
    if (item.data()) {
      return await doc.delete();
    }
    console.log("Product not found");
    return;
  }

  async deleteAll() {
    let batch = this.db.batch();
    this.db
      .collection(tables.TBL_PRODUCTS)
      .listDocuments()
      .then((doc) => {
        val.map((v) => {
          batch.delete(v);
        });
      });
    batch.commit();
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

export { FirebaseProductRepository as repository };
