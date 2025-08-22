import Joi from "joi";

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const name = Joi.string().min(2).max(25);
const firstSurname = Joi.string().min(2).max(25);
const secondSurname = Joi.string().min(2).max(25);
const role = Joi.string().min(5);

export const createUserSchema = Joi.object({
	email: email.required(),
	password: password.required(),
	name: name.required(),
	firstSurname: name.required(),
	secondSurname: name.required(),
	role: role.required(),
});

export const updateUserSchema = Joi.object({
	email: email,
	name: name,
	firstSurname: firstSurname,
	secondSurname: secondSurname,
	role: role,
});

export const getUserSchema = Joi.object({
	id: id.required(),
});
