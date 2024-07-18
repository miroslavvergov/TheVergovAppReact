import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { setupStore } from './store/store.ts';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Login from './components/Login.tsx';
import { Provider } from 'react-redux';
import NavBar from './components/NavBar.tsx';
import Papers from './components/papers/Papers.tsx';
import Register from './components/Register.tsx';
import VerifyAccount from './components/VerifyAccount.tsx';
import ResetPassword from './components/ResetPassword.tsx';
import VerifyPassword from './components/VerifyPassword.tsx';

const store = setupStore();
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route path='login' element={<Login />} />
    <Route path='register' element={<Register />} />
    <Route path='reset-password' element={<ResetPassword />} />
    <Route path='user/verify/account' element={<VerifyAccount />} />
    <Route path='user/verify/password' element={<VerifyPassword />} />
    <Route element={<NavBar />}>
      <Route index path='/papers' element={<Papers />} />
      <Route path='/' element={<Navigate to={'/papers'} />} />
    </Route>
  </Route>
))

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
