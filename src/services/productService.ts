import { faker } from "@faker-js/faker";
import {
	ValidationError,
	UniqueConstraintError,
	DatabaseError,
} from "sequelize";
import Boom from "@hapi/boom";

import type { Product as ProductType } from "../types/types.js";
import { Product as ProductModel } from "../db/models/productModel.js";

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
			throw Boom.badImplementation("Failed to generate products");
		}
	}

	async create(data: Omit<ProductType, "id">): Promise<ProductType> {
		try {
			const newProduct = await ProductModel.create(data);

			return newProduct.toJSON() as ProductType;
		} catch (error) {
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Product already exists");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to create product");
		}
	}

	async find(): Promise<ProductType[]> {
		try {
			const products = await ProductModel.findAll();

			return products as ProductType[];
		} catch (error) {
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
		changes: Partial<Omit<ProductType, "id">>
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
