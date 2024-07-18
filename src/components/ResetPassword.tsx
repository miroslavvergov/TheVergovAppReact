import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';
import { EmailAddress } from '../models/ICredentials';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Key } from '../enum/cache.key';

const schema = z.object({ email: z.string().min(3, 'Email is required').email('Invalid email address') });

function ResetPassword() {
    const location = useLocation();
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem(Key.LOGGEDIN)!) as boolean || false;
    const { register, handleSubmit, formState, getFieldState } = useForm<EmailAddress>({ resolver: zodResolver(schema), mode: 'onTouched' });
    const [resetPassword, { data, error, isLoading, isSuccess }] = userAPI.useRegisterUserMutation();

    const isFieldValid = (fieldName: keyof EmailAddress): boolean => getFieldState(fieldName, formState).isTouched && !getFieldState(fieldName, formState).invalid;

    const handleResetPassword = async (email: EmailAddress) => await resetPassword(email);

    if (isLoggedIn) {
        return location?.state?.from?.pathname
            ?
            <Navigate to={location?.state?.from?.pathname} replace />
            :
            <Navigate to={'/'} replace />
    }

    return (
        // TODO
        <div>

        </div>
    )
}

export default ResetPassword
