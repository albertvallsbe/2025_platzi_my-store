import { faker } from "@faker-js/faker";
import {
	ValidationError,
	UniqueConstraintError,
	DatabaseError,
} from "sequelize";
import Boom from "@hapi/boom";
import type { Customer as CustomerType } from "../types/types.js";
import { Customer as CustomerModel } from "../db/models/customerModel.js";

// import { models } from "../libs/sequelize.js";

export class CustomerService {
	private customers: Omit<CustomerType, "id">[] = [];

	constructor() {
		this.generate();
	}

	async generate(): Promise<void> {
		try {
			const limit = 12;
			for (let index = 0; index < limit; index++) {
				this.customers.push({
					name: faker.person.firstName(),
					firstSurname: faker.person.lastName(),
					secondSurname: faker.person.lastName(),
					phone: faker.phone.number(),
					userId: faker.number.int({ min: 1, max: 100000 }),
					createdAt: new Date(),
					updatedAt: new Date(),
				});
			}
			return;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			throw Boom.badImplementation("Failed to generate customers");
		}
	}

	async create(data: Omit<CustomerType, "id">): Promise<CustomerType> {
		try {
			const newCustomer = await CustomerModel.create(data, {
				include: ["user"],
			});

			return newCustomer.toJSON() as CustomerType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Customer for this user already exists");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while creating customer");
			}
			throw Boom.badImplementation("Failed to create customer");
		}
	}

	async find(): Promise<CustomerType[]> {
		try {
			const customers = await CustomerModel.findAll({
				include: [{ association: "user" }],
			});

			return customers.map((c) => c.toJSON() as CustomerType);
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching customers");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch customers");
		}
	}

	async findById(id: string): Promise<CustomerType> {
		try {
			const customer = await CustomerModel.findByPk(id, {
				include: [{ association: "user" }],
			});
			if (!customer) {
				throw Boom.notFound(`Customer ${id} not found`);
			}

			return customer.toJSON() as CustomerType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while fetching customer");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to fetch customer");
		}
	}

	async updatePatch(
		id: string,
		changes: Partial<Omit<CustomerType, "id">>
	): Promise<CustomerType> {
		try {
			const customer = await CustomerModel.findByPk(id);
			if (!customer) {
				throw Boom.notFound(`Customer ${id} not found`);
			}

			const {
				createdAt: _createdAt,
				updatedAt: _updatedAt,
				...safeChanges
			} = changes;

			const updatedCustomer = await customer.update(safeChanges);

			return updatedCustomer.toJSON() as CustomerType;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof UniqueConstraintError) {
				throw Boom.conflict("Customer for this user already exists");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while updating customer");
			}
			throw Boom.badImplementation("Failed to update customer");
		}
	}

	async deleteById(id: string): Promise<void> {
		try {
			const customer = await CustomerModel.findByPk(id);
			if (!customer) {
				throw Boom.notFound(`Customer ${id} not found`);
			}

			await customer.destroy();
			return;
		} catch (error) {
			if (Boom.isBoom(error)) throw error;
			if (error instanceof DatabaseError) {
				throw Boom.badGateway("Database error while deleting customer");
			}
			if (error instanceof ValidationError) {
				throw Boom.badRequest(error.message);
			}
			throw Boom.badImplementation("Failed to delete customer");
		}
	}
}
