import { mysqlOptions } from "./mysqlConfig.js";
import knex from "knex";

const mysqlSetup = async () => {
  let desafioDb = null;
  try {
    let db = knex(mysqlOptions.options);

    console.log("=============================== MySQL Schema reset");

    await db.raw("drop database if exists " + mysqlOptions.databaseName);
    console.log("[mysql] Drop database if exists");
    await db.destroy();

    db = knex(mysqlOptions.options);
    await db.raw("create database " + mysqlOptions.databaseName);
    console.log("[mysql] Create database");
    await db.destroy();

    let connOptions = { ...mysqlOptions.options };
    connOptions.connection.database = mysqlOptions.databaseName;
    desafioDb = knex(connOptions);
    await desafioDb.schema.createTable(mysqlOptions.TBL_PRODUCTS, (table) => {
      table.increments("id");
      table.string("title", 40);
      table.double("price", 10, 2);
      table.string("thumbnail", 255);
    });
    console.log("[mysql] Productos table created");
  } catch (err) {
    console.log(err);
  } finally {
    if (desafioDb != null) {
      desafioDb.destroy();
    }
  }
};

export { mysqlSetup };
