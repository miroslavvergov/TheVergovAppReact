import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userAPI } from "../services/UserService";
import { IRegisterRequest } from "../models/ICredentials";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Key } from "../enum/cache.key";

// Define the validation schema using Zod
const schema = z.object({
  email: z.string().min(3, "Email is required").email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(5, "Password is required"),
});

const Register = () => {
  // Hook to get the current location object
  const location = useLocation();

  // Check if the user is already logged in by reading from local storage
  const isLoggedIn: boolean =
    (JSON.parse(localStorage.getItem(Key.LOGGEDIN)!) as boolean) || false;

  // Set up the form with validation using react-hook-form and Zod
  const { register, handleSubmit, reset, formState, getFieldState } =
    useForm<IRegisterRequest>({
      resolver: zodResolver(schema), // Zod resolver for form validation
      mode: "onTouched", // Validation mode
    });

  // Mutation hook for registering a new user
  const [registerUser, { data, error, isLoading, isSuccess }] =
    userAPI.useRegisterUserMutation();

  // Function to check if a form field is valid
  const isFieldValid = (fieldName: keyof IRegisterRequest): boolean =>
    getFieldState(fieldName, formState).isTouched &&
    !getFieldState(fieldName, formState).invalid;

  // Function to handle form submission
  const handleRegister = async (registerRequest: IRegisterRequest) =>
    await registerUser(registerRequest);

  // Reset the form when registration is successful
  React.useEffect(() => reset(), [isSuccess]);

  // Redirect to the homepage if the user is already logged in
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    // TODO: Implement the registration form UI
    <div>Register</div> // Placeholder for the registration form component
  );
};

export default Register;
