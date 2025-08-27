import type { Request, Response, NextFunction } from "express";
import { Router } from "express";

import { OrderService } from "../services/orderService.js";
import { validatorHandler } from "../middlewares/validatorHandler.js";
import {
	getOrderSchema,
	createOrderSchema,
	updateOrderSchema,
	addItemSchema,
} from "../schemas/orderSchema.js";

export const ordersRouter = Router();
const service = new OrderService();

ordersRouter.get(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const orders = await service.find();

			return res.json(orders);
		} catch (error) {
			return next(error);
		}
	}
);

ordersRouter.get(
	"/:id",
	validatorHandler(getOrderSchema, "params"),
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

ordersRouter.post(
	"/",
	validatorHandler(createOrderSchema, "body"),
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

ordersRouter.patch(
	"/:id",
	validatorHandler(getOrderSchema, "params"),
	validatorHandler(updateOrderSchema, "body"),
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

// productsRouter.put(
// 	"/:id",
// 	validatorHandler(getProductSchema, "params"),
// 	validatorHandler(replaceProductSchema, "body"),
// 	async (req: Request, res: Response, next: NextFunction) => {
// 		try {
// 			const id = req.params.id;
// 			if (!id) {
// 				return res.status(400).json({ message: "Missing id param" });
// 			}
// 			const { name, price, image, isBlock } = req.body ?? {};
// 			if (
// 				typeof name !== "string" ||
// 				typeof image !== "string" ||
// 				typeof price !== "number" ||
// 				typeof isBlock !== "boolean"
// 			) {
// 				return res.status(400).json({
// 					message:
// 						"Invalid body: { name:string, price:number, image:string, isBlock:boolean } required",
// 				});
// 			}
// 			const productUpdated = await service.updatePut(id, {
// 				name,
// 				price,
// 				image,
// 				isBlock,
// 			});
// 			return res.json(productUpdated);
// 		} catch (error) {
// 			return next(error);
// 		}
// 	}
// );

ordersRouter.delete(
	"/:id",
	validatorHandler(getOrderSchema, "params"),
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

ordersRouter.post(
	"/add-item",
	validatorHandler(addItemSchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body = req.body;
			const newItem = await service.addItem(body);

			return res.status(201).json(newItem);
		} catch (error) {
			return next(error);
		}
	}
);
