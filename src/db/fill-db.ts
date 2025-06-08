import { FillDb } from "../services/fill-db.service";

export const fillDb = async () => {
    try {
        const fillDbService = new FillDb();
        await fillDbService.autoUpdate();
    } catch (error) {
        console.error("Fill DB Error");
    }
};
