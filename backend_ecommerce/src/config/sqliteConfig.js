const databaseName = "coder_be_entrega2";

const options = {
  client: "sqlite3",
  connection: {
    filename: "./src/data/" + databaseName + ".sqlite",
  },
  useNullAsDefault: true,
};

const sqliteOptions = {
  options,
  databaseName,
  TBL_PRODUCTS: "products",
  TBL_CART: "cart",
  TBL_CART_PRODUCTS: "cart_products",
};

export { sqliteOptions };
