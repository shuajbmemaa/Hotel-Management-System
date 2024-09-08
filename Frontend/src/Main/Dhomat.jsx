import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import '../frontend.css';
import { Link, useNavigate } from 'react-router-dom';
import Slider from './Slider';
import { toast } from 'react-toastify'
import Navbar from '../Layout/Navbar';


const Dhomat = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [checkInDate, setCheckInDate] = useState('');
  const [numberOfNights, setNumberOfNights] = useState(1);
  const [availability, setAvailability] = useState({});
  const navigate=useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCheckInDate(today);

    axios.get('http://localhost:3002/getRoommT')
      .then(res => {
        if (res.data.Status === "Success") {
          setRoomTypes(res.data.Result);
        } else {
          console.error("Error");
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

  const handleCheckAvailability = () => {
    roomTypes.forEach(roomType => {
      axios.post('http://localhost:3002/checkAvailability', {
        id: roomType.id,
        checkInDate,
        numberOfNights
      })
      .then(res => {
        setAvailability(prevAvailability => ({
          ...prevAvailability,
          [roomType.id]: res.data.isAvailable
        }));
      })
      .catch(err => console.log(err));
    });
  };
  

  const handleBookNow = (roomId) => {
    if (!checkInDate) {
      toast.warning("Please select a check-in date");
      return;
    }
   //navigate(`/book/${roomId}?checkindate=${checkInDate}&nights=${numberOfNights}`);
    //<Link to={`/book/${roomId}?checkindate=${checkInDate}&nights=${numberOfNights}`} className='btn btn-primary btn-sm me-2'></Link>

  };

  return (
    <div>
      <Navbar />
      <div className="hero-section">
        <img src="URL_E_FOTOS_SË_PARË" alt="" className="hero-image" />
        <div className="search-availability">
          <label htmlFor="checkInDate">Check In Date</label>
          <input
            type="date"
            id="checkInDate"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
          <label htmlFor="numberOfNights">No. of nights</label>
          <select
            id="numberOfNights"
            value={numberOfNights}
            onChange={(e) => setNumberOfNights(e.target.value)}
          >
            {[...Array(15).keys()].map(n => (
              <option key={n + 1} value={n + 1}>{n + 1}</option>
            ))}
          </select>
          <button onClick={handleCheckAvailability} className="btn btn-primary btn-sm">Check Availability</button>
        </div>
      </div>

      <div className="room-list-section">
        <ul className="room-type-list">
          {roomTypes.map(roomType => (
            <li key={roomType.id} className={`room-item ${availability[roomType.id] === false ? 'sold-out' : ''}`}>
              <h3>{roomType.title}</h3>
              <img src={`http://localhost:3002/images/${roomType.image}`} alt={roomType.title} className="room-type-image" />
              <p>Short Code: {roomType.short_code}</p>
              <p>Amenities: {roomType.amentie}</p>
              {availability[roomType.id] !== undefined && (
                <p>{availability[roomType.id] ? 'Available' : 'Sold Out'}</p>
              )}
              <Link
                to={`/book/${roomType.id}?checkindate=${checkInDate}&nights=${numberOfNights}`}
                className={`btn btn-primary btn-sm me-2 ${!availability[roomType.id] ? 'disabled' : ''}`}
                disabled={!availability[roomType.id]}
              >
                BOOK NOW
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dhomat;
