import ejs from "ejs";
import path from "path";
import { LayoutData } from "../interfaces/layout-data.interface";
import { config } from "dotenv";
import { GenresService } from "./genres.service";
import { Genres } from "../db/tables/Genres";
import { ReviewsService } from "./reviews.service";

config();

export class PageService {
    private readonly genresService = new GenresService();
    private readonly reviewsService = new ReviewsService();
    private readonly paginationLength = 3;
    protected readonly booksOnPage = 20
    protected readonly swiperCss =
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
    protected readonly booksCss = "/styles/books.css";
    protected readonly lastReviewsCss = "/styles/last-reviews.css";
    protected readonly swiperJS =
        "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
    protected readonly lastReviewsJS = "/scripts/last-reviews.js";

    protected async getLayout(layoutData: LayoutData) {
        const genres = await this.getGenres();
        return await this.getLayoutFile(layoutData, genres);
    }

    protected calculatePages({
        countBooks,
        booksOnPage,
        page,
    }: {
        countBooks: number;
        booksOnPage: number;
        page: number;
    }) {
        const countPages = Math.ceil(countBooks / booksOnPage);
        const pagination = this.calculatePagination(countPages, page);
        return { pagination, countPages };
    }

    protected async getLatestReviews() {
        return await this.reviewsService.getLatestReviews();
    }

    protected calculatePagination(total: number, currentPage: number) {
        let pages: number[];
        if (total <= this.paginationLength) {
            pages = Array.from({ length: total }, (_, i) => i + 1);
        } else if (currentPage <= 2) {
            pages = [1, 2, 3];
        } else if (currentPage >= total - 1) {
            pages = [total - 2, total - 1, total];
        } else {
            pages = [currentPage - 1, currentPage, currentPage + 1];
        }
        return pages.map((page) => ({
            page,
            active: page === currentPage,
        }));
    }

    private async getLayoutFile(
        { title, body, scripts, styles }: LayoutData,
        genres: Genres[]
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

    private async getGenres() {
        return await this.genresService.getGenres();
    }
}
