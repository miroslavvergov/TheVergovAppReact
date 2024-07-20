import { ToastOptions, toast } from "react-toastify";

// Configuration for toast notifications
const toastConfig: ToastOptions = {
    position: 'top-right', // Position of the toast notification on the screen
    autoClose: 1500,       // Duration in milliseconds before the toast auto-closes
    hideProgressBar: true, // Hide the progress bar (default is false)
    closeOnClick: true,   // Allow the toast to be dismissed by clicking it
    pauseOnHover: true,   // Pause the auto-close timer when the user hovers over the toast
    draggable: true,      // Allow the toast to be draggable
    progress: undefined,  // Progress bar is not used
    theme: 'light'        // Theme of the toast (can be 'light' or 'dark')
};

// Function to display an info toast notification
export const toastInfo = (message: string) => toast.info(message, toastConfig);

// Function to display a success toast notification
export const toastSuccess = (message: string) => toast.success(message, toastConfig);

// Function to display a warning toast notification
export const toastWarning = (message: string) => toast.warn(message, toastConfig);

// Function to display an error toast notification
export const toastError = (message: string) => toast.error(message, toastConfig);
