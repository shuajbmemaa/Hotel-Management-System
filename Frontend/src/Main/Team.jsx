import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../Layout/Navbar'
import { toast } from 'react-toastify'

const Team = () => {
  const [punetori, setPunetori] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/getAdminData')
      .then(res => {
        if (res.data.Status === "Success") {
          setPunetori(res.data.Result);
        } else {
          toast.error("Error fetching employee data");
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("An error occurred while fetching data");
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="team-section">
        <h2>Our Team</h2>
        <p>Meet our dedicated team of employees who drive success every day.</p>
        <div className="team-grid">
          {punetori.map((employee, index) => (
            <div key={index} className="team-card">
              <img src={`http://localhost:3002/images/${employee.img_url}`} alt={employee.name} className="team-photo"/>
              <h3>{employee.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team