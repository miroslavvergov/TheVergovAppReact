import React from 'react';
import { useLocation } from 'react-router-dom';
import { userAPI } from '../services/UserService';

function VerifyAccount() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  const [verifyAccount, { data: accountData, error: accountError, isLoading: accountLoading, isSuccess: accountSuccess }] =
    userAPI.useVerifyAccountMutation();

  React.useEffect(() => {
    if (token && location.pathname.includes('/verify/account')) {
      verifyAccount(token);
    }
  }, [token, location.pathname, verifyAccount]);

  if (accountLoading) {
    return (
      // TODO: Replace with a proper loading component or message
      <div>Loading...</div>
    );
  }

  if (!token) {
    return (
      // TODO: Add a message for when the token is not present
      <div>No token provided. Please check the verification link.</div>
    );
  }

  if (accountSuccess) {
    return (
      // TODO: Add a success message or redirect to login
      <div>Your account has been successfully verified!</div>
    );
  }

  if (accountError) {
    return (
      // TODO: Add an error message or additional error handling
      <div>There was an error verifying your account. Please try again.</div>
    );
  }

  return (
    // TODO: Add a default state if needed
    <div>Processing...</div>
  );
}

export default VerifyAccount;
