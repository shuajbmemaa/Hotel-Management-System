import React from 'react';

const HotelServices = ({ services }) => {
  return (
    <div id="hotel-services" className="hotel-services">
      <h2>Our Services</h2>
      <ul className="service-list">
        {services.map(service => (
          <li key={service.id}>
            <h3>{service.title}</h3>
            <p>Room Type : {service.roomType}</p>
            <p>Price: {service.price} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelServices;
