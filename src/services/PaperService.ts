import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "../models/IResponse";
import { isJsonContentType, processError, processResponse } from "../utils/requestutils";
import { Http } from "../enum/http.method";
import { Paper, PaperForm, Papers, Query } from "../models/IPaper";
import { Page } from "../models/IPage";

const baseUrl = 'http://localhost:8085/papers';


export const paperAPI = createApi({
    reducerPath: 'paperAPI',
    baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include', isJsonContentType }),
    tagTypes: ['Papers'],
    endpoints: (builder) => ({
        fetchPapers: builder.query<IResponse<Page>, Query>({
            query: (query) => ({
                url: `/search?page=${query.page}&size=${query.size}&name=${query.name}`,
                method: Http.GET
            }),
            //transformResponse: processResponse<Page>,
            transformErrorResponse: processError,
            providesTags: (result, error) => ['Papers']
        }),
        uploadPapers: builder.mutation<IResponse<Papers>, FormData>({
            query: form => ({
                url: '/upload',
                method: Http.POST,
                body: form
            }),
            transformResponse: processResponse<Papers>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['Papers']
        }),
        fetchPaper: builder.query<IResponse<Paper>, string>({
            query: paperId => ({
                url: `/${paperId}`,
                method: Http.GET
            }),
            //transformResponse: processResponse<Page>,
            transformErrorResponse: processError,
            providesTags: (result, error) => ['Papers']
        }),
        updatePaper: builder.mutation<IResponse<Paper>, PaperForm>({
            query: paper => ({
                url: ``,
                method: Http.PATCH,
                body: paper
            }),
            transformResponse: processResponse<Paper>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['Papers']
        }),
        downloadPaper: builder.mutation<Blob, string>({
            query: paperName => ({
                url: `/download/${paperName}`,
                method: Http.GET,
                responseHandler: response => response.blob()
            }),
            //transformResponse: processResponse<Blob>,
            transformErrorResponse: processError,
            //invalidatesTags: (result, error) => error ? [] : ['User']
        })
    })
});