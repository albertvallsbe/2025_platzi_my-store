import { Model, DataTypes, Sequelize } from "sequelize";
import type { Optional, ModelAttributes } from "sequelize";

import type { Product as ProductType } from "../../types/types.js";
export const PRODUCT_TABLE = "products";

export type ProductCreationAttributes = Optional<
	ProductType,
	"id" | "createdAt" | "updatedAt"
>;

export class Product
	extends Model<ProductType, ProductCreationAttributes>
	implements ProductType
{
	declare id: number;
	declare name: string;
	declare price: number;
	declare image: string;
	declare isBlock: boolean;
	declare createdAt: Date;
	declare updatedAt: Date;

	static associate(models: Sequelize["models"]) {
		const { Customer } = models as {
			Customer: typeof import("./customerModel.js").Customer;
		};
		this.hasOne(Customer, { as: "customer", foreignKey: "userId" });
	}

	static config(sequelize: Sequelize) {
		return {
			sequelize,
			tableName: PRODUCT_TABLE,
			modelName: "Product",
			timestamps: true,
			underscored: true,
		};
	}
}

export const ProductSchema: ModelAttributes<Product, ProductType> = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	isBlock: {
		field: "is_block",
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false,
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
