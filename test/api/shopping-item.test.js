const request = require("supertest");
const app = require("../../app");

describe("TEST: POST /shoppingItem/create", () => {
  test("input: { content: 'Nový item', count: 6 }", async () => {
    const response = await request(app).post("/shoppingItem/create").send({
      content: "Nový item",
      count: 6,
    });

    expect(response.body.state).toBe(true);
  });

  test("input: { content: 'Nový item 2' }", async () => {
    const response = await request(app).post("/shoppingItem/create").send({
      content: "Nový item 2",
    });

    expect(response.status).toBe(500);
  });

  test("input: { content: 'Nový item 3', count: -1 }", async () => {
    const response = await request(app).post("/shoppingItem/create").send({
      content: "Nový item 3",
      count: -1,
    });

    expect(response.status).toBe(500);
  });
});

describe("TEST: GET /shoppingItem/list", () => {
  test("input: {}", async () => {
    const response = await request(app).get("/shoppingItem/list").send({});

    expect(response.body.state).toBe(true);
  });

  test("input: { state: ['INITIATED', 'COMPLETE'], createdAt: { start: '2024-04-13T11:48:45.526Z' }, content: 'rohlik' }", async () => {
    const response = await request(app).get("/shoppingItem/list").send({});

    expect(response.body.state).toBe(true);
  });

  test("input: { state: 'INITIATED', createdAt: '2024-04-13T11:48:45.526Z' }", async () => {
    const response = await request(app).get("/shoppingItem/list").send({});

    expect(response.body.state).toBe(true);
  });
});

describe("TEST: PUT /shoppingItem/update", () => {
  test("input: { id: row.id, content: 'Updatovaný kontent', state: 'COMPLETE' }", async () => {
    const response1 = await request(app).get("/shoppingItem/list").send();

    const row = response1.body.result[0] || null;
    console.log(row);
    if (!row) expect(false).toBe(true);

    const response2 = await request(app)
      .put(`/shoppingItem/update/${row._id}`)
      .send({
        content: "Updatovaný kontent",
        state: "COMPLETE",
      });

    expect(response2.body.state).toBe(true);
  });
});

describe("TEST: DELETE /shoppingItem/update", () => {
  test("input: { id: row.id }", async () => {
    const response1 = await request(app).get("/shoppingItem/list").send();

    const row = response1.body.result[0] || null;
    if (!row) expect(false).toBe(true);

    const response2 = await request(app)
      .delete(`/shoppingItem/delete/${row._id}`)
      .send();

    expect(response2.body.state).toBe(true);
  });

  test("input: { id: 24longnonhexstring' }", async () => {
    const response = await request(app)
      .delete(`/shoppingItem/delete/${"t".repeat(24)}`)
      .send();

    expect(response.status).toBe(500);
  });

  test("input: { id: 'UNKNOWN' }", async () => {
    const response = await request(app)
      .delete(`/shoppingItem/delete/UNKNOWN`)
      .send();

    expect(response.status).toBe(500);
  });

  test("input: { id: 24longhexstring' }", async () => {
    const response = await request(app)
      .delete(`/shoppingItem/delete/${"a".repeat(24)}`)
      .send();

    expect(response.body.state).toBe(false);
  });
});
