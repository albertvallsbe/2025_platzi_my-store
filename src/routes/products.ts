import express, { Request, Response } from "express";
import { faker } from "@faker-js/faker";

export const productsRouter = express.Router();

productsRouter.get("/", (req: Request, res: Response) => {
	const products = [];
	const size = Number(req.query.size);
	const limit = size || 12;
	for (let index = 0; index < limit; index++) {
		products.push({
			name: faker.commerce.productName(),
			price: parseInt(faker.commerce.price(), 10),
			image: faker.image.url(),
		});
	}
	res.json(products);
});

productsRouter.get("/filter", (req: Request, res: Response) => {
	res.send("I'm a filter");
});

productsRouter.get("/:id", (req: Request, res: Response) => {
	const { id } = req.params;
	res.json({ id, name: "Product 2", price: "150€" });
});

productsRouter.post("/", (req: Request, res: Response) => {
	const body = req.body;
	res.json({ message: "Created", data: body });
});

productsRouter.patch("/:id", (req: Request, res: Response) => {
	const { id } = req.params;
	const body = req.body;
	res.json({ message: "Updated", data: body, id });
});

productsRouter.delete("/:id", (req: Request, res: Response) => {
	const { id } = req.params;
	res.json({ message: "Deleted", id });
});
