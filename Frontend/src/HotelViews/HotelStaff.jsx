import React, { useEffect, useState } from 'react';
import './staff.css';

const HotelStaff = ({ staff }) => {
  const [selectedStaff, setSelectedStaff] = useState(null);

  useEffect(() => {
    if (staff.length > 0) {
      setSelectedStaff(staff[0]);
    }
  }, [staff]);

  const handleStaffClick = (member) => {
    setSelectedStaff(member);
  };

  return (
    <div className="hotel-staff">
      <h2 className="section-title">What Clients Say</h2>
      <div className="staff-container">
        <div className="staff-list">
          {staff.map(member => (
            <div key={member.id} className={`staff-member ${selectedStaff?.id === member.id ? 'active' : ''}`} onClick={() => handleStaffClick(member)}>
            <img src={`http://localhost:3002/images/${member.img_url}`} alt={member.name} className="staff-image"/>
            <div className="staff-info">
              <h3>{member.name}</h3>
              <div className="staff-rating">
                <span>⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          </div>
          ))}
        </div>
        {selectedStaff && (
          <div className="staff-details">
            <img src={`http://localhost:3002/images/${selectedStaff.img_url}`} alt={selectedStaff.name} className="staff-details-image"/>
            <h3>{selectedStaff.name}</h3>
            <p>⭐⭐⭐⭐⭐</p>
            <p>Lorem ipsum dolor sit amet consectetur. Urna morbi morbi quis vulputate est. Ac neque ultricies justo lectus molestie purus purus eu at mattis.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelStaff;
