import { DataTypes, Model } from "sequelize";
import { sequelize } from "..";
import { Books } from "./Books";

export class Reviews extends Model {
    declare id: number;
    declare ownerName: string;
    declare review: string;
    declare bookId: number;
    declare createdAt: Date;
    declare Book?: Books;
}

Reviews.init(
    { 
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Books,
                key: "id",
            },
            onDelete: "CASCADE",
            field: "sub_genre_id",
        },
        review: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ownerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "reviews",
        sequelize,
        updatedAt: false,
    }
);
