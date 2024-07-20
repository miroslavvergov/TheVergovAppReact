import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "../models/IResponse";
import {
  baseUrl,
  isJsonContentType,
  processError,
  processResponse,
} from "../utils/requestutils";
import { QrCodeRequest, Role, User, Users } from "../models/IUser";
import { EmailAddress, IRegisterRequest, IUserRequest, UpdateNewPassword, UpdatePassword } from "../models/ICredentials";
import { Http } from "../enum/http.method";

// Define the API slice for user-related operations
export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl,                 // Base URL for API requests
    credentials: "include",  // Include credentials (cookies) in requests
    isJsonContentType,       // Custom function to set Content-Type header
  }),
  tagTypes: ["User"],       // Tag type used for invalidating and refetching data
  endpoints: (builder) => ({
    // Fetch the current user's profile information
    fetchUser: builder.query<IResponse<User>, IUserRequest>({
      query: () => ({
        url: "/profile", // Endpoint for fetching user profile
        method: Http.GET, // HTTP method
      }),
      keepUnusedDataFor: 120, // Cache data for 120 seconds
      transformResponse: processResponse<User>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      providesTags: (result, error) => ["User"], // Tag for cache invalidation
    }),
    
    // Log in a user with credentials
    loginUser: builder.mutation<IResponse<User>, void>({
      query: (credentials) => ({
        url: "/login", // Endpoint for logging in
        method: Http.POST, // HTTP method
        body: credentials, // Request body with user credentials
      }),
      transformResponse: processResponse<User>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Register a new user
    registerUser: builder.mutation<IResponse<void>, IRegisterRequest>({
      query: (registerRequest) => ({
        url: "/register", // Endpoint for user registration
        method: Http.POST, // HTTP method
        body: registerRequest, // Request body with registration details
      }),
      transformResponse: processResponse<void>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),

    // Verify user account using a token
    verifyAccount: builder.mutation<IResponse<void>, string>({
      query: (token) => ({
        url: `/verify/account?token=${token}`, // Endpoint for account verification
        method: Http.GET, // HTTP method
      }),
      transformResponse: processResponse<void>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
    }),
    
    // Verify user password using a token
    verifyPassword: builder.mutation<IResponse<User>, string>({
      query: (token) => ({
        url: `/verify/password?token=${token}`, // Endpoint for password verification
        method: Http.GET, // HTTP method
      }),
      transformResponse: processResponse<User>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Verify a QR code
    verifyQrCode: builder.mutation<IResponse<User>, QrCodeRequest>({
      query: (qrCodeRequest) => ({
        url: "/verify/qrcode", // Endpoint for QR code verification
        method: Http.POST, // HTTP method
        body: qrCodeRequest, // Request body with QR code details
      }),
      transformResponse: processResponse<User>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Reset the user's password using email
    resetPassword: builder.mutation<IResponse<void>, EmailAddress>({
      query: (email) => ({
        url: "/reset-password", // Endpoint for password reset
        method: Http.POST, // HTTP method
        body: email, // Request body with email address
      }),
      transformResponse: processResponse<void>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Perform the actual password reset with new password
    doResetPassword: builder.mutation<IResponse<void>, UpdateNewPassword>({
      query: (passwordrequest) => ({
        url: `/reset-password/reset`, // Endpoint for performing password reset
        method: Http.POST, // HTTP method
        body: passwordrequest, // Request body with new password details
      }),
      transformResponse: processResponse<void>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Update the user's profile photo
    updatePhoto: builder.mutation<IResponse<string>, FormData>({
      query: (form) => ({
        url: `/photo`, // Endpoint for updating profile photo
        method: Http.PATCH, // HTTP method
        body: form, // Request body with photo data
      }),
      transformResponse: processResponse<string>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Update the user's profile information
    updateUser: builder.mutation<IResponse<User>, IUserRequest>({
      query: (user) => ({
        url: `/update`, // Endpoint for updating user profile
        method: Http.PATCH, // HTTP method
        body: user, // Request body with updated user details
      }),
      transformResponse: processResponse<User>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Update the user's password
    updatePassword: builder.mutation<IResponse<void>, UpdatePassword>({
      query: (request) => ({
        url: `/update-password`, // Endpoint for updating password
        method: Http.PATCH, // HTTP method
        body: request, // Request body with new password details
      }),
      transformResponse: processResponse<void>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Toggle the account's expired status
    toggleAccountExpired: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: `/toggle-account-expired`, // Endpoint for toggling account expired status
        method: Http.PATCH, // HTTP method
      }),
      transformResponse: processResponse<void>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Toggle the account's locked status
    toggleAccountLocked: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: `/toggle-account-locked`, // Endpoint for toggling account locked status
        method: Http.PATCH, // HTTP method
      }),
      transformResponse: processResponse<void>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Toggle the account's enabled status
    toggleAccountEnabled: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: `/toggle-account-enabled`, // Endpoint for toggling account enabled status
        method: Http.PATCH, // HTTP method
      }),
      transformResponse: processResponse<void>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Toggle the account's credentials expired status
    toggleCredentialsExpired: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: `/toggle-credentials-expired`, // Endpoint for toggling credentials expired status
        method: Http.PATCH, // HTTP method
      }),
      transformResponse: processResponse<void>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Update the user's role
    updateRole: builder.mutation<IResponse<void>, Role>({
      query: (role) => ({
        url: `/update-role`, // Endpoint for updating user role
        method: Http.PATCH, // HTTP method
        body: role, // Request body with new role
      }),
      transformResponse: processResponse<void>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Enable multi-factor authentication (MFA) for the user
    enableMfa: builder.mutation<IResponse<User>, void>({
      query: () => ({
        url: `/mfa/setup`, // Endpoint for enabling MFA
        method: Http.PATCH, // HTTP method
      }),
      transformResponse: processResponse<User>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Disable multi-factor authentication (MFA) for the user
    disableMfa: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: `/mfa/cancle`, // Endpoint for disabling MFA
        method: Http.PATCH, // HTTP method
      }),
      transformResponse: processResponse<void>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    }),
    
    // Fetch a list of users (admin functionality)
    getUsers: builder.mutation<IResponse<Users>, void>({
      query: () => ({
        url: `/list`, // Endpoint for fetching user list
        method: Http.GET, // HTTP method
      }),
      transformResponse: processResponse<Users>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
    }),
    
    // Log out the current user
    logout: builder.mutation<IResponse<void>, void>({
      query: () => ({
        url: `/logout`, // Endpoint for logging out
        method: Http.POST, // HTTP method
      }),
      transformResponse: processResponse<void>, // Transform the response data
      transformErrorResponse: processError, // Transform error responses
      invalidatesTags: (result, error) => (error ? [] : ["User"]), // Invalidate cache on success
    })
  }),
});
