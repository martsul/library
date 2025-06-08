import { parseStringPromise } from "xml2js";
import { litresApi } from "../api/litres-api";
import { ApiGenres } from "../interfaces/api-genres.interface";

export class LitresService {
    public async getGenres() {
        const crudGenres = await this.queryGenres();
        return await this.convertGenres(crudGenres);
    }

    private async queryGenres() {
        try {
            const response = await litresApi.get<string>(
                process.env.GENRES_ENDPOINT as string
            );
            return response.data;
        } catch (error) {
            console.error("Query Genres Error:", error);
            throw error;
        }
    }

    private async convertGenres(crudGenres: string) {
        try {
            const convertedGenres = (await parseStringPromise(
                crudGenres
            )) as ApiGenres;
            return convertedGenres;
        } catch (error) {
            console.error("Convert Genres Error:", error);
            throw error;
        }
    }
}
