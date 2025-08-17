import type { Request, Response, NextFunction } from "express";
import type { Boom } from "@hapi/boom";

import type { AppError } from "../types/types.js";

export const boomErrorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (error && error.isBoom) {
		const { output } = error as Boom;
		res.status(output.statusCode).json(output.payload);
	} else {
		next(error);
	}
};

export const errorHandler = (
	error: AppError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = error.statusCode || 500;
	const message = error.message || "Ocurrio un error";
	console.error(
		`[ERROR] ${new Date().toISOString()} - ${statusCode} - ${message}`
	);

	if (error.stack) {
		console.error(error.stack);
	}

	res.status(statusCode).json({
		status: "error",
		statusCode,
		message,
		...(process.env.NODE_ENV === "development" && { stack: error.stack }),
	});
};
