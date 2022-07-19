const db = require("./db");
const { getUserById, idExistInDb } = require("./common");
const express = require("express");
const app = express();
let newDb = [];
newdb = db;

app.use(express.json());

app.get("/api/address/", (req, res) => {
  res.json(db);
});

app.post("/api/address/", (req, res) => {
  const newAddress = {
    id: db.length + 1,
    street: req.body.street,
    number: req.body.number,
    postalCode: req.body.postalCode,
    city: req.body.city,
    countryCode: req.body.countryCode,
    country: req.body.country,
  };

  newDb.push(newAddress);

  res
    .status(201)
    .setHeader("location", `/api/developers/${newAddress.id}`)
    .json(newAddress);
});

module.exports = {
  app,
};
