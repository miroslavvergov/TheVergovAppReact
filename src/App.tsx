import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Outlet />
      <ToastContainer transition={Slide}/>
    </>
  )
}

export default App
