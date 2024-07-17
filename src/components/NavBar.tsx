import React from 'react'
import { userAPI } from '../services/UserService'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function NavBar() {
    const { data: user, error, isLoading, refetch } = userAPI.useFetchUserQuery();
    const navigate = useNavigate();

    const onLogout = async () => { };

    return (
        // TODO
        <div>NavBar</div>
    )
}

export default NavBar
