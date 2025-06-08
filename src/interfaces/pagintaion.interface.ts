interface PaginationItem  {
    page:number,
    active: boolean
}

export interface Pagination {
    pagination: PaginationItem[],
    countPages: number
}