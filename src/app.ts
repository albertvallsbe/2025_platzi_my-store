import dotenv from "dotenv";
import express, { Request, Response } from "express";

dotenv.config();
const PORT = Number(process.env.PORT) || 3000;

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
	res.send(`
    Our app is running in port: ${PORT}
    `);
});
