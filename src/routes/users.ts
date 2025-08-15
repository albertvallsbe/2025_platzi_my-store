import express, { Request, Response } from "express";

export const usersRouter = express.Router();

usersRouter.get("/", (req: Request, res: Response) => {
	const { limit, offset } = req.query;

	if (limit && offset) {
		res.json({ limit, offset });
	}
	res.send("No query params");
});
