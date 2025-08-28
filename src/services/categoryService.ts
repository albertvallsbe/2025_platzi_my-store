import { faker } from "@faker-js/faker";
import {
	ValidationError,
	UniqueConstraintError,
	DatabaseError,
} from "sequelize";
import Boom from "@hapi/boom";

import type { Category as CategoryType } from "../types/types.js";
import { Category as CategoryModel } from "../db/models/categoryModel.js";

export class CategoryService {
	private categories: Omit<CategoryType, "id">[] = [];

	constructor() {
		this.generate();
	}

	async generate(): Promise<void> {
		const limit = 12;
		for (let index = 0; index < limit; index++) {
			this.categories.push({
				name: faker.commerce.productName(),
				image: faker.image.url(),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
	}

	async create(data: Omit<CategoryType, "id">): Promise<CategoryType> {
		try {
			const newCategory = await CategoryModel.create(data);
			return newCategory.toJSON() as CategoryType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Category already exists");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to create category");
		}
	}

	async find(): Promise<CategoryType[]> {
		try {
			const categories = await CategoryModel.findAll();

			return categories as CategoryType[];
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching categories");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch categories");
		}
	}

	async findById(id: string): Promise<CategoryType> {
		try {
			const category = await CategoryModel.findByPk(id, {
				include: ["products"],
			});
			if (!category) {
				throw Boom.notFound(`User ${id} not found`);
			}

			return category.toJSON() as CategoryType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching category");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch category");
		}
	}

	async updatePatch(
		id: string,
		changes: Partial<Omit<CategoryType, "id">>
	): Promise<CategoryType> {
		try {
			const category = await CategoryModel.findByPk(id);
			if (!category) {
				throw Boom.notFound(`User ${id} not found`);
			}

			const {
				createdAt: _createdAt,
				updatedAt: _updatedAt,
				...safeChanges
			} = changes;
			const updatedCategory = await category.update(safeChanges);

			return updatedCategory.toJSON() as CategoryType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Email already exists");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while updating category");
			}
			throw Boom.badImplementation("Failed to update category");
		}
	}

	async deleteById(id: string): Promise<void> {
		try {
			const category = await CategoryModel.findByPk(id);
			if (!category) {
				throw Boom.notFound(`User ${id} not found`);
			}

			await category.destroy();
			return;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while deleting category");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to delete category");
		}
	}
}
