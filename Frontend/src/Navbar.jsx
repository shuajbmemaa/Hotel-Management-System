import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  return (
    <div className="navbar">
      <h1>Lotus</h1>
      <Link to='/serviceUser'>Services</Link>
      <Link to='/rooms'>Bookings</Link>
      <Link to='/team'>Team</Link>
      <Link to='/aboutUs'>About Us</Link>
      <Link to='/review'><i className="bi bi-star"></i></Link>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
