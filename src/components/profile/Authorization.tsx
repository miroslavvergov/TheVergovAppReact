import { userAPI } from '../../services/UserService';
import { Role } from '../../models/IUser';
import Loader from './Loader';

const Authorization = () => {
  const { data: user, error, isSuccess, isLoading, refetch } = userAPI.useFetchUserQuery();
  const [updateRole, { data: roleData, isLoading: updateLoading, isSuccess: updateSuccess }] = userAPI.useUpdateRoleMutation();

  const onUpdateRole = async (role: Role) => await updateRole(role);

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess && <>
        <h4 className="mb-3">Authorization</h4>
        <hr />
        <form className="needs-validation">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">Authorization (ROLE_{user?.data.user.role})</label>
              <select defaultValue={user?.data.user.role} className="form-select" onChange={(event) => onUpdateRole({ role: event.target.value })} disabled={user?.data.user.role === 'USER' || updateLoading} >
                <option value={'USER'} key={'ROLE_USER'}>ROLE_USER</option>
                <option value={'ADMIN'} key={'ROLE_ADMIN'}>ROLE_ADMIN</option>
                <option value={'SUPER_ADMIN'} key={'ROLE_SUPER_ADMIN'}>ROLE_SUPER_ADMIN</option>
                <option value={'MANAGER'} key={'ROLE_MANAGER'}>ROLE_MANAGER</option>
                <option value={'PROFESSOR'} key={'ROLE_PROFESSOR'}>ROLE_PROFESSOR</option>
              </select>
              <div className="small text-muted mt-3">Role gives permissions to control actions users are allowed or disallowed to take.</div>
            </div>
            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">Permissions</label>
              <ul className="list-group">
                {user?.data.user.authorities.split(',').map(auth =>
                  <li key={auth} className="list-group-item list-group-item-light d-flex justify-content-between align-items-center">
                    {auth.split(':')[0]}
                    <span className={`badge 
                      ${auth.split(':')[1] === 'create' ? 'bg-primary' : undefined}
                      ${auth.split(':')[1] === 'read' ? 'bg-success' : undefined}
                      ${auth.split(':')[1] === 'update' ? 'bg-warning' : undefined}
                      ${auth.split(':')[1] === 'delete' ? 'bg-danger' : undefined}
                      pill`
                    }>
                      {auth.split(':')[1]}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <hr className="my-4" />
          <div className="col">
          </div>
        </form>
      </>}
    </>
  )
}

export default Authorization;