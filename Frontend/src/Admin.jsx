import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBroom, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { OrderedListOutlined } from '@ant-design/icons';

const Admin = () => {

    const [userData, setUserData] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = window.localStorage.getItem("userId");
                const response = await axios.get(`http://localhost:3002/api/profile?userId=${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchUserData();
    }, []);

    const handleLogout = () => {
        axios.get('http://localhost:3002/logout')
            .then(res => {
                window.localStorage.removeItem("userId")
                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                window.location.reload();
            })
            .catch(err => console.log(err))
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                {sidebarOpen && (
                    <div className="col-auto col-md-3 col-lg-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <div className="d-flex justify-content-between w-100">
                                <span className="fs-5 fw-bolder d-none d-sm-inline">Admin Dashboard</span>
                                <button className="btn btn-sm text-white ms-auto" onClick={toggleSidebar}>
									<i class="bi bi-chevron-double-left"></i>
                                </button>
                            </div>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li>
                                    <Link to="/" className="nav-link text-white px-0 align-middle">
                                        <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/menaxhoUseret" className="nav-link px-0 align-middle text-white">
                                        <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Users</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/menaxhoRoomT" className="nav-link px-0 align-middle text-white">
                                        <i className="bi bi-columns-gap"></i> <span className="ms-1 d-none d-sm-inline">Room Types</span>
                                    </Link>
                                </li>
								<li>
									<Link to="/menaxhoRoom" className="nav-link px-0 align-middle text-white">
										<i class="bi bi-door-open"></i> <span className="ms-1 d-none d-sm-inline">Rooms</span>
									</Link>
								</li>
								<li>
									<Link to="/hall-types" className="nav-link px-0 align-middle text-white">
										<i className="bi bi-columns-gap"></i><span className="ms-1 d-none d-sm-inline">Hall Types</span>
									</Link>
								</li>
								<li>
									<Link to="/halls" className="nav-link px-0 align-middle text-white">
										<i class="bi bi-door-closed"></i><span className="ms-1 d-none d-sm-inline">Halls</span> 
									</Link>
								</li>
								<li>
									<Link to="/menaxhoFloors" className="nav-link px-0 align-middle text-white">
										<i class="bi bi-building"></i><span className="ms-1 d-none d-sm-inline">Floors</span>
									</Link>
								</li>
								<li>
									<Link to="/menaxhoAmenties" className="nav-link px-0 align-middle text-white">
										<i class="bi bi-clipboard2-plus"></i> <span className="ms-1 d-none d-sm-inline">Amenties</span>
									</Link>
								</li>
								<li>
									<Link to="/service" className="nav-link px-0 align-middle text-white">
										<i class="bi bi-gear-wide"></i> <span className="ms-1 d-none d-sm-inline">Services</span> 
									</Link>
								</li>
								<li>
									<Link to="/houseKeppingS" className="nav-link px-0 align-middle text-white">
										<i class="bi bi-house-check"></i> <span className="ms-1 d-none d-sm-inline">Housekeeping Status</span>
									</Link>
								</li>
								<li>
									<Link to="/houseKeeping" className="nav-link px-0 align-middle text-white">
										<FontAwesomeIcon icon={faBroom} /> <span className="ms-1 d-none d-sm-inline">Housekeeping</span> 
									</Link>
								</li>
								<li>
									<Link to="/guestReviews" className="nav-link px-0 align-middle text-white">
										<i class="bi bi-star"></i> <span className="ms-1 d-none d-sm-inline">Guest Reviews</span> 
									</Link>
								</li>
								<li>
									<Link to="/orders" className="nav-link px-0 align-middle text-white">
										<OrderedListOutlined /> <span className="ms-1 d-none d-sm-inline">Bookings</span> 
									</Link>
								</li>
								<li>
									<Link to="/calendar" className="nav-link px-0 align-middle text-white">
										<i class="bi bi-calendar"></i> <span className="ms-1 d-none d-sm-inline">Availability Calendar</span> 
									</Link>
								</li>
                            </ul>
                        </div>
                    </div>
                )}
                <div className="col p-0 m-0">
                    <div className="d-flex justify-content-between align-items-center p-2">
                        {!sidebarOpen && (
                            <button className="btn btn-sm text-dark" onClick={toggleSidebar}>
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                        )}
                        <div className="dropdown text-end ms-auto">
                            <a className="nav-link dropdown-toggle px-0 align-right text-black" href="#" role="button" id="profileDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={`http://localhost:3002/images/${userData ? userData.img_url : ''}`} alt="" className='useret_image' />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                                <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li onClick={handleLogout}><a className="dropdown-item" href="/logout">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin;