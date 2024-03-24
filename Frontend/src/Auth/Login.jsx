import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  const [values,setValues]=useState({
    email:'',
    password:''
  });


  return (
    <div>
      <h2>Kycuni ne llogarine tuaj</h2>
      <form >
        <label htmlFor="email">Email :</label>
        <input type="email"
        placeholder='Shkruani emailin tuaj ...'
        name='email' />
        <label htmlFor="password">Password :</label>
        <input type="password"
        placeholder='Fjalekalimi'
        name='password' />
      </form>
      <Link
      to="/register">
        Resgjistrohu
      </Link>
    </div>
  )
}

export default Login