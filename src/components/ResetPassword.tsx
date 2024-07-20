import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';
import { EmailAddress } from '../models/ICredentials';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Key } from '../enum/cache.key';

// Define the validation schema using Zod
const schema = z.object({
  email: z.string().min(3, 'Email is required').email('Invalid email address')
});

function ResetPassword() {
  // Hook to get the current location object
  const location = useLocation();
  
  // Check if the user is already logged in by reading from local storage
  const isLoggedIn: boolean = JSON.parse(localStorage.getItem(Key.LOGGEDIN)!) as boolean || false;

  // Set up the form with validation using react-hook-form and Zod
  const { register, handleSubmit, formState, getFieldState } = useForm<EmailAddress>({
    resolver: zodResolver(schema), // Zod resolver for form validation
    mode: 'onTouched' // Validation mode
  });

  // Mutation hook for resetting the password
  const [resetPassword, { data, error, isLoading, isSuccess }] = userAPI.useRegisterUserMutation();

  // Function to check if a form field is valid
  const isFieldValid = (fieldName: keyof EmailAddress): boolean =>
    getFieldState(fieldName, formState).isTouched &&
    !getFieldState(fieldName, formState).invalid;

  // Function to handle form submission for resetting password
  const handleResetPassword = async (email: EmailAddress) => await resetPassword(email);

  // Redirect to a different page if the user is already logged in
  if (isLoggedIn) {
    return location?.state?.from?.pathname
      ? <Navigate to={location?.state?.from?.pathname} replace />
      : <Navigate to={'/'} replace />;
  }

  return (
    // TODO: Implement the reset password form UI
    <div>
      {/* Add form fields, buttons, and error messages here */}
    </div>
  );
}

export default ResetPassword;
