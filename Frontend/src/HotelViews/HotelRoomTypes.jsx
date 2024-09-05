import React, { useEffect, useState } from 'react';
import './hotelrooms.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const HotelRoomTypes = ({ roomTypes }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [services, setServices] = useState([]);

  const getServicesForRoom = (roomType) => {
    return services.filter(service => service.roomType === roomType.title);
  };

  useEffect(() => {
    axios.get('http://localhost:3002/getServices')
      .then(res => {
        if (res.data.Status === "Success") {
          setServices(res.data.Result);
        } else {
          toast.error("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleRoomClick = (roomType) => {
    setSelectedRoom(roomType);
  };

  const closeModal = () => {
    setSelectedRoom(null);
  };

  return (
    <div id='hotel-room-types' className="hotel-room-types">
      <h2 className="section-title">Room & Suites</h2>
      <div className="room-cards-container">
        {roomTypes.map(roomType => (
          <div 
            key={roomType.id} 
            className="room-card"
            onClick={() => handleRoomClick(roomType)}
          >
            <img
              src={`http://localhost:3002/images/${roomType.image}`}
              alt={roomType.title}
              className="room-image"
            />
            <div className="room-details">
              <h3 className="room-title">{roomType.title}</h3>
              <p className="room-description">{roomType.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <div className="modal-body">
              <img
                src={`http://localhost:3002/images/${selectedRoom.image}`}
                alt={selectedRoom.title}
                className="modal-image"
              />
              <div className="modal-details">
                <h3>Name : {selectedRoom.title}</h3>
                <p>Short Code : {selectedRoom.short_code}</p>
                <p>Occupancy : {selectedRoom.base_occupancy}</p>
                <p>Price : {selectedRoom.base_price} $ / night</p>
                <p>Kids : {selectedRoom.kids}</p>
                <p>Services: {getServicesForRoom(selectedRoom).map(service => service.title).join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelRoomTypes;