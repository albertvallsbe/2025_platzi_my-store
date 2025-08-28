import Joi from "joi";

const id = Joi.number().integer();
const name = Joi.string().min(2).max(25);
const firstSurname = Joi.string().min(2).max(25);
const secondSurname = Joi.string().min(2).max(25);
const phone = Joi.string();
const userId = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string();

export const getCustomerSchema = Joi.object({
	id: id.required(),
});

export const createCustomerSchema = Joi.object({
	name: name.required(),
	firstSurname: name.required(),
	secondSurname: name.required(),
	phone: phone.required(),
	user: Joi.object({
		email: email.required(),
		password: password.required(),
	}),
});

export const updateCustomerSchema = Joi.object({
	name: name,
	firstSurname: firstSurname,
	secondSurname: secondSurname,
	phone,
	userId,
});
