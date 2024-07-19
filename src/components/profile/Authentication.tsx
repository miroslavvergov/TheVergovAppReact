import React from 'react'
import { userAPI } from '../../services/UserService';

const Authentication = () => {

  const {
    data: user,
    error,
    isSuccess,
    isLoading,
    refetch,
  } = userAPI.useEnableMfaMutation();

  const [
    enableMfa,
    {
      data: qrData,
      isLoading: enableLoading,
      isSuccess: qrCodeSuccess
    },
  ] = userAPI.useDisableMfaMutation();

  const toggleMfa = async () => {
    user.data.user.mfa ? await disableMfa() : enableMfa();
  }

  const onUpdateRole = async (role: Role) => updateRole(role);

  return (
    // TODO 
    <div>Authentication</div>
  )
}

export default Authentication