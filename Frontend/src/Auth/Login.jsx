import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link ,useNavigate} from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './form.css'

const Login = () => {
    const[values,setValues]=useState({
        email:'',
        password:''
    })

    

    const handleInput=(event)=>{
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }

    useEffect(()=>{
        axios.get('http://localhost:3002')
        .then(res =>{
            if(res.data.valid){
                navigate('/')
            }else{
                navigate('/login')
            }
        })
        .catch(err=>console.log(err))
    },[])
    const navigate=useNavigate();
    axios.defaults.withCredentials=true

   

    //swipe effect
    // useEffect(() => {
    //     const container = document.getElementById('container');
    //     const registerBtn = document.getElementById('register');
    //     const loginBtn = document.getElementById('login');
  
    //     const handleRegisterClick = () => {
    //         container.classList.add("active");
    //     };
  
    //     const handleLoginClick = () => {
    //         container.classList.remove("active");
    //     };
  
    //     registerBtn.addEventListener('click', handleRegisterClick);
    //     loginBtn.addEventListener('click', handleLoginClick);
  
      
    //     return () => {
    //         registerBtn.removeEventListener('click', handleRegisterClick);
    //         loginBtn.removeEventListener('click', handleLoginClick);
    //     };
    // }, []);
  
    
    const handleSubmit=(event) =>{
        event.preventDefault();
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!values.email || !emailRegex.test(values.email)) {
          toast.error('Email i pavlefshëm!', { position: toast.POSITION.TOP_RIGHT });
          return;
        }
 
        
        axios.post('http://localhost:3002/login',values)
        .then(res => {
            if(res.data.Login){
              console.log(res.data);
              window.localStorage.setItem("userId",res.data.userId);
              window.localStorage.setItem("accessToken",res.data.accessToken);
              window.localStorage.setItem("refreshToken",res.data.refreshToken)
                navigate('/');
                
            }else{
                toast.error("Të dhenat nuk janë plotësuar si duhet!",{position:toast.POSITION.TOP_RIGHT})
            }
        })
        .then(err => console.log(err))
    }
  
    

    

    return (
      <div className="container" id="container">

      <div class="form-container sign-in">
          <form onSubmit={handleSubmit}>
              <h1>Sign In</h1>
              <input type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleInput}/>
             <input type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleInput}/>
              <a href="#">Forgot your password?</a>
              <button type="submit" >Sign In</button>
          </form>
      </div>
      <div class="toggle-container">
          <div class="toggle">
         
              <div class="toggle-panel toggle-right">
                  <h1>Hello,Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  {/* <button class="hidden" id="register">Sign Up</button> */}
                  <Link to="/register" className="hidden">Sign Up</Link>

                  

              </div>
          </div>
      </div>
  </div>
 
      );

      
    };

    

export default Login