import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().trim().min(5).max(2000).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().trim().min(2).max(80).required(),
  stock: Joi.number().integer().min(0).default(0),
});
