import { uri } from "../../config/mongodbConfig.js";
import mongoose from "mongoose";
import { productsModel } from "../../model/products/MongodbProductModel.js";

class MongodbProductRepository {
  constructor() {
    this.db = mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async save(product) {
    let newId = this._obtainNewId(await this.getAllIds());
    product.id = newId;
    let newProduct = new productsModel(product);
    return await newProduct.save();
  }

  async update(id, product) {
    let data = productsModel.updateOne({ id }, { $set: product });
    return data;
  }

  async getById(id) {
    return await productsModel.find({ id });
  }

  async getAll() {
    return await productsModel.find({});
  }

  async getAllIds() {
    const data = await productsModel.find({});
    console.log(data);
    return data;
  }

  async deleteById(id) {
    return await productsModel.deleteOne({ id });
  }

  async deleteAll() {
    return await productsModel.deleteMany({});
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

export { MongodbProductRepository as repository };
