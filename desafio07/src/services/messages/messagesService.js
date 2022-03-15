import { DB } from "../db/db.js";
import { sqliteOptions } from "../db/sqliteConfig.js";

class MessagesService {
  constructor() {
    this.db = new DB(sqliteOptions.options);
    console.log("Messages services initialized");
  }

  async addMessage(msg) {
    return await this.db.insert(sqliteOptions.TBL_MESSAGES, msg);
  }

  async getMessages() {
    return await this.db.select(sqliteOptions.TBL_MESSAGES);
  }
}

export { MessagesService };
