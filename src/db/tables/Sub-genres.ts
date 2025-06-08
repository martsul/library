import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { MicroGenres } from "./Micro-genres";
import { sequelize } from "..";
import { Genres } from "./Genres";

export class SubGenres extends Model<
    InferAttributes<SubGenres>,
    InferCreationAttributes<SubGenres>
> {
    declare id: number;
    declare title: string;
    declare genreId: number;
    declare microGenres?: MicroGenres[];
}

SubGenres.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        genreId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Genres,
                key: "id",
            },
            onDelete: "CASCADE",
            field: "genre_id",
        },
    },
    {
        sequelize,
        timestamps: false,
        tableName: "sub_genres",
    }
);
