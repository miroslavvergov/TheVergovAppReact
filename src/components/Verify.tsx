import React from 'react'
import { useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';

function VerifyAccount() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    // needs to be 'token' not 'key'
    // https://localhost:5173/user/verify/account?token=blahblah
    const token = searchParams.get('token');
    const [verifyAccount, { data: accountData, error: accountError, isLoading: accountLoading, isSuccess: accountSuccess }] =
        userAPI.useVerifyAccountMutation();

    React.useEffect(() => {
        if (token && location.pathname.includes('/verify/account')) {
            verifyAccount(token);
        }
    }, []);


    if (!token) {
        return (
            // TODO
        )
    }

    if (accountSuccess && location.pathname.includes('/verify/account')) {
        return (
            // TODO
        )
    }

    return (
        // TODO
        <div>

        </div>
    )
}

export default VerifyAccount
