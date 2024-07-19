import React from 'react';

const HotelServices = ({ services }) => {
  return (
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
  );
};

export default HotelServices;
