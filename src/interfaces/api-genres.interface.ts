interface Genre {
    $: {
        id: string;
        title: string;
    };
    genre: Genre[];
}

export interface ApiGenres {
    genres: {
        genre: Genre[];
    };
}
