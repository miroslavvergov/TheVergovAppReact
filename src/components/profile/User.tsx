import React from "react";
import { userAPI } from "../../services/UserService";

const User = () => {
  // Ref to the input element for selecting an image file
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Fetching user data using a query hook from RTK Query
  const {
    data: userData,
    error,
    isSuccess,
    isLoading,
    refetch,
  } = userAPI.useFetchUserQuery();

  // Mutation hook for updating the user's profile photo
  const [
    updatePhoto,
    {
      data: photoData,
      error: photoError,
      isLoading: photoLoading,
      isSuccess: photoSuccess,
    },
  ] = userAPI.useUpdatePhotoMutation();

  // Function to trigger file selection dialog
  const selectImage = () => inputRef.current?.click();

  // Function to handle photo upload
  const uploadPhoto = async (file: File) => {
    if (file) {
      const form = new FormData();
      form.append("userId", userData?.data.user.userId); // Append user ID to the form data
      form.append("file", file, file.name); // Append the selected file to the form data
      await updatePhoto(form); // Call the API to update the photo
    }
  };

  return (
    // TODO: Implement the UI for displaying and updating user profile photo
    <div>User</div> // Placeholder div to be replaced with actual content
  );
};

export default User;
