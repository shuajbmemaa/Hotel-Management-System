import React, { useEffect, useState } from 'react';
import './userProfile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Layout/Navbar';

const UserProfile = () => {
  const [profileData, setProfileData] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = window.localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:3002/api/profile?userId=${userId}`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const maskPassword = (password) => {
    const maskLength = password.length;
    const maskedPassword = '*'.repeat(maskLength);
    return maskedPassword;
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="userProfile-container">
        <div className="userProfile-header">
          <h2>My Profile</h2>
        </div>
        <div className="userProfile-content">
          <div className="userProfile-image-section">
            <img src={`http://localhost:3002/images/${profileData ? profileData.img_url : ''}`} alt="" className='userProfile-image' />
          </div>
          <div className="userProfile-info-section">
            <div className="userProfile-field">
              <label className="userProfile-label">Name</label>
              <input type="text" value={profileData.name} readOnly />
            </div>

            <div className="userProfile-field">
              <label className="userProfile-label">Email</label>
              <input type="email" value={profileData.email} readOnly />
            </div>

            <div className="userProfile-field">
              <label className="userProfile-label">Password</label>
              <input type="password" value={maskPassword(profileData.password)} readOnly />
            </div>

            <div className="userProfile-field">
              <label className="userProfile-label">Gender</label>
              <input type="text" value={profileData.gender} readOnly />
            </div>

            <div className="userProfile-field">
              <label className="userProfile-label">Date of Birth</label>
              <input type="text" value={formatDate(profileData.date_of_birth)} readOnly />
            </div>
          </div>
        </div>

        <div className="userProfile-buttons">
          <Link to={`/editUserProfile/${profileData.id}`} className="userProfile-editButton">
            Edit Profile
          </Link>
          <Link to={`/deleteUserProfile/${profileData.id}`} className="userProfile-deleteButton">
            Delete Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
