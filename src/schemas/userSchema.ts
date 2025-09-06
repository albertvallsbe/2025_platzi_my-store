import Joi from "joi";

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const recoveryToken = Joi.alternatives()
	.try(Joi.string(), Joi.boolean())
	.allow(null);
const role = Joi.string().valid("admin", "customer", "seller");

export const getUserSchema = Joi.object({
	id: id.required(),
});

export const createUserSchema = Joi.object({
	email: email.required(),
	password: password.required(),
	role: role.required(),
});

export const updateUserSchema = Joi.object({
	email: email,
	role: role,
	recoveryToken: recoveryToken,
});
