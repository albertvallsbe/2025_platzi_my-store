import { Router } from "express";
import { productsRouter } from "./products.js";
import { categoriesRouter } from "./categories.js";
import { usersRouter } from "./users.js";
import { customersRouter } from "./customers.js";
import { ordersRouter } from "./orders.js";
import { authRouter } from "./authRouter.js";
import { profileRouter } from "./profileRouter.js";

export const router = Router();

router.use("/auth", authRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/users", usersRouter);
router.use("/customers", customersRouter);
router.use("/orders", ordersRouter);
router.use("/profile", profileRouter);
