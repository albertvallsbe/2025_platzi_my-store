import { Model, DataTypes, Sequelize } from "sequelize";
import type { Optional, ModelAttributes } from "sequelize";

export const USER_TABLE = "users";

export type UserRole = "admin" | "customer" | "seller";

export interface UserAttributes {
	id: number;
	email: string;
	password: string;
	name: string;
	firstSurname: string;
	secondSurname: string;
	role: UserRole;
	createdAt: Date;
	updatedAt: Date;
}

export type UserCreationAttributes = Optional<
	UserAttributes,
	"id" | "role" | "createdAt" | "updatedAt"
>;

export class User
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes
{
	public id!: number;
	public email!: string;
	public password!: string;
	public name!: string;
	public firstSurname!: string;
	public secondSurname!: string;
	public role!: UserRole;
	public createdAt!: Date;
	public updatedAt!: Date;

	static associate() {
		// associate
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

export const UserSchema: ModelAttributes<User, UserAttributes> = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	email: {
		allowNull: false,
		type: DataTypes.STRING,
		unique: true,
	},
	password: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING,
		field: "name",
		unique: false,
	},
	firstSurname: {
		allowNull: false,
		type: DataTypes.STRING,
		field: "first_surname",
		unique: false,
	},
	secondSurname: {
		allowNull: true,
		type: DataTypes.STRING,
		field: "second_surname",
		unique: false,
	},
	role: {
		allowNull: false,
		type: DataTypes.ENUM("admin", "customer", "seller"),
		defaultValue: "customer",
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: "created_at",
		defaultValue: DataTypes.NOW,
	},
	updatedAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: "updated_at",
		defaultValue: DataTypes.NOW,
	},
};
