import path from "path";
import { PageService } from "./page.service";
import ejs from "ejs";

export class HomePageService extends PageService {
    async getPage() {
        const body = await this.renderBody();
        return await this.getLayout({
            body,
            title: "Home",
            styles: [],
            scripts: [],
        });
    }

    private async renderBody() {
        return await ejs.renderFile(
            path.join(__dirname, "../../views/home.ejs")
        );
    }
}
