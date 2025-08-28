import { faker } from "@faker-js/faker";
import {
	ValidationError,
	UniqueConstraintError,
	DatabaseError,
} from "sequelize";
import Boom from "@hapi/boom";

import type { User as UserType } from "../types/types.js";
import { User as UserModel } from "../db/models/userModel.js";

export class UserService {
	private users: Omit<UserType, "id">[] = [];

	constructor() {
		this.generate();
	}

	async generate(): Promise<void> {
		try {
			const limit = 12;
			for (let index = 0; index < limit; index++) {
				this.users.push({
					email: faker.internet.email(),
					password: faker.internet.password({ length: 12 }),
					role: faker.helpers.arrayElement(["admin", "customer", "seller"]),
					createdAt: new Date(),
					updatedAt: new Date(),
				});
			}
			return;
		} catch (error) {
			throw Boom.badImplementation("Failed to generate users");
		}
	}

	async create(data: Omit<UserType, "id">): Promise<UserType> {
		try {
			const newUser = await UserModel.create(data);

			return newUser.toJSON() as UserType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Email already exist");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to create user");
		}
	}

	async find(): Promise<UserType[]> {
		try {
			const users = await UserModel.findAll({
				include: [{ association: "customer" }],
			});

			return users as UserType[];
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching users");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch users");
		}
	}

	async findById(id: string): Promise<UserType> {
		try {
			const user = await UserModel.findByPk(id);
			if (!user) {
				throw Boom.notFound(`User ${id} not found`);
			}

			return user.toJSON() as UserType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching user");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch user");
		}
	}

	async updatePatch(
		id: string,
		changes: Partial<Omit<UserType, "id">>
	): Promise<UserType> {
		try {
			const user = await UserModel.findByPk(id);
			if (!user) {
				throw Boom.notFound(`User ${id} not found`);
			}

			const {
				createdAt: _createdAt,
				updatedAt: _updatedAt,
				...safeChanges
			} = changes;
			const updatedUser = await user.update(safeChanges);

			return updatedUser.toJSON() as UserType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Email already exists");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while updating user");
			}
			throw Boom.badImplementation("Failed to update user");
		}
	}

	async deleteById(id: string): Promise<void> {
		try {
			const user = await UserModel.findByPk(id);
			if (!user) {
				throw Boom.notFound(`User ${id} not found`);
			}

			await user.destroy();
			return;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while deleting user");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to delete user");
		}
	}
}
