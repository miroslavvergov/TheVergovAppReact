import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';
import { IUserRequest } from '../models/ICredentials';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { QrCodeRequest } from '../models/IUser';

const loginSchema = z.object({
    email: z.string().min(3, 'Email is required').email('Invalid email address'),
    password: z.string().min(5, 'Password is required')
});

const qrCodeSchema = z.object({
    qrCode1: z.string().min(1, 'QR Code is required').max(1, 'Only 1 digit per input'),
    qrCode2: z.string().min(1, 'QR Code is required').max(1, 'Only 1 digit per input'),
    qrCode3: z.string().min(1, 'QR Code is required').max(1, 'Only 1 digit per input'),
    qrCode4: z.string().min(1, 'QR Code is required').max(1, 'Only 1 digit per input'),
    qrCode5: z.string().min(1, 'QR Code is required').max(1, 'Only 1 digit per input'),
    qrCode6: z.string().min(1, 'QR Code is required').max(1, 'Only 1 digit per input'),
    userId: z.string().min(5, 'User ID is required')
});
const Login = () => {
    const location = useLocation();
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem('login')!) as boolean || false;
    const [loginUser, { data, error, isLoading, isSuccess }] = userAPI.useLoginUserMutation();
    const [verifyQrCode, { data: qrCodeData, error: qrCodeError, isLoading: qrCodeLoading, isSuccess: qrCodeSuccess }]
    const { register, handleSubmit, formState: form, getFieldState } = useForm<IUserRequest>({ resolver: zodResolver(loginSchema), mode: 'onTouched' });
    const { register: qrCodeRegister, handleSubmit: submitQrCode, formState: qrCodeForm, getFieldState: getQrCodeField } = useForm<QrCodeRequest>({ resolver: zodResolver(qrCodeSchema), mode: 'onTouched' });


    const isFieldValid = (fieldName: keyof IUserRequest): boolean => getFieldState(fieldName, form).isTouched && !getFieldState(fieldName, form).invalid;
    const isQrCodeFieldValid = (fieldName: keyof IUserRequest): boolean => getQrCodeField(fieldName, qrCodeForm).isTouched && !getFieldState(fieldName, qrCodeForm).invalid;

    const handleLogin = (credentials: IUserRequest) => loginUser(credentials);

    const onVerifyQrCode = async (qrCode: QrCodeRequest) => {
        qrCode = { ...qrCode, qrCode: `${qrCode.qrCode1}${qrCode.qrCode2}${qrCode.qrCode3}${qrCode.qrCode4}${qrCode.qrCode5}${qrCode.qrCode6}` };
        await verifyQrCode(qrCode);
    }

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

    if (qrCodeSuccess && data?.data.user.mfa) {
        localStorage.setItem('login', 'true');
        return location?.state?.from?.pathname
            ?
            <Navigate to={location?.state?.from?.pathname} replace />
            :
            <Navigate to={'/'} replace />
    }

    if (isSuccess && data?.data.user.mfa) {
        return (
            //TODO
        );
    }

    return (
        // TODO
        <div>Login</div>
    )
}

export default Login
