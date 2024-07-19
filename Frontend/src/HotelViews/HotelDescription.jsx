import React from 'react';
import img from '../assets/HoteliAI.jpg';

const HotelDescription = () => {
  return (
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
  );
};

export default HotelDescription;
