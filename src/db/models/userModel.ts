import { Model, DataTypes, Sequelize } from "sequelize";
import type { Optional, ModelAttributes } from "sequelize";

import type { UserRole, User as UserType } from "../../types/types.js";
export const USER_TABLE = "users";

export type UserCreationAttributes = Optional<
	UserType,
	"id" | "role" | "createdAt" | "updatedAt"
>;

export class User
	extends Model<UserType, UserCreationAttributes>
	implements UserType
{
	declare id: number;
	declare email: string;
	declare password: string;
	declare role: UserRole;
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
			tableName: USER_TABLE,
			modelName: "User",
			timestamps: true,
			underscored: true,
		};
	}
}

export const UserSchema: ModelAttributes<User, UserType> = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	role: {
		type: DataTypes.ENUM("admin", "customer", "seller"),
		defaultValue: "customer",
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
