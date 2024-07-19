import { IPaper } from "./IPaper";

export interface IPage {

    content: IPaper[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            empty: boolean,
            sorted: boolean,
            unsorted: boolean
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean,
    totalElements: number,
    totalPages: number,
    first: boolean,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    };
    numberOfElements: number;
    empty: boolean
}

export type Page = { 'documents': IPage };