import Express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import fs from "fs/promises";

//fix for modules
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let products = [];
let messagesFilePath = "./messages.json";

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

  socket.on("login", async (data) => {
    socket.emit("newUser", { products, messages: await getMessages() });
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

  socket.on("new-message", async (data) => {
    await saveMessage(data);
    io.sockets.emit("messages", await getMessages());
  });
});

const saveMessage = async (msg) => {
  let messages = await _loadFile();
  messages = [...messages, msg];
  await _saveFile(messages);
  return;
};

const getMessages = async () => {
  try {
    return await _loadFile();
  } catch (error) {
    console.log("ERROR: ", error);
  }
};

const _saveFile = async (content) => {
  try {
    const data = await fs.writeFile(messagesFilePath, JSON.stringify(content));
    return true;
  } catch (error) {
    console.log(
      "Error saving file, please check write access to the containing folder"
    );
  }
};

const _loadFile = async () => {
  try {
    const data = await fs.readFile(messagesFilePath);
    return JSON.parse(data);
  } catch (error) {
    console.log("File not found, creating a new one");
    return [];
  }
};
