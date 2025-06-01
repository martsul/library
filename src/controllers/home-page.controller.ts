import { Request, Response } from "express";
import { HomePageService } from "../services/home-page.service";

export const homePageController = async (req: Request, res: Response) => {
    try {
        const homePageService = new HomePageService();
        const page = await homePageService.getPage();
        res.send(page);
    } catch (error) {
        console.error("Home Page Error:", error);
    }
};
