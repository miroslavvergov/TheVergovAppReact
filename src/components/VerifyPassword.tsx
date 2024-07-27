import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';
import { UpdateNewPassword } from '../models/ICredentials';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IResponse } from '../models/IResponse';

const schema = z.object({
    newPassword: z.string().min(5, { message: 'New password is required' }),
    confirmNewPassword: z.string().min(5, { message: 'Confirm password is required' }),
    userId: z.string().min(5, { message: 'User ID password is required' }),
}).superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['confirmNewPassword'],
            message: 'New password and confirm password do not match'
        })
    }
});

const VerifyPassword = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const key = searchParams.get('key');
    const { register, handleSubmit, reset, formState, getFieldState } = useForm<UpdateNewPassword>({ resolver: zodResolver(schema), mode: 'onTouched', defaultValues: { password: '', newPassword: '', confirmNewPassword: '' } });
    const [verifyPassword, { data, error, isLoading, isSuccess }] = userAPI.useVerifyPasswordMutation();
    const [resetpassword, { data: resetData, error: resetError, isLoading: resetLoading, isSuccess: resetSuccess }] = userAPI.useDoResetPasswordMutation();

    const isFieldValid = (fieldName: keyof UpdateNewPassword): boolean => getFieldState(fieldName, formState).isTouched && !getFieldState(fieldName, formState).invalid;

    const handleResetPassword = async (passwordrequest: UpdateNewPassword) => {
        await resetpassword(passwordrequest);
        reset();
    }

    React.useEffect(() => {
        if (key && location.pathname.includes('/verify/password')) {
            verifyPassword(key);
        }
    }, []);

    if (!key) {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginTop: '100px' }}>
                        <div className="card">
                            <div className="card-body">
                                <div className="alert alert-dismissible alert-danger">
                                    Invalid link. Please check the link and try again.
                                </div>
                                <hr className="my-3" />
                                <div className="row mb-3">
                                    <div className="col d-flex justify-content-start">
                                        <div className="btn btn-outline-light">
                                            <Link to="/login" style={{ textDecoration: 'none' }}>Go to login</Link>
                                        </div>
                                    </div>
                                    <div className="col d-flex justify-content-end">
                                        <div className="link-dark">
                                            <Link to="/resetpassword">Forgot password?</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (key && !isSuccess) {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginTop: '100px' }}>
                        <div className="card">
                            <div className="card-body">
                                {error && <div className="alert alert-dismissible alert-danger">
                                    {'data' in error ? (error.data as IResponse<void>).message! : 'An error occurred'}
                                </div>}
                                <div className="d-flex align-items-center">
                                    {!error && <><strong role="status">Please wait. Verifying...</strong>
                                        <div className="spinner-border ms-auto" aria-hidden="true"></div></>}
                                </div>
                                {error && <>
                                    <hr className="my-3" />
                                    <div className="row mb-3">
                                        <div className="col d-flex justify-content-start">
                                            <div className="btn btn-outline-light">
                                                <Link to="/login" style={{ textDecoration: 'none' }}>Go to login</Link>
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-end">
                                            <div className="link-dark">
                                                <Link to="/resetpassword">Forgot password?</Link>
                                            </div>
                                        </div>
                                    </div></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (isSuccess && location.pathname.includes('/verify/password')) {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginTop: '150px' }}>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="mb-3">Please enter new password</h4>
                                {resetError && <div className="alert alert-dismissible alert-danger">
                                    {'data' in resetError ? (resetError.data as IResponse<void>).message! : 'An error occurred'}
                                </div>}
                                {resetSuccess && <div className="alert alert-dismissible alert-success">
                                    {resetData.message || 'Password reset successfully'}
                                </div>}
                                <hr />
                                <form onSubmit={handleSubmit(handleResetPassword)} className="needs-validation" noValidate>
                                    <input type="hidden" {...register('userId')} defaultValue={data.data.user.userId} name='userId' id="userId" required />
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <label htmlFor="qrCode" className="form-label">New Password</label>
                                            <div className="input-group has-validation">
                                                <span className="input-group-text"><i className="bi bi-key"></i></span>
                                                <input type="password" {...register('newPassword')} name='newPassword' className={`form-control ' ${formState.errors.newPassword ? 'is-invalid' : ''} ${isFieldValid('newPassword') ? 'is-valid' : ''}`} id="newPassword" placeholder="New password" disabled={isLoading} required />
                                                <div className="invalid-feedback">{formState.errors?.newPassword?.message}</div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <label htmlFor="qrCode" className="form-label">Confirm New Password</label>
                                            <div className="input-group has-validation">
                                                <span className="input-group-text"><i className="bi bi-key"></i></span>
                                                <input type="password" {...register('confirmNewPassword')} name='confirmNewPassword' className={`form-control ' ${formState.errors.confirmNewPassword ? 'is-invalid' : ''} ${isFieldValid('confirmNewPassword') ? 'is-valid' : ''}`} id="confirmNewPassword" placeholder="Confirm new password" disabled={isLoading} required />
                                                <div className="invalid-feedback">{formState.errors?.confirmNewPassword?.message}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col mt-3">
                                        <button disabled={formState.isSubmitting || isLoading} className="btn btn-primary btn-block" type="submit" >
                                            {(formState.isSubmitting || isLoading) && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                                            <span role="status">{(formState.isSubmitting || isLoading) ? 'Loading...' : 'Update'}</span>
                                        </button>
                                    </div>
                                </form>
                                <hr className="my-3" />
                                <div className="row mb-3">
                                    <div className="col d-flex justify-content-start">
                                        <div className="btn btn-outline-light">
                                            <Link to="/register" style={{ textDecoration: 'none' }}>Create an Account</Link>
                                        </div>
                                    </div>
                                    <div className="col d-flex justify-content-end">
                                        <div className="link-dark">
                                            <Link to="/resetpassword">Forgot password?</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VerifyPassword;