import React, { useEffect, useState } from 'react';
import { FaRegFilePdf } from 'react-icons/fa6';
import axios from 'axios';
import Navbar from '../Layout/Navbar';
import Cookies from 'js-cookie';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './myOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const user_id = window.localStorage.getItem("userId");

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
        console.error('Gabim gjate marrjes se porosive:', error);
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

  const handlePrint = (orderId) => {
    const orderElement = document.getElementById(`order-${orderId}`);
    html2canvas(orderElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save(`order_${orderId}.pdf`);
    });
  };

  const handleStatusChange = (orderId, newStatus) => {
    axios.put(`http://localhost:3002/orders/${orderId}/status`, { status: newStatus })
      .then(() => {
        setOrders(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
      })
      .catch(error => {
        console.error('Gabim gjatë përditësimit të statusit:', error);
      });
  };

  return (
    <div>
      <Navbar onLogout={handleLogout} />
      <h2 style={{ marginBottom: '20px' }}>My Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>CheckIn</th>
            <th>CheckOut</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} id={`order-${order.id}`}>
              <td>#{order.id}</td>
              <td>{formatDate(order.checkIn)}</td>
              <td>{formatDate(order.checkOut)}</td>
              <td>{order.name}</td>
              <td>
                {order.status === 'pending' ? (
                  <select 
                    value={order.status} 
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                ) : (
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                )}
              </td>
              <td>${order.total}</td>
              <td>
                <button className="action-btn" title="Export PDF" onClick={() => handlePrint(order.id)}>
                  Print <FaRegFilePdf size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;