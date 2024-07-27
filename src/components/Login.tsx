import { Link, Navigate, useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';
import { IUserRequest } from '../models/ICredentials';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IResponse } from '../models/IResponse';
import { QrCodeRequest } from '../models/IUser';
import { Key } from '../enum/cache.key';

const loginSchema = z.object({
    email: z.string().min(3, 'Email is required').email('Invalid email address'),
    password: z.string().min(5, 'Password is required')
});

const qrCodeSchema = z.object({
    qrCode1: z.string().min(1, 'QR Code is required').max(1, 'Only one digut per input'),
    qrCode2: z.string().min(1, 'QR Code is required').max(1, 'Only one digut per input'),
    qrCode3: z.string().min(1, 'QR Code is required').max(1, 'Only one digut per input'),
    qrCode4: z.string().min(1, 'QR Code is required').max(1, 'Only one digut per input'),
    qrCode5: z.string().min(1, 'QR Code is required').max(1, 'Only one digut per input'),
    qrCode6: z.string().min(1, 'QR Code is required').max(1, 'Only one digut per input'),
    userId: z.string().min(5, 'User ID is required')
});

const Login = () => {
    const location = useLocation();
    const isLoggedIn: boolean = JSON.parse(localStorage.getItem(Key.LOGGEDIN)!) as boolean || false;
    const [loginUser, { data, error, isLoading, isSuccess }] = userAPI.useLoginUserMutation();
    const [verifyQrCode, { data: qrCodeData, error: qrCodeError, isLoading: qrCodeLoading, isSuccess: qrCodeSuccess }] = userAPI.useVerifyQrCodeMutation();
    const { register, handleSubmit, formState: form, getFieldState } = useForm<IUserRequest>({ resolver: zodResolver(loginSchema), mode: 'onTouched' });
    const { register: qrCodeRegister, handleSubmit: submitQrCode, formState: qrCodeForm, getFieldState: getQrCodeField } = useForm<QrCodeRequest>({ resolver: zodResolver(qrCodeSchema), mode: 'onTouched' });

    const isFieldValid = (fieldName: keyof IUserRequest): boolean => getFieldState(fieldName, form).isTouched && !getFieldState(fieldName, form).invalid;
    const isQrCodeFieldValid = (fieldName: keyof QrCodeRequest): boolean => getQrCodeField(fieldName, qrCodeForm).isTouched && !getQrCodeField(fieldName, qrCodeForm).invalid;

    const handleLogin = (credentials: IUserRequest) => loginUser(credentials);

    const onVerifyQrCode = async (qrCode: QrCodeRequest) => {
        qrCode = { ...qrCode, qrCode: `${qrCode.qrCode1}${qrCode.qrCode2}${qrCode.qrCode3}${qrCode.qrCode4}${qrCode.qrCode5}${qrCode.qrCode6}` };
        await verifyQrCode(qrCode);
    }

    if (isLoggedIn) {
        return location?.state?.from?.pathname ? <Navigate to={location?.state?.from?.pathname} replace /> : <Navigate to={'/'} replace />
    }

    if (isSuccess && (!data?.data.user.mfa)) {
        localStorage.setItem(Key.LOGGEDIN, 'true');
        return location?.state?.from?.pathname ? <Navigate to={location?.state?.from?.pathname} replace /> : <Navigate to={'/'} replace />
    }

    if (qrCodeSuccess && data?.data.user.mfa) {
        localStorage.setItem(Key.LOGGEDIN, 'true');
        return location?.state?.from?.pathname ? <Navigate to={location?.state?.from?.pathname} replace /> : <Navigate to={'/'} replace />
    }

    if (isSuccess && data?.data.user.mfa) {
        return (
            <div className="container mtb">
                <div className="row justify-content-center mt-7">
                    <div className="col-lg-5 text-center">
                        <a href="index.html">
                            <img src="assets/img/svg/logo.svg" alt="" />
                        </a>
                        <div className="card mt-5">
                            <div className="card-body">
                                <h4 className="mb-3">2-Step Verification</h4>
                                {qrCodeError && <div className="alert alert-dismissible alert-danger">
                                    {'data' in qrCodeError ? (qrCodeError.data as IResponse<void>).message : 'An error occurred'}
                                </div>}
                                <hr />
                                <div className="svg-icon svg-icon-xl text-purple">
                                    <i className="bi bi-lock fs-3 text"></i>
                                </div>
                                <form onSubmit={submitQrCode(onVerifyQrCode)} className="needs-validation" noValidate>
                                    <label className="form-label">Please enter QR code</label>
                                    <div className="row mt-4 pt-2">
                                        <input type="hidden" {...qrCodeRegister('userId')} defaultValue={data.data.user.userId} name='userId' id="userId" disabled={false} required />
                                        <div className="col">
                                            <input type="text" {...qrCodeRegister('qrCode1')} name='qrCode1'
                                                className={`form-control text-center ' 
                      ${qrCodeForm.errors.qrCode1 ? 'is-invalid' : ''} 
                      ${isQrCodeFieldValid('qrCode1')} ? 'is-valid': ''`} id="qrCode1" disabled={false} required maxLength={1} autoFocus />
                                        </div>
                                        <div className="col">
                                            <input type="text" {...qrCodeRegister('qrCode2')} name='qrCode2'
                                                className={`form-control text-center ' 
                      ${qrCodeForm.errors.qrCode2 ? 'is-invalid' : ''} 
                      ${isQrCodeFieldValid('qrCode2')} ? 'is-valid': ''`} id="qrCode2" disabled={false} required maxLength={1} />
                                        </div>
                                        <div className="col">
                                            <input type="text" {...qrCodeRegister('qrCode3')} name='qrCode3'
                                                className={`form-control text-center ' 
                      ${qrCodeForm.errors.qrCode3 ? 'is-invalid' : ''} 
                      ${isQrCodeFieldValid('qrCode3')} ? 'is-valid': ''`} id="qrCode3" disabled={false} required maxLength={1} />
                                        </div>
                                        <div className="col">
                                            <input type="text" {...qrCodeRegister('qrCode4')} name='qrCode4'
                                                className={`form-control text-center ' 
                      ${qrCodeForm.errors.qrCode4 ? 'is-invalid' : ''} 
                      ${isQrCodeFieldValid('qrCode4')} ? 'is-valid': ''`} id="qrCode4" disabled={false} required maxLength={1} />
                                        </div>
                                        <div className="col">
                                            <input type="text" {...qrCodeRegister('qrCode5')} name='qrCode5'
                                                className={`form-control text-center ' 
                      ${qrCodeForm.errors.qrCode5 ? 'is-invalid' : ''} 
                      ${isQrCodeFieldValid('qrCode5')} ? 'is-valid': ''`} id="qrCode5" disabled={false} required maxLength={1} />
                                        </div>
                                        <div className="col">
                                            <input type="text" {...qrCodeRegister('qrCode6')} name='qrCode6'
                                                className={`form-control text-center ' 
                      ${qrCodeForm.errors.qrCode6 ? 'is-invalid' : ''} 
                      ${isQrCodeFieldValid('qrCode6')} ? 'is-valid': ''`} id="qrCode6" disabled={false} required maxLength={1} />
                                        </div>
                                    </div>
                                    <div className="col mt-3">
                                        <button disabled={!qrCodeForm.isValid || qrCodeForm.isSubmitting || qrCodeLoading} className="btn btn-primary btn-block" type="submit" >
                                            {(qrCodeForm.isSubmitting || qrCodeLoading) && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                                            <span role="status">{(form.isSubmitting || qrCodeLoading) ? 'Loading...' : 'Verify'}</span>
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

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 col-sm-12" style={{ marginTop: '150px' }}>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mb-3">Login</h4>
                            {error && <div className="alert alert-dismissible alert-danger">
                                {'data' in error ? (error.data as IResponse<void>).message : 'An error occurred'}
                            </div>}
                            <hr />
                            <form onSubmit={handleSubmit(handleLogin)} className="needs-validation" noValidate>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="email" className="form-label">Email address</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                            <input type="text" {...register('email')} name='email' autoComplete="on"
                                                className={`form-control ' ${form.errors.email ? 'is-invalid' : ''} 
                        ${isFieldValid('email') ? 'is-valid' : ''}`}
                                                id="email" placeholder="Email address" disabled={false} required />
                                            <div className="invalid-feedback">{form.errors.email?.message}</div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text"><i className="bi bi-key"></i></span>
                                            <input type="password" {...register('password')} name='password' autoComplete="on"
                                                className={`form-control ' ${form.errors.password ? 'is-invalid' : ''} ${isFieldValid('password') ? 'is-valid' : ''}`} placeholder="Password" disabled={false} required />
                                            <div className="invalid-feedback">{form.errors.password?.message}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col mt-3">
                                    <button disabled={form.isSubmitting || isLoading} className="btn btn-primary btn-block" type="submit" >
                                        {(form.isSubmitting || isLoading) && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                                        <span role="status">{(form.isSubmitting || isLoading) ? 'Loading...' : 'Login'}</span>
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

export default Login;