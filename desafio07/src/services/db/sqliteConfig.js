const databaseName = "coder_be_desafio07";

const options = {
  client: "sqlite3",
  connection: {
    filename: "./src/services/db/" + databaseName + ".sqlite",
  },
  useNullAsDefault: true,
};

const sqliteOptions = {
  options,
  databaseName,
  TBL_MESSAGES: "messages",
};

export { sqliteOptions };
