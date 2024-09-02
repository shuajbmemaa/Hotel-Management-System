import React from 'react';

const StatCard = ({ color, icon, value, label }) => {
  return (
    <div style={{ backgroundColor: color, padding: '20px', borderRadius: '10px', color: '#fff', margin: '10px', flex: '1' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: '2em', marginRight: '10px' }}>{icon}</div>
        <div>
          <h3>{value}</h3>
          <p>{label}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
