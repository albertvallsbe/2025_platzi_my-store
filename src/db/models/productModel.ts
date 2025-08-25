import { Model, DataTypes, Sequelize } from "sequelize";
import type { Optional, ModelAttributes } from "sequelize";

import type { Product as ProductType } from "../../types/types.js";

import { CATEGORY_TABLE } from "./categoryModel.js";
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
	declare description: string;
	declare image: string;
	declare isBlock: boolean;
	declare categoryId: number;
	declare createdAt: Date;
	declare updatedAt: Date;

	static associate(models: Sequelize["models"]) {
		const { Category } = models as {
			Category: typeof import("./categoryModel.js").Category;
		};
		this.belongsTo(Category, { as: "category", foreignKey: "productId" });
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
	description: {
		type: DataTypes.STRING,
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
	categoryId: {
		field: "category_id",
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: CATEGORY_TABLE,
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
