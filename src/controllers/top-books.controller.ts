import { Request, Response } from "express";
import { TopBooksService } from "../services/top-books.service";

export const topBooksController = async (req: Request, res: Response) => {
    try {
        const topBooksService = new TopBooksService(req.params.page);
        const page = await topBooksService.getPage();
        res.send(page);
    } catch (error) {
        console.error("Top Books Controller Error:", error);
    }
};
