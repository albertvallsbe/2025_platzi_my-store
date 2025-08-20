import type { Request, Response, NextFunction } from "express";
import { Router } from "express";

import { CategoryService } from "../services/categoryService.js";
import { validatorHandler } from "../middlewares/validatorHandler.js";
import {
	getCategorySchema,
	createCategorySchema,
	updateCategorySchema,
} from "../schemas/category.schema.js";

export const categoriesRouter = Router();
const service = new CategoryService();

categoriesRouter.get(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const categories = await service.find();
			return res.json(categories);
		} catch (error) {
			return next(error);
		}
	}
);

categoriesRouter.get(
	"/:id",
	validatorHandler(getCategorySchema, "params"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const category = await service.findById(id);

			return res.status(200).json(category);
		} catch (error) {
			return next(error);
		}
	}
);

categoriesRouter.post(
	"/",
	validatorHandler(createCategorySchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body = req.body;
			const newCategory = await service.create(body);

			return res.status(201).json(newCategory);
		} catch (error) {
			return next(error);
		}
	}
);

categoriesRouter.patch(
	"/:id",
	validatorHandler(getCategorySchema, "params"),
	validatorHandler(updateCategorySchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const body = req.body;
			const category = await service.updatePatch(id, body);

			return res.json(category);
		} catch (error) {
			return next(error);
		}
	}
);

categoriesRouter.delete(
	"/:id",
	validatorHandler(getCategorySchema, "params"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({ message: "Missing id param" });
			}

			const category = await service.deleteById(id);

			return res.status(204).json(category);
		} catch (error) {
			return next(error);
		}
	}
);
