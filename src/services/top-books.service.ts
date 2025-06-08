import path from "path";
import { TopBooksPageData } from "../interfaces/top-books-page-data.interface";
import { HomePageService } from "./home-page.service";
import ejs from "ejs";

export class TopBooksService extends HomePageService {
    protected async createLayout(body: string) {
        return await this.getLayout({
            body,
            title: "Top Books",
            styles: [this.swiperCss, this.booksCss, this.lastReviewsCss],
            scripts: [this.swiperJS, "/scripts/top-books.js", this.lastReviewsJS],
        });
    }

    protected async renderBody({
        books,
        pagination,
        latestReviews,
    }: TopBooksPageData) {
        return await ejs.renderFile(
            path.join(__dirname, "../../views/top-books.ejs"),
            { books, pagination, latestReviews }
        );
    }
}
