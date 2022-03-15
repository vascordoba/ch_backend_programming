import { sqliteOptions } from "./sqliteConfig.js";
import knex from "knex";

const sqliteSetup = async () => {
  let db = null;
  console.log("=============================== SQLite Schema creation");
  try {
    db = knex(sqliteOptions.options);
    let messagesTableExists = await db.schema.hasTable(
      sqliteOptions.TBL_MESSAGES
    );
    if (!messagesTableExists) {
      await db.schema.createTable(sqliteOptions.TBL_MESSAGES, (table) => {
        table.increments("id");
        table.string("user", 150);
        table.timestamp("ts");
        table.text("msg");
      });
    }

    console.log("[sqlite] Messages table created");
  } catch (err) {
    console.log(err);
  } finally {
    if (db != null) {
      db.destroy();
    }
  }
};

export { sqliteSetup };
