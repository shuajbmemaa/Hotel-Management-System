import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import '../frontend.css';
import { Link } from 'react-router-dom';

const Dhomat = () => {
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3002/getRoommT')
      .then(res => {
        if (res.data.Status === "Success") {
          setRoomTypes(res.data.Result);
        } else {
          console.error("Error loading room types");
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
      <div className="navbar">
        <h1>Lotus</h1>
        <Link to='/serviceUser'>Sherbimet</Link>
        <Link to='/rooms'>Dhomat</Link>
        <Link to='/team'>Team</Link>
        <Link to='/aboutUs'>About Us</Link>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="hotel-room-types">
        <h2>Llojet e Dhomave</h2>
        <ul className="room-type-list">
          {roomTypes.map(roomType => (
            <li key={roomType.id}>
              <h3>{roomType.title}</h3>
              <span>
        <img src={`http://localhost:3002/images/${roomType.image}`} alt="" className="room-type-image"/>
            </span>
              <p>Short Code: {roomType.short_code}</p>
              <p>Amenties: {roomType.amentie}</p>
              <Link to={`/book/`+roomType.id} className='btn btn-primary btn-sm me-2'>BOOK NOW </Link>
            </li>
          ))}
        </ul>
      </div>
    
    </div>
  );
};

export default Dhomat;
