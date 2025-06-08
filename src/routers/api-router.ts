import { Router } from "express";
import { getGenresController } from "../controllers/get-genres.controller";
import { ReviewsService } from "../services/reviews.service";

export const apiRouter = Router();

apiRouter.get("/genres", getGenresController);
apiRouter.get("/test", async (req, res) => {
    const r = await new ReviewsService().getLatestReviews();
    res.send(r)
});
