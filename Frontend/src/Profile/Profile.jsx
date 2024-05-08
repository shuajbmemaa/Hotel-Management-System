
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './profile.css';


const ProfilePage = () => {
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
    <div className="profile-container">
  <div className="cover-photo">
    <img src={`http://localhost:3002/images/${profileData ? profileData.img_url : ''}`} alt="" className='profile' />
  </div>
  <div className="profile-name">{profileData.name}</div>
  <div className="profile-role">{profileData.role}</div>
  <div className="details">My details</div>
  <ul className="profile-list">
    <li className="profile-item">
      <div className="profile-item-wrapper">
      <i class="bi bi-envelope"></i>
        <div className="profile-email">{profileData.email}</div>
      </div>
    </li>
    <li className="profile-item">
      <div className="profile-item-wrapper">
      <i class="bi bi-person-standing"></i><i class="bi bi-person-standing-dress"></i>
        <div className="profile-gender">{profileData.gender}</div>
      </div>
    </li>
    <li className="profile-item">
      <div className="profile-item-wrapper">
      <i class="bi bi-calendar-event"></i>
        <div className="profile-dateBirth">{formatDate(profileData.date_of_birth)}</div>
      </div>
    </li>
  </ul>
</div>

  );
};

export default ProfilePage;
