import React from 'react'
import Navbar from '../Layout/Navbar'
import axios from 'axios';

const Team = () => {

  const handleLogout = () => {
    axios.get('http://localhost:3002/logout')
      .then(res => {
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("role");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.reload();
      })
      .catch(err => console.log(err));
  };
  return (
    <div>
      <Navbar onLogout={handleLogout}/>
    </div>
  )
}

export default Team