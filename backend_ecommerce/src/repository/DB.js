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

  async select(table, where = null) {
    let db = null;
    try {
      db = knex(this.options);
      if (where) {
        return await db(table).select("*").where(where);
      }
      return await db(table).select("*");
    } catch (err) {
      console.log(err);
    } finally {
      if (db) {
        db.destroy();
      }
    }
  }

  async remove(table, where = null) {
    let db = null;
    try {
      db = knex(this.options);
      if (where) {
        return await db(table).where(where).del();
      }
      return await db(table).del();
    } catch (err) {
      console.log(err);
    } finally {
      if (db) {
        db.destroy();
      }
    }
  }

  async update(table, where, newVal) {
    let db = null;
    try {
      db = knex(this.options);

      return await db(table).where(where).update(newVal);
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
