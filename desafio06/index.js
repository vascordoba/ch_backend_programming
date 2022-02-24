import Express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";

//fix for modules
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let products = [];
let messages = [];

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

app.get(["/", "/productos"], (req, res) => {
  res.render("main", { products });
});

const server = app.listen(PORT, () => {
  console.log(`Server Http listening on ${server.address().port}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Socket conectado");

  socket.on("login", (data) => {
    socket.emit("newUser", { products, messages });
  });

  socket.on("new-product", (data) => {
    let maxId = 0;
    if (products.length > 0) {
      for (const prod of products) {
        if (prod.id >= maxId) {
          maxId = prod.id;
        }
      }
    }
    maxId++;
    data.id = maxId;
    products.push(data);
    io.sockets.emit("products", products);
  });

  socket.on("new-message", (data) => {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
});
