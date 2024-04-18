const express = require("express");
const app = express();
const ItemModel = require("../models/item-model");

app.post("/create", async (req, res) => {
  try {
    const { content, count } = req.body;
    const result = await ItemModel.createItem({ content, count });
    res.send({ state: true, result });
  } catch (err) {
    console.error("Error creating document:", err);
    res.status(500).send("Error creating document");
  }
});

app.get("/list", async (req, res) => {
  try {
    const result = await ItemModel.listItems(req.query);
    res.send({ state: true, result });
  } catch (err) {
    console.error("Error reading documents:", err);
    res.status(500).send("Error reading documents");
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const result = await ItemModel.updateItem(req.params.id, req.body);
    res.send({ state: true, result });
  } catch (err) {
    console.error("Error updating document:", err);
    res.status(500).send("Error updating document");
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const result = await ItemModel.deleteItem(req.params.id);

    if (result === null) res.send({ state: false });
    else res.send({ state: true, result });
  } catch (err) {
    console.error("Error updating document:", err);
    res.status(500).send("Error updating document");
  }
});

module.exports = app;
