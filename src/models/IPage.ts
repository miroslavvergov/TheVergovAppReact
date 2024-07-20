import { IPaper } from "./IPaper";

// Interface representing a paginated response of papers
export interface IPage {
    content: IPaper[]; // Array of IPaper items representing the actual data on the current page

    pageable: {
        pageNumber: number;    // Current page number (0-based index)
        pageSize: number;      // Number of items per page
        sort: {
            empty: boolean;    // Indicates if the sort information is empty
            sorted: boolean;   // Indicates if sorting is applied
            unsorted: boolean; // Indicates if sorting is not applied
        };
        offset: number;        // Offset of the current page (for pagination purposes)
        paged: boolean;        // Indicates if pagination is applied
        unpaged: boolean;      // Indicates if pagination is not applied
    };

    last: boolean;            // Indicates if the current page is the last page
    totalElements: number;    // Total number of elements available across all pages
    totalPages: number;       // Total number of pages available
    first: boolean;           // Indicates if the current page is the first page
    size: number;             // Number of items per page
    number: number;           // Page number (0-based index)
    sort: {
        empty: boolean;       // Indicates if the sort information is empty
        sorted: boolean;      // Indicates if sorting is applied
        unsorted: boolean;    // Indicates if sorting is not applied
    };
    numberOfElements: number; // Number of elements in the current page
    empty: boolean;           // Indicates if the page is empty (no content)
}

// Type representing a wrapper for paginated documents
export type Page = { 'documents': IPage };
