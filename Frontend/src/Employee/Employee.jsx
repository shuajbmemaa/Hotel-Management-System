import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet, useLocation,Route,Routes } from 'react-router-dom';
//import { Navbar } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ProfilePage from '../Profile/Profile';
import EditProfile from '../Profile/EditProfile';

const Employee = () => {
  const location = useLocation();

  const handleLogout = () => {
    axios.get('http://localhost:3002/logout')
      .then(res => {
        window.localStorage.removeItem("userId");
        window.localStorage.removeItem("role")
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

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

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3002/getHouseKeeping')
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          toast.error("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const isNotProfileOrEditProfile = !location.pathname.includes('/profile') && !location.pathname.includes('/editProfile');


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">LotusHotel</Link>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img 
                    src={`http://localhost:3002/images/${userData ? userData.img_url : ''}`} 
                    alt="" className='useret_image'
                  />
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/profile" component={ProfilePage} />
        <Route path="/editProfile" component={EditProfile} />
      </Routes>
      {isNotProfileOrEditProfile && (
        <>
          <div className="d-flex justify-content-center align-items-center bg-light mt-3" style={{ height: '100px' }}>
            <span style={{ fontSize: '30px' }}>My Tasks</span>
          </div>
          <div className="d-flex justify-content-center">
            <table className="table mt-3" style={{ width: '1200px' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>HouseKeeping Status</th>
                  <th>Room</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((house, index) => (
                  <tr key={index}>
                    <td>{house.id}</td>
                    <td>{house.hks}</td>
                    <td>{house.room}</td>
                    <td>
                      <Link to={`/updateHouseKeeping/${house.id}`} className="btn btn-primary btn-sm me-2">
                        Update <i className="bi bi-pencil"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <Outlet />
    </div>
    
  );
}

export default Employee;