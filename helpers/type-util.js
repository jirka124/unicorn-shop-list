const isObject = (object) => {
  typeof object === "object" && !Array.isArray(object) && object !== null;
};

const isDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

module.exports.isObject = isObject;
module.exports.isDate = isDate;
