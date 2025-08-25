import Joi from "joi";

const id = Joi.string().uuid();
const name = Joi.string()
	.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
	.min(3)
	.max(25);
const price = Joi.number().integer().min(5);
const description = Joi.string()
	.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
	.min(3)
	.max(25);
const image = Joi.string().uri();
const isBlock = Joi.boolean();

export const getProductSchema = Joi.object({
	id: id.required(),
});

export const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	description: description.required(),
	image: image.required(),
	isBlock: isBlock.required(),
});

export const updateProductSchema = Joi.object({
	name,
	price,
	description,
	image,
	isBlock,
});

export const replaceProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	description: description.required(),
	image: image.required(),
	isBlock: isBlock.required(),
});
