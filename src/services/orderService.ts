import { faker } from "@faker-js/faker";
import {
	ValidationError,
	UniqueConstraintError,
	DatabaseError,
	ForeignKeyConstraintError,
} from "sequelize";
import Boom from "@hapi/boom";

import type {
	Order as OrderType,
	OrderProduct as OrderProductType,
} from "../types/types.js";
import { Order as OrderModel } from "../db/models/orderModel.js";
import { Product as ProductModel } from "../db/models/productModel.js";
import { OrderProduct as OrderProductModel } from "../db/models/orderProductModel.js";

export class OrderService {
	private orders: Omit<OrderType, "id">[] = [];

	constructor() {
		this.generate();
	}

	async generate(): Promise<void> {
		const limit = 12;
		for (let index = 0; index < limit; index++) {
			this.orders.push({
				customerId: faker.number.int({ min: 1, max: 100000 }),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
	}

	async create(data: Omit<OrderType, "id">): Promise<OrderType> {
		try {
			const newOrder = await OrderModel.create(data);

			return newOrder.toJSON() as OrderType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Order already exists");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to create order");
		}
	}

	async addItem(data: Omit<OrderProductType, "id">): Promise<OrderProductType> {
		try {
			const [order, product] = await Promise.all([
				OrderModel.findByPk(data.orderId),
				ProductModel.findByPk(data.productId),
			]);

			const errors: string[] = [];
			if (!order) {
				errors.push(`Order ${data.orderId} not found`);
			}
			if (!product) {
				errors.push(`Product ${data.productId} not found`);
			}

			if (errors.length) {
				throw Boom.badRequest("Invalid references", { errors });
			}

			const newItem = await OrderProductModel.create(data);

			return newItem.toJSON() as OrderProductType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof ForeignKeyConstraintError) {
				throw Boom.badRequest(
					"Invalid productId or orderId: referenced record does not exist"
				);
			}
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Order item already exists");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to create order item");
		}
	}

	async find(): Promise<OrderType[]> {
		try {
			const orders = await OrderModel.findAll({
				include: [
					{ association: "customer" },
					{ association: "items", through: { attributes: ["amount"] } },
				],
			});

			return orders as OrderType[];
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching orders");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch orders");
		}
	}

	async findById(id: string): Promise<OrderType> {
		try {
			const order = await OrderModel.findByPk(id, {
				include: [
					{ association: "customer" },
					{ association: "items", through: { attributes: ["amount"] } },
				],
			});
			if (!order) {
				throw Boom.notFound(`User ${id} not found`);
			}

			return order.toJSON() as OrderType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching order");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch order");
		}
	}

	async updatePatch(
		id: string,
		changes: Partial<Omit<OrderType, "id">>
	): Promise<OrderType> {
		try {
			const order = await OrderModel.findByPk(id);
			if (!order) {
				throw Boom.notFound(`User ${id} not found`);
			}

			const {
				createdAt: _createdAt,
				updatedAt: _updatedAt,
				...safeChanges
			} = changes;
			const updatedUser = await order.update(safeChanges);

			return updatedUser.toJSON() as OrderType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while updating order");
			}
			throw Boom.badImplementation("Failed to update order");
		}
	}

	async deleteById(id: string): Promise<void> {
		try {
			const order = await OrderModel.findByPk(id);
			if (!order) {
				throw Boom.notFound(`User ${id} not found`);
			}

			await order.destroy();
			return;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while deleting order");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to delete order");
		}
	}
}
