import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';
import { IUserRequest } from '../models/ICredentials';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { QrCodeRequest } from '../models/IUser';
import { Key } from '../enum/cache.key';

// Schema for validating login credentials
const loginSchema = z.object({
    email: z.string().min(3, 'Email is required').email('Invalid email address'), // Email must be a valid format
    password: z.string().min(5, 'Password is required') // Password must be at least 5 characters long
});

// Schema for validating QR code input
const qrCodeSchema = z.object({
    qrCode1: z.string().min(1, 'QR Code is required').max(1, 'Only 1 digit per input'),
    qrCode2: z.string().min(1, 'QR Code is required').max(1, 'Only 1 digit per input'),
    qrCode3: z.string().min(1, 'QR Code is required').max(1, 'Only 1 digit per input'),
    qrCode4: z.string().min(1, 'QR Code is required').max(1, 'Only 1 digit per input'),
    qrCode5: z.string().min(1, 'QR Code is required').max(1, 'Only 1 digit per input'),
    qrCode6: z.string().min(1, 'QR Code is required').max(1, 'Only 1 digit per input'),
    userId: z.string().min(5, 'User ID is required') // User ID must be at least 5 characters long
});

const Login = () => {
    const location = useLocation();
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem(Key.LOGGEDIN)!) as boolean || false;
    
    // Mutation hooks for login and QR code verification
    const [loginUser, { data, error, isLoading, isSuccess }] = userAPI.useLoginUserMutation();
    const [verifyQrCode, { data: _, error: qrCodeError, isLoading: qrCodeLoading, isSuccess: qrCodeSuccess }] = userAPI.useVerifyQrCodeMutation();

    // React Hook Form setup for login form
    const { register, handleSubmit, formState: form, getFieldState } = useForm<IUserRequest>({ resolver: zodResolver(loginSchema), mode: 'onTouched' });
    // React Hook Form setup for QR code verification form
    const { register: qrCodeRegister, handleSubmit: submitQrCode, formState: qrCodeForm, getFieldState: getQrCodeField } = useForm<QrCodeRequest>({ resolver: zodResolver(qrCodeSchema), mode: 'onTouched' });

    // Function to check if a form field is valid
    const isFieldValid = (fieldName: keyof IUserRequest): boolean => getFieldState(fieldName, form).isTouched && !getFieldState(fieldName, form).invalid;
    const isQrCodeFieldValid = (fieldName: keyof QrCodeRequest): boolean => getQrCodeField(fieldName, qrCodeForm).isTouched && !getQrCodeField(fieldName, qrCodeForm).invalid;

    // Handler for login form submission
    const handleLogin = (credentials: IUserRequest) => loginUser(credentials);

    // Handler for QR code verification
    const onVerifyQrCode = async (qrCode: QrCodeRequest) => {
        // Concatenate QR code digits
        qrCode = { ...qrCode, qrCode: `${qrCode.qrCode1}${qrCode.qrCode2}${qrCode.qrCode3}${qrCode.qrCode4}${qrCode.qrCode5}${qrCode.qrCode6}` };
        await verifyQrCode(qrCode);
    }

    // Redirect user based on their authentication state
    if (isLoggedIn) {
        // If user is already logged in, redirect to the previous page or home
        return location?.state?.from?.pathname
            ? <Navigate to={location?.state?.from?.pathname} replace />
            : <Navigate to={'/'} replace />;
    }

    if (isSuccess && (!data?.data.user.mfa)) {
        // If login is successful and MFA is not enabled, set logged-in state and redirect
        localStorage.setItem(Key.LOGGEDIN, 'true');
        return location?.state?.from?.pathname
            ? <Navigate to={location?.state?.from?.pathname} replace />
            : <Navigate to={'/'} replace />;
    }

    if (qrCodeSuccess && data?.data.user.mfa) {
        // If QR code verification is successful, set logged-in state and redirect
        localStorage.setItem(Key.LOGGEDIN, 'true');
        return location?.state?.from?.pathname
            ? <Navigate to={location?.state?.from?.pathname} replace />
            : <Navigate to={'/'} replace />;
    }

    if (isSuccess && data?.data.user.mfa) {
        // If login is successful and MFA is enabled, render the QR code verification form
        return (
            // TODO: Implement the QR code verification UI
            <div>QR Code Verification</div>
        );
    }

    return (
        // TODO: Implement the login form UI
        <div>Login</div> // Placeholder div to be replaced with actual login form
    );
}

export default Login;
