import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer';
import './resetpassword.css'
import ResetPasswordd from './resetpassword.jpg'


const ResetPassword = () => {
  const { token } = useParams();
  const decodedToken = Buffer.from(token, 'base64').toString('ascii');
  console.log("Token",token);
  
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Fjalekalimet nuk perputhen');
      return;
    }
    try {
      await axios.post(`http://localhost:3002/reset-password/${decodedToken}`, { password });
      navigate('/login');
      toast.success('Fjalekalimi u resetua me sukses');
    } catch (error) {
      toast.error('Gabim gjate resetimit te fjalekalimit');
      console.log(error);
      
    }
  };

  return (
    <div className="ctn">
      <div className="img-container">
                <img src={ResetPasswordd} alt="Illustration" />
      <form onSubmit={handleSubmit} className="formm">
        <h2 className="titlee">Password Reset</h2>
        <p className="subtitlee">Enter your new password for your account.</p>
        <label className="labell">New Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <label className="labell">Confirm New Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="button">Change my password</button>
      </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
