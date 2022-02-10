import Express from "express";

import { Routes } from "./routes/routes.js";

const PORT = 8080;
const app = new Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
app.use("/api", Routes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  console.error(err.name, err.status, err.message);
  res.status(err.status).send(err.message);
});

app.use(Express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const server = app.listen(PORT, () => {
  console.log(`Server Http listening on ${server.address().port}`);
});
