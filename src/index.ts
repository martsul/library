import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import ejs from "ejs";
import { router } from "./router";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", router);

// app.get("/", async (req: Request, res: Response) => {
//     const title = "Home";
//     const homePage = await ejs.renderFile(
//         path.join(__dirname, "../views/home.ejs")
//     );
//     const layout = await ejs.renderFile(
//         path.join(__dirname, "../views/layout.ejs"),
//         {
//             title,
//             body: homePage,
//             scripts: ["/scripts/home.js"],
//             styles: ["/styles/home.css"],
//         }
//     );

//     res.render(layout);
// });

app.listen(port, () => {
    console.log("Server started on PORT:", port);
});
