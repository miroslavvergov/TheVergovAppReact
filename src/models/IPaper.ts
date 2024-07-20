// Interface representing a paper with its metadata
export interface IPaper {
    icon: string;         // URL or path to the icon representing the paper
    name: string;         // Name or title of the paper
    description: string;  // Description of the paper
    id: number;           // Unique identifier for the paper
    size: number;         // Size of the paper in bytes
    extension: string;    // File extension of the paper (e.g., 'pdf', 'docx')
    uri: string;          // URI for accessing the paper
    formattedSize: string; // Formatted string representing the size (e.g., '2 MB')
    referenceId: string;  // Reference ID associated with the paper
    ownerLastLogin: string; // Last login date of the owner (ISO 8601 string)
    updaterName: string;  // Name of the person who last updated the paper
    paperId: string;      // Identifier specific to the paper
    createdAt: string;    // Creation date of the paper (ISO 8601 string)
    updatedAt: string;    // Last updated date of the paper (ISO 8601 string)
    ownerName: string;    // Name of the owner of the paper
    ownerEmail: string;   // Email of the owner
    ownerPhone: string;   // Phone number of the owner
}

// Type representing a single paper wrapped in an object
export type Paper = { 'paper': IPaper };

// Type representing multiple papers wrapped in an object
export type Papers = { 'papers': IPaper[] };

// Type representing query parameters for fetching papers
export type Query = {
    name?: string;  // Optional name filter for querying papers
    page: number;   // Page number for pagination
    size: number;   // Number of papers per page
};

// Type representing a subset of paper properties for form usage
export type PaperForm = Pick<IPaper, 'name' | 'description' | 'paperId' | 'size' | 'updaterName' | 'createdAt' | 'updatedAt'>;
