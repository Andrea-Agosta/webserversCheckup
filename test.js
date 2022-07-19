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
        assert.strictEqual(res.body.db.length, 100);
      })
      .expect(200, done);
  });

  it("Add a new Address", (done) => {
    const api = require("./api.js");

    request(api.app)
      .post("/api/address/")
      .set("Accept", "application/json")
      .send({
        street: "Via Dei Mirti",
        number: "17",
        postalCode: "97100",
        city: "Ragusa",
        countryCode: "IT",
        country: "Italy",
      })
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert.strictEqual(res.body.city, "Ragusa");
      })
      .expect(201, done);
  });

  // it("Update an existing address", (done) => {
  //   request(api.app)
  //     .patch("/api/address/1")
  //     .set("Accept", "application/json")
  //     .send({
  //       street: "Salt",
  //       city: "Amsterdam",
  //       country: "Netherlands",
  //     })
  //     .expect("Content-Type", /json/)
  //     .expect((res) => {
  //       assert.strictEqual(res.body.db.street, "Salt");
  //       assert.strictEqual(res.body.db.number, "0");
  //       assert.strictEqual(res.body.db.address.postalCode, "183027");
  //       assert.strictEqual(res.body.db.address.city, "Amsterdam");
  //       assert.strictEqual(res.body.db.address.countryCode, "CO");
  //       assert.strictEqual(res.body.db.address.country, "Netherlands");
  //     })
  //     .expect(200, done);
  // });

  // it("Delete address", (done) => {
  //   request(api.app).delete("/api/address/2").expect(204, done);
  // });
});
