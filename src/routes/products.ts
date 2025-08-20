import type { Request, Response, NextFunction } from "express";
import { Router } from "express";

import { ProductsService } from "../services/productService.js";
import { validatorHandler } from "../middlewares/validatorHandler.js";
import {
	getProductSchema,
	createProductSchema,
	updateProductSchema,
	replaceProductSchema,
} from "../schemas/product.schema.js";

export const productsRouter = Router();
const service = new ProductsService();

productsRouter.get(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const products = await service.find();

			return res.json(products);
		} catch (error) {
			return next(error);
		}
	}
);

productsRouter.get(
	"/:id",
	validatorHandler(getProductSchema, "params"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const product = await service.findById(id);

			return res.status(200).json(product);
		} catch (error) {
			return next(error);
		}
	}
);

productsRouter.post(
	"/",
	validatorHandler(createProductSchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body = req.body;
			const newProduct = await service.create(body);

			return res.status(201).json(newProduct);
		} catch (error) {
			return next(error);
		}
	}
);

productsRouter.patch(
	"/:id",
	validatorHandler(getProductSchema, "params"),
	validatorHandler(updateProductSchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const body = req.body;
			const product = await service.updatePatch(id, body);

			return res.json(product);
		} catch (error) {
			return next(error);
		}
	}
);

productsRouter.put(
	"/:id",
	validatorHandler(getProductSchema, "params"),
	validatorHandler(replaceProductSchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}
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
			return res.json(productUpdated);
		} catch (error) {
			return next(error);
		}
	}
);

productsRouter.delete(
	"/:id",
	validatorHandler(getProductSchema, "params"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const product = await service.deleteById(id);

			return res.status(204).json(product);
		} catch (error) {
			return next(error);
		}
	}
);
