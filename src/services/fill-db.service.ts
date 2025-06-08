import { Genres } from "../db/tables/Genres";
import { MicroGenres } from "../db/tables/Micro-genres";
import { SubGenres } from "../db/tables/Sub-genres";
import { consoleSuccess } from "../helpers/console-success";
import { ApiGenres } from "../interfaces/api-genres.interface";
import { BooksData } from "../interfaces/books-data.interface";
import { ConvertedGenres } from "../interfaces/converted-genres.interfaces";
import { LitresService } from "./litres.service";

export class FillDb {
    private readonly listersService = new LitresService();
    private updateInterval = 1000 * 60 * 15;

    public async autoUpdate() {
        await this.fill();
        setInterval(() => {
            this.fill();
        }, this.updateInterval);
    }

    private async fill() {
        const booksData = await this.queryBooksData();
        await this.saveBooksData(booksData);
    }

    private async queryBooksData() {
        const genres = await this.getGenres();
        return { genres };
    }

    private async getGenres() {
        try {
            const convertedGenres: ConvertedGenres = {
                genres: [],
                subGenres: [],
                microGenres: [],
            };
            const crudGenres = await this.queryGenres();
            this.convertGenres(crudGenres, convertedGenres);
            return convertedGenres;
        } catch (error) {
            console.error("Get Genres Error:", error);
        }
    }

    private async queryGenres() {
        return await this.listersService.getGenres();
    }

    private convertGenres(
        crudGenres: ApiGenres,
        convertedGenres: ConvertedGenres
    ) {
        crudGenres.genres.genre.forEach((genre) => {
            convertedGenres.genres.push({
                id: Number(genre.$.id),
                title: genre.$.title,
            });
            if (genre.genre) {
                this.convertSubGenres(
                    genre.genre,
                    convertedGenres,
                    Number(genre.$.id)
                );
            }
        });
    }

    private convertSubGenres(
        genre: ApiGenres["genres"]["genre"],
        convertedGenres: ConvertedGenres,
        genreId: number
    ) {
        genre.forEach((g) => {
            convertedGenres.subGenres.push({
                id: Number(g.$.id),
                title: g.$.title,
                genreId,
            });
            if (g.genre) {
                this.convertMicroGenres(
                    g.genre,
                    convertedGenres,
                    Number(g.$.id)
                );
            }
        });
    }

    private convertMicroGenres(
        genre: ApiGenres["genres"]["genre"],
        convertedGenres: ConvertedGenres,
        subGenreId: number
    ) {
        genre.forEach((g) => {
            convertedGenres.microGenres.push({
                id: Number(g.$.id),
                title: g.$.title,
                subGenreId,
            });
        });
    }

    private async saveBooksData(booksData: BooksData) {
        if (booksData.genres) {
            await this.saveAllGenres(booksData.genres);
        }
    }

    private async saveAllGenres(genres: ConvertedGenres) {
        await Promise.all([
            this.saveGenres(genres.genres),
            this.saveSubGenres(genres.subGenres),
            this.saveMicroGenres(genres.microGenres),
        ]);
    }

    private async saveGenres(genres: ConvertedGenres["genres"]) {
        try {
            await Genres.bulkCreate(genres, {
                ignoreDuplicates: true,
            });
            consoleSuccess("Genres Update Success");
        } catch (error) {
            console.error("Save Genres Error");
        }
    }

    private async saveSubGenres(subGenres: ConvertedGenres["subGenres"]) {
        try {
            SubGenres.bulkCreate(subGenres, {
                ignoreDuplicates: true,
            });
            consoleSuccess("SubGenres Update Success");
        } catch (error) {
            console.error("Save subGenres Error");
        }
    }

    private async saveMicroGenres(microGenres: ConvertedGenres["microGenres"]) {
        try {
            MicroGenres.bulkCreate(microGenres, {
                ignoreDuplicates: true,
            });
            consoleSuccess("MicroGenres Update Success");
        } catch (error) {
            console.error("Save microGenres Error");
        }
    }
}
