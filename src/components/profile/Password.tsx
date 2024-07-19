import React from 'react'
import { userAPI } from '../../services/UserService';
import { IRegisterRequest, IUserRequest, UpdatePassword } from '../../models/ICredentials';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ResetPassword from '../ResetPassword';

const schema = z.object({
  newPassword: z.string().min(5, { message: 'New password is required' }),
  confirmNewPassword: z.string().min(5, { message: 'Confirm password is required' }),
  password: z.string().min(5, { message: 'Password is required' })
}).superRefine(({ newPassword, confirmNewPassword }, ctx) => {
  if (newPassword !== confirmNewPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['confirmNewPassword'],
      message: 'New password and confirm password do not match'
    })
  }
})

const Password = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: form,
    getFieldState
  } = useForm<UpdatePassword>({ resolver: zodResolver(schema), mode: 'onTouched' });

  const {
    data: user,
    error,
    isSuccess,
    isLoading,
    refetch,
  } = userAPI.useFetchUserQuery();
  const [
    updatePassword,
    {
      data: updateData,
      isLoading: updateLoading,
      isSuccess: updateSuccess
    },
  ] = userAPI.useUpdatePasswordMutation();

  const isFieldValid = (fieldName: keyof UpdatePassword): boolean =>
    getFieldState(fieldName, form).isTouched &&
    !getFieldState(fieldName, form).invalid;


  const onUpdatePassword = async (request: UpdatePassword) => await updatePassword(request);

  React.useEffect(() => reset(), [updateSuccess])
  return (
    // TODO

    <div>Password</div>
  )
}

export default Password