import { faker } from "@faker-js/faker";
import type { Product } from "../types/types";
import Boom from "@hapi/boom";

export class ProductsService {
	private products: Product[] = [];

	constructor() {
		this.generate();
	}

	async generate(): Promise<void> {
		const limit = 12;
		for (let index = 0; index < limit; index++) {
			this.products.push({
				id: faker.string.uuid(),
				name: faker.commerce.productName(),
				price: Math.round(Number(faker.commerce.price({ min: 5, max: 500 }))),
				image: faker.image.url(),
				isBlock: faker.datatype.boolean(),
			});
		}
	}

	async create(data: Omit<Product, "id">): Promise<Product> {
		const newProduct: Product = {
			id: faker.string.uuid(),
			...data,
		};
		this.products.push(newProduct);
		return newProduct;
	}

	async find(): Promise<Product[]> {
		return this.products;
	}

	async findById(id: string): Promise<Product | undefined> {
		const product = this.products.find((item) => item.id === id);
		if (!product) {
			throw Boom.notFound("Product not found");
		}
		if (product.isBlock) {
			throw Boom.conflict("Product is block");
		}
		return product;
	}

	async updatePatch(
		id: string,
		changes: Partial<Omit<Product, "id">>
	): Promise<Product> {
		const index = this.products.findIndex((item) => item.id === id);

		if (index === -1) {
			throw Boom.notFound("Product not found");
		}

		const updatedProduct = this.products[index];
		this.products[index] = {
			...updatedProduct,
			...changes,
		};
		return this.products[index];
	}

	async updatePut(id: string, data: Omit<Product, "id">): Promise<Product> {
		const index = this.products.findIndex((item) => item.id === id);

		if (index === -1) {
			throw new Error("Product not found");
		}

		const updatedProduct: Product = { id, ...data };
		this.products[index] = updatedProduct;
		return updatedProduct;
	}

	async deleteById(id: string): Promise<void> {
		const index = this.products.findIndex((item) => item.id === id);

		if (index === -1) {
			throw Boom.notFound("Product not found");
		}
		this.products.splice(index, 1);
	}
}
