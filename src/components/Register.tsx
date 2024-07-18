import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userAPI } from "../services/UserService";
import { IRegisterRequest} from "../models/ICredentials";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Key } from "../enum/cache.key";

const schema = z.object({
  email: z.string().min(3, "Email is required").email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(5, "Password is required"),
});

const Register = () => {
  const location = useLocation();
  const isLoggedIn: boolean =
    (JSON.parse(localStorage.getItem(Key.LOGGEDIN)!) as boolean) || false;
  const { register, handleSubmit, reset, formState, getFieldState } =
    useForm<IRegisterRequest>({
      resolver: zodResolver(schema),
      mode: "onTouched",
    });
  const [registerUser, { data, error, isLoading, isSuccess }] =
    userAPI.useRegisterUserMutation();

  const isFieldValid = (fieldName: keyof IRegisterRequest): boolean =>
    getFieldState(fieldName, formState).isTouched &&
    !getFieldState(fieldName, formState).invalid;

  const handleRegister = async (registerRequest: IRegisterRequest) =>
    await registerUser(registerRequest);

  React.useEffect(() => reset(), [isSuccess]);

  return (
    //TODO
  <div>Register</div>
);
};

export default Register;
