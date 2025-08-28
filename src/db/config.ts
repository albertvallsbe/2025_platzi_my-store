import dotenv from "dotenv";
import { config } from "../config/config.js";
dotenv.config();

const USER = encodeURIComponent(process.env.DB_USER || "");
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD || "");
const HOST = process.env.DB_HOST || "localhost";
const PORT = process.env.DB_PORT || "5432";
const NAME = process.env.DB_NAME || "app";

const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`;

export default {
	development: {
		url: URI,
		dialect: "postgres",
	},
	production: {
		url: config.dbUrl,
		dialect: "postgres",
		dialectOptions: {
			ssl: {
				rejectUnauthorized: false,
			},
		},
	},
};
