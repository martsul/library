import { Books } from "../db/tables/Books";
import { Reviews } from "../db/tables/Reviews";

export class ReviewsService {
    #limitReviews = 10;

    async getLatestReviews() {
        try {
            return await this.#queryLatestReviews();
        } catch (error) {
            console.error("Get Latest Reviews:",error)
            return []
        }
    }

    async #queryLatestReviews() {
        return await Reviews.findAll({
            limit: this.#limitReviews,
            order: [["createdAt", "ASC"]],
            include: [{ model: Books, attributes: ["img", "title"] }],
        });
    }
}
