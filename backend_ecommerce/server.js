import "dotenv/config";
import Express from "express";

import { Routes } from "./src/routes/routes.js";

const PORT = process.env.PORT || 8080;
const app = new Express();
const storage = process.env.STORAGE || "file";

console.log(`Using ${storage} storage`);
if (storage === "sqlite") {
  (async () => {
    const { sqliteSetup } = await import("./src/config/sqliteSetup.js");
    await sqliteSetup();
  })();
}

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use("/api", Routes);

app.get("*", function (req, res) {
  res.status(404).json({ error: 404, description: "Route not found" });
});
app.post("*", function (req, res) {
  res.status(404).json({ error: 404, description: "Route not found" });
});
app.put("*", function (req, res) {
  res.status(404).json({ error: 404, description: "Route not found" });
});
app.delete("*", function (req, res) {
  res.status(404).json({ error: 404, description: "Route not found" });
});

app.use(function (err, req, res, next) {
  console.error(err);
  res
    .status(err.status || 400)
    .json({
      error: err.code || -1,
      route: err.path || "/",
      description: err.message || "Runtime error",
    });
});

const server = app.listen(PORT, () => {
  console.log(`Server Http listening on ${server.address().port}`);
});
