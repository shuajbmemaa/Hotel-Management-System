import './App.css'
import {ToastContainer} from 'react-toastify'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React from 'react'
import Home from './Home'
import Dashboard from './Dashboard'
import Error from './Error'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginRegister from './Auth/LoginRegister'
import MenaxhoUseret from './MenaxhoUseret/MenaxhoUseret'
import UpdateUseret from './MenaxhoUseret/UpdateUseret'
import InsertUser from './MenaxhoUseret/InsertUser'
import MenaxhoAmenties from './MenaxhoAmenties/MenaxhoAmenties'
import InsertAmenties from './MenaxhoAmenties/InsertAmenties'
import UpdateAmenties from './MenaxhoAmenties/UpdateAmenties'

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}>
        <Route path='' element={<Dashboard/>}></Route>
        <Route path='/menaxhoUseret' element={<MenaxhoUseret/>}></Route>
        <Route path='/krijoLlogari' element={<InsertUser/>}></Route>
        <Route path='/updateUseret/:id' element={<UpdateUseret/>}></Route>
        <Route path='/menaxhoAmenties' element={<MenaxhoAmenties/>}></Route>
        <Route path='/shtoAmenties' element={<InsertAmenties/>}></Route>
        <Route path='/updateAmenties/:id' element={<UpdateAmenties/>}></Route>
      </Route>
       <Route path='/login' element={<LoginRegister/>}></Route> 
      <Route path='*' element={<Error/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
