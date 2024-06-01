import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

  const navbarStyle = {
    height: '73px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#87CEEB', // Ngjyra portokalli e sfondit për navbar
    padding: '0 20px',
    color: 'white'
  };

  const h1Style = {
    marginTop: '0',
    fontSize: '24px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    backgroundColor: '#FF8C00', // Një hije më e çelët e portokallisë për butonin
    padding: '10px 20px',
    borderRadius: '5px',
    display: 'inline-block',
    transition: 'background-color 0.3s ease',
    marginTop: '0',
    marginRight: '20px',
  };

  const linkHoverStyle = {
    backgroundColor: '#FFA500' // Një ngjyrë portokalli edhe më e çelët për hover
  };

  const servicesContainerStyle = {
    padding: '20px',
    backgroundColor: '#FFF3E0', // Një hije e lehtë e portokallisë për sfondin e shërbimeve
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    margin: '20px auto',
    maxWidth: '940px'
  };

  const serviceItemStyle = {
    backgroundColor: '#FFE0B2', // Një hije tjetër e lehtë portokalli për çdo shërbim
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px'
  };

  return (
    <div>
      <div style={navbarStyle} className="navbar">
        <h1 style={h1Style}>Lotus</h1>
        <Link
          to='/'
          style={linkStyle}
          onMouseOver={e => e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor}
          onMouseOut={e => e.currentTarget.style.backgroundColor = linkStyle.backgroundColor}
        >
          Kthehu
        </Link>
      </div>
      <div style={servicesContainerStyle} className="hotel-services">
        <h2>Shërbimet Tona</h2>
        <ul className="service-list">
          {services.map(service => (
            <li key={service.id} style={serviceItemStyle}>
              <h3>{service.title}</h3>
              <p>Tipi i dhomës: {service.roomType}</p>
              <p>Çmimi: {service.price} €</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sherbimet;
