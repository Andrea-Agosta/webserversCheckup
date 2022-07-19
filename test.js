const assert = require("assert");
const request = require("supertest");

describe("Testing API", () => {
  const api = require("./api.js");

  it("Get all data", function (done) {
    request(api.app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert.strictEqual(res.body.db.length, 5);
      })
      .expect(200, done);
  });

  it("Add a new Address", () => {
    request(api.app)
      .post("/api/address/")
      .set("Accept", "application/json")
      .send({
        name: "John",
        email: "john@gmail.com",
        address: {
          city: "London",
          street: "Downey street",
          number: "20",
          postCode: "L1 5W6",
        },
      })
      .expect("Content-Type", /json/)
      .expect("location", /\/api\/developers\//)
      .expect((res) => {
        assert.strictEqual(res.body.name, "John");
      })
      .expect(201, done);
  });

  it("Update an existing address", () => {
    request(api.app)
      .patch("/api/address/1")
      .set("Accept", "application/json")
      .send({
        name: "Salt",
        email: "salt@gmail.com",
        address: { city: "Amsterdam" },
      })
      .expect("Content-Type", /json/)
      .expect((res) => {
        assert.strictEqual(res.body.db.name, "Salt");
        assert.strictEqual(res.body.db.email, "salt@gmail.com");
        assert.strictEqual(res.body.db.address.city, "Amsterdam");
        assert.strictEqual(res.body.db.address.street, "Main St");
        assert.strictEqual(res.body.db.address.number, "10");
        assert.strictEqual(res.body.db.address.postCode, "12345678");
      })
      .expect(200, done);
  });

  it("Delete address", () => {
    request(api.app).delete("/api/address/2").expect(204, done);
  });
});
