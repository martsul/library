import { Books } from "../db/tables/Books";
import { Reviews } from "../db/tables/Reviews";
import { Pagination } from "./pagintaion.interface";

export interface TextsBooksPageData {
    books: Books[];
    pagination: Pagination;
    latestReviews: Reviews[];
}
