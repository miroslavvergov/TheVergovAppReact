// Importing necessary hooks and assets from React and other libraries
import { useState } from 'react'; // Importing the useState hook from React for state management
import reactLogo from './assets/react.svg'; // Importing React logo image
import viteLogo from '/vite.svg'; // Importing Vite logo image
import './App.css'; // Importing the main CSS file for the App component
import { Outlet } from 'react-router-dom'; // Importing Outlet component from react-router-dom for nested routing
import { Slide, ToastContainer } from 'react-toastify'; // Importing Slide transition and ToastContainer from react-toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Importing default CSS for react-toastify

const App = () => {
  // useState hook to manage the count state, initialized to 0
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Outlet component renders the matched child route elements */}
      <Outlet />
      {/* ToastContainer component to display toast notifications with Slide transition */}
      <ToastContainer transition={Slide} />
    </>
  );
};

// Exporting the App component as default export
export default App;
