// Generic interface representing the structure of an API response
export interface IResponse<T> {
  
  time: string;    // Timestamp of when the response was generated (ISO 8601 string)
  
  code: number;    // HTTP status code of the response (e.g., 200, 404, 500)
  
  path: string;    // The path of the API endpoint that was accessed
  
  status: string;  // A textual representation of the HTTP status (e.g., 'OK', 'Not Found')
  
  message: string; // A message providing additional information about the response
  
  data: T;         // The actual data returned by the API, which is of type T
}
