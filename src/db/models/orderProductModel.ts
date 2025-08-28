import { Model, DataTypes, Sequelize } from "sequelize";
import type { Optional, ModelAttributes } from "sequelize";

import type {
	OrderProduct as OrderProductType,
	CreationAttributesFor,
} from "../../types/types.js";

import { ORDER_TABLE } from "./orderModel.js";
import { PRODUCT_TABLE } from "./productModel.js";
export const ORDER_PRODUCT_TABLE = "orders_products";

export type OrderProductCreationAttributes = Optional<
	OrderProductType,
	CreationAttributesFor<OrderProductType>
>;

export class OrderProduct
	extends Model<OrderProductType, OrderProductCreationAttributes>
	implements OrderProductType
{
	declare id: number;
	declare amount: number;
	declare orderId: number;
	declare productId: number;
	declare createdAt: Date;
	declare updatedAt: Date;

	static associate(models: Sequelize["models"]) {
		const { Order } = models as {
			Order: typeof import("./orderModel.js").Order;
		};
		const { Product } = models as {
			Product: typeof import("./productModel.js").Product;
		};

		this.belongsTo(Order, { as: "order", foreignKey: "orderId" });
		this.belongsTo(Product, { as: "product", foreignKey: "productId" });
	}

	static config(sequelize: Sequelize) {
		return {
			sequelize,
			tableName: ORDER_PRODUCT_TABLE,
			modelName: "OrderProduct",
			timestamps: true,
			underscored: true,
		};
	}
}

export const OrderProductSchema: ModelAttributes<
	OrderProduct,
	OrderProductType
> = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	amount: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	orderId: {
		field: "order_id",
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: ORDER_TABLE,
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
	},
	productId: {
		field: "product_id",
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: PRODUCT_TABLE,
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
