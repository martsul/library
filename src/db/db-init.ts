import { syncDatabase } from ".";
import { consoleSuccess } from "../helpers/console-success";
// import { fillDb } from "./fill-db";
import { initAssociations } from "./init-associations";

export const dbInit = async () => {
    try {
        await syncDatabase();
        initAssociations();
        // await fillDb();
        consoleSuccess("DB init Successful");
    } catch (error) {
        console.error("DB Init Error");
    }
};
