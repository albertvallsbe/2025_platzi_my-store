import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import type { CorsOptions } from "cors";
import type { Request, Response } from "express";
import { router } from "./routes/index.js";

dotenv.config();
const PORT = Number(process.env.PORT) || 3000;

export const app = express();

const whitelist: string[] = [
	"http://localhost:3100",
	"http://127.0.0.1:3100",
	"http://localhost:5500",
	"http://127.0.0.1:5500",
	"https://2025-platzi-mystore.up.railway.app",
];

const options: CorsOptions = {
	origin: (origin, callback) => {
		if (!origin || whitelist.includes(origin) || !origin) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
};
app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
// app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
	res.send(`
    Our app is running in port: ${PORT}
    `);
});
