import { parseStringPromise } from "xml2js";
import { litresApi } from "../api/litres-api";
import { ApiGenres } from "../interfaces/api-genres.interface";
import { QueryBooksParams } from "../interfaces/query-books-params";
import crypto from "crypto";

export class LitresService {
    private readonly secretKey: string = process.env.SECRET_KEY as string;
    private readonly place: string = process.env.PLACE as string;
    private readonly url: string = "https://partnersdnld.litres.ru";

    public async getGenres() {
        const crudGenres = await this.queryGenres();
        return await this.convertGenres(crudGenres);
    }

    public async queryBooks(queryParams: QueryBooksParams) {
        const timestamp = Math.floor(Date.now() / 1000);
        const signBase = `${timestamp}:${this.secretKey}:${queryParams.checkpoint}`;
        const sha = crypto
            .createHash("sha256")
            .update(signBase, "utf-8")
            .digest("hex");
        const params = {
            checkpoint: queryParams.checkpoint,
            endpoint: queryParams.endpoint,
            type: queryParams.type,
            place: this.place,
            timestamp,
            sha,
        };
        return await litresApi.get(process.env.BOOKS_ENDPOINT as string, {
            params,
        });
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
