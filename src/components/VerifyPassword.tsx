import React from 'react'
import { userAPI } from '../services/UserService';
import { UpdateNewPassword } from '../models/ICredentials';
import { Navigate, useLocation } from 'react-router-dom';
import { IUserRequest } from '../models/ICredentials';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


const schema = z.object({
    newPassword: z.string().min(5, { message: 'New password is required' }),
    confirmNewPassword: z.string().min(5, { message: 'Confirm password is required' }),
    userID: z.string().min(5, { message: 'User ID is required' })
}).superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['confirmNewPassword'],
            message: 'New password and confirm password do not match'
        })
    }
})

function VerifyPassword() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    // needs to be 'token' not 'key'
    // https://localhost:5173/user/verify/password?token=blahblah
    const token = searchParams.get('token');
    const { register, handleSubmit, reset, formState, getFieldState } = useForm<UpdateNewPassword>({ resolver: zodResolver(schema), mode: 'onTouched' });
    const [verifyPassword, { data, error, isLoading, isSuccess }] = userAPI.useVerifyPasswordMutation();
    const [resetpassword, { data: resetData, error: resetError, isLoading: resetLoading, isSuccess: resetSuccess }] = userAPI.useDoResetPasswordMutation();

    const isFieldValid = (fieldName: keyof UpdateNewPassword): boolean => getFieldState(fieldName, formState).isTouched && !getFieldState(fieldName, formState).invalid;

    const handleResetPassword = async (passwordrequest: UpdateNewPassword) => {
        await resetpassword(passwordrequest);
        reset();
    }


    React.useEffect(() => {
        if (token && location.pathname.includes('/verify/password')) {
            verifyPassword(token);
        }
    }, []);


    if (!token) {
        return (
            // TODO
        )
    }

    if (isSuccess && location.pathname.includes('/verify/password')) {
        return (
            // TODO
        )
    }

    return (
        // TODO
        <div className='container'>
            Enter new password
        </div>
    )
}

export default VerifyPassword
