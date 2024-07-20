// Interface representing the request payload for user login or authentication
export interface IUserRequest {
  email: string;    // The user's email address, required for login
  password?: string; // The user's password, optional for some operations like resetting password
}

// Interface extending IUserRequest to include additional fields required for user registration
export interface IRegisterRequest extends IUserRequest {
  firstName: string;   // The user's first name, required for registration
  lastName: string;    // The user's last name, required for registration
  bio?: string;        // Optional field for the user's biography or personal information
  // TODO: Consider adding a phone number field if needed
};

// Type representing only the email address from IUserRequest
export type EmailAddress = Pick<IUserRequest, "email">;

// Type for updating a user's password, including fields for the current and new passwords
export type UpdatePassword = Pick<IUserRequest, "password"> & {
  newPassword: string;        // The new password to be set
  confirmNewPassword: string; // Confirmation of the new password to ensure they match
};

// Type for updating the user's password along with the user's ID
export type UpdateNewPassword = Pick<IUser, "userId"> & UpdatePassword;
