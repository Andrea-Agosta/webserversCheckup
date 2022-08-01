const assert = require("assert");
const request = require("supertest");

describe("Testing API", () => {
  const api = require("./api.js");

  it("Get all data", function (done) {
    request(api.app)
      .get("/api/address/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert.strictEqual(res.body.length, 100);
      })
      .expect(200, done);
  });

  it("Add a new Address", (done) => {
    const api = require("./api.js");

    request(api.app)
      .post("/api/address/")
      .type("form")
      .send({ street: "Via Dei Mirti" })
      .send({ postcode: "97100" })
      .send({ city: "Ragusa" })
      .send({ countryCode: "IT" })
      .send({ country: "Italy" })
      .expect(302, done); //the response was successful because the system redirect on hompage
  });

  it("Update an existing address", (done) => {
    request(api.app)
      .patch("/api/address/1")
      .set("Accept", "application/json")
      .send({
        name: "Salt",
        city: "Amsterdam",
        country: "Netherlands",
      })
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert.strictEqual(
          res.body.avatar,
          "https://robohash.org/perferendissedaccusamus.png?size=50x50&set=set1"
        );
        assert.strictEqual(res.body.name, "Salt");
        assert.strictEqual(res.body.email, "iwadham0@icq.com");
        assert.strictEqual(res.body.street, "86 Holy Cross Terrace");
        assert.strictEqual(res.body.number, "49581");
        assert.strictEqual(res.body.postcode, "4785-364");
        assert.strictEqual(res.body.city, "Amsterdam");
        assert.strictEqual(res.body.countryCode, "PT");
        assert.strictEqual(res.body.country, "Netherlands");
      })
      .expect(200, done);
  });

  it("Fail Update id not found", (done) => {
    request(api.app)
      .patch("/api/address/3000")
      .set("Accept", "application/json")
      .send({
        street: "Salt",
        city: "Amsterdam",
        country: "Netherlands",
      })
      .expect(404, done);
  });

  it("Delete address", (done) => {
    request(api.app).delete("/api/address/2").expect(204, done);
  });

  it("Fail Delete id not found", (done) => {
    request(api.app).delete("/api/address/5000").expect(404, done);
  });
});
