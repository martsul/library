import { consoleSuccess } from "../helpers/console-success";
import { Books } from "./tables/Books";
import { Genres } from "./tables/Genres";
import { MicroGenres } from "./tables/Micro-genres";
import { Reviews } from "./tables/Reviews";
import { SubGenres } from "./tables/Sub-genres";

export const initAssociations = () => {
    try {
        Genres.hasMany(SubGenres, {
            foreignKey: "genreId",
            sourceKey: "id",
        });

        SubGenres.belongsTo(Genres, {
            foreignKey: "genreId",
            targetKey: "id",
            onDelete: "CASCADE",
        });

        SubGenres.hasMany(MicroGenres, {
            foreignKey: "subGenreId",
            sourceKey: "id",
        });

        MicroGenres.belongsTo(SubGenres, {
            foreignKey: "subGenreId",
            targetKey: "id",
            onDelete: "CASCADE",
        });

        Reviews.belongsTo(Books, {
            foreignKey: "bookId",
            targetKey: "id",
        });

        Books.hasMany(Reviews, {
            foreignKey: "bookId",
            sourceKey: "id",
        });

        Genres.hasMany(Books, {
            foreignKey: "genreId",
            sourceKey: "id",
        });

        SubGenres.hasMany(Books, {
            foreignKey: "subGenreId",
            sourceKey: "id",
        });

        MicroGenres.hasMany(Books, {
            foreignKey: "microGenreId",
            sourceKey: "id",
        });

        Books.belongsTo(Genres, {
            foreignKey: "genreId",
            targetKey: "id",
            onDelete: "CASCADE",
        });

        Books.belongsTo(SubGenres, {
            foreignKey: "subGenreId",
            targetKey: "id",
            onDelete: "CASCADE",
        });

        Books.belongsTo(MicroGenres, {
            foreignKey: "microGenreId",
            targetKey: "id",
            onDelete: "CASCADE",
        });

        consoleSuccess("Associations Init Successful");
    } catch (error) {
        console.error("Associations Init Error:", error);
    }
};
