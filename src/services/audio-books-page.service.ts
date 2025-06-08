import path from "path";
import { HomePageService } from "./home-page.service";
import ejs from "ejs"
import { AudioBooksPageData } from "../interfaces/audio-books-page-data.interface";

export class AudioBooksPageService extends HomePageService {
    protected async createLayout(body: string) {
        return await this.getLayout({
            body,
            title: "Аудио Книги",
            styles: [this.swiperCss, this.booksCss, this.lastReviewsCss],
            scripts: [
                this.swiperJS,
                "/scripts/audio-books.js",
                this.lastReviewsJS,
            ],
        });
    }

    protected async renderBody({
        books,
        pagination,
        latestReviews,
    }: AudioBooksPageData) {
        return await ejs.renderFile(
            path.join(__dirname, "../../views/audio-books.ejs"),
            { books, pagination, latestReviews }
        );
    }
}
