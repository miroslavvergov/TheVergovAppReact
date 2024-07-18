import React from 'react'
import { useLocation } from 'react-router-dom';

function Verify() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    // needs to be 'token' not 'key'
    // https://localhost:5173/user/verify/account?token=blahblah
    const token = searchParams.get('token')

    if (!token) {
        return (
            // TODO
        )
    }

    if(location.pathname === '/verify/account') {
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

export default Verify
