import { Model, DataTypes, Sequelize } from "sequelize";
import type { Optional, ModelAttributes } from "sequelize";

import type { Order as OrderType } from "../../types/types.js";

import { CUSTOMER_TABLE } from "./customerModel.js";
export const ORDER_TABLE = "orders";

export type OrderCreationAttributes = Optional<
	OrderType,
	"id" | "createdAt" | "updatedAt"
>;

export class Order
	extends Model<OrderType, OrderCreationAttributes>
	implements OrderType
{
	declare id: number;
	declare customerId: number;
	declare createdAt: Date;
	declare updatedAt: Date;

	static associate(models: Sequelize["models"]) {
		const { Customer } = models as {
			Customer: typeof import("./customerModel.js").Customer;
		};
		this.belongsTo(Customer, { as: "customer", foreignKey: "customerId" });
	}

	static config(sequelize: Sequelize) {
		return {
			sequelize,
			tableName: ORDER_TABLE,
			modelName: "Order",
			timestamps: true,
			underscored: true,
		};
	}
}

export const OrderSchema: ModelAttributes<Order, OrderType> = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	customerId: {
		field: "customer_id",
		allowNull: true,
		type: DataTypes.INTEGER,
		references: {
			model: CUSTOMER_TABLE,
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
		field: "created_at",
		allowNull: false,
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
		field: "updated_at",
		allowNull: false,
	},
};
