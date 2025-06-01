import ejs from "ejs";
import path from "path";
import { LayoutData } from "../interfaces/layout-data.interface";
import { api } from "../api";
import { config } from "dotenv";
import { parseStringPromise } from "xml2js";
import { Genre } from "../interfaces/genres.interface";

config();

export class PageService {
    protected async getLayout(layoutData: LayoutData) {
        const rudeGenres = await this.queryGenres();
        const convertedGenres = await this.convertGenres(rudeGenres);
        return await this.getLayoutFile(layoutData, convertedGenres);
    }

    private async getLayoutFile(
        { title, body, scripts, styles }: LayoutData,
        genres: Genre[]
    ) { 
        return await ejs.renderFile(
            path.join(__dirname, "../../views/layout.ejs"),
            {
                title,
                body,
                scripts,
                styles,
                genres,
            }
        );
    }

    private async queryGenres() {
        const response = await api.get<string>(
            process.env.GENRES_ENDPOINT as string
        );
        return response.data;
    }

    private async convertGenres(genres: string) {
        const parsedGenres = await parseStringPromise(genres);
        return this.parseGenres(parsedGenres.genres);
    }

    private parseGenres(genres: any): Genre[] {
        return genres.genre.map((g: any) => ({
            id: g.$.id,
            title: g.$.title,
            subgenres: g.genre ? this.parseGenres(g) : undefined,
        }));
    }
}

// {
//   '$': { id: '5003', title: 'бизнес-книги', type: 'root' },
//   genre: [
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object], genre: [Array] },
//     { '$': [Object] },
//     { '$': [Object], genre: [Array] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object], genre: [Array] },
//     { '$': [Object], genre: [Array] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object], genre: [Array] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object], genre: [Array] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object] },
//     { '$': [Object], genre: [Array] },
//     { '$': [Object] },
//     { '$': [Object], genre: [Array] }
//   ]
// }
