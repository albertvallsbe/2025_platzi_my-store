import { User, UserSchema } from "./user.model.js";
import type { Sequelize } from "sequelize";

export const setupModels = (sequelize: Sequelize): void => {
	User.init(UserSchema, User.config(sequelize));
};
