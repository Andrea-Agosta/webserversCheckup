let db = require("./db");
const express = require("express");
const app = express();

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

  db.push(newAddress);

  res
    .status(201)
    .setHeader("location", `/api/address/${newAddress.id}`)
    .json(newAddress);
});

app.patch("/api/address/:id", (req, res) => {
  if (!idExistInDb(req.params.id)) {
    res.status(404).send("Not Found");
  } else {
    if (req.body === undefined || req.body === {}) {
      res.status(400).send("Bad request");
    } else {
      let address = getAddressById(req.params.id);
      req.body.street !== undefined && (address.street = req.body.street);
      req.body.number !== undefined && (address.number = req.body.number);
      req.body.postalCode !== undefined &&
        (address.postalCode = req.body.postalCode);
      req.body.city !== undefined && (address.city = req.body.city);
      req.body.countryCode !== undefined &&
        (address.countryCode = req.body.countryCode);
      req.body.country !== undefined && (address.country = req.body.country);
      res.status(200).json(address);
    }
  }
});

app.delete("/api/address/:id", (req, res) => {
  if (!idExistInDb(req.params.id)) {
    res.status(404).send("Not Found");
  } else {
    db = db.filter((data) => data.id != req.params.id);
    res.status(204).send("No content");
  }
});

function getAddressById(id) {
  return db.find((dev) => dev.id == id);
}

function idExistInDb(id) {
  const dev = getAddressById(id);
  return dev ? true : false;
}

module.exports = {
  app,
};
