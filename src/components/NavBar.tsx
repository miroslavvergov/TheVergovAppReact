import React from 'react'
import { userAPI } from '../services/UserService'
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Key } from '../enum/cache.key';

const NavBar = () => {
    const { data: user, error, isLoading, refetch } = userAPI.useFetchUserQuery();
    const [logout, { isLoading: logoutLoading }] = userAPI.useLogoutMutation();
    const navigate = useNavigate();

    const onLogout = async () => {
        localStorage.removeItem(Key.LOGGEDIN);
        localStorage.removeItem(Key.ROLE);
        await logout();
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar navbar-expand-md fixed-top bg-light" data-bs-theme="light" style={{ marginBottom: '250px' }}>
                <div className="container">
                    <NavLink to='/' end className="navbar-brand">
                        <img src={logo} alt="Logo" width="40" height="40" style={{ padding: '0', margin: '0', borderRadius: '0.370rem' }} />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                        aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to='/documents' end className="nav-link" aria-current="page">Documents</NavLink>
                            </li>
                            {user?.data.user.role !== 'USER' && <li className="nav-item">
                                <NavLink to='/users' end className="nav-link">Users</NavLink>
                            </li>}
                        </ul>
                        <div className="flex-shrink-0 dropdown">
                            <a className="d-block link-body-emphasis text-decoration-none dropdown-toggle profile-dropdown" style={{ cursor: 'pointer' }}
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={isLoading ? 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExODF4MTlob2VueGN5YTk4dTFhZTVleGplZGRhNndlYjVpeTkwaHNpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.gif' : user?.data.user.imageUrl} alt="mdo" width="32" height="32" className="rounded-circle" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" style={{ paddingInline: '10px' }}>
                                <li>
                                    <NavLink to="/user/profile" end className="rounded-2 dropdown-item d-flex gap-2 align-items-center">
                                        <img src={isLoading ? 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExODF4MTlob2VueGN5YTk4dTFhZTVleGplZGRhNndlYjVpeTkwaHNpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.gif' : user?.data.user.imageUrl} alt={user?.data.user.firstName} width="35" height="35" className="rounded-circle" />
                                        <div className="">
                                            <p style={{ display: 'block', margin: 0, padding: 0, color: '#000 !important' }}>{user?.data.user.firstName} {user?.data.user.lastName}</p>
                                            <p style={{ display: 'block', margin: 0, padding: 0, fontSize: '12px', fontWeight: 600 }}>{user?.data.user.email}</p>
                                        </div>
                                    </NavLink>
                                </li>
                                <hr className="dropdown-divider" />
                                <li>
                                    <NavLink to="/user/password" end className="rounded-2 dropdown-item d-flex gap-2 align-items-center rounded-2">
                                        <i className="bi bi-key"></i>
                                        Password
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/user/settings" end className="rounded-2 dropdown-item d-flex gap-2 align-items-center">
                                        <i className="bi bi-gear-wide-connected"></i>
                                        Settings
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/user/authorization" end className="rounded-2 dropdown-item d-flex gap-2 align-items-center">
                                        <i className="bi bi-shield-exclamation"></i>
                                        Authorization
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/user/authentication" end className="rounded-2 dropdown-item d-flex gap-2 align-items-center">
                                        <i className="bi bi-lock-fill"></i>
                                        Authentication (MFA)
                                    </NavLink>
                                </li>
                                <hr className="dropdown-divider" />
                                <li>
                                    <a onClick={onLogout} className="rounded-2 dropdown-item dropdown-item-danger d-flex gap-2 align-items-center" style={{ cursor: 'pointer' }}>
                                        <i className="bi bi-box-arrow-right"></i>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default NavBar