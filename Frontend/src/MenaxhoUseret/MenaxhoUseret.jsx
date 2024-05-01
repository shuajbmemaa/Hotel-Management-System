import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './menaxho.css';

const MenaxhoUseret = () => {
    const [data, setData] = useState([]);
    const [datelindja,setDatelindja] = useState('');

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return `${day}-${month}-${year}`;
    };
    

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this User?")) {
            axios.delete(`http://localhost:3002/deleteUser/${id}`)
                .then(res => {
                    if (res.data.Status === "Success") {
                        window.location.reload(true);
                        toast.success(res.data.Message);
                    } else {
                        toast.error("Error");
                    }
                })
                .catch(err => console.log(err));
        }
    };

    useEffect(() => {
        axios.get('http://localhost:3002/getUseret')
            .then(res => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                } else {
                    toast.error("Error");
                }
            })
            .catch(err => console.log(err));
    }, []);

    const filteri=data.filter(search=>
        formatDate(search.date_of_birth).toLowerCase().includes(datelindja.toLowerCase()))
    

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-right'>
                <h3>Users</h3>
            </div>
            <div className="d-flex justify-content-end">
                <Link to="/krijoLlogari" className='btn btn-light'><i className="bi bi-person-plus-fill"></i> Add New User</Link>
            </div>
            <div className='mt-3'>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search by date of birth"
                value={datelindja}
                onChange={(e) => setDatelindja(e.target.value)}
            />
                <table className='table mt-3'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Image</th>
                            <th>Gender</th>
                            <th>Birthday</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteri.map((useret, index) => (
                            <tr key={index}>
                                <td>{useret.id}</td>
                                <td>{useret.name}</td>
                                <td>{useret.email}</td>
                                <td>
                                    <img src={`http://localhost:3002/images/${useret.img_url}`} alt="" className='useret_image' />
                                </td>
                                <td>{useret.gender}</td>
                                <td>{formatDate(useret.date_of_birth)}</td>
                                <td>
                                    <Link to={`/updateUseret/${useret.id}`} className='btn btn-primary btn-sm me-2'>Update <i className="bi bi-pencil"></i></Link>
                                    <button onClick={() => handleDelete(useret.id)} className='btn btn-sm btn-danger'>Delete <i className="bi bi-trash3"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MenaxhoUseret;
