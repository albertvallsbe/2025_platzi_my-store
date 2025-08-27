import type { QueryInterface } from "sequelize";

import {
	OrderProductSchema,
	ORDER_PRODUCT_TABLE,
} from "../models/orderProductModel.js";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface: QueryInterface): Promise<void> {
		await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
	},

	async down(queryInterface: QueryInterface): Promise<void> {
		await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
	},
};
