import { faker } from "@faker-js/faker";
import type { User as UserApp } from "../types/types.js";
import { User as UserModel } from "../db/models/user.model.js";
import Boom from "@hapi/boom";

// import { sequelize } from "../libs/sequelize.js";
// import { QueryTypes } from "sequelize";

// type Task = {
// 	id: string | number;
// 	title: string;
// 	completed: boolean;
// };

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
				name: faker.person.firstName(),
				firstSurname: faker.person.lastName(),
				secondSurname: faker.person.lastName(),
				role: faker.helpers.arrayElement(["admin", "customer", "seller"]),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
	}

	async create(data: Omit<UserApp, "id">) {
		const newUser = await UserModel.create(data);
		return newUser;
	}

	// async findTasks(): Promise<Task[]> {
	// 	const query = "SELECT * FROM tasks";

	// 	const rows = await sequelize.query<Task>(query, {
	// 		type: QueryTypes.SELECT,
	// 	});
	// 	return rows;
	// }

	async find(): Promise<UserApp[]> {
		// const users = await sequelize.User.findAll();
		const users = await UserModel.findAll({ raw: true });
		return users as UserApp[];
	}

	async findById(id: string): Promise<UserApp> {
		const user = await UserModel.findByPk(id);
		if (!user) {
			throw Boom.notFound(`User ${id} not found`);
		}

		return user.toJSON() as UserApp;
	}

	async updatePatch(
		id: string,
		changes: Partial<Omit<UserApp, "id">>
	): Promise<UserApp> {
		const user = await UserModel.findByPk(id);
		if (!user) {
			throw Boom.notFound(`User ${id} not found`);
		}

		const updatedUser = await user.update(changes);

		return updatedUser.toJSON() as UserApp;
	}

	async deleteById(id: string) {
		const user = await UserModel.findByPk(id);
		if (!user) {
			throw Boom.notFound(`User ${id} not found`);
		}

		await user.destroy();
		return { id };
	}
}
