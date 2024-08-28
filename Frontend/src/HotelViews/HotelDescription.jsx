import React from 'react';
import './hoteldescription.css';
import hotelView from '../assets/borchez.jpeg'
import airportTaxi from '../assets/arp.png'
import wifi from '../assets/wifi.jpg'
import pool from '../assets/swimming-pool.png'
import breakfast from '../assets/breakfast.png'

const HotelDescription = () => {
  return (
    <div className="hotel-landing-page">
      <div className="hero-section">
      <img src={hotelView} alt="Hotel Image" className="hero-image" />
        <div className="overlay">
          <div className="hero-content">
            <h1>CURATING THE WORLD'S BEST LUXURY</h1>
            <h1>HOTEL EXPERIENCE FOR YOU</h1>
            <p>Experience True Luxury and Elegance Without Compromise</p>
            <div className="hero-buttons">
              <button className="explore-btn" onClick={() => document.getElementById('hotel-services').scrollIntoView({ behavior: 'smooth' })}>Explore</button>
              <button className="book-now-btn" onClick={() => document.getElementById('hotel-room-types').scrollIntoView({ behavior: 'smooth' })}>Rooms</button>
            </div>
          </div>
        </div>
      </div>
      <div className="amenities">
        <div className="amenity">
          <img src={airportTaxi} alt="Airport Taxi" />
          <p>Airport Taxi</p>
        </div>
        <div className="amenity">
          <img src={wifi} alt="Free Wifi" />
          <p>Free Wifi</p>
        </div>
        <div className="amenity">
          <img src={pool} alt="Swimming Pool" />
          <p>Swimming Pool</p>
        </div>
        <div className="amenity">
          <img src={breakfast} alt="Breakfast" />
          <p>Breakfast</p>
        </div>
      </div>
    </div>
  );
};

export default HotelDescription;
