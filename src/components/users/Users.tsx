import { userAPI } from "../../services/UserService"

const Users = () => {
  const { data: users, error, isLoading, isSuccess } = userAPI.useGetUsersQuery();
  return (
    // TODO
    <div>Users</div>
  )
}

export default Users