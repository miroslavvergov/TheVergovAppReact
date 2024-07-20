// Enum to represent various HTTP request methods
export enum Http {
    GET = 'GET',        // Method for retrieving data from a server
    POST = 'POST',      // Method for sending data to a server to create or update a resource
    PUT = 'PUT',        // Method for updating a resource or creating a new resource if it does not exist
    PATCH = 'PATCH',    // Method for making partial updates to a resource
    DELETE = 'DELETE',  // Method for deleting a resource from the server
    TRACE = 'TRACE',    // Method for diagnostic purposes, to trace the path of the request
    HEAD = 'HEAD',      // Method for retrieving the headers of a resource
    OPTIONS = 'OPTIONS' // Method for describing the communication options for the target resource
}
