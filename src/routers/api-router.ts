import { Router } from "express";
import { getGenresController } from "../controllers/get-genres.controller";
import { FillDBBooks } from "../helpers/fill-bd-books";
import { parseStringPromise } from "xml2js";
import { LitresService } from "../services/litres.service";

export const apiRouter = Router();

apiRouter.get("/genres", getGenresController);
apiRouter.get("/test", async (req, res) => {
    try {
        const f = new FillDBBooks();
        const r = await f.fill();
        const ls = new LitresService()
        const bo = await ls.queryBooks({type: "1", checkpoint: "2022-11-25 00:00:00", endpoint: "2022-11-26 00:00:00"})
        res.send(await parseStringPromise(bo.data));
    } catch (error) {
        console.error(error)
        res.send("error")
    }
});


