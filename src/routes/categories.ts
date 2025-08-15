import express, { Request, Response } from "express";

export const categoriesRouter = express.Router();

categoriesRouter.get(
	"/:categoryId/products/:productId",
	(req: Request, res: Response) => {
		const { productId } = req.params;
		const { categoryId } = req.params;
		res.json({ productId, categoryId, name: "Product 2", price: "150€" });
	}
);
