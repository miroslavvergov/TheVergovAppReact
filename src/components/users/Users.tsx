import { userAPI } from "../../services/UserService"

const Users = () => {
  const { data: users, error, isLoading, isSuccess } = userAPI.useGetUsersQuery();

  if (isLoading) {
    return (
      <div className="container mtb">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <h5 className="header-title pb-3 mt-0">Users</h5>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mtb">
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <h5 className="header-title pb-3 mt-0">Users</h5>
              <div className="table-responsive">
                <table className="table table-striped table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Authorization</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.data.users.map(user =>
                      <tr key={user.id}>
                        <td><img src={user.imageUrl} alt={`Profile photo of ${user.firstName} ${user.lastName}`} className="thumb-sm rounded-circle mr-2" /> {user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.role}</td>
                        <td><span className={`badge ${user.enabled ? 'bg-success' : 'bg-danger'}`}>{user.enabled ? 'Enabled' : 'Disabled'}</span></td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users;