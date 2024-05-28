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
import MenaxhoFloors from './MenaxhoFloors/MenaxhoFloors'
import InsertFloors from './MenaxhoFloors/InsertFloors'
import UpdateFloors from './MenaxhoFloors/UpdateFloors'
import HallTypes from './Hall_Types/HallTypes'
import ShtoHallTypes from './Hall_Types/ShtoHallTypes'
import UpdateHallTypes from './Hall_Types/UpdateHallTypes'
import MenaxhoRoomT from './MenaxhoRoomTypes/MenaxhoRoomT'
import MenaxhoRoom from './MenaxhoRoom/MenaxhoRoom'
import InsertRoom from './MenaxhoRoom/InsertRoom'
import InsertRoomT from './MenaxhoRoomTypes/InsertRoomT'
import UpdateRoomT from './MenaxhoRoomTypes/UpdateRoomT'
import UpdateRoom from './MenaxhoRoom/UpdateRoom'
import Hall from './Hall/Hall'
import ShtoHall from './Hall/ShtoHall'
import UpdateHall from './Hall/UpdateHall'
import Service from './Service/Service'
import ProfilePage from './Profile/Profile'
import ShtoService from './Service/ShtoService'
import EditProfile from './Profile/EditProfile'
import UpdateService from './Service/UpdateService'
import ChatIcon from './Chat/ChatIcon'
import HouseKS from './HousekeepingStatus/HouseKS'
import InsertHouseKS from './HousekeepingStatus/InsertHouseKS'
import UpdateHouseKS from './HousekeepingStatus/UpdateHouseKS'
import HouseKeeping from './HouseKeeping/HouseKeeping'
import InsertHouseKeeping from './HouseKeeping/InsertHouseKeeping'
import Employee from './Employee/Employee'

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
     <ChatIcon/>
    <Routes>
      <Route path='/' element={<Home/>}>
        <Route path='' element={<Dashboard/>}></Route>
        <Route path='/menaxhoUseret' element={<MenaxhoUseret/>}></Route>
        <Route path='/krijoLlogari' element={<InsertUser/>}></Route>
        <Route path='/updateUseret/:id' element={<UpdateUseret/>}></Route>

        <Route path='/menaxhoAmenties' element={<MenaxhoAmenties/>}></Route>
        <Route path='/shtoAmenties' element={<InsertAmenties/>}></Route>
        <Route path='/updateAmenties/:id' element={<UpdateAmenties/>}></Route>

        <Route path='/menaxhoFloors' element={<MenaxhoFloors/>}></Route>
        <Route path='/shtoFloors' element={<InsertFloors/>}></Route>
        <Route path='/updateFloors/:id' element={<UpdateFloors/>}></Route>

        <Route path='/hall-types' element={<HallTypes/>}></Route>
        <Route path='/insertHallTypes' element={<ShtoHallTypes/>}></Route>
        <Route path='/updateHallTypes/:id' element={<UpdateHallTypes/>}></Route>
        
        <Route path='/menaxhoRoomT' element={<MenaxhoRoomT/>}></Route>
        <Route path='/shtoRoomT' element={<InsertRoomT/>}></Route>
        <Route path='/updateRoomT/:id' element={<UpdateRoomT/>}></Route>

        <Route path='/menaxhoRoom' element={<MenaxhoRoom/>}></Route>
        <Route path='/shtoRoom' element={<InsertRoom/>}></Route>
        <Route path='/updateRoom/:id' element={<UpdateRoom/>}></Route>

        <Route path='/halls' element={<Hall/>}></Route>
        <Route path='/shtoHalls' element={<ShtoHall/>}></Route>
        <Route path='/updateHalls/:id' element={<UpdateHall/>}></Route>

        <Route path='/service' element={<Service/>}></Route>
        <Route path='/shtoService' element={<ShtoService/>}></Route>
        <Route path='/updateService/:id' element={<UpdateService/>}></Route>


        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/editProfile/:id' element={<EditProfile/>}></Route>

        <Route path='/houseKeppingS' element={<HouseKS/>}></Route>
        <Route path='/insertHouseKeppingS' element={<InsertHouseKS/>}></Route>
        <Route path='/updateHouseKeppingS/:id' element={<UpdateHouseKS/>}></Route>

        <Route path='/houseKeeping' element={<HouseKeeping/>}></Route>
        <Route path='/insertHouseKeeping' element={<InsertHouseKeeping/>}></Route>


      </Route>
      <Route path='/employee' element={<Employee/>}></Route> 
      
        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/editProfile/:id' element={<EditProfile/>}></Route>


       <Route path='/login' element={<LoginRegister/>}></Route> 
      <Route path='*' element={<Error/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
