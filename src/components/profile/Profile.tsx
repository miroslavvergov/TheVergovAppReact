import React from 'react'
import { userAPI } from '../../services/UserService';
import { IRegisterRequest, IUserRequest } from '../../models/ICredentials';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().min(3, "Email is required").email("Invalid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  password: z.string().min(5, "Password is required"),
  bio: z.string().min(5, 'Bio is required')
});

const Profile = () => {
  const { 
    register,
    handleSubmit,
    formState: form,
      getFieldState 
  } = useForm<IUserRequest>({ resolver: zodResolver(schema), mode: 'onTouched' });

  const {
    data: user,
    error,
    isSuccess,
    isLoading,
    refetch,
  } = userAPI.useFetchUserQuery();
  const [
    update,
    {
      data: updateData
      isLoading: updateLoading
    },
  ] = userAPI.useUpdateUserMutation();

  const updateUser = async (user: IRegisterRequest) => await update(user);

  const isFieldValid = (fieldName: keyof IRegisterRequest): boolean =>
    getFieldState(fieldName, formState).isTouched &&
    !getFieldState(fieldName, formState).invalid;

  return (
    // TODO
    <div>Profile</div>
  )
}

export default Profile