import { Slide, ToastContainer } from 'react-toastify';
import './App.css';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <Outlet />
      <ToastContainer transition={Slide} />
    </>
  )
};

export default App;