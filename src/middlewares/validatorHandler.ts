import type { Request, Response, NextFunction } from "express";
import { badRequest } from "@hapi/boom";
import type Joi from "joi";

import type { ReqProperty } from "../types/types.js";

export const validatorHandler = (schema: Joi.Schema, property: ReqProperty) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const data = req[property];
		const { error } = schema.validate(data, {
			abortEarly: false,
			stripUnknown: true,
			convert: true,
		});

		if (error) {
			return next(badRequest("Validation error", { details: error.details }));
		}
		return next();
	};
};
