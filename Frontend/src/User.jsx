import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import './frontend.css';
import { Link } from 'react-router-dom';
import HotelDescription from './HotelViews/HotelDescription';
import HotelServices from './HotelViews/HotelServices';
import HotelStaff from './HotelViews/HotelStaff';
import HotelRoomTypes from './HotelViews/HotelRoomTypes';
import Navbar from './Navbar';

const User = () => {
  const [services, setServices] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/getServices')
      .then(res => {
        if (res.data.Status === "Success") {
          setServices(res.data.Result);
        } else {
          console.error("Error loading services");
        }
      })
      .catch(err => console.log(err));

    axios.get('http://localhost:3002/getRoomT')
      .then(res => {
        if (res.data.Status === "Success") {
          setRoomTypes(res.data.Result);
        } else {
          console.error("Error loading room types");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const [punetori,setPunetori]=useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/getEmployee')
        .then(res => {
            if (res.data.Status === "Success") {
                setPunetori(res.data.Result);
            } else {
                toast.error("Error");
            }
        })
        .catch(err => console.log(err));
}, []);

  const handleLogout = () => {
    axios.get('http://localhost:3002/logout')
      .then(res => {
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("role");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <HotelDescription />
      <HotelServices services={services} />
      <HotelRoomTypes roomTypes={roomTypes} />
      <HotelStaff staff={punetori} />
    </div>
  );
};

export default User;
