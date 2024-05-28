import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Employee = () => {
  const handleLogout = () => {
    axios.get('http://localhost:3002/logout')
      .then(res => {
        window.localStorage.removeItem("userId");
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

 
  return (
    <div>
      <Navbar variant="dark" style={{ height: 80, backgroundColor: 'lightblue' }}>
        <div className="container-fluid">
          <Navbar.Brand href="/">LotusHotel</Navbar.Brand>
          <div className="ms-auto dropdown">
            <a className="nav-link dropdown-toggle px-0 align-right text-end" role="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={`http://localhost:3002/images/${userData ? userData.img_url : ''}`} alt="" className='useret_image' />
            </a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li onClick={handleLogout}><a className="dropdown-item" href="/logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </Navbar>
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100px', backgroundColor: '#f8f9fa', marginTop: '20px' }}>
        <span style={{ fontSize: '30px' }}>My Tasks</span>
      </div>
      <div className="d-flex justify-content-center">
        <table className='table mt-3' style={{ width: '1200px' }}>
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
                  <Link to={`/updateHouseKeeping/${house.id}`} className='btn btn-primary btn-sm me-2'>
                    Update<i className="bi bi-pencil"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;