import { Router } from "express";
import { productsRouter } from "./products.js";
import { categoriesRouter } from "./categories.js";
import { usersRouter } from "./users.js";

export const router = Router();

router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/users", usersRouter);
