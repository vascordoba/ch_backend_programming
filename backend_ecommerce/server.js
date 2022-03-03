import Express from "express";

import { Routes } from "./src/routes/routes.js";

const PORT = 8080;
const app = new Express();

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
  console.error(err.name, err.status, err.message);

  res
    .status(err.status)
    .json({ error: err.code, route: err.path, description: err.message });
});

const server = app.listen(PORT, () => {
  console.log(`Server Http listening on ${server.address().port}`);
});
