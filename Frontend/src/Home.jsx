import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Admin from './Admin';
import User from './User';

const Home = () => {
  const [role,setRole]=useState('');
  const navigate=useNavigate();

  axios.defaults.withCredentials=true;

  useEffect(()=>{
    axios.get('http://localhost:3002')
    .then(res=>{
      if(res.data.valid){
        setRole(res.data.role)
      }else{
        navigate('/login')
      }
    })
    .catch(err=>console.log(err))
  })
  return (
    <div>
      {role === "admin" && <Admin/>}
      {role === "user" && <User/>}
    </div>
  )
}

export default Home