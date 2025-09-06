import dotenv from "dotenv";
dotenv.config();

export const config = {
	env: process.env.NODE_ENV || "dev",
	isProd: process.env.NODE_ENV === "production",
	port: process.env.PORT || 3100,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	dbPort: process.env.DB_PORT || 5432,
	dbUrl: process.env.DATABASE_URL,
	jwtSecret: process.env.JWT_SECRET,
	apiKey: process.env.API_KEY,
};
