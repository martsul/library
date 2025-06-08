import { Request, Response } from "express";
import { GenresService } from "../services/genres.service";

export const getGenresController = async (req: Request, res: Response) => {
    try {
        const genresService = new GenresService()
        const genres = await genresService.getGenres()
        res.send(genres)
    } catch (error) {
        console.error("Get Genres Controller Error:", error)
    }
}