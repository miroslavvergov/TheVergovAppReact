import React from "react";
import { userAPI } from "../services/UserService";
import { Outlet, Navigate } from "react-router-dom";

function Restricted() {
  // Fetch user data and manage loading and error states
  const {
    data: userData,
    error,
    isLoading,
    refetch,
  } = userAPI.useFetchUserQuery(undefined, { refetchOnMountOrArgChange: true });

  // Show a loading indicator while the user data is being fetched
  if (isLoading) {
    return (
      // TODO: Replace with a proper loading component or message
      <div>Loading...</div>
    );
  }

  // Handle errors (if any) that occur during data fetching
  if (error) {
    // TODO: Add error handling logic (e.g., display an error message)
    return <div>Error loading user data</div>;
  }

  // Check if user data is available and determine if the user has the appropriate role
  if (userData && (userData.data.user.role === 'ADMIN' || userData.data.user.role === 'SUPER_ADMIN')) {
    // Render child routes if the user has the required role
    return <Outlet />;
  } else {
    // Redirect to a different page or show an unauthorized message if the user doesn't have the required role
    return <Navigate to="/unauthorized" replace />;
  }
}

export default Restricted;
