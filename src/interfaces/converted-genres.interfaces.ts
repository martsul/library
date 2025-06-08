interface GenreDto {
    id: number;
    title: string;
}

interface SubGenreDto {
    id: number;
    title: string;
    genreId: number;
}

interface MicroGenreDto {
    id: number;
    title: string;
    subGenreId: number;
}

export interface ConvertedGenres {
    genres: GenreDto[];
    subGenres: SubGenreDto[];
    microGenres: MicroGenreDto[];
}
