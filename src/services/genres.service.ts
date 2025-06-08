import { Genres } from "../db/tables/Genres";
import { MicroGenres } from "../db/tables/Micro-genres";
import { SubGenres } from "../db/tables/Sub-genres";

export class GenresService {
    public async getGenres() {
        return await this.queryGenres();
    }

    private async queryGenres() {
        return await Genres.findAll({
            include: [
                {
                    model: SubGenres,
                    separate: true,
                    order: [["id", "ASC"]],
                    include: [
                        {
                            model: MicroGenres,
                            separate: true,
                            order: [["id", "ASC"]],
                        },
                    ],
                },
            ],
            order: [["id", "ASC"]],
        });
    }
}
