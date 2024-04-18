const Joi = require("joi");

const createItemSchema = Joi.object({
  content: Joi.string().required(),
  count: Joi.number().min(0).required(),
});

const listItemSchema = Joi.object({
  content: Joi.string(),
  state: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())),
  createdAt: Joi.alternatives().try(
    Joi.date().iso(),
    Joi.object({
      $gte: Joi.date().iso(),
      $lte: Joi.date().iso(),
    })
  ),
});

const updateItemSchema = Joi.object({
  id: Joi.string().length(24).hex().required(),
  content: Joi.string(),
  count: Joi.number().min(0),
  state: Joi.string(),
});

const deleteItemSchema = Joi.object({
  id: Joi.string().length(24).hex().required(),
});

module.exports = {
  createItemSchema,
  listItemSchema,
  updateItemSchema,
  deleteItemSchema,
};
