import './App.css'
import {ToastContainer} from 'react-toastify'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Home from './Home'
import Dashboard from './Dashboard'
import Error from './Error/Error'
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
import Sherbimet from './Main/Sherbimet'
import Team from './Main/Team'
import AboutUs from './Main/AboutUs'
import Dhomat from './Main/Dhomat'
import Review from './Main/Review'
import GuestReview from './GuestReview'
//import ImportExcel from './MenaxhoFloors/ImportFloors'
import ImportFloors from './MenaxhoFloors/ImportFloors'
import ImportFromExcel from './MenaxhoRoom/ImportFromExcel'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import Booking from './Main/Booking'
import Success from './Main/Success'
import Orders from './Transactions/Orders'
import ResetPassword from './ForgotPassword/ResetPassword'
import MyCalendar from './Schedule/MyCalendar'
import MyOrders from './Transactions/MyOrders'
import ImportServicesJson from './Service/ImportServicesJson'
import UserProfile from './Profile/UserProfile'
import EditUserProfile from './Profile/EditUserProfile'
//import Employee from './Employee/Employee'

function App() {

  const [role,setRole]=useState('');

  useEffect(()=>{
    const userRole=window.localStorage.getItem('role');
    if(userRole){
      setRole(userRole)
    }
  },[]);

  return (
    <BrowserRouter>
    <ToastContainer/>
     <ChatIcon/>
    <Routes>
      <Route path='/' element={<Home/>}>
        {role === 'admin' && (
          <>
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
        <Route path='/importFloors' element={<ImportFloors/>}></Route>

        <Route path='/hall-types' element={<HallTypes/>}></Route>
        <Route path='/insertHallTypes' element={<ShtoHallTypes/>}></Route>
        <Route path='/updateHallTypes/:id' element={<UpdateHallTypes/>}></Route>
        
        <Route path='/menaxhoRoomT' element={<MenaxhoRoomT/>}></Route>
        <Route path='/shtoRoomT' element={<InsertRoomT/>}></Route>
        <Route path='/updateRoomT/:id' element={<UpdateRoomT/>}></Route>

        <Route path='/menaxhoRoom' element={<MenaxhoRoom/>}></Route>
        <Route path='/shtoRoom' element={<InsertRoom/>}></Route>
        <Route path='/updateRoom/:id' element={<UpdateRoom/>}></Route>
        <Route path='/shtoExcelFile' element={<ImportFromExcel/>}></Route>

        <Route path='/halls' element={<Hall/>}></Route>
        <Route path='/shtoHalls' element={<ShtoHall/>}></Route>
        <Route path='/updateHalls/:id' element={<UpdateHall/>}></Route>

        <Route path='/service' element={<Service/>}></Route>
        <Route path='/shtoService' element={<ShtoService/>}></Route>
        <Route path='/updateService/:id' element={<UpdateService/>}></Route>
        <Route path='/importServices' element={<ImportServicesJson/>}></Route>

        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/editProfile/:id' element={<EditProfile/>}></Route>

        <Route path='/houseKeppingS' element={<HouseKS/>}></Route>
        <Route path='/insertHouseKeppingS' element={<InsertHouseKS/>}></Route>
        <Route path='/updateHouseKeppingS/:id' element={<UpdateHouseKS/>}></Route>

        <Route path='/houseKeeping' element={<HouseKeeping/>}></Route>
        <Route path='/insertHouseKeeping' element={<InsertHouseKeeping/>}></Route>

        <Route path='/guestReviews' element={<GuestReview/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/calendar' element={<MyCalendar/>}></Route>
        </>
      )}
      </Route>
        {/*<Route path='/employee' element={<Employee/>}></Route> */}
        {role === 'employee' && (
          <>
        <Route path='/profile' element={<ProfilePage/>}></Route>
        <Route path='/editProfile/:id' element={<EditProfile/>}></Route>
        </>
      )}
        {role === 'user' && (
          <>
        <Route path='/serviceUser' element={<Sherbimet/>}></Route>
        <Route path='/team' element={<Team/>}></Route>
        <Route path='/aboutUs' element={<AboutUs/>}></Route>
        <Route path='/rooms' element={<Dhomat/>}></Route>
        <Route path='/review' element={<Review/>}></Route>
        <Route path='/myOrders' element={<MyOrders/>}></Route>
        <Route path={`/book/:roomId`} element={<Booking/>}></Route>
        <Route path='/userProfile' element={<UserProfile/>}></Route>
        <Route path='/editUserProfile/:id' element={<EditUserProfile/>}></Route>
        </>
      )}

       <Route path='/login' element={<LoginRegister/>}></Route>
       <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
       <Route path='/reset-password/:token' element={<ResetPassword />}></Route>
       <Route path='/success' element={<Success/>}></Route>
      <Route path='*' element={<Error/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
