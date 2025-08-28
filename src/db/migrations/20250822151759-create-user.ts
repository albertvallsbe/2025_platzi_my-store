import type { QueryInterface } from "sequelize";
import type * as SequelizeNS from "sequelize";
import { USER_TABLE } from "../models/userModel.js";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(
		queryInterface: QueryInterface,
		Sequelize: typeof SequelizeNS
	): Promise<void> {
		await queryInterface.createTable(USER_TABLE, {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("NOW"),
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn("NOW"),
			},
		});
	},

	async down(queryInterface: QueryInterface): Promise<void> {
		await queryInterface.dropTable(USER_TABLE);
	},
};
