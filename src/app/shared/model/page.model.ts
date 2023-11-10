interface SortModel {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

interface PageableModel {
    sort: SortModel;
    offset: number;
    pageSize: number;
    pageNumber: number;
    unpaged: boolean;
    paged: boolean;
}

export interface PageModel<T> {
    content: T[];
    pageable: PageableModel;
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    sort: SortModel;
    numberOfElements: number;
    size: number;
    number: number;
}
