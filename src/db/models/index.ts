import { User, UserSchema } from "./userModel.js";
import { Customer, CustomerSchema } from "./customerModel.js";
import type { Sequelize } from "sequelize";

export const setupModels = (sequelize: Sequelize): void => {
	User.init(UserSchema, User.config(sequelize));
	Customer.init(CustomerSchema, Customer.config(sequelize));

	User.associate?.(sequelize.models);
	Customer.associate?.(sequelize.models);
};
