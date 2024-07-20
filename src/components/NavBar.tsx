import React from 'react'
import { userAPI } from '../services/UserService'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Key } from '../enum/cache.key';

function NavBar() {
    const { data: user, error, isLoading, refetch } = userAPI.useFetchUserQuery();
    const [ logout, { isLoading: logoutLoading} ] = userAPI.useLogoutMutation();

    const navigate = useNavigate();

    const onLogout = async () => { 
        localStorage.removeItem(Key.LOGGEDIN);
        await logout();
        navigate('/login');
    };

    return (
        // TODO
        <div>NavBar</div>
    )
}

export default NavBar
