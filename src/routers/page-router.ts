import { Router } from "express";
import { homePageController } from "../controllers/home-page.controller";
import { topBooksController } from "../controllers/top-books.controller";
import { audioBooksController } from "../controllers/audio-books.controller";
import { textsBooksController } from "../controllers/texts-books.controller";

export const pageRouter = Router();

pageRouter.get("/", homePageController);
pageRouter.get("/top-books", topBooksController);
pageRouter.get("/top-books/:page", topBooksController);
pageRouter.get("/audio-books", audioBooksController);
pageRouter.get("/audio-books/:page", audioBooksController);
pageRouter.get("/texts-books", textsBooksController);
pageRouter.get("/texts-books/:page", textsBooksController);
pageRouter.get("/book/:bookId", topBooksController);
pageRouter.get("/:page", homePageController);
