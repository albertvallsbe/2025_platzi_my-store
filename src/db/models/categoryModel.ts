import { Model, DataTypes, Sequelize } from "sequelize";
import type { Optional, ModelAttributes } from "sequelize";

import type { Category as CategoryType } from "../../types/types.js";

export const CATEGORY_TABLE = "categories";

export type CategoryCreationAttributes = Optional<
	CategoryType,
	"id" | "createdAt" | "updatedAt"
>;

export class Category
	extends Model<CategoryType, CategoryCreationAttributes>
	implements CategoryType
{
	declare id: number;
	declare name: string;
	declare image: string;
	declare createdAt: Date;
	declare updatedAt: Date;

	static associate(models: Sequelize["models"]) {
		const { Product } = models as {
			Product: typeof import("./productModel.js").Product;
		};
		this.hasMany(Product, { as: "products", foreignKey: "categoryId" });
	}

	static config(sequelize: Sequelize) {
		return {
			sequelize,
			tableName: CATEGORY_TABLE,
			modelName: "Category",
			timestamps: true,
			underscored: true,
		};
	}
}

export const CategorySchema: ModelAttributes<Category, CategoryType> = {
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
	image: {
		type: DataTypes.STRING,
		allowNull: false,
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
