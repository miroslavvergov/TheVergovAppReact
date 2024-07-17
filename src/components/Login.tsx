import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';
import { IUserRequest } from '../models/ICredentials';

const Login = () => {
    const location = useLocation();
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem('')!) as boolean || false;
    const [loginUser, { data, error, isLoading, isSuccess }] = userAPI.useLoginUserMutation();

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
