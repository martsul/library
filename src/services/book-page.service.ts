import { PageService } from "./page.service";

export class BookPageService extends PageService {
    private readonly bookId: number;
    
    constructor(bookId: number) {
        super();
        this.bookId = bookId;
    }
}
