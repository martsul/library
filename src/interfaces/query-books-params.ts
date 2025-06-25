import { DateFormat } from "../types/date-format";

export interface QueryBooksParams {
    checkpoint: DateFormat;
    endpoint?: DateFormat;
    type: string;
}
