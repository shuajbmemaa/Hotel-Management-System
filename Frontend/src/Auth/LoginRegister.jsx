import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './form.css';
import Cookies from 'js-cookie';
import axios from 'axios';

const LoginRegister = () => {
    const [isSignIn, setIsSignIn] = useState(true); 
    const [signInValues, setSignInValues] = useState({
        userOrEmail: '',
        password: ''
    });
    const [signUpValues, setSignUpValues] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    });

    const handleSignInInput = (event) => {
        setSignInValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleSignUpInput = (event) => {
        setSignUpValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSignIn) {
          
            axios.post('http://localhost:3002/login', signInValues)
                .then(res => {
                    if (res.data.Login) {
                        console.log(res.data);
                        window.localStorage.setItem("userId", res.data.userId);
                        window.localStorage.setItem("role",res.data.role)
                        Cookies.set("accessToken", res.data.accessToken);
                        Cookies.set("refreshToken", res.data.refreshToken)
                        navigate('/');
                    } else {
                        toast.error("Incorrect username/email or password.");
                    }
                })
                .catch(err => console.error(err));
        } else {
            const nameRegex = /^[A-Za-z\s'-]{3,50}$/;
            if (!signUpValues.name || !nameRegex.test(signUpValues.name)) {
                toast.error('Ju lutem shkruani një emër të vlefshëm (të paktën 3 karaktere dhe pa numra)!');
                return;
            }
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!signUpValues.email || !emailRegex.test(signUpValues.email)) {
                toast.error('Ju lutem shkruani një email të vlefshëm!');
                return;
            }
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
            if (!signUpValues.password || !passwordRegex.test(signUpValues.password)) {
                toast.error('Fjalëkalimi duhet të ketë të paktën 6 karaktere,1 shkronjë të madhe,1 shkronjë të vogël,1 simbol (@$!%*?&) dhe 1 numër!');
                return;
            }
         
            axios.post('http://localhost:3002/register', signUpValues)
                .then(res => {
                    console.log(res);
                    navigate('/')
                    toast.success('Jeni regjistruar me sukses! Ju lutem kycuni per te eksploruar <3')
                })
                .catch(err => {
                    if (err) {
                        toast.error("Emaili eshte ne perdorim tanime!Ju lutem perdor nje email tjeter");
                    } else {
                        console.error(err);
                        toast.error('Dicka shkoi keq ne regjistrim.');
                    }
                });
        }
    }

    const toggleForm = () => {
        setIsSignIn(prev => !prev);
    }

    return (
        <div className={`container ${isSignIn ? '' : 'active'}`}>
            <div className="form-container sign-up">
                <form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <input type="text" placeholder="Username" name="name" value={signUpValues.name} onChange={handleSignUpInput} />
                    <input type="email" placeholder="Email" name="email" value={signUpValues.email} onChange={handleSignUpInput} />
                    <input type="password" placeholder="Password" name="password" value={signUpValues.password} onChange={handleSignUpInput} />
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <input type="text" placeholder="Username or Email" name="userOrEmail" value={signInValues.userOrEmail} onChange={handleSignInInput} />
                    <input type="password" placeholder="Password" name="password" value={signInValues.password} onChange={handleSignInInput} />
                    <a href="#">Forget Your Password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features</p>
                        <button onClick={toggleForm}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all of site features</p>
                        <button onClick={toggleForm}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;
