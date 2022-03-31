import { sqliteOptions } from "./sqliteConfig.js";
import knex from "knex";

const sqliteSetup = async () => {
  let db = null;
  console.log("=============================== SQLite Schema creation");
  try {
    db = knex(sqliteOptions.options);
    let cartTableExists = await db.schema.hasTable(sqliteOptions.TBL_CART);
    if (!cartTableExists) {
      await db.schema.createTable(sqliteOptions.TBL_CART, (table) => {
        table.increments("id");
        table.timestamp("timestamp");
      });
    }

    let prodsTableExists = await db.schema.hasTable(sqliteOptions.TBL_PRODUCTS);
    if (!prodsTableExists) {
      await db.schema.createTable(sqliteOptions.TBL_PRODUCTS, (table) => {
        table.increments("id");
        table.string("nombre", 50);
        table.text("descripcion");
        table.string("codigo", 20);
        table.double("precio", 10, 2);
        table.integer("stock", 6);
        table.text("foto");
        table.timestamp("timestamp");
      });
    }

    let cartProdsTableExists = await db.schema.hasTable(
      sqliteOptions.TBL_CART_PRODUCTS
    );
    if (!cartProdsTableExists) {
      await db.schema.createTable(sqliteOptions.TBL_CART_PRODUCTS, (table) => {
        table.integer("cart_id", 10);
        table.integer("product_id", 10);
        table.integer("q", 6);
      });
    }

    console.log("[sqlite] schema initialized");
  } catch (err) {
    console.log(err);
  } finally {
    if (db != null) {
      db.destroy();
    }
  }
};

export { sqliteSetup };
