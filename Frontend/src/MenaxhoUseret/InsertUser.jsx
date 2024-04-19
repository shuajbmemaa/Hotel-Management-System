import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa'; 
import '../form.css';


const InsertUser = () => {
    
    const [llogari,setLlogari]=useState({
        name:'',
        email:'',
        role:'',
        password:'',
        image:'',
        gender:'',
        date_of_birth:''
    })

    const navigate=useNavigate();

    const rolet=["user","admin"];

    const gjinite=["Mashkull","Femer"];

    const handleRoleChange=(e)=>{
        setLlogari({...llogari,role:e.target.value})
    }

    const handleGenderChange=(e)=>{
        setLlogari({...llogari,gender:e.target.value})
    }

    const handleSubmit=(event)=>{
        event.preventDefault();

        if(!llogari.name || !llogari.email || !llogari.role || !llogari.password || !llogari.image || !llogari.gender || !llogari.date_of_birth){
            toast.warn("Ju lutem plotesone te gjithe formen !");
            return;
        }

        const formData=new FormData();
        formData.append("name",llogari.name);
        formData.append("email",llogari.email);
        formData.append("role",llogari.role);
        formData.append("password",llogari.password);
        formData.append("image",llogari.image);
        formData.append("gender",llogari.gender);
        formData.append("date_of_birth",llogari.date_of_birth);

        console.log("Vlerat : " ,llogari);

        axios.post('http://localhost:3002/krijonjeLlogari',formData)
        .then(res=>{
            console.log(res.data);
            navigate('/menaxhoUseret');
            toast.success('Perdoruesi u shtua me sukses');
        })
        .catch(err=>console.log(err))
    }

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
          <div className="form-border">
        <Link to="/menaxhoUseret" className='btn btn-danger rounded-circle p-0 ' style={{ width: '20px', height: '20px', lineHeight: '1.01', fontSize: '15px', float: 'right', marginTop: '1px', }}><FaTimes /></Link>
        <form className="row g-3 w-150" onSubmit={handleSubmit}>
            <h3 className="text-start">Add User</h3>

            <div className='col-12'>
                <label for="inputName" className="form-label">Name </label>
                <input type="text" className="form-control" id="inputName" placeholder='Vendos Emrin' autoComplete='off'
                onChange={e => setLlogari({ ...llogari, name: e.target.value })} />
            </div>


            <div class="col-12">
					<label for="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					onChange={e => setLlogari({...llogari, email: e.target.value})}/>
			</div>


            <div class="col-12">
					<label for="inputPassword" className="form-label">Password</label>
					<input type="password" className="form-control" id="inputPassword" placeholder='Enter Password' autoComplete='off'
					onChange={e => setLlogari({...llogari, password: e.target.value})}/>
			</div>

            <div className="col-12">
                <label htmlFor="inputRole" className="form-label">Roli</label>
                    <select className="form-control" id="inputRole" onChange={handleRoleChange}>
                        <option value="">Zgjidhni rolin</option>
                            {rolet.map((rolet, index) => (
                        <option key={index} value={rolet}>{rolet}</option>
                    ))}
                    </select>
            </div>

            <div class="col-12 mb-3">
              <label class="form-label" for="inputGroupFile01">Select Image</label>
              <input type="file" class="form-control" id="inputGroupFile01"
                onChange={e => setLlogari({ ...llogari, image: e.target.files[0] })} />
            </div>

                <div className="col-12">
                <label htmlFor="inputGender" className="form-label">Gender</label>
                    <select className="form-control" id="inputGender" onChange={handleGenderChange}>
                        <option value="">Zgjidhni gjinine</option>
                            {gjinite.map((gjinite, index) => (
                        <option key={index} value={gjinite}>{gjinite}</option>
                    ))}
                    </select>
            </div>
            <div className="col-12">
              <label htmlFor="inputDate" className="form-label">Birthday</label>
              <input type="date"className="form-control" id="inputDate"
               onChange={e => setLlogari({...llogari, date_of_birth: e.target.value})}/>
            </div>

            <div className="col-12">
                    <div className="text-center ">
                    <button type="submit" className="btn btn-dark" style={{ width: '50%' }}>Create</button>
                        </div>
                    </div>
        </form>
      </div>
    </div>
  )
}

export default InsertUser