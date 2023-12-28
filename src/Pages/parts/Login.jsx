import React from 'react'
import image from '../assets/news.png'
import { Outlet } from 'react-router-dom'

const Login = () => {
  return (
    <div className="outer-box">
      <div className="main-container">
        <div className="wl-container">
          <div className="image">
            <img src={image} alt="" />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Login
