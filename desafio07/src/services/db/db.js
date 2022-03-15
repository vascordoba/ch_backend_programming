import knex from "knex";

class DB {
  constructor(options) {
    this.options = options;
  }

  async insert(table, objects) {
    let db = null;
    try {
      db = knex(this.options);
      await db(table).insert(objects);
      console.log("Objects inserted");
    } catch (err) {
      console.log(err);
    } finally {
      if (db) {
        db.destroy();
      }
    }
  }

  async select(table) {
    let db = null;
    try {
      db = knex(this.options);
      const data = await db(table).select("*");
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      if (db) {
        db.destroy();
      }
    }
  }
}

export { DB };
