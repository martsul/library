import { config } from "dotenv";
import { DateFormat } from "../types/date-format";
import { LitresService } from "../services/litres.service";
import dayjs, { Dayjs } from "dayjs";
import { QueryBooksParams } from "../interfaces/query-books-params";

config();

export class FillDBBooks {
    private readonly startUpdateDate: DateFormat = "2007-06-10 00:00:00";
    private readonly litresService: LitresService = new LitresService();
    private currentDate: Dayjs = dayjs(this.startUpdateDate);

    public async fill(): Promise<void> {
        let i = 0;
        while (this.currentDate.isBefore(dayjs(Date.now()))) {
            i++;
            console.log(this.currentDate);
            this.currentDate = this.currentDate.add(1, "month");
        }
        console.log(i);
    }

    private async fillIteration(): Promise<void> {
        const books = await this.queryBooks();
    }

    private async queryBooks() {
        const params: QueryBooksParams = {
            type: "all",
            checkpoint: this.currentDate.format(
                "YYYY-MM-DD HH:mm:ss"
            ) as DateFormat,
            endpoint: this.currentDate
                .add(1, "month")
                .format("YYYY-MM-DD HH:mm:ss") as DateFormat,
        };
        return this.litresService.queryBooks(params);
    }
}
