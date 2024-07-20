import React from 'react';
import { userAPI } from '../../services/UserService';
import { IRegisterRequest, IUserRequest, UpdatePassword } from '../../models/ICredentials';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ResetPassword from '../ResetPassword';

// Defining validation schema for the password form using zod
const schema = z.object({
  newPassword: z.string().min(5, { message: 'New password is required' }), // Minimum length for new password
  confirmNewPassword: z.string().min(5, { message: 'Confirm password is required' }), // Minimum length for confirm password
  password: z.string().min(5, { message: 'Password is required' }) // Minimum length for current password
}).superRefine(({ newPassword, confirmNewPassword }, ctx) => {
  // Custom validation to ensure newPassword and confirmNewPassword match
  if (newPassword !== confirmNewPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmNewPassword'],
      message: 'New password and confirm password do not match'
    });
  }
});

const Password = () => {
  // Initializing form handling with react-hook-form and zod for validation
  const {
    register,
    handleSubmit,
    reset,
    formState: form,
    getFieldState
  } = useForm<UpdatePassword>({ resolver: zodResolver(schema), mode: 'onTouched' });

  // Fetching user data using a query hook from RTK Query
  const {
    data: user,
    error,
    isSuccess,
    isLoading,
    refetch,
  } = userAPI.useFetchUserQuery();
  
  // Mutation hook for updating the user's password
  const [
    updatePassword,
    {
      data: updateData,
      isLoading: updateLoading,
      isSuccess: updateSuccess
    },
  ] = userAPI.useUpdatePasswordMutation();

  // Utility function to check if a form field is valid
  const isFieldValid = (fieldName: keyof UpdatePassword): boolean =>
    getFieldState(fieldName, form).isTouched &&
    !getFieldState(fieldName, form).invalid;

  // Handler function for updating the password
  const onUpdatePassword = async (request: UpdatePassword) => await updatePassword(request);

  // Reset the form when password update is successful
  React.useEffect(() => reset(), [updateSuccess]);

  return (
    // TODO: Implement the UI for updating the user's password
    <div>Password</div> // Placeholder div to be replaced with actual content
  );
}

export default Password;
