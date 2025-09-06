import type { QueryInterface } from "sequelize";
import type * as SequelizeNS from "sequelize";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import type { UserRole } from "../../types/types.js";

const USER_TABLE = "users";

const nextUniqueEmail = (seen: Set<string>) => {
	let email: string;
	do {
		email = faker.internet.email({ provider: "example.com" }).toLowerCase();
	} while (seen.has(email));
	seen.add(email);
	return email;
};

const makeUser = (role: UserRole, passwordHash: string, email: string) => {
	const now = new Date();
	return {
		email,
		password: passwordHash,
		recovery_token: null,
		role,
		created_at: now,
		updated_at: now,
	};
};

export default {
	up: async (
		queryInterface: QueryInterface,
		_Sequelize: typeof SequelizeNS,
	) => {
		const hash = await bcrypt.hash("Password123!", 10);
		const seen = new Set<string>();

		const admins = Array.from({ length: 3 }, () =>
			makeUser("admin", hash, nextUniqueEmail(seen)),
		);
		const sellers = Array.from({ length: 3 }, () =>
			makeUser("seller", hash, nextUniqueEmail(seen)),
		);
		const customers = Array.from({ length: 12 }, () =>
			makeUser("customer", hash, nextUniqueEmail(seen)),
		);

		await queryInterface.bulkInsert(USER_TABLE, [
			...admins,
			...sellers,
			...customers,
		]);
	},

	down: async (
		queryInterface: QueryInterface,
		Sequelize: typeof SequelizeNS,
	) => {
		const { Op } = Sequelize;

		await queryInterface.bulkDelete(USER_TABLE, {
			email: { [Op.like]: "%@example.com" },
		});
	},
};
