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
	declare items?: Array<{ price: number; OrderProduct: { amount: number } }>;
	declare total?: number;
	declare createdAt: Date;
	declare updatedAt: Date;

	static associate(models: Sequelize["models"]) {
		const { Customer } = models as {
			Customer: typeof import("./customerModel.js").Customer;
		};
		const { Product } = models as {
			Product: typeof import("./productModel.js").Product;
		};
		const { OrderProduct } = models as {
			OrderProduct: typeof import("./orderProductModel.js").OrderProduct;
		};

		this.belongsTo(Customer, { as: "customer", foreignKey: "customerId" });
		this.belongsToMany(Product, {
			as: "items",
			through: OrderProduct,
			foreignKey: "orderId",
			otherKey: "productId",
		});
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

type OrderSchemaAttrs = OrderType & { total?: number };

export const OrderSchema: ModelAttributes<Order, OrderSchemaAttrs> = {
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
	total: {
		type: DataTypes.VIRTUAL,
		get(this: Order) {
			const items = (this as any).items as
				| Array<{ price: number; OrderProduct?: { amount?: number } }>
				| undefined;

			if (!items || items.length === 0) return 0;

			return items.reduce((sum: number, item) => {
				const price = Number(item.price) || 0;
				const amount = Number(item.OrderProduct?.amount) || 0;
				return sum + price * amount;
			}, 0);
		},
	},
};
