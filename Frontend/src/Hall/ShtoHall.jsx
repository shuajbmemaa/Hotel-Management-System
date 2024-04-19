import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaTimes } from 'react-icons/fa';
import '../form.css';

const ShtoHall = () => {

    const [halls,setHalls]=useState({
        floor_id:'',
        hall_type_id:'',
        hall_number:''
    })

    const navigate=useNavigate();

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(!halls.floor_id || !halls.hall_type_id || !halls.hall_number){
            toast.warn("Plotesone te gjithe formen !")
            return;
        }

        axios.post('http://localhost:3002/createHall',halls)
        .then(res=>{
            navigate('/halls');
            toast.success("U krijua me sukses");
        })
        .catch(err=>console.log(err))
    }

    const[data,setData]=useState([])

    useEffect(() => {
        axios.get('http://localhost:3002/getFloors')
          .then(res => {
            if (res.data.Status === "Success") {
              setData(res.data.Result);
            } else {
              alert("Error");
            }
          })
          .catch(err => console.log(err));
      }, []);

      const [hallTypes,setHallTypes]=useState([])

      useEffect(()=>{
        axios.get('http://localhost:3002/getHallTypes')
        .then(res=>{
            if(res.data.Status === "Success"){
              setHallTypes(res.data.Result)
            }else{
              toast.error("Gabim");
            }
          }
        ).catch(err => console.log(err))
      })

      const handleChange=(e)=>{
        setHalls({...halls, [e.target.name]:e.target.value})
      }


  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      
      <div className="form-border">
        <Link to="/halls" className='btn btn-danger rounded-circle p-0 ' style={{ width: '20px', height: '20px', lineHeight: '1.01', fontSize: '15px', float: 'right', marginTop: '1px', }}><FaTimes /></Link>
        <form className="row g-3 w-150" onSubmit={handleSubmit}>
            <h3 className="text-start">Add Hall</h3>

        <div class="col-12">
          <label for="inputFK" class="form-label">Floor</label>
          <select
            className="form-control"
            id="inputFK"
            name='floor_id'
            onChange={handleChange}
          >
             <option value="">Choose Floor</option>
             {data.map(floor =>(
                <option key={floor.id} value={floor.id}>{floor.name}</option>
             ))}
             </select>
        </div>

        <div class="col-12">
          <label for="inputFK2" class="form-label">Hall Type</label>
          <select
            className="form-control"
            id="inputFK2"
            name='hall_type_id'
            onChange={handleChange}
          >
             <option value="">Choose Hall Type</option>
             {hallTypes.map(hals =>(
                <option key={hals.id} value={hals.id}>{hals.title}</option>
             ))}
             </select>
        </div>

        <div className='col-12'>
                <label for="inputHN" className="form-label">Hall Number</label>
                <input type="number" className="form-control" id="inputHN" placeholder='Put hall number' autoComplete='off'
                onChange={handleChange} name='hall_number' />
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

export default ShtoHall