import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const Sherbimet = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/getServices')
      .then(res => {
        if (res.data.Status === "Success") {
          setServices(res.data.Result);
        } else {
          toast.error("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div>
      <div className="navbar">
        <h1>Lotus</h1>
  
        </div>
        <div className="hotel-services">
        <h2>Shërbimet Tona</h2>
        <ul className="service-list">
          {services.map(service => (
            <li key={service.id}>
              <h3>{service.title}</h3>
              <p>Tipi i dhomës: {service.roomType}</p>
              <p>Çmimi: {service.price} €</p>
            </li>
          ))}
        </ul>
        <Link to='/'>Kthehu</Link>
      </div>


        </div>
  )
}

export default Sherbimet