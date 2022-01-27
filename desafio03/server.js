import { ProductosManager } from "./productos.mjs";
import Express from "express";

const PORT = 8080;
const app = new Express();
const pm = new ProductosManager();

const server = app.listen(PORT, () => {
  console.log(`Server Http listening on ${server.address().port}`);
});
server.on("error", (error) => console.log(`Server error: ${error}`));

app.get("/productos", async (req, res) => {
  res.json(await pm.getAll());
});

app.get("/productoRandom", async (req, res) => {
  const ids = await pm.getAllIds();
  const randomProdIdx = Math.floor(Math.random() * ids.length);
  res.json(await pm.getById(ids[randomProdIdx]));
});
