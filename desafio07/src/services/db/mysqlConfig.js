const options = {
  client: "mysql2",
  connection: {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    insecureAuth: true,
  },
};

const databaseName = "coder_be_desafio07";
const TBL_PRODUCTS = "productos";

const mysqlOptions = {
  options,
  databaseName,
  TBL_PRODUCTS,
};

export { mysqlOptions };
