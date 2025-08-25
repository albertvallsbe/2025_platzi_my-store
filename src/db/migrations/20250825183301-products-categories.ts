import type { QueryInterface } from "sequelize";

import { CategorySchema, CATEGORY_TABLE } from "../models/categoryModel.js";
import { ProductSchema, PRODUCT_TABLE } from "../models/productModel.js";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface: QueryInterface): Promise<void> {
		await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
		await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
	},

	async down(queryInterface: QueryInterface): Promise<void> {
		await queryInterface.dropTable(CATEGORY_TABLE);
		await queryInterface.dropTable(PRODUCT_TABLE);
	},
};
