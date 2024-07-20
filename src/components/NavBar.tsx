import React from 'react';
import { userAPI } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Key } from '../enum/cache.key';

function NavBar() {
    // Fetch user data from the API
    const { data: user, error, isLoading, refetch } = userAPI.useFetchUserQuery();
    
    // Mutation hook for logging out
    const [logout, { isLoading: logoutLoading }] = userAPI.useLogoutMutation();

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // Handler function for logging out
    const onLogout = async () => { 
        // Remove logged-in state from local storage
        localStorage.removeItem(Key.LOGGEDIN);
        // Call the logout mutation
        await logout();
        // Navigate to the login page
        navigate('/login');
    };

    return (
        // TODO: Implement the navigation bar UI
        <div>NavBar</div> // Placeholder for the navigation bar component
    )
}

export default NavBar;
