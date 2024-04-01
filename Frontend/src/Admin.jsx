import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'

const Admin = () => {
  const handleLogout=()=>{
    axios.get('http://localhost:3002/logout')
    .then(res =>{
      window.localStorage.removeItem("userId")
     // window.localStorage.removeItem("accessToken")
      //window.localStorage.removeItem("refreshToken")
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
        window.location.reload();
    })
    .catch(err=>console.log(err))
}
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Admin