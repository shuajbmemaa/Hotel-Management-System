import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Service = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [isPriceAscending, setIsPriceAscending] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3002/getServices')
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          toast.error("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      if (isPriceAscending) {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSortedData(sorted);
  }, [data, isPriceAscending]);

  const togglePriceSort = () => {
    setIsPriceAscending(!isPriceAscending);
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-right'>
        <h3>Services</h3>
      </div>
      <div className="d-flex justify-content-end">
        <Link to="/shtoService" className='btn btn-light'><i className="bi bi-plus"></i>Add New Service</Link>
      </div>
      <div className='mt-3'>
        <table className='table mt-3'>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Room Type</th>
              <th>
                Price
                <span
                  className="cursor-pointer ms-1"
                  onClick={togglePriceSort}
                >
                  {isPriceAscending ? (
                    <i className="bi bi-arrow-down"></i>
                  ) : (
                    <i className="bi bi-arrow-up"></i>
                  )}
                </span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((service, index) => {
              return (
                <tr key={index}>
                  <td>{service.id}</td>
                  <td>{service.title}</td>
                  <td>{service.roomType}</td>
                  <td>{service.price}</td>
                  <td>
                    <Link to={`/updateServices/${service.id}`} className='btn btn-primary btn-sm me-2'>Update <i className="bi bi-pencil"></i></Link>
                    <button onClick={() => handleDelete(service.id)} className='btn btn-sm btn-danger'>Delete <i className="bi bi-trash3"></i></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Service;
