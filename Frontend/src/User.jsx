import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import './frontend.css';
import img from '../src/assets/HoteliAI.jpg'

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
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="hotel-description">
        <div className="description-text">
          <h2>Rreth Hotelit Tonë</h2>
          <p>
            Hoteli ynë ofron shërbime të jashtëzakonshme dhe akomodime të shkëlqyera për të gjithë vizitorët tanë.
            Me një vendndodhje të përsosur dhe stafin tonë miqësor, ne sigurohemi që qëndrimi juaj të jetë sa më i këndshëm.
          </p>
        </div>
        <div className="description-image">
          <img src={img} alt="Hotel Image" />
        </div>
      </div>
      <div className="hotel-services">
        <h2>Shërbimet Tona</h2>
        <ul className="service-list">
          {services.map(service => (
            <li key={service.id}>
              <h3>{service.title}</h3>
              <p>Tipi i dhomës: {service.roomType}</p>
              <p>Çmimi: {service.price} €</p>
            </li>
          ))}
        </ul>
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
            </li>
          ))}
        </ul>
      </div>
      <div className="hotel-staff">
        <h2>Team</h2>
        <ul className="staff-list">
          {punetori.map(member => (
            <li key={member.id}>
              <h3>{member.name}</h3>
              <img src={`http://localhost:3002/images/${member.img_url}`} alt={`${member.name}`} className="staff-image"/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default User;
