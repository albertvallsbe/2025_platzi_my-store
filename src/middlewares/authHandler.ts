import Boom from "@hapi/boom";
import type { Request, Response, NextFunction } from "express";

import { config } from "./../config/config.js";
import type { AuthUser, UserRole } from "../types/types.js";

export const checkApiKey = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const apiKey = req.headers["api"];
	if (apiKey === config.apiKey) {
		return next();
	} else {
		return next(Boom.unauthorized());
	}
};

export const checkAdminRole = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const user = req.user;
	if (!user) {
		return next(Boom.unauthorized());
	}

	const { role } = user as AuthUser;
	if (role === "admin") {
		return next();
	} else {
		return next(Boom.unauthorized());
	}
};

export const checkRoles = (...roles: UserRole[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const user = req.user;

		if (!user) {
			return next(Boom.unauthorized());
		}
		const { role } = user as AuthUser;

		if (roles.includes(role)) {
			return next();
		} else {
			return next(Boom.unauthorized());
		}
	};
};
