import { faker } from "@faker-js/faker";
import {
	ValidationError,
	UniqueConstraintError,
	DatabaseError,
	ForeignKeyConstraintError,
	Op,
} from "sequelize";
import type { FindOptions } from "sequelize";
import Boom from "@hapi/boom";
import type { Product as ProductType, FindQuery } from "../types/types.js";
import { Product as ProductModel } from "../db/models/productModel.js";
import { Category as CategoryModel } from "../db/models/categoryModel.js";

export class ProductsService {
	private products: Omit<ProductType, "id">[] = [];

	constructor() {
		this.generate();
	}

	async generate(): Promise<void> {
		try {
			const limit = 12;
			for (let index = 0; index < limit; index++) {
				this.products.push({
					name: faker.commerce.productName(),
					price: Math.round(Number(faker.commerce.price({ min: 5, max: 500 }))),
					description: faker.commerce.productDescription(),
					image: faker.image.url(),
					isBlock: faker.datatype.boolean(),
					categoryId: faker.number.int({ min: 1, max: 100000 }),
					createdAt: new Date(),
					updatedAt: new Date(),
				});
			}
			return;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			throw Boom.badImplementation("Failed to generate products", {
				cause: error,
			});
		}
	}

	async create(data: Omit<ProductType, "id">): Promise<ProductType> {
		try {
			const exists = await CategoryModel.findByPk(data.categoryId);
			if (!exists) {
				throw Boom.badRequest(`Category ${data.categoryId} does not exist`);
			}

			const newProduct = await ProductModel.create(data);

			return newProduct.toJSON() as ProductType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof ForeignKeyConstraintError) {
				throw Boom.badRequest(
					"Invalid categoryId: referenced category does not exist",
				);
			}
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while creating product");
			}
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Product already exists");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to create product");
		}
	}

	async find(query: FindQuery = {}): Promise<ProductType[]> {
		try {
			const options: FindOptions = {
				include: ["category"],
				where: {},
			};

			const { limit, offset } = query;
			if (limit !== undefined) options.limit = Number(limit);
			if (offset !== undefined) options.offset = Number(offset);

			const where: Record<string, unknown> = {};

			if (query.price !== undefined) {
				const findPrice = Number(query.price);
				if (!Number.isFinite(findPrice))
					throw Boom.badRequest("Invalid 'price'");
				where.price = findPrice; // o { [Op.eq]: p } si uses operadors
			}

			if (query.price_min !== undefined && query.price_max !== undefined) {
				const findMinPrice = Number(query.price_min);
				if (!Number.isFinite(findMinPrice))
					throw Boom.badRequest("Invalid 'price'");
				const findMaxPrice = Number(query.price_max);
				if (!Number.isFinite(findMaxPrice))
					throw Boom.badRequest("Invalid 'price'");

				where.price = {
					[Op.gte]: query.price_min,
					[Op.lte]: query.price_max,
				};
			}

			if (Object.keys(where).length > 0) {
				options.where = where;
			}

			const products = await ProductModel.findAll(options);

			return products as ProductType[];
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching products");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch products");
		}
	}

	async findById(id: string): Promise<ProductType> {
		try {
			const product = await ProductModel.findByPk(id);
			if (!product) {
				throw Boom.notFound(`Product ${id} not found`);
			}
			if (product.isBlock) {
				throw Boom.conflict("Product is block");
			}

			return product.toJSON() as ProductType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching product");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch product");
		}
	}

	async updatePatch(
		id: string,
		changes: Partial<Omit<ProductType, "id">>,
	): Promise<ProductType> {
		try {
			const product = await ProductModel.findByPk(id);
			if (!product) {
				throw Boom.notFound(`User ${id} not found`);
			}

			const {
				createdAt: _createdAt,
				updatedAt: _updatedAt,
				...safeChanges
			} = changes;

			const updatedProduct = await product.update(safeChanges);

			return updatedProduct.toJSON() as ProductType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Product already exists");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while updating product");
			}
			throw Boom.badImplementation("Failed to update product");
		}
	}

	// async updatePut(id: string, data: Omit<Product, "id">): Promise<Product> {
	// 	const index = this.products.findIndex((item) => item.id === id);

	// 	if (index === -1) {
	// 		throw new Error("Product not found");
	// 	}

	// 	const updatedProduct: Product = { id, ...data };
	// 	this.products[index] = updatedProduct;
	// 	return updatedProduct;
	// }

	async deleteById(id: string): Promise<void> {
		try {
			const product = await ProductModel.findByPk(id);
			if (!product) {
				throw Boom.notFound("Product not found");
			}

			await product.destroy();
			return;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while deleting product");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to delete product");
		}
	}
}
