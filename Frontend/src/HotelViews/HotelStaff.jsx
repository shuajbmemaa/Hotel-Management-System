import React from 'react';

const HotelStaff = ({ staff }) => {
  return (
    <div className="hotel-staff">
      <h2>Team</h2>
      <ul className="staff-list">
        {staff.map(member => (
          <li key={member.id}>
            <h3>{member.name}</h3>
            <img src={`http://localhost:3002/images/${member.img_url}`} alt={`${member.name}`} className="staff-image"/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelStaff;
