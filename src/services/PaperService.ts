import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "../models/IResponse";
import {
    isJsonContentType,
    processError,
    processResponse,
} from "../utils/requestutils";
import { Http } from "../enum/http.method";
import { Paper, PaperForm, Papers, Query } from "../models/IPaper";
import { Page } from "../models/IPage";

// Base URL for the API endpoints related to paper management
const baseUrl = 'http://localhost:8085/papers';

// Definition of the paperAPI using RTK Query
export const paperAPI = createApi({
    reducerPath: "paperAPI",  // Unique key for the reducer
    baseQuery: fetchBaseQuery({
        baseUrl,                // Base URL for all API requests
        credentials: "include", // Include credentials (like cookies) in requests
        isJsonContentType,      // Function to check if content type is JSON
    }),
    tagTypes: ["Papers"],     // Tag type for cache invalidation
    endpoints: (builder) => ({
        // Endpoint for fetching a paginated list of papers based on query parameters
        fetchPapers: builder.query<IResponse<Page>, Query>({
            query: (query) => ({
                url: `/search?page=${query.page}&size=${query.size}&name=${query.name}`, // URL with query parameters
                method: Http.GET      // HTTP method for this request
            }),
            // transformResponse: processResponse<Page>, // Optional transformation of the response
            transformErrorResponse: processError, // Handle errors in the response
            providesTags: (result, error) => ["Papers"], // Tags for cache invalidation
        }),
        // Endpoint for uploading papers using FormData
        uploadPapers: builder.mutation<IResponse<Papers>, FormData>({
            query: (form) => ({
                url: "/upload",       // URL for uploading papers
                method: Http.POST,    // HTTP method for this request
                body: form,           // FormData to be sent in the request body
            }),
            transformResponse: processResponse<Papers>, // Optional transformation of the response
            transformErrorResponse: processError, // Handle errors in the response
            invalidatesTags: (result, error) => (error ? [] : ["Papers"]) // Invalidate cache if there is no error
        }),
        // Endpoint for fetching a single paper by its ID
        fetchPaper: builder.query<IResponse<Paper>, string>({
            query: (paperId) => ({
                url: `/${paperId}`,  // URL with paper ID
                method: Http.GET,    // HTTP method for this request
            }),
            // transformResponse: processResponse<void>, // Optional transformation of the response
            transformErrorResponse: processError, // Handle errors in the response
            providesTags: (result, error) => (error ? [] : ["Papers"]) // Tags for cache invalidation
        }),
        // Endpoint for updating a paper with new information
        updatePaper: builder.mutation<IResponse<Paper>, PaperForm>({
            query: (paper) => ({
                url: ``,
                method: Http.PATCH,    // HTTP method for this request
                body: paper,           // Body of the request containing paper details
            }),
            transformResponse: processResponse<Paper>, // Optional transformation of the response
            transformErrorResponse: processError, // Handle errors in the response
            invalidatesTags: (result, error) => (error ? [] : ["Papers"]) // Invalidate cache if there is no error
        }),
        // Endpoint for downloading a paper by its name
        downloadPaper: builder.mutation<Blob, string>({
            query: (paperName) => ({
                url: `/download/${paperName}`, // URL with paper name
                method: Http.GET,    // HTTP method for this request
                responseHandler: response => response.blob() // Convert response to Blob
            }),
            // transformResponse: processResponse<Papers>, // Optional transformation of the response
            transformErrorResponse: processError, // Handle errors in the response
            // invalidatesTags: (result, error) => (error ? [] : ["Papers"]) // Optional cache invalidation
        })
    }),
});
