import { DateFormat } from "../types/date-format";

export interface BooksResponse {
    "fb-updates": {
        $: BooksResponseDetails;
        "updated-book": UpdatedBooks;
    };
}

interface BooksResponseDetails {
    "xmlns:l": string;
    timestamp: DateFormat;
}

interface UpdatedBooks {
    $: BookMetadata;
    annotation: {
        p: string[];
    }[];
    "title-info": BookTitleInfo;
    files: Files;
    relations: Relations;
    copyrights: Copyrights;
    genres: Genres;
    "book-title": BookTitle;
    authors: Authors;
}
[];

type Author = {
    $: {
        id: string;
    };
    subject_id: string[];
    url: string[];
    lvl: string[];
    "first-name": string[];
    "last-name": string[];
    relation: string[];
    "middle-name": string[];
    "full-name-rodit": string[];
};

type AuthorGroup = {
    author: Author[];
};

type Authors = {
    authors: AuthorGroup[];
};

type BookTitleItem = {
    $: {
        title: string;
    };
};

type BookTitle = {
    "book-title": BookTitleItem[];
};

type GenreEntry = {
    $: {
        id: string;
        title: string;
        bisac?: string;
        master?: string;
    };
};

type GenreGroup = {
    genre: GenreEntry[];
};

type Genres = {
    genres: GenreGroup[];
};

type CopyrightEntry = {
    $: {
        id: string;
        title: string;
    };
};

type CopyrightGroup = {
    copyright: CopyrightEntry[];
};

type Copyrights = {
    copyrights: CopyrightGroup[];
};

type RelatedItem = {
    $: {
        uuid: string;
        type: string;
        relation: string;
    };
};

type RelationEntry = {
    related: RelatedItem[];
};

type Relations = {
    relations: RelationEntry[];
};

interface BookMetadata {
    size: string;
    valid_from: string;
    file_id: string;
    allow_read: string;
    allow_sell: string;
    url: string;
    subject_id: string;
    status: string;
    lang3: string;
    must_import: string;
    src_lang: string;
    allow_full_free: string;
    drm: string;
    date_written_d: string;
    id: string;
    rt_subscription: string;
    can_preorder: string;
    cover_h: string;
    first_time_sale: string;
    external_id: string;
    sell_open: string;
    cover: string;
    src_lang3: string;
    you_can_sell: string;
    public_domain: string;
    has_trial: string;
    contract_author: string;
    publisher: string;
    lvl: string;
    date_written_s: string;
    price: string;
    available_date: string;
    type: string;
    valid_till: string;
    cover_w: string;
    file_parts: string;
    chars: string;
    art_cover_h: string;
    rating: string;
    last_release: string;
    sent_by_name: string;
    copyright_read_online: string;
    lang: string;
    created: string;
    updated: string;
    available: string;
    sent_by_id: string;
    art_cover: string;
    art_cover_w: string;
    contract_ends: string;
    options: string;
    adult: string;
    contract_title: string;
    inapp_price: string;
}

type AuthorInfo = {
    "first-name": string[];
    "middle-name": string[];
    "last-name": string[];
    "full-name": string[];
    id: string[];
    "hub-id": string[];
};

type ReaderInfo = {
    nickname: string[];
    id: string[];
    "hub-id": string[];
};

type Annotation = {
    p: string[];
};

type DateInfo = {
    _: string;
    $: {
        value: string;
    };
};

type BookTitleInfo = {
    genre: string[];
    author: AuthorInfo[];
    reader: ReaderInfo[];
    "book-title": string[];
    annotation: Annotation[];
    date: DateInfo[];
    lang: string[];
    "src-lang": string[];
    keywords: string[];
};

type FileItem = {
    $: {
        id: string;
        size: string;
        filename: string;
        seconds?: string;
        mime_type: string;
        file_description: string;
    };
};

type FileGroup = {
    $: {
        group_id: string;
        value: string;
    };
    file: FileItem[];
};

type FilesEntry = {
    group: FileGroup[];
};

type Files = {
    files: FilesEntry[];
};
