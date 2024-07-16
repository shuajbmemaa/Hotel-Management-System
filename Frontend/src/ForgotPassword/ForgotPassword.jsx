import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import ForgotPasswordd from './forgotpassword.jpg'
import './forgotpassword.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post('http://localhost:3002/forgot-password', { email });
        toast.success('Email-i për resetimin e fjalëkalimit u dërgua', { position: toast.POSITION.TOP_RIGHT });
      } catch (error) {
        toast.error('Gabim gjatë dërgimit të email-it', { position: toast.POSITION.TOP_RIGHT });
        console.log(error);
      }
    };

    return (
      <div className="container-2">
            <div className="image-container">
                <img src={ForgotPasswordd} alt="Illustration" />
            </div>
            <div className="form-container1">
                <h2>Forgot Password</h2>
                <p>Enter your email and we'll send you a link to reset your password.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
                <Link to='/login'>Back to login</Link>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;
