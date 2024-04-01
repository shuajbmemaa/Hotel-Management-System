import axios from 'axios'
import React from 'react'

const Admin = () => {
  const handleLogout=()=>{
    axios.get('http://localhost:3002/logout')
    .then(res =>{
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