import type { QueryInterface } from "sequelize";
import type * as SequelizeNS from "sequelize";

import { USER_TABLE } from "../models/userModel.js";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(
		queryInterface: QueryInterface,
		Sequelize: typeof SequelizeNS,
	): Promise<void> {
		const table = await queryInterface.describeTable(USER_TABLE);
		if (!table.recovery_token) {
			await queryInterface.addColumn(USER_TABLE, "recovery_token", {
				field: "recovery_token",
				allowNull: true,
				type: Sequelize.DataTypes.STRING,
			});
		}
		if (!table.recovery_token) {
			// eslint-disable-next-line no-console
			console.log(!table.recovery_token);
		}
	},

	async down(queryInterface: QueryInterface): Promise<void> {
		const table = await queryInterface.describeTable(USER_TABLE);
		if (table.recovery_token) {
			await queryInterface.removeColumn(USER_TABLE, "recovery_token");
		}
	},
};
