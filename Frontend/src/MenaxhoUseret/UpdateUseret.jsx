import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FaTimes } from 'react-icons/fa'; 
import '../form.css';

const UpdateUseret = () => {
    const [data, setData] = useState({
		name: '',
		email: '',
		role: '',
        date_of_birth:''
	})

    const navigate=useNavigate();

    const rolet=["user","admin"];
    
    const {id}=useParams();

    useEffect(()=>{
        axios.get('http://localhost:3002/getUsers/'+id)
        .then(res => {
            setData({...data,
                name:res.data.Result[0].name,
                email:res.data.Result[0].email,
                role:res.data.Result[0].role,
                date_of_birth:res.data.Result[0].date_of_birth,
            })
        })
        .catch(err => console.log(err))
    },[])

    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.put('http://localhost:3002/updateUsers/'+id,data)
        .then(res =>{
            if(res.data.Status === "Success"){
            navigate('/menaxhoUseret')
            toast.success("Update u realizua me sukses");
        }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
		   <div className="form-border">
        <Link to="/menaxhoUseret" className='btn btn-danger rounded-circle p-0 ' style={{ width: '20px', height: '20px', lineHeight: '1.01', fontSize: '15px', float: 'right', marginTop: '1px', }}><FaTimes /></Link>
        <form className="row g-3 w-150" onSubmit={handleSubmit}>
            <h3 className="text-start">Update User</h3>
			<div class="col-12">
					<label for="inputName" class="form-label">Name</label>
					<input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})} value={data.name}/>
				</div>
                <div class="col-12">
					<label for="inputEmail4" class="form-label">Email</label>
					<input type="email" class="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setData({...data, email: e.target.value})} value={data.email}/>
				</div>
                <div className="col-12">
                <label htmlFor="inputRole" className="form-label">Role</label>
                    <select className="form-control" id="inputRole" onChange={e => setData({...data, role: e.target.value})} value={data.role}>
                        <option value="">Zgjidhni rolin</option>
                            {rolet.map((rolet, index) => (
                        <option key={index} value={rolet}>{rolet}</option>
                    ))}
                    </select>
            </div>
           <div className="col-12">
              <label htmlFor="inputDate" className="form-label">Birthday</label>
              <input type="date"className="form-control" id="inputDate"
                onChange={e => setData({ ...data, date_of_birth: e.target.value })} value={data.date_of_birth} />
            </div>
            <div className="col-12">
                    <div className="text-center ">
                    <button type="submit" className="btn btn-dark" style={{ width: '50%' }}>Update</button>
                        </div>
                    </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateUseret