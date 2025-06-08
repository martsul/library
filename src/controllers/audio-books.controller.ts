import { Request, Response } from "express";
import { AudioBooksPageService } from "../services/audio-books-page.service";

export const audioBooksController = async (req: Request, res: Response) => {
    try {
        const topBooksService = new AudioBooksPageService(req.params.page);
        const page = await topBooksService.getPage();
        res.send(page);
    } catch (error) {
        console.error("Audi Books Controller Error:", error);
    }
};
