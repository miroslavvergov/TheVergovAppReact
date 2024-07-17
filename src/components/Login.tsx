import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';
import { IUserRequest } from '../models/ICredentials';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const schema = z.object({
    email: z.string().min(3, 'Email is required').email('Invalid email address'),
    password: z.string().min(5, 'Password is required')
})

const Login = () => {
    const location = useLocation();
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem('login')!) as boolean || false;
    const [loginUser, { data, error, isLoading, isSuccess }] = userAPI.useLoginUserMutation();
    const { register, handleSubmit, formState: form, getFieldState } = useForm<IUserRequest>({ resolver: zodResolver(schema), mode: 'onTouched' });

    const isFieldValid = (fieldName: keyof IUserRequest): boolean => getFieldState(fieldName, form).isTouched && !getFieldState(fieldName, form).invalid;

    const handleLogin = (credentials: IUserRequest) => loginUser(credentials);

    if (isLoggedIn) {
        return location?.state?.from?.pathname
            ?
            <Navigate to={location?.state?.from?.pathname} replace />
            :
            <Navigate to={'/'} replace />
    }
    if (isSuccess && (!data?.data.user.mfa)) {
        localStorage.setItem('login', 'true');
        return location?.state?.from?.pathname
            ?
            <Navigate to={location?.state?.from?.pathname} replace />
            :
            <Navigate to={'/'} replace />
    }
    if (isSuccess && data?.data.user.mfa) {
        // TODO jsx
    }

    return (
        // TODO
        <div>Login</div>
    )
}

export default Login
