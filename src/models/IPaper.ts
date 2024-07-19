export interface IPaper {
    icon: string;
    name: string;
    description: string;
    id: number;
    size: number;
    extension: string;
    uri: string;
    formattedSize: string;
    referenceId: string;
    ownerLastLogin: string;
    updaterName: string;
    paperId: string;
    createdAt: string;
    updatedAt: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
}

export type Paper = { 'paper': IPaper };

export type Papers = { 'papers': IPaper[] };

export type Query = { name?: string, page: number, size: number };

export type PaperForm = Pick<IPaper, 'name' | 'description' | 'paperId' | 'size' | 'updaterName' | 'createdAt' | 'updatedAt'>;