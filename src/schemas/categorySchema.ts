import Joi from "joi";

const id = Joi.number().integer();
const name = Joi.string()
	.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
	.min(3)
	.max(25);
const image = Joi.string().uri();

export const getCategorySchema = Joi.object({
	id: id.required(),
});

export const createCategorySchema = Joi.object({
	name: name.required(),
	image: image.required(),
});

export const updateCategorySchema = Joi.object({
	name,
	image,
});
