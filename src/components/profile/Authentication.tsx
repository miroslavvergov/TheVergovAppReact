import { userAPI } from '../../services/UserService';
import Loader from './Loader';

const Authentication = () => {
  const { data: user, error, isSuccess, isLoading, refetch } = userAPI.useFetchUserQuery();
  const [enableMfa, { data: qrData, isLoading: enableLoading, isSuccess: qrCodeSuccess }] = userAPI.useEnableMfaMutation();
  const [disableMfa, { isLoading: disableLoading }] = userAPI.useDisableMfaMutation();

  const toggleMfa = async () => {
    user.data.user.mfa ? await disableMfa() : enableMfa();
  };

  return (
    <>
      {isLoading && <Loader /> }
      {isSuccess && <>
        <h4 className="mb-3">Authentication(MFA) <span className={`badge pill text-light text-bg-${user?.data.user.mfa ? 'success' : 'warning'} fs-6`}>{user?.data.user.mfa ? 'Enabled' : 'Disabled'}</span></h4>
        <hr />
        <div className="row g-3">
          <div className="col-12 mb-2">
            <label className="form-label d-block mb-1">Multi Factor Authentication</label>
            <p className="small text-muted">Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in.</p>
            <button onClick={toggleMfa} disabled={isLoading || disableLoading || enableLoading} className={`btn border btn-${user?.data.user.mfa ? 'light' : 'primary'} mt-2`} type="button">{user?.data.user.mfa ? 'Disable' : 'Enable'} Two-Factor Authentication
              {(isLoading || disableLoading || enableLoading) && <div className={`spinner-border text-${user?.data.user.mfa ? 'primary' : 'light'}`} role="status" style={{ height: '20px', width: '20px', marginLeft: '10px' }}></div>}
            </button>
            {(user?.data.user.mfa) && <div className="accordion mt-3 mb-3" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    QR Code to scan
                  </button>
                </h2>
                <div id="collapseOne" className={`accordion-collapse collapse ${qrCodeSuccess ? 'show': undefined}`} data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <p className="small text-muted fw-semibold fs-6 text">Use an authenticator application on your phone to scan this QR Code to set up MFA Authentication.</p>
                    <hr className="my-4" />
                    <img src={user?.data.user.qrCodeImageUri} className="rounded mx-auto d-block" alt="QR Code" />
                  </div>
                </div>
              </div>
            </div>}
          </div>
          <hr className="my-2" />
          <div className="col-12">
            <label className="form-label">Last Login Session:</label>
            <ul className="list-group list-group-sm">
              <li className="list-group-item">
                <div>
                  <small className="text-muted">Your last session is when you last logged in</small>
                  <h6 className="mb-0 mt-2">{new Intl.DateTimeFormat('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(user?.data.user.lastLogin))}</h6>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>}
    </>
  )
}

export default Authentication;