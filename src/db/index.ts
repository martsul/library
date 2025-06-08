import { config } from "dotenv";
import { Sequelize } from "sequelize";
import { consoleSuccess } from "../helpers/console-success";

config();

export const sequelize = new Sequelize(process.env.DB_URL as string, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            require: true
        }
    }
});

export const syncDatabase = async () => {
    try {
        await sequelize.sync();
        consoleSuccess("Database Sync Successful");
    } catch (error) {
        console.error("Database Sync Error:", error);
        throw error;
    }
};
