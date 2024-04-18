const ItemMongo = require("../database/item-mongo");
const { isDate } = require("../helpers/type-util");
const Validator = require("../validation/Validator");
const {
  createItemSchema,
  listItemSchema,
  updateItemSchema,
  deleteItemSchema,
} = require("../validation/item-valid");

class ItemModel {
  constructor() {}

  async createItem(doc) {
    // run validation
    const validDoc = await Validator.validate(createItemSchema, doc);

    return await ItemMongo.createItem(validDoc);
  }

  async updateItem(id, doc) {
    // run validation
    const validDoc = await Validator.validate(updateItemSchema, { ...doc, id });

    return await ItemMongo.updateItem(validDoc.id, validDoc);
  }

  async listItems(doc) {
    // result filter object
    const docFilter = {};

    // get createdAt filter rule
    if (Object.hasOwn(doc, "createdAt")) {
      const createDetail = new InputParser().parseDate(doc.createdAt);

      if (!createDetail.isRange)
        docFilter.createdAt = createDetail.value; // is date
      else {
        if (createDetail.hasStart && createDetail.hasEnd) {
          // has both boundries
          docFilter.createdAt = {
            $gte: createDetail.value.start,
            $lte: createDetail.value.end,
          };
        } else if (createDetail.hasStart) {
          // has only start
          docFilter.createdAt = { $gte: createDetail.value.start };
        } else if (createDetail.hasEnd) {
          // has only end
          docFilter.createdAt = { $lte: createDetail.value.end };
        } else {
          // invalid data range provided
          throw new Error("7b328e_iebaIEnfE");
        }
      }
    }

    // get state filter rule
    if (Object.hasOwn(doc, "state")) {
      if (doc.state.startsWith("[") && doc.state.endsWith("]"))
        docFilter.state = JSON.parse(doc.state); // is expected multi-value
      else docFilter.state = doc.state; // is one value
    }

    // get content filter rule
    if (Object.hasOwn(doc, "content")) docFilter.content = doc.content;

    // run validation
    const validDocFilter = await Validator.validate(listItemSchema, docFilter);

    return await ItemMongo.listItem(validDocFilter);
  }

  async deleteItem(id) {
    // run validation
    const validDoc = await Validator.validate(deleteItemSchema, { id });

    return await ItemMongo.deleteItem(validDoc.id);
  }
}

class InputParser {
  parseDate(date) {
    let dateDetail = {
      value: date,
      isRange: false,
      hasStart: false,
      hasEnd: false,
    };

    if (isDate(new Date(date))) {
      // is date, use as is
    } else if (date.startsWith("{") && date.endsWith("}")) {
      // is object, extract range
      let dateObj = JSON.parse(date);

      // check whether has start and end
      if (Object.hasOwn(dateObj, "start") && isDate(new Date(dateObj.start)))
        dateDetail.hasStart = true;
      if (Object.hasOwn(dateObj, "end") && isDate(new Date(dateObj.end)))
        dateDetail.hasEnd = true;

      // check if is range or primitive date
      if (dateDetail.hasStart || dateDetail.hasEnd) dateDetail.isRange = true;

      dateDetail.value = dateObj;
    }

    return dateDetail;
  }
}

module.exports = new ItemModel();
