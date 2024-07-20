import React from 'react';
import { userAPI } from '../services/UserService';
import { UpdateNewPassword } from '../models/ICredentials';
import { Navigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Define schema for the password reset form
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
        });
    }
});

function VerifyPassword() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    // Initialize form methods
    const { register, handleSubmit, reset, formState, getFieldState } = useForm<UpdateNewPassword>({
        resolver: zodResolver(schema),
        mode: 'onTouched'
    });

    // API calls
    const [verifyPassword, { data: verifyData, error: verifyError, isLoading: verifyLoading, isSuccess: verifySuccess }] = userAPI.useVerifyPasswordMutation();
    const [resetPassword, { data: resetData, error: resetError, isLoading: resetLoading, isSuccess: resetSuccess }] = userAPI.useDoResetPasswordMutation();

    // Form field validation
    const isFieldValid = (fieldName: keyof UpdateNewPassword): boolean =>
        getFieldState(fieldName, formState).isTouched &&
        !getFieldState(fieldName, formState).invalid;

    // Handle password reset
    const handleResetPassword = async (passwordRequest: UpdateNewPassword) => {
        await resetPassword(passwordRequest);
        reset();
    };

    // Verify the password reset token on component mount
    React.useEffect(() => {
        if (token && location.pathname.includes('/verify/password')) {
            verifyPassword(token);
        }
    }, [token, location.pathname, verifyPassword]);

    // Handle UI based on token presence and API call results
    if (verifyLoading) {
        return (
            <div className='container'>
                Loading verification...
            </div>
        );
    }

    if (!token) {
        return (
            <div className='container'>
                Invalid or missing token. Please check your verification link.
            </div>
        );
    }

    if (verifySuccess && !resetSuccess) {
        return (
            <div className='container'>
                <form onSubmit={handleSubmit(handleResetPassword)}>
                    <div>
                        <label htmlFor='newPassword'>New Password</label>
                        <input
                            id='newPassword'
                            type='password'
                            {...register('newPassword')}
                            className={isFieldValid('newPassword') ? 'valid' : 'invalid'}
                        />
                        <p>{formState.errors.newPassword?.message}</p>
                    </div>
                    <div>
                        <label htmlFor='confirmNewPassword'>Confirm New Password</label>
                        <input
                            id='confirmNewPassword'
                            type='password'
                            {...register('confirmNewPassword')}
                            className={isFieldValid('confirmNewPassword') ? 'valid' : 'invalid'}
                        />
                        <p>{formState.errors.confirmNewPassword?.message}</p>
                    </div>
                    <input type='hidden' {...register('userId')} value={token || ''} />
                    <button type='submit'>Reset Password</button>
                </form>
            </div>
        );
    }

    if (resetSuccess) {
        return (
            <Navigate to='/login' replace />
        );
    }

    if (resetError) {
        return (
            <div className='container'>
                There was an error resetting your password. Please try again.
            </div>
        );
    }

    return (
        <div className='container'>
            Enter new password
        </div>
    );
}

export default VerifyPassword;
