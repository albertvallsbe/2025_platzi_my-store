// /* eslint-disable @typescript-eslint/no-var-requires */
// const path = require("path");
// require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

// const USER = encodeURIComponent(process.env.DB_USER || "");
// const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD || "");
// const HOST = process.env.DB_HOST || "localhost";
// const PORT = process.env.DB_PORT || "5432";
// const NAME = process.env.DB_NAME || "app";

// const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`;

// module.exports = {
// 	development: {
// 		url: URI,
// 		dialect: "postgres",
// 	},
// 	production: {
// 		url: URI,
// 		dialect: "postgres",
// 	},
// };

/* eslint-disable @typescript-eslint/no-var-requires */

import dotenv from "dotenv";
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
		url: URI,
		dialect: "postgres",
	},
};
