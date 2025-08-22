import type { QueryInterface } from "sequelize";
import type * as SequelizeNS from "sequelize";
import { USER_TABLE } from "../models/user.model.js";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(
		queryInterface: QueryInterface,
		Sequelize: typeof SequelizeNS
	): Promise<void> {
		await queryInterface.addColumn(USER_TABLE, "name", {
			type: Sequelize.STRING,
			allowNull: false,
		});
		await queryInterface.addColumn(USER_TABLE, "first_surname", {
			type: Sequelize.STRING,
			allowNull: false,
		});
		await queryInterface.addColumn(USER_TABLE, "second_surname", {
			type: Sequelize.STRING,
			allowNull: false,
		});
	},

	async down(queryInterface: QueryInterface): Promise<void> {
		await queryInterface.removeColumn(USER_TABLE, "name");
		await queryInterface.removeColumn(USER_TABLE, "first_surname");
		await queryInterface.removeColumn(USER_TABLE, "second_surname");
	},
};
