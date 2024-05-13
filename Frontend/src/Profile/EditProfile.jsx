import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './profile.css'
import { FaTimes } from 'react-icons/fa'; 
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const [previewImage, setPreviewImage] = useState(null);
    const [data,setData]=useState({
        name:'',
        email:'',
        password:'',
        image:''
    })

    const {id}=useParams();

    useEffect(()=>{
        axios.get('http://localhost:3002/getProfile/'+id)
        .then(res => {
            setData({...data,
                name:res.data.Result[0].name,
                email:res.data.Result[0].email,
                password:res.data.Result[0].password,
                image:res.data.Result[0].img_url,
            })
        })
        .catch(err => console.log(err))
    },[])


    const navigate=useNavigate();
    const handleImageChange = (e) => {
        setData(prevData => ({
            ...prevData,
            image: e.target.files[0],
        }));

        const selectedImage = e.target.files[0];
        setPreviewImage(URL.createObjectURL(selectedImage)); // Krijoni një URL për të shfaqur foton e fundit të ngarkuar
    };
    const handleSubmit=(e)=>{
        e.preventDefault();

        const formData=new FormData();

        formData.append("name",data.name);
        formData.append("email",data.email);
        formData.append("password",data.password);
        if(data.image){
            formData.append("image",data.image);
        }

        axios.put('http://localhost:3002/updateProfile/'+id,formData).
        then(res=>{
            if(res.data.Status === 'Success'){
                navigate('/profile')
                toast.success("Update u realizua me sukses");
            }
        }).catch(err => console.log(err));
    }


  return (
    <div className='profile-container'>
        <form className="row g-3 w-150" onSubmit={handleSubmit}>
        <div className="cover-photo">
                    {previewImage ? ( // Shfaq foton e fundit të ngarkuar nëse ekziston
                        <img src={previewImage} alt="" className='profile' />
                    ) : (
                        <img src={`http://localhost:3002/images/${data.image}`} alt="" className='profile' />
                    )}
                    <label htmlFor="fileInput" className="edit-button">
                        Change Profile Photo
                    </label>
                    <input id="fileInput" type="file" className="form-control" style={{ display: 'none' }}
                        onChange={handleImageChange} />
                </div>
    <div className="profile-name">{data.name}</div>
    <div className="profile-role">Edit Profile</div>
    <div className="details">Edit your details</div>
    <ul className="profile-list">
        <li className="profile-item">
            <div className="profile-item-wrapper">
                <i className="bi bi-person"></i>
                <input type="text" className="form-control" placeholder="Enter Name" autoComplete="off"
                    onChange={e => setData({...data, name: e.target.value})} value={data.name}/>
            </div>
        </li>
        <li className="profile-item">
            <div className="profile-item-wrapper">
                <i className="bi bi-envelope"></i>
                <input type="email" className="form-control" placeholder="Enter Email" autoComplete="off"
                    onChange={e => setData({...data, email: e.target.value})} value={data.email}/>
            </div>
        </li>
        <li className="profile-item">
            <div className="profile-item-wrapper">
                <i className="bi bi-lock"></i>
                <input type="password" className="form-control" placeholder="Enter Password" autoComplete="off"
                    onChange={e => setData({...data, password: e.target.value})} value={data.password}/>
            </div>
        </li>
   
    </ul>
    <div className="col-12">
    <div className="text-center">
        <button type="submit" className="btn btn-dark" style={{ width: '50%' }}>Update</button>
    </div>
    </div>
    </form>
    <Link to="/profile" className='btn btn-danger rounded-circle p-0 ' style={{ width: '20px', height: '20px', lineHeight: '1.01', fontSize: '15px', float: 'right', marginTop: '1px' }}><FaTimes /></Link>
</div>
  )
}

export default EditProfile