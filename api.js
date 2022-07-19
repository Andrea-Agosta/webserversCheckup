const db = require("./db");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json(db);
});

module.exports = {
  app,
};
