import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { SubGenres } from "./Sub-genres";
import { sequelize } from "..";

export class Genres extends Model<
    InferAttributes<Genres>,
    InferCreationAttributes<Genres>
> {
    declare id: number;
    declare title: string;
    declare subGenres?: SubGenres[];
}

Genres.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: false,
        tableName: "genres",
    }
);
