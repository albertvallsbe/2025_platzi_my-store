import express, { NextFunction, Request, Response } from "express";

import { ProductsService } from "../services/productService.js";

export const productsRouter = express.Router();
const service = new ProductsService();

productsRouter.get("/", async (req: Request, res: Response) => {
	const products = await service.find();
	res.json(products);
});

productsRouter.get("/filter", async (req: Request, res: Response) => {
	res.send("I'm a filter");
});

productsRouter.get(
	"/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const product = await service.findById(id);
			res.status(200).json(product);
		} catch (error) {
			next(error);
		}
	}
);

productsRouter.post("/", async (req: Request, res: Response) => {
	const body = req.body;
	const newProduct = service.create(body);

	res.status(201).json(newProduct);
});

productsRouter.patch(
	"/:id",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const product = await service.updatePatch(id, body);
			res.json(product);
		} catch (error) {
			next(error);
		}
	}
);

productsRouter.put("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, price, image, isBlock } = req.body ?? {};
	if (
		typeof name !== "string" ||
		typeof image !== "string" ||
		typeof price !== "number" ||
		typeof isBlock !== "boolean"
	) {
		return res.status(400).json({
			message:
				"Invalid body: { name:string, price:number, image:string, isBlock:boolean } required",
		});
	}
	const productUpdated = await service.updatePut(id, {
		name,
		price,
		image,
		isBlock,
	});
	res.json(productUpdated);
});

productsRouter.delete("/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const product = await service.deleteById(id);
	res.status(204).json(product);
});
