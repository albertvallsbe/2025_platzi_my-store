import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { router } from "./routes/index.js";

dotenv.config();
const PORT = Number(process.env.PORT) || 3000;

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
// app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
	res.send(`
    Our app is running in port: ${PORT}
    `);
});
