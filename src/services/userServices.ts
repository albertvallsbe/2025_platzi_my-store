import { faker } from "@faker-js/faker";
import type { User as UserApp } from "../types/types.js";
import { User as UserModel } from "../db/models/user.model.js";
// import Boom from "@hapi/boom";

import { sequelize } from "../libs/sequalize.js";
import { QueryTypes } from "sequelize";

type Task = {
	id: string | number;
	title: string;
	completed: boolean;
};

export class UserService {
	private users: Omit<UserApp, "id">[] = [];

	constructor() {
		this.generate();
	}

	async generate(): Promise<void> {
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
	}

	async create(data: Omit<UserApp, "id">) {
		return data;
	}

	async findTasks(): Promise<Task[]> {
		const query = "SELECT * FROM tasks";

		const rows = await sequelize.query<Task>(query, {
			type: QueryTypes.SELECT,
		});
		return rows;
	}

	async find(): Promise<UserApp[]> {
		// const users = await sequelize.User.findAll();
		const users = await UserModel.findAll({ raw: true });
		return users as UserApp[];
	}

	async findById(id: string) {
		return { id };
	}

	async updatePatch(id: string, changes: Partial<Omit<UserApp, "id">>) {
		return {
			id,
			changes,
		};
	}

	async deleteById(id: string) {
		return { id };
	}
}
