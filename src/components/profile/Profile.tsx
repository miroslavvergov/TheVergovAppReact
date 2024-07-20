import React from 'react';
import { userAPI } from '../../services/UserService';
import { IRegisterRequest, IUserRequest } from '../../models/ICredentials';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Defining validation schema for the user profile form using zod
const schema = z.object({
  email: z.string().min(3, "Email is required").email("Invalid email address"), // Email must be a valid email format
  firstName: z.string().min(1, "First name is required"), // First name is required
  lastName: z.string().min(1, "Last name is required"), // Last name is required
  bio: z.string().min(5, 'Bio is required') // Bio must be at least 5 characters long
});

const Profile = () => {
  // Initializing form handling with react-hook-form and zod for validation
  const { 
    register,
    handleSubmit,
    formState: form,
    getFieldState 
  } = useForm<IUserRequest>({ resolver: zodResolver(schema), mode: 'onTouched' });

  // Fetching user data using a query hook from RTK Query
  const {
    data: user,
    error,
    isSuccess,
    isLoading,
    refetch,
  } = userAPI.useFetchUserQuery();

  // Mutation hook for updating user information
  const [
    update,
    {
      data: updateData,
      isLoading: updateLoading
    },
  ] = userAPI.useUpdateUserMutation();

  // Handler function for updating user profile
  const updateUser = async (user: IRegisterRequest) => await update(user);

  // Utility function to check if a form field is valid
  const isFieldValid = (fieldName: keyof IRegisterRequest): boolean =>
    getFieldState(fieldName, formState).isTouched &&
    !getFieldState(fieldName, formState).invalid;

  return (
    // TODO: Implement the UI for displaying and editing user profile
    <div>Profile</div> // Placeholder div to be replaced with actual content
  );
}

export default Profile;
