import { Request, Response } from "express";
import { TextBooksPageService } from "../services/texts-books-page.service";

export const textsBooksController = async (req: Request, res: Response) => {
    try {
        const topBooksService = new TextBooksPageService(req.params.page);
        const page = await topBooksService.getPage();
        res.send(page);
    } catch (error) {
        console.error("Text Books Controller Error:", error);
    }
};
