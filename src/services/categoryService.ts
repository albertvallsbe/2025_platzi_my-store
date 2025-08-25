import { faker } from "@faker-js/faker";
import type { Category } from "../types/types.js";
// import Boom from "@hapi/boom";

export class CategoryService {
	private categories: Omit<Category, "id">[] = [];

	constructor() {
		this.generate();
	}

	async generate(): Promise<void> {
		const limit = 12;
		for (let index = 0; index < limit; index++) {
			this.categories.push({
				name: faker.commerce.productName(),
				image: faker.image.url(),
			});
		}
	}

	async create(data: Omit<Category, "id">) {
		return data;
	}

	async find() {
		return [];
	}

	async findById(id: string) {
		return { id };
	}

	async updatePatch(id: string, changes: Partial<Omit<Category, "id">>) {
		return {
			id,
			changes,
		};
	}

	async deleteById(id: string) {
		return { id };
	}
}
