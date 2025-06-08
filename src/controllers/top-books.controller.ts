import { Request, Response } from "express";
import { TopBooksPageService } from "../services/top-books-page.service";

export const topBooksController = async (req: Request, res: Response) => {
    try {
        const topBooksService = new TopBooksPageService(req.params.page);
        const page = await topBooksService.getPage();
        res.send(page);
    } catch (error) {
        console.error("Top Books Controller Error:", error);
    }
};
