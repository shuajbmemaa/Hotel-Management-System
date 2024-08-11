import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Service = () => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [isPriceAscending, setIsPriceAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage] = useState(5);

  const handleDelete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`http://localhost:3002/deleteService/${id}`)
                .then(res => {
                    if (res.data.Status === "Success") {
                        Swal.fire(
                            'Deleted!',
                            res.data.Message,
                            'success'
                        ).then(() => {
                            window.location.reload(true);
                        });
                        //toast.success(res.data.Message);
                    } else {
                        toast.error("Error");
                    }
                })
                .catch(err => console.log(err));
        }
    });
};

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

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = sortedData.slice(indexOfFirstService, indexOfLastService);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            {currentServices.map((service, index) => (
              <tr key={index}>
                <td>{service.id}</td>
                <td>{service.title}</td>
                <td>{service.roomType}</td>
                <td>{service.price}</td>
                <td>
                  <Link to={`/updateService/${service.id}`} className='btn btn-primary btn-sm me-2'>
                    Update <i className="bi bi-pencil"></i>
                  </Link>
                  <button onClick={() => handleDelete(service.id)} className='btn btn-sm btn-danger'>
                    Delete <i className="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(sortedData.length / servicesPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
              <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Service;
