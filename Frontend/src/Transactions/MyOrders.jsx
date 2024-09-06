import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Layout/Navbar';
import Cookies from 'js-cookie';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const user_id=window.localStorage.getItem("userId");

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        axios.get(`http://localhost:3002/myorders/${user_id}`)
          .then(response => {
            setOrders(response.data.Result);
          })
          .catch(error => {
            console.error('Gabim gjatë marrjes së porosive:', error);
          });
      }, [user_id]);

      const handleLogout = () => {
        axios.get('http://localhost:3002/logout')
          .then(res => {
            window.localStorage.removeItem("userId");
            window.localStorage.removeItem("role");
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            window.location.reload();
          })
          .catch(err => console.log(err));
      };

  return (
    <div>
        <Navbar onLogout={handleLogout}/>
      <h1 style={{ marginBottom: '20px' }}>My Orders</h1>
      <Link to="/" style={{ display: 'block', marginBottom: '20px' }}>Kthehu tek faqja kryesore</Link>
      <div>
        {orders.map(order => (
          <div key={order.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h2 style={{ marginBottom: '10px' }}>Order #{order.id}</h2>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Telephone Number:</strong> {order.phone}</p>
            <p><strong>Total Amount:</strong> {order.total}.00$</p>
            <p><strong>Check In:</strong> {formatDate(order.checkIn)}</p>
            <p><strong>Check Out:</strong> {formatDate(order.checkOut)}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders