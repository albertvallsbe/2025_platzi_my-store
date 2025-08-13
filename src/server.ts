import dotenv from "dotenv";
import { app } from "./app.js";
import { type AppError, errorHandler } from "./middlewares/errorHandler.js";

import { Request, Response, NextFunction } from "express";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

app.get("/favicon.ico", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, "../src/img/favicon.ico"));
});

app.use((req: Request, _res: Response, next: NextFunction) => {
	const error: AppError = new Error("Not Found");
	error.statusCode = 404;
	next(error);
});

app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Servidor: http://localhost:${PORT}`);
});
