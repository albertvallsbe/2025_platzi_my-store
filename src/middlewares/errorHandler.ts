import express, { Request, Response, NextFunction } from "express";
export interface AppError extends Error {
	statusCode?: number;
}

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
