import { Books } from "../db/tables/Books";

export class BooksService {
    public async getBooks(limit: number, page: number) {
        const offset = (page - 1) * limit;
        return await Books.findAndCountAll({ limit: limit, offset });
    }
}
