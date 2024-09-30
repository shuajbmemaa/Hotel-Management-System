import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Orders = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  useEffect(() => {
    axios.get('http://localhost:3002/orders')
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          toast.error("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${day}-${month}-${year}`;
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = data.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center'>
        <h3>Bookings:</h3>
      </div>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Room</th>
              <th>Name</th>
              <th>Email</th>
              <th>Nights</th>
              <th>Total</th>
              <th>CheckIn</th>
              <th>CheckOut</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((Order, index) => (
              <tr key={index}>
                <td>{Order.id}</td>
                <td>{Order.username}</td>
                <td>{Order.room}</td>
                <td>{Order.name}</td>
                <td>{Order.email}</td>
                <td>{Order.nights}</td>
                <td>{Order.total}$</td>
                <td>{formatDate(Order.checkIn)}</td>
                <td>{formatDate(Order.checkOut)}</td>
                <td>{Order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(data.length / ordersPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Orders;