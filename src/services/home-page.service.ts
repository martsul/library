import path from "path";
import { PageService } from "./page.service";
import ejs from "ejs";
import { HomePageData } from "../interfaces/home-page-data.interface";
import { BooksService } from "./books.service";
import { ReviewsService } from "./reviews.service";

export class HomePageService extends PageService {
    private readonly booksService = new BooksService();
    private readonly page: number;

    constructor(page?: string) {
        super();
        this.page = Number(page) || 1;
    }

    async getPage() {
        return await this.createPage();
    }

    private async createPage() {
        const pageData: HomePageData = await this.getPageData();
        const body = await this.renderBody(pageData);
        return this.createLayout(body);
    }

    protected async createLayout(body: string) {
        return await this.getLayout({
            body,
            title: "Главная",
            styles: [
                this.swiperCss,
                this.booksCss,
                this.lastReviewsCss,
            ],
            scripts: [
                this.swiperJS,
                "/scripts/home.js",
                this.lastReviewsJS,
            ],
        });
    }

    private async getPageData() {
        const books = await this.getBooks();
        const latestReviews = await this.getLatestReviews();
        const pagination = this.calculatePages({
            booksOnPage: this.booksOnPage,
            countBooks: books.count,
            page: this.page,
        });
        return { books: books.rows, pagination, latestReviews };
    }

    private async getBooks() {
        return await this.booksService.getBooks(this.booksOnPage, this.page);
    }

    protected async renderBody({
        books,
        pagination,
        latestReviews,
    }: HomePageData) {
        return await ejs.renderFile(
            path.join(__dirname, "../../views/home.ejs"),
            { books, pagination, latestReviews }
        );
    }
}
