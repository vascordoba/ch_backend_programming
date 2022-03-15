import Express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

import { mysqlSetup } from "./src/services/db/mysqlSchemaInit.js";
import { sqliteSetup } from "./src/services/db/sqliteSchemaInit.js";

import { ProductosService } from "./src/services/products/productsService.js";
import { MessagesService } from "./src/services/messages/messagesService.js";

//fix for modules
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let productsService, messagesService;

(async () => {
  await mysqlSetup();
  productsService = new ProductosService();
})();
(async () => {
  await sqliteSetup();
  messagesService = new MessagesService();
})();

const PORT = process.env.PORT || 8080;
const app = new Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/hbs/layouts",
    helpers: {
      toFloat: (p) => parseFloat(p).toFixed(2),
    },
  })
);
app.set("view engine", "hbs");
app.set("views", "./views/hbs");

app.use(function (err, req, res, next) {
  console.error(err.stack);
  console.error(err.name, err.status, err.message);
  res.status(err.status).send(err.message);
});

app.use(Express.static("public"));

app.get(["/", "/productos"], async (req, res) => {
  const products = await productsService.getProducts();
  res.render("main", { products });
});

const server = app.listen(PORT, () => {
  console.log(`Server Http listening on ${server.address().port}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Socket conectado");

  socket.on("login", async (data) => {
    const products = await productsService.getProducts();
    const messages = await messagesService.getMessages();
    socket.emit("newUser", { products, messages });
  });

  socket.on("new-product", async (data) => {
    await productsService.addProduct(data);
    io.sockets.emit("products", await productsService.getProducts());
  });

  socket.on("new-message", async (data) => {
    await messagesService.addMessage(data);
    io.sockets.emit("messages", await messagesService.getMessages());
  });
});
