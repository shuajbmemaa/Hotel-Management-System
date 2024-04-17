import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


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
			<h2>Update </h2>
		    <form class="row g-3 w-50" onSubmit={handleSubmit}>
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


           
				<div class="d-flex justify-content-center">
					<button type="submit" class="btn btn-primary">Update</button>
                    <Link to="/halls" className='btn btn-success ms-3'>Kthehu</Link>
				</div>
			</form>
		</div>
  )
}

export default UpdateHall