import { Sequelize } from "sequelize";
import type { Options } from "sequelize";
import { config } from "../config/config.js";
import { setupModels } from "../db/models/index.js";

let URI: string;

if (config.isProd) {
	if (!config.dbUrl) {
		throw new Error("DATABASE_URL is required in production");
	}
	URI = config.dbUrl;
} else {
	const USER = encodeURIComponent(config.dbUser as string);
	const PASSWORD = encodeURIComponent(config.dbPassword as string);
	URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const options: Options = {
	dialect: "postgres",
	logging: !config.isProd,
};

if (config.isProd) {
	options.dialectOptions = {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	};
}

// console.log("patat", options);

export const sequelize = new Sequelize(URI, options);

console.log("[DB cfg]", {
	host: config.dbHost,
	port: config.dbPort,
	db: config.dbName,
	user: config.dbUser,
});

const u = new URL(URI);
const safeURI = `${u.protocol}//${u.username}:***@${u.host}${u.pathname}`;
console.log("[DB URI]", safeURI);

setupModels(sequelize);
// sequelize.sync({ alter: true });

// Exportacions
export const models = sequelize.models;
export type DBModels = typeof sequelize.models;

// Development
console.log("[Models]", Object.keys(sequelize.models));
await sequelize
	.authenticate()
	.then(() => console.log("[DB] OK"))
	.catch(console.error);
