import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaTimes } from 'react-icons/fa';
import '../form.css';

const UpdateHallTypes = () => {
    const [hallTypes,setHallTypes]=useState({
        title:'',
        short_code:'',
        amenties_id:'',
        basePrice:''
    })

    const [amenties,setAmenties]=useState([]);
    const [isChanged, setIsChanged] = useState(false);



    useEffect(()=>{
        axios.get('http://localhost:3002/getAmenties')
        .then(res=>{
          if(res.data.Status === "Success"){
            setAmenties(res.data.Result)
          }else{
            toast.error("Erorr")
          }
        })
        .catch(err=>console.log(err))
        },[]);

    const {id}=useParams();

    useEffect(()=>{
        axios.get('http://localhost:3002/getHallTypes/'+id)
        .then(res => {
            setHallTypes({...hallTypes,
                title:res.data.Result[0].title,
                short_code:res.data.Result[0].short_code,
                amenties_id:res.data.Result[0].amenties_id,
                basePrice:res.data.Result[0].basePrice,
            })
        })
        .catch(err => console.log(err))
    },[])

    const navigate=useNavigate();


    const handleSubmit=(event)=>{
        event.preventDefault();
        if (!isChanged) { 
            toast.warn("Ju lutem beni te pakten nje ndryshim para se te vazhdoni.");
            return; 
        }

        const textRegex = /^[a-zA-Z\s]*$/;
        if(!textRegex.test(hallTypes.title)) {
            toast.warn("Titulli duhet të përmbajë vetëm tekst.");
            return;
        }

        axios.put('http://localhost:3002/updateHallTypes/'+id,hallTypes)
        .then(res =>{
            if(res.data.Status === "Success"){
            navigate('/hall-types')
            toast.success("Update u realizua me sukses");
        }
        })
        .catch(err => console.log(err))
    }

    const handleInputChange = (e) => {
        setHallTypes({ ...hallTypes, [e.target.name]: e.target.value });
        setIsChanged(true);
    };
    //ne vend se me shkru gjith aty onChange={e =>setHallTypes({...hallTypes,
    // title:e.target.value})} etj

    //e shkrujm kit funksion edhe e perdorum te onChange tu ja dergu
    //veq handleInputChange edhe "name" ne baze te atributit

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
		  <div className="form-border">
        <Link to="/hall-types" className='btn btn-danger rounded-circle p-0 ' style={{ width: '20px', height: '20px', lineHeight: '1.01', fontSize: '15px', float: 'right', marginTop: '1px', }}><FaTimes /></Link>
        <form className="row g-3 w-150" onSubmit={handleSubmit}>
            <h3 className="text-start">Update Hall Type</h3>

			<div class="col-12">
					<label for="inputTitle" class="form-label">Title</label>
					<input type="text" class="form-control" id="inputTitle" placeholder='Enter Title' autoComplete='off'
					name='title' onChange={handleInputChange} value={hallTypes.title}/>
				</div>

                <div class="col-12">
					<label for="inputSC" class="form-label">Short Code</label>
					<input type="text" class="form-control" id="inputSC" placeholder='Enter Short Code' autoComplete='off'
					 name='short_code'   onChange={handleInputChange} value={hallTypes.short_code}/>
				</div>

                <div class="col-12">
                     <label for="inputFK" class="form-label">Amenties</label>
                <select
                className="form-control"
                id="inputFK" name='amenties_id'
                onChange={handleInputChange} value={hallTypes.amenties_id}
                >
             <option value="">Choose Amenties</option>
                {amenties.map(data =>(
                 <option key={data.id} value={data.id}>{data.name}</option>
                     ))}
                </select>
             </div>

                <div class="col-12">
					<label for="inputBP" class="form-label">Base Price</label>
					<input type="number" class="form-control" id="inputBP" placeholder='Enter Short Code' autoComplete='off'
					name='basePrice' onChange={handleInputChange} value={hallTypes.basePrice}/>
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
export default UpdateHallTypes