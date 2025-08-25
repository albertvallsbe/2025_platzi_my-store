import type { QueryInterface } from "sequelize";
import type * as SequelizeNS from "sequelize";
import { USER_TABLE } from "../models/userModel.js";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(
		queryInterface: QueryInterface,
		Sequelize: typeof SequelizeNS
	): Promise<void> {
		await queryInterface.addColumn(USER_TABLE, "role", {
			type: Sequelize.ENUM("admin", "customer", "seller"),
			allowNull: false,
			defaultValue: "customer",
		});
	},

	async down(queryInterface: QueryInterface): Promise<void> {
		await queryInterface.removeColumn(USER_TABLE, "role");
	},
};
