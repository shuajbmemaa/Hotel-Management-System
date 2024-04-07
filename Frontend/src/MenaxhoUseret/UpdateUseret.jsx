import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

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
			<h2>Update User</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
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
                <label htmlFor="inputRole" className="form-label">Roli</label>
                    <select className="form-control" id="inputRole" onChange={e => setData({...data, role: e.target.value})} value={data.role}>
                        <option value="">Zgjidhni rolin</option>
                            {rolet.map((rolet, index) => (
                        <option key={index} value={rolet}>{rolet}</option>
                    ))}
                    </select>
            </div>
           <div className="col-12">
              <label htmlFor="inputDate" className="form-label">Datelindja</label>
              <input type="date"className="form-control" id="inputDate"
                onChange={e => setData({ ...data, date_of_birth: e.target.value })} value={data.date_of_birth} />
            </div>
				<div class="d-flex justify-content-center">
					<button type="submit" class="btn btn-primary">Update</button>
                    <Link to="/menaxhoUseret" className='btn btn-success ms-3'>Kthehu</Link>
				</div>
			</form>
		</div>
  )
}

export default UpdateUseret