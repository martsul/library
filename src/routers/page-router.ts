import { Router } from "express";
import { homePageController } from "../controllers/home-page.controller";
import { topBooksController } from "../controllers/top-books.controller";

export const pageRouter = Router();

pageRouter.get("/", homePageController);
pageRouter.get("/top-books", topBooksController);
pageRouter.get("/top-books/:page", topBooksController);
pageRouter.get("/book/:bookId", topBooksController);
pageRouter.get("/:page", homePageController);
