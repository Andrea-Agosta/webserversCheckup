let db = require("./db");
const https = require("https");
const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/address/", (req, res) => {
  res.json(db);
});

app.post("/api/address/", (req, res) => {
  const newAddress = {
    id: db.length + 1,
    avatar: `https://picsum.photos/id/${db.length + 1}/50/50`,
    name: req.body.name,
    email: req.body.email,
    street: req.body.street,
    number: req.body.number,
    city: req.body.city,
    postcode: req.body.postcode,
    country: req.body.country,
    countryCode: req.body.countryCode,
  };
  db.push(newAddress);

  res
    .status(201)
    .setHeader("location", `/api/address/${newAddress.id}`)
    .redirect("/");
});

app.patch("/api/address/:id", (req, res) => {
  if (!idExistInDb(req.params.id)) {
    res.status(404).send("Not Found");
  } else {
    if (req.body === undefined || req.body === {}) {
      res.status(400).send("Bad request");
    } else {
      let address = getAddressById(req.params.id);
      req.body.avatar !== undefined && (address.avatar = req.body.avatar);
      req.body.name !== undefined && (address.name = req.body.name);
      req.body.email !== undefined && (address.email = req.body.email);
      req.body.street !== undefined && (address.street = req.body.street);
      req.body.number !== undefined && (address.number = req.body.number);
      req.body.city !== undefined && (address.city = req.body.city);
      req.body.postcode !== undefined && (address.postcode = req.body.postcode);
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
