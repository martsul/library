import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";
import { sequelize } from "..";
import { SubGenres } from "./Sub-genres";

export class MicroGenres extends Model<
    InferAttributes<MicroGenres>,
    InferCreationAttributes<MicroGenres>
> {
    declare id: number;
    declare title: string;
    declare subGenreId: number;
}

MicroGenres.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subGenreId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: SubGenres,
                key: "id",
            },
            onDelete: "CASCADE",
            field: "sub_genre_id",
        },
    },
    {
        sequelize,
        timestamps: false,
        tableName: "micro_genres",
    }
);
