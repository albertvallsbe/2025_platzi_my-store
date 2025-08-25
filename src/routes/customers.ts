import type { Request, Response, NextFunction } from "express";
import { Router } from "express";

import { CustomerService } from "../services/customerService.js";
import { validatorHandler } from "../middlewares/validatorHandler.js";
import {
	getCustomerSchema,
	createCustomerSchema,
	updateCustomerSchema,
} from "../schemas/customerSchema.js";

export const customersRouter = Router();
const service = new CustomerService();

customersRouter.get(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const customers = await service.find();

			return res.json(customers);
		} catch (error) {
			return next(error);
		}
	}
);

customersRouter.get(
	"/:id",
	validatorHandler(getCustomerSchema, "params"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const customer = await service.findById(id);

			return res.status(200).json(customer);
		} catch (error) {
			return next(error);
		}
	}
);

customersRouter.post(
	"/",
	validatorHandler(createCustomerSchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body = req.body;
			const newCustomer = await service.create(body);

			return res.status(201).json(newCustomer);
		} catch (error) {
			return next(error);
		}
	}
);

customersRouter.patch(
	"/:id",
	validatorHandler(getCustomerSchema, "params"),
	validatorHandler(updateCustomerSchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const body = req.body;
			const customer = await service.updatePatch(id, body);

			return res.json(customer);
		} catch (error) {
			return next(error);
		}
	}
);

customersRouter.delete(
	"/:id",
	validatorHandler(getCustomerSchema, "params"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const customer = await service.deleteById(id);

			return res.status(204).json(customer);
		} catch (error) {
			return next(error);
		}
	}
);
