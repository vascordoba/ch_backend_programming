import Express from "express";

let products = [];

const PORT = 8080;
const app = new Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.set("view engine", "pug");
app.set("views", "./views");

app.use(function (err, req, res, next) {
  console.error(err.stack);
  console.error(err.name, err.status, err.message);
  res.status(err.status).send(err.message);
});

app.use(Express.static("public"));

app.get(["/", "/productos"], (req, res) => {
  res.render("main", { products });
});

app.get("/addProducto", (req, res) => {
  res.render("form", {});
});

app.post("/productos", (req, res) => {
  const prod = req.body;
  let maxId = 0;
  if (products.length > 0) {
    for (const prod of products) {
      if (prod.id >= maxId) {
        maxId = prod.id;
      }
    }
  }
  maxId++;
  prod.id = maxId;
  products.push(prod);
  res.status(200).json({ created_id: maxId });
});

const server = app.listen(PORT, () => {
  console.log(`Server Http listening on ${server.address().port}`);
});
