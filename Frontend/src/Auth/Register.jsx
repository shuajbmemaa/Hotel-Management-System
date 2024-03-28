import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link ,useNavigate} from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './form.css'

const Register = () => {
    const[values,setValues]=useState({
        name:'',
        email:'',
        password:'',
        role:'user'
    })

    const navigate = useNavigate();

    const handleInput=(event)=>{
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }

    
   

    //swipe effect
    

        const handleSubmit=async(event) =>{
          event.preventDefault();
         const nameRegex =  /^[A-Za-z\s'-]{3,50}$/;
          if (!values.name || !nameRegex.test(values.name)) {
            toast.error('Ju lutem shkruani një emër të vlefshëm (të paktën 3 karaktere dhe pa numra)!', {
              position: toast.POSITION.TOP_RIGHT
            });
            return;
          }
          const emailRegex = /^\S+@\S+\.\S+$/;
          if (!values.email || !emailRegex.test(values.email)) {
            toast.error('Ju lutem shkruani një email të vlefshëm!', { position: toast.POSITION.TOP_RIGHT });
            return;
          }
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
          if (!values.password || !passwordRegex.test(values.password)) {
            toast.error('Fjalëkalimi duhet të ketë të paktën 6 karaktere,1 shkronjë të madhe,1 shkronjë të vogël,1 simbol (@$!%*?&) dhe 1 numër!', { position: toast.POSITION.TOP_RIGHT });
            return;
          }
          
        
          axios.post('http://localhost:3002/register',values)
          .then(res => {
              console.log(res);
              navigate('/login')
              toast.success('Jeni regjistruar me sukses! Ju lutem kycuni per te eksploruar <3')
          }) 
          .catch(err => console.log(err))
      }
    

    

    return (
      <div className="container" id="container">

      <div class="form-container sign-in">
          <form onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <input type="text"
               placeholder="Name"
               name="name"
               value={values.name}
               onChange={handleInput}
                />
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
              <button  type="submit" >Sign Up</button>
          </form>
      </div>
      <div class="toggle-container">
          <div class="toggle">
          <div class="toggle-panel toggle-right">
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please log in with your personal info</p>
                  <Link to="/login" className="hidden button">Sign In</Link>
                  {/* <button class="hidden" id="login">Sign In</button> */}
              </div>
          </div>
      </div>
  </div>
 
      );

      
    };

    

export default Register