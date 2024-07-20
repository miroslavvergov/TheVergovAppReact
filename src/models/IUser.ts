// Interface representing a user entity with various properties related to user details and account status
export interface IUser {
  
  id: number;                  // Unique identifier for the user in the database
  
  userId: string;              // User's unique identifier (possibly from an external system)
  
  firstName: string;           // User's first name
  
  lastName: string;            // User's last name
  
  username: string;            // Username chosen by the user for login purposes
  
  email: string;               // User's email address
  
  bio: string;                 // User's biography or description
  
  qrCodeImageUri: string;      // URI to the QR code image associated with the user (if any)
  
  imageUrl: string;            // URL to the user's profile image
  
  lastLogin: string | number | Date;  // Timestamp or date of the user's last login
  
  createdAt: string;           // Timestamp or date when the user account was created
  
  updatedAt: string;           // Timestamp or date when the user account was last updated
  
  role: string;                // User's role (e.g., 'ADMIN', 'USER')
  
  authorities: string;         // Authorities or permissions granted to the user (often a comma-separated list)
  
  accountNonExpired: boolean;  // Indicates if the user's account has expired
  
  accountNonLocked: boolean;   // Indicates if the user's account is locked
  
  enabled: boolean;            // Indicates if the user's account is enabled
  
  createdBy: number;           // Identifier of the user or system that created this user
  
  updatedBy: number;           // Identifier of the user or system that last updated this user
  
  mfa: boolean;                // Indicates if multi-factor authentication is enabled for the user
  
  credentialsNonExpired: boolean;  // Indicates if the user's credentials are expired
}

// Type representing a user's role
export type Role = { role: string };

// Type representing a single user object
export type User = { user: IUser };

// Type representing a collection of users
export type Users = { users: IUser[] };

// Type for a request to handle QR codes, including the user ID and individual QR code digits
export type QrCodeRequest = Pick<IUser, "userId"> & {
  qrCode?: string,           // Optional full QR code value
  qrCode1: string,           // First digit of the QR code
  qrCode2: string,           // Second digit of the QR code
  qrCode3: string,           // Third digit of the QR code
  qrCode4: string,           // Fourth digit of the QR code
  qrCode5: string,           // Fifth digit of the QR code
  qrCode6: string            // Sixth digit of the QR code
};
