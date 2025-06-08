import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { pageRouter } from "./routers/page-router";
import { consoleSuccess } from "./helpers/console-success";
import { dbInit } from "./db/db-init";
import { apiRouter } from "./routers/api-router";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", pageRouter);
app.use("/api", apiRouter);

(async () => {
    try {
        await dbInit();
        app.listen(port, async () => {
            consoleSuccess(`Server started on PORT: ${port}`);
        });
    } catch (error) {
        console.error("Start Server Error:", error);
    }
})();
