import type { QueryInterface } from "sequelize";

import { OrderSchema, ORDER_TABLE } from "../models/orderModel.js";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(queryInterface: QueryInterface): Promise<void> {
		await queryInterface.createTable(ORDER_TABLE, OrderSchema);
	},

	async down(queryInterface: QueryInterface): Promise<void> {
		await queryInterface.dropTable(ORDER_TABLE);
	},
};
