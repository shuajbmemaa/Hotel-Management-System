import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';


const InsertAmenties = () => {
    
    const [llogari,setLlogari]=useState({
        name:'',
        image:'',
        description:''
    })

    const navigate=useNavigate();

    const handleSubmit=(event)=>{
        event.preventDefault();

        if(!llogari.name || !llogari.image || !llogari.description){
            toast.warn("Ju lutem mbusheni te gjithe formen !");
            return;
        }
        
        const formData=new FormData();
        formData.append("name",llogari.name);
        formData.append("image",llogari.image);
        formData.append("description",llogari.description);

        console.log("Vlerat : " ,llogari);

        axios.post('http://localhost:3002/shtonjeAmentie',formData)
        .then(res=>{
            console.log(res.data);
            navigate('/menaxhoAmenties');
            toast.success('Pajisja u shtua me sukses');
        })
        .catch(err=>console.log(err))
    }

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
        <h2>Shto pajisje</h2>
        <form className="row g-3 w-50" onSubmit={handleSubmit}>


            <div className='col-12'>
                <label for="inputName" className="form-label">Name </label>
                <input type="text" className="form-control" id="inputName" placeholder='Vendos Emrin' autoComplete='off'
                onChange={e => setLlogari({ ...llogari, name: e.target.value })} />
            </div>

            <div class="col-12 mb-3">
              <label class="form-label" for="inputGroupFile01">Select Image</label>
              <input type="file" class="form-control" id="inputGroupFile01"
                onChange={e => setLlogari({ ...llogari, image: e.target.files[0] })} />
            </div>

            <div className='col-12'>
                <label for="inputName" className="form-label"> Description </label>
                <input type="text" className="form-control" id="inputDescription" placeholder='Vendos pershkrimin' autoComplete='off'
                onChange={e => setLlogari({ ...llogari, description: e.target.value })} />
            </div>
               
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Shto pajisjen</button>
                <Link to="/menaxhoAmenties" className='btn btn-success ms-3'>Kthehu</Link>
            </div>




        </form>
    </div>
  )
}

export default InsertAmenties