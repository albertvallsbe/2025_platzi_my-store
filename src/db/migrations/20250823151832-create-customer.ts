import type { QueryInterface } from "sequelize";
import type * as SequelizeNS from "sequelize";
import { CUSTOMER_TABLE } from "../models/customerModel.js";
import { USER_TABLE } from "../models/userModel.js";

/** @type {import('sequelize-cli').Migration} */
export default {
	async up(
		queryInterface: QueryInterface,
		Sequelize: typeof SequelizeNS
	): Promise<void> {
		await queryInterface.createTable(CUSTOMER_TABLE, {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: false,
			},
			first_surname: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: false,
			},
			second_surname: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: false,
			},
			phone: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				unique: true,
				references: {
					model: USER_TABLE,
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "SET NULL",
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
		await queryInterface.dropTable(CUSTOMER_TABLE);
	},
};
