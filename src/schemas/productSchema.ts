import Joi from "joi";

const id = Joi.number().integer();
const name = Joi.string()
	.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
	.min(3)
	.max(25);
const price = Joi.number().precision(2).positive();
const description = Joi.string()
	.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
	.min(3)
	.max(25);
const image = Joi.string().uri();
const isBlock = Joi.boolean();
const categoryId = Joi.number().integer();

export const getProductSchema = Joi.object({
	id: id.required(),
});

export const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	description: description.required(),
	image: image.required(),
	isBlock: isBlock.required(),
	categoryId: categoryId.required(),
});

export const updateProductSchema = Joi.object({
	name,
	price,
	description,
	image,
	isBlock,
	categoryId,
});

export const replaceProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	description: description.required(),
	image: image.required(),
	isBlock: isBlock.required(),
	categoryId: categoryId.required(),
});
