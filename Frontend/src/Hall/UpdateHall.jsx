import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaTimes } from 'react-icons/fa';
import '../form.css';


const UpdateHall = () => {

    const [hall,setHall]=useState({
        floor_id:'',
        hall_type_id:'',
        hall_number:''
    })

    const[floors,setFloors]=useState([]);

    useEffect(() => {
        axios.get('http://localhost:3002/getFloors')
          .then(res => {
            if (res.data.Status === "Success") {
              setFloors(res.data.Result);
            } else {
              alert("Error");
            }
          })
          .catch(err => console.log(err));
      }, []);

      const[hallTypes,setHallTypes]=useState([]);

      const navigate=useNavigate();

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

      const {id}=useParams();

      useEffect(()=>{
        axios.get('http://localhost:3002/getHall/'+id)
        .then(res => {
            setHall({...hall,
                floor_id:res.data.Result[0].floor_id,
                hall_type_id:res.data.Result[0].hall_type_id,
                hall_number:res.data.Result[0].hall_number
            })
        })
        .catch(err => console.log(err))
    },[])

    const handleSubmit=(event)=>{
        event.preventDefault();

        axios.put('http://localhost:3002/updateHall/'+id,hall)
        .then(res =>{
            if(res.data.Status === "Success"){
            navigate('/halls')
            toast.success("Update u realizua me sukses");
        }
        })
        .catch(err => console.log(err))
    }

    const handleInputChange = (e) => {
        setHall({ ...hall, [e.target.name]: e.target.value });
    };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
		<div className="form-border">
        <Link to="/halls" className='btn btn-danger rounded-circle p-0 ' style={{ width: '20px', height: '20px', lineHeight: '1.01', fontSize: '15px', float: 'right', marginTop: '1px', }}><FaTimes /></Link>
        <form className="row g-3 w-150" onSubmit={handleSubmit}>
            <h3 className="text-start">Update Hall</h3>
            <div class="col-12">
                     <label for="inputFK" class="form-label">Floor </label>
                <select
                className="form-control"
                id="inputFK" name='floor_id'
                onChange={handleInputChange} value={hall.floor_id}
                >
             <option value="">Choose Floor</option>
                {floors.map(data =>(
                 <option key={data.id} value={data.id}>{data.name}</option>
                     ))}
                </select>
             </div>

             <div class="col-12">
                     <label for="inputFK2" class="form-label">Hall Type </label>
                <select
                className="form-control"
                id="inputFK2" name='hall_type_id'
                onChange={handleInputChange} value={hall.hall_type_id}
                >
             <option value="">Choose Hall Type</option>
                {hallTypes.map(data =>(
                 <option key={data.id} value={data.id}>{data.title}</option>
                     ))}
                </select>
             </div>

             <div class="col-12">
					<label for="inputHN" class="form-label">Hall Number</label>
					<input type="number" class="form-control" id="inputHN" placeholder='Enter Hall Number' autoComplete='off'
					 name='hall_number'   onChange={handleInputChange} value={hall.hall_number}/>
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

export default UpdateHall