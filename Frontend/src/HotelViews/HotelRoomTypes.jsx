import React from 'react';

const HotelRoomTypes = ({ roomTypes }) => {
  return (
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
  );
};

export default HotelRoomTypes;
