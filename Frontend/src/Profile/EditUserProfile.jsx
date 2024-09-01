import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './userProfile.css';
import Navbar from '../Layout/Navbar';

const EditUserProfile = () => {
    const [previewImage, setPreviewImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
        gender: '',
        date_of_birth: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    const gjinite=["Mashkull","Femer"];

    const handleGenderChange=(e)=>{
        setData({...data,gender:e.target.value})
    }

    useEffect(() => {
        axios.get(`http://localhost:3002/getUserProfile/${id}`)
            .then(res => {
                setData({
                    name: res.data.Result[0].name,
                    email: res.data.Result[0].email,
                    password: res.data.Result[0].password,
                    image: res.data.Result[0].img_url,
                    gender: res.data.Result[0].gender,
                    date_of_birth: res.data.Result[0].date_of_birth
                });
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleImageChange = (e) => {
        setData(prevData => ({
            ...prevData,
            image: e.target.files[0],
        }));

        const selectedImage = e.target.files[0];
        setPreviewImage(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        if (data.image) {
            formData.append("image", data.image);
        }
        formData.append("gender", data.gender);
        formData.append("date_of_birth",data.date_of_birth);
        axios.put(`http://localhost:3002/updateUserProfile/${id}`, formData)
            .then(res => {
                if (res.data.Status === 'Success') {
                    navigate('/userProfile');
                    toast.success("Profile updated successfully!");
                }
            }).catch(err => console.log(err));
    };

    return (
        <div>
            <Navbar/>
        <div className='userProfile-container'>
            <form className="userProfile-form" onSubmit={handleSubmit}>
                <div className="userProfile-header">
                    <h2>Edit Profile</h2>
                </div>

                <div className="userProfile-image-section">
                    {previewImage ? (
                        <img src={previewImage} alt="" className='userProfile-image' />
                    ) : (
                        <img src={`http://localhost:3002/images/${data.image}`} alt="" className='userProfile-image' />
                    )}
                    <label htmlFor="fileInput" className="edito-button">
                        <i className="bi bi-camera"></i>
                    </label>
                    <input id="fileInput" type="file" className="form-control" style={{ display: 'none' }}
                        onChange={handleImageChange} />
                </div>

                <div className="userProfile-info-section">
                    <div className="userProfile-field">
                        <label className="userProfile-label">Name</label>
                        <input type="text" className="form-control" placeholder="Enter Name"
                            onChange={e => setData({ ...data, name: e.target.value })} value={data.name} />
                    </div>

                    <div className="userProfile-field">
                        <label className="userProfile-label">Email</label>
                        <input type="email" className="form-control" placeholder="Enter Email"
                            onChange={e => setData({ ...data, email: e.target.value })} value={data.email} />
                    </div>

                    <div className="userProfile-field">
                        <label className="userProfile-label">Password</label>
                        <input type="password" className="form-control" placeholder="Enter Password"
                            onChange={e => setData({ ...data, password: e.target.value })} value={data.password} />
                    </div>

                    <div className="userProfile-field">
                        <label className="userProfile-label">Gender</label>
                            <select className="form-control" id="inputGender" onChange={handleGenderChange}>
                                 <option value="">Zgjidhni gjinine</option>
                                    {gjinite.map((gjinite, index) => (
                                 <option key={index} value={gjinite}>{gjinite}</option>
                                ))}
                             </select>
                    </div>

                    <div className="userProfile-field">
                        <label htmlFor="inputDate" className="form-label">Birthday</label>
                            <input type="date"className="form-control" id="inputDate"
                             onChange={e => setData({...data, date_of_birth: e.target.value})}/>
                    </div>
                </div>

                <div className="userProfile-edit">
                    <Link to="/userProfile" className="btn btn-outline-light userProfile-editButton">Cancel</Link>
                    <button type="submit" className="btn btn-dark userProfile-editButton">Save Changes</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default EditUserProfile;
