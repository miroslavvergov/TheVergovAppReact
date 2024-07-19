import React from "react";
import { userAPI } from "../../services/UserService";

const User = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const {
    data: userData,
    error,
    isSuccess,
    isLoading,
    refetch,
  } = userAPI.useFetchUserQuery();
  const [
    updatePhoto,
    {
      data: photoData,
      error: photoError,
      isLoading: photoLoading,
      isSuccess: photoSuccess,
    },
  ] = userAPI.useUpdatePhotoMutation();

  const selectImage = () => inputRef.current.click();

  const uploadPhoto = async (file: File) => {
    if (file) {
      const form = new FormData();
      form.append("userId", userData.data.user.userId);
      form.append("file", file, file.name);
      await updatePhoto(form);
      // call API
    }
  };

  return (
    // TODO
    <div>User</div>
  );
};

export default User;
