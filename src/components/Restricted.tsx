import React from "react";
import { userAPI } from "../services/UserService";
import { Outlet } from "react-router-dom";

function Restricted() {
  const {
    data: userData,
    error,
    isLoading,
    refetch,
  } = userAPI.useFetchUserQuery(undefined, { refetchOnMountOrArgChange: true });

  if (isLoading || !userData) {
    return {
      // TODO /loading/
    };
  }
  if (userData.data.user.role === 'ADMIN' || userData.data.user.role === 'SUPER_ADMIN') {
    return <Outlet />;
  } else {
    return (
        // TODO
    );
  }
}

export default Restricted;
