import React,{ useEffect } from 'react'
import "./App.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/layout/Navbar'
import { useSelector } from 'react-redux'
import Home from './components/Home'
import { Routes,Route } from 'react-router-dom'
import Register from './components/user/Register'
import Login from './components/user/Login'



const App = () => {
  const { isNight,user } = useSelector((state) => state.users)
  useEffect(() => {
    if (isNight) {
      document.body.className = "dark-mode"
    } else {
      document.body.className = "light-mode"
    }
  },[isNight])
  return (
    <>
      <div className={isNight ? 'app-dark' : 'app-light'}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="https://todo-app-9us2.onrender.com/register" element={<Register />} />
          <Route path='https://todo-app-9us2.onrender.com/login' element={<Login />} />
        </Routes>
      </div >
      <ToastContainer />
    </>
  )
}



export default App