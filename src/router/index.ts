import { Router } from "express";
import { homePageController } from "../controllers/home-page.controller";

export const router = Router();

router.get("", homePageController)
