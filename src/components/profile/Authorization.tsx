import React from 'react'
import { userAPI } from '../../services/UserService';
import { Role } from '../../models/IUser';

const Authorization = () => {

  const {
    data: user,
    error,
    isSuccess,
    isLoading,
    refetch,
  } = userAPI.useFetchUserQuery();

  const [
    updateRole,
    {
      data: roleData,
      isLoading: updateLoading,
      isSuccess: updateSuccess
    },
  ] = userAPI.useUpdateRoleMutation();

  const onUpdateRole = async (role: Role) => updateRole(role);

  return (
    // TODO
    <div>Authorization</div>
  )
}

export default Authorization