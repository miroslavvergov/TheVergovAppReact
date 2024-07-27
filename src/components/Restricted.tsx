import { userAPI } from '../services/UserService';
import { Link, Outlet } from 'react-router-dom';

const Restricted = () => {
  const { data: userData, error, isLoading, refetch } = userAPI.useFetchUserQuery(undefined, { refetchOnMountOrArgChange: true });

  if (isLoading || !userData) {
    return (
      <div className="container py-5" style={{ marginTop: '100px' }}>
        <div className="row">
          <div className="col text-center">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    )
  }
  if (userData.data.user.role === 'ADMIN' || userData.data.user.role === 'SUPER_ADMIN') {
    return <Outlet />
  } else {
    return (
      <div className="container py-5" style={{ marginTop: '100px' }}>
        <div className="row">
          <div className="col-md-2 text-center">
            <p>
              <i className="bi bi-exclamation-octagon text-warning" style={{ fontSize: '50px' }}></i><br />
              Status Code: 403
            </p>
          </div>
          <div className="col-md-10">
            <h3>ACCESS DENIED</h3>
            <p>Access to this page is denied due to lack of permissions.</p>
            <Link to={'/'} className="btn btn-primary">Go Back To Home</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Restricted;