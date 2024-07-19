import React from 'react'
import { userAPI } from '../../services/UserService';
import { AccountSettings } from '../../enum/account.settings';

const Settings = () => {

  const {
    data: user,
    error,
    isSuccess,
    isLoading,
    refetch,
  } = userAPI.useFetchUserQuery();

  const [toggleAccountExpired] = userAPI.useToggleAccountExpiredMutation();
  const [toggleAccountLocked] = userAPI.useToggleAccountLockedMutation();
  const [toggleAccountEnabled] = userAPI.useToggleAccountEnabledMutation();
  const [toggleCredentialsExpired] = userAPI.useToggleCredentialsExpiredMutation();

  const toggleSettings = async (settings: AccountSettings) => {
    switch (settings) {
      case AccountSettings.EXPIRED:
        await toggleAccountExpired();
        break;
      case AccountSettings.LOCKED:
        await toggleAccountLocked();
        break;
      case AccountSettings.ENABLED:
        await toggleAccountEnabled();
        break;
      case AccountSettings.CREDENTIALS_EXPIRED:
        await toggleCredentialsExpired();
        break;
    }
  }

  return (
    // TODO

    <div>Settings</div>
  )
}

export default Settings