import './App.css'
import {ToastContainer} from 'react-toastify'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React from 'react'
import Home from './Home'
import Dashboard from './Dashboard'
import Register from './Auth/Register'
import Login from './Auth/Login'

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}>
        <Route path='' element={<Dashboard/>}></Route>
      </Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
