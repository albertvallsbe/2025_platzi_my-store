import Joi from "joi";

const id = Joi.number().integer();
const name = Joi.string()
	.pattern(/^[\p{L}\p{N}\s'’&().,:;!-]+$/u)
	.min(3)
	.max(25);
const price = Joi.number().precision(2).positive();
const description = Joi.string()
	.pattern(/^[\p{L}\p{N}\s'’&().,:;!-]+$/u)
	.min(3)
	.max(25);
const image = Joi.string().uri();
const isBlock = Joi.boolean();
const categoryId = Joi.number().integer().min(1);

const limit = Joi.number().integer().min(1).max(100).default(20);
const offset = Joi.number().integer().min(0).default(0);

const price_min = Joi.number().precision(2).positive();
const price_max = Joi.number()
	.precision(2)
	.positive()
	.min(Joi.ref("price_min"));

export const getProductSchema = Joi.object({
	id: id.required(),
});

export const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	description: description.required(),
	image: image.required(),
	isBlock,
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

export const queryParamsSchema = Joi.object({
	limit,
	offset,
	price,
	price_min,
	price_max: price_max.when("price_min", {
		is: Joi.exist(),
		then: price_max.required(),
		otherwise: price_max.optional(),
	}),
});
