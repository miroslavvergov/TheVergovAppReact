import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Key } from "../enum/cache.key";

function ProtectedRoute() {
  // Hook to get the current location object
  const location = useLocation();
  
  // Check if the user is logged in by reading from local storage
  const isLoggedIn: boolean =
    (JSON.parse(localStorage.getItem(Key.LOGGEDIN)!) as boolean) || false;

  // If user is logged in, render child routes
  if (isLoggedIn) {
    return <Outlet />;
  } else {
    // If user is not logged in, redirect to the login page
    // Pass the current location as state to redirect back after login
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  }
}

export default ProtectedRoute;
