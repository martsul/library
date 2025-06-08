import path from "path";
import { HomePageService } from "./home-page.service";
import ejs from "ejs"
import { TextsBooksPageData } from "../interfaces/texts-books-page-data.interface";

export class TextBooksPageService extends HomePageService {
    protected async createLayout(body: string) {
        return await this.getLayout({
            body,
            title: "Электронные Книги",
            styles: [this.swiperCss, this.booksCss, this.lastReviewsCss],
            scripts: [
                this.swiperJS,
                "/scripts/texts-books.js",
                this.lastReviewsJS,
            ],
        });
    }

    protected async renderBody({
        books,
        pagination,
        latestReviews,
    }: TextsBooksPageData) {
        return await ejs.renderFile(
            path.join(__dirname, "../../views/texts-books.ejs"),
            { books, pagination, latestReviews }
        );
    }
}
