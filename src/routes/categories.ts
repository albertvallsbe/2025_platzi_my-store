import type { Request, Response, NextFunction } from "express";
import passport from "passport";

import { Router } from "express";

import { CategoryService } from "../services/categoryService.js";
import { validatorHandler } from "../middlewares/validatorHandler.js";
import { checkRoles } from "../middlewares/authHandler.js";
import {
	getCategorySchema,
	createCategorySchema,
	updateCategorySchema,
} from "../schemas/categorySchema.js";

export const categoriesRouter = Router();
const service = new CategoryService();

categoriesRouter.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	checkRoles("admin", "seller", "customer"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const categories = await service.find();

			return res.json(categories);
		} catch (error) {
			return next(error);
		}
	},
);

categoriesRouter.get(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	checkRoles("admin", "seller", "customer"),
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
	},
);

categoriesRouter.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	checkRoles("admin", "seller"),
	validatorHandler(createCategorySchema, "body"),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body = req.body;
			const newCategory = await service.create(body);

			return res.status(201).json(newCategory);
		} catch (error) {
			return next(error);
		}
	},
);

categoriesRouter.patch(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	checkRoles("admin", "seller"),
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
	},
);

categoriesRouter.delete(
	"/:id",
	passport.authenticate("jwt", { session: false }),
	checkRoles("admin", "seller"),
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
	},
);
