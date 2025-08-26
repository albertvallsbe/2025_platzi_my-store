import type { Sequelize } from "sequelize";

import { User, UserSchema } from "./userModel.js";
import { Customer, CustomerSchema } from "./customerModel.js";
import { Product, ProductSchema } from "./productModel.js";
import { Category, CategorySchema } from "./categoryModel.js";
import { Order, OrderSchema } from "./orderModel.js";

export const setupModels = (sequelize: Sequelize): void => {
	User.init(UserSchema, User.config(sequelize));
	Customer.init(CustomerSchema, Customer.config(sequelize));
	Product.init(ProductSchema, Product.config(sequelize));
	Category.init(CategorySchema, Category.config(sequelize));
	Order.init(OrderSchema, Order.config(sequelize));

	User.associate?.(sequelize.models);
	Customer.associate?.(sequelize.models);
	Category.associate?.(sequelize.models);
	Product.associate?.(sequelize.models);
	Order.associate?.(sequelize.models);
};
