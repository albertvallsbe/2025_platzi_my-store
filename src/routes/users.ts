import type { Request, Response } from "express";
import { Router } from "express";

export const usersRouter = Router();

usersRouter.get("/", (req: Request, res: Response) => {
	const { limit, offset } = req.query;

	if (limit && offset) {
		res.json({ limit, offset });
	}
	res.send("No query params");
});
