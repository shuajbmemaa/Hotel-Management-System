import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => {

  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = window.localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:3002/api/profile?userId=${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);


  return (
    <div className="navbar">
      <Link to="/" className="navbar-brand">
        <h1>Lotus</h1>
      </Link>
      <Link to='/serviceUser'>Services</Link>
      <Link to='/rooms'>Bookings</Link>
      <Link to='/team'>Team</Link>
      <Link to='/aboutUs'>About Us</Link>
      <Link to='/review'><i className="bi bi-star"></i></Link>
      <div className="dropdown text-end ms-auto">
        <a className="nav-link dropdown-toggle px-0 align-right text-black" href="#" role="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={`http://localhost:3002/images/${userData ? userData.img_url : ''}`} alt="" className='useret_image' />
        </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li><Link to="/userProfile" className="dropdown-item">Profile</Link></li>
              <li><Link to="/myOrders" className="dropdown-item">My Orders</Link></li>
                <li><hr className="dropdown-divider" /></li>
              <li onClick={onLogout}><a className="dropdown-item" href="/login">Logout</a></li>
            </ul>
      </div>
    </div>
  );
};

export default Navbar;
