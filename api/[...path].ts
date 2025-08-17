import express from "express";
import serverless from "serverless-http";
import { app as mainApp } from "../dist/app.js";

const wrapper = express();

wrapper.use("/api", mainApp);

export default serverless(wrapper);
