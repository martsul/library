import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";
import { Genres } from "./Genres";
import { SubGenres } from "./Sub-genres";
import { MicroGenres } from "./Micro-genres";

export class Books extends Model {
    declare id: number;
    declare img: string;
    declare long?: string;
    declare top?: boolean;
    declare age?: string;
    declare author: string;
    declare title: string;
    declare genreId: number;
    declare subGenreId: number;
    declare microGenreId: number;
    declare language: string;
}

Books.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        img: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        long: {
            type: DataTypes.STRING,
        },
        top: {
            type: DataTypes.BOOLEAN,
        },
        age: {
            type: DataTypes.STRING(3),
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        language: {
            type: DataTypes.STRING(2),
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
        microGenreId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: MicroGenres,
                key: "id",
            },
            onDelete: "CASCADE",
            field: "micro_genre_id",
        },
    },
    {
        tableName: "books",
        sequelize,
        timestamps: false,
    }
);
