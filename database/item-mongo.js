const mongoose = require("mongoose");

//Připojení k DB - connection string s přímým připojením do databáze s názvem UHK
mongoose.connect("mongodb://localhost:27017/UHK", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Definice schématu (collection), která se při neexistenci vytvoří v připojené databázi
const Schema = mongoose.Schema;
const itemSchema = new Schema({
  content: String,
  count: Number,
  state: String,
  createdAt: Date,
});

const ItemModel = mongoose.model("Item", itemSchema);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

class ItemMongo {
  constructor() {
    // init time and state
    this.createdAt = new Date();
    this.state = "INITIATED";
  }

  async createItem(doc) {
    const item = new ItemModel({
      ...doc,
      createdAt: this.createdAt,
      state: this.state,
    });
    return await item.save();
  }

  async updateItem(id, doc) {
    return ItemModel.findByIdAndUpdate(id, doc, {
      new: true,
    });
  }

  async listItem(doc) {
    return ItemModel.find(doc);
  }

  async deleteItem(id) {
    return ItemModel.findByIdAndDelete(id);
  }
}

module.exports = new ItemMongo();
