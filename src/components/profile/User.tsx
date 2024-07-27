import React from 'react'
import { userAPI } from '../../services/UserService';
import { NavLink, Outlet } from 'react-router-dom';

const User = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { data: userData, error, isSuccess, isLoading, refetch } = userAPI.useFetchUserQuery();
  const [updatePhoto, { data: photoData, error: photoError, isLoading: photoLoading, isSuccess: photoSuccess }] = userAPI.useUpdatePhotoMutation();

  const selectImage = () => inputRef.current.click();

  const uploadPhoto = async (file: File) => {
    if(file) {
      const form = new FormData();
      form.append('userId', userData.data.user.userId);
      form.append('file', file, file.name);
      await updatePhoto(form);
    }
  };

  return (
    <div className="container main">
      <div className="row">
        {isLoading &&
          <div className="col-lg-3 col-md-5 col-sm-12">
            <div className="card text-center mb-3">
              <div className="card-body">
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                </p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                  <span className="placeholder col-12"></span>
                </p>
              </div>
            </div>
          </div>
        }

        {isSuccess && <>
          <div className="col-lg-3 col-md-5 col-sm-12">
            <div className="card text-center mb-3">
              <div className="card-body">
                <img src={userData?.data.user.imageUrl} className="img-fluid mx-auto user-photo" alt={userData.data.user.firstName} />
                <a onClick={selectImage} className="btn btn-light border btn-sm card-text mb-2 opacity-80" style={{ fontSize: '12px' }}>
                  {!photoLoading && <i className="bi bi-camera-fill" style={{ marginRight: '5px' }}></i>}
                  {photoLoading && <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                    <span role="status">{photoLoading ? 'Changing...' : 'Change Photo'}</span>
                </a>
                <p className="h6">{userData?.data.user.firstName} {userData?.data.user.lastName}</p>
                <p className="card-text">
                  <i className="bi bi-shield-exclamation">
                    <span className="badge bg-primary-subtle text-primary-emphasis pill fst-normal">
                      ROLE_{userData?.data.user.role}
                    </span>
                  </i>
                </p>
              </div>
            </div>
            <div className="card mb-3">
              <div className="card-body">
                <ul className="nav nav-pills nav-justified-start flex-column">
                  <li className="nav-item mb-2 ">
                    <NavLink to="/user/profile" end className="nav-link fs-6 text fw-semibold">
                      <i className="bi bi-person-circle me-2"></i>
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="password" end className="nav-link fs-6 text fw-semibold">
                      <i className="bi bi-key me-2"></i>
                      Password
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="settings" end className="nav-link fs-6 text fw-semibold">
                      <i className="bi bi-gear-wide-connected me-2"></i>
                      Settings
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="authorization" end className="nav-link fs-6 text fw-semibold">
                      <i className="bi bi-shield-exclamation me-2"></i>
                      Authorization
                    </NavLink>
                  </li>
                  <li className="nav-item mb-2">
                    <NavLink to="authentication" end className="nav-link fs-6 text fw-semibold">
                      <i className="bi bi-lock-fill me-2"></i>
                      Authentication (MFA)
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>}
        <div className="col-lg-9 col-md-7 col-sm-12">
          <div className="card">
            <div className="card-body">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <input type='file' ref={inputRef} onChange={(event) => uploadPhoto(event.target.files[0])} name='file' accept='image/*' />
      </div>
    </div>
  )
}

export default User;