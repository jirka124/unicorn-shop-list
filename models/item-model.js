const ItemMongo = require("../database/item-mongo");
const { isDate } = require("../helpers/type-util");

class ItemModel {
  constructor() {}

  async createItem(doc) {
    // TODO: run validation
    return await ItemMongo.createItem(doc);
  }

  async updateItem(id, doc) {
    // TODO: run validation
    return await ItemMongo.updateItem(id, doc);
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

    // TODO: run validation
    return await ItemMongo.listItem(docFilter);
  }

  async deleteItem(id) {
    // TODO: run validation
    return await ItemMongo.deleteItem(id);
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
