import Joi from "joi";

export const todoBodySchema = Joi.object({
  title: Joi.string().min(3).required().messages({
    "any.required": "Title is required",
    "string.min": "Title must be atleast 3 characters long",
  }),
  description: Joi.string().min(3).max(100).required().messages({
    "any.required": "Description is required",
    "string.min": "Description must be atleast 3 characters long",
    "string.max": "Description shouldnot exceed 100 characters",
  }),
}).options({
  stripUnknown: true,
});
