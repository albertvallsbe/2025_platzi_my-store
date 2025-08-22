import { Sequelize } from "sequelize";

import { config } from "../config/config.js";
import { setupModels } from "../db/models/index.js";

const USER = encodeURIComponent(config.dbUser as string);
const PASSWORD = encodeURIComponent(config.dbPassword as string);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

export const sequelize = new Sequelize(URI, {
	dialect: "postgres",
	logging: process.env.NODE_ENV === "development" ? console.log : false,
});

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

// Development
console.log("[Models]", Object.keys(sequelize.models));
await sequelize
	.authenticate()
	.then(() => console.log("[DB] OK"))
	.catch(console.error);
