import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ShtoHallTypes = () => {

    const [hallTypes,setHallTypes]=useState({
        title:'',
        short_code:'',
        baseOccupancy:'',
        higherOccupancy:'',
        amenties_id:'',
        basePrice:'',
        image:''
    })

    const navigate=useNavigate();

    //qikjo merret per me lidh me foreign key te Amenties
    const[amenties,setAmenties]=useState([]);

    const handleSubmit=(event)=>{
        event.preventDefault();

        const textRegex = /^[a-zA-Z\s]*$/;
        if(!textRegex.test(hallTypes.title)) {
            toast.warn("Titulli duhet te permbaje vetem tekst.");
            return;
        }
        
        if(!hallTypes.title || !hallTypes.short_code 
            || !hallTypes.baseOccupancy || !hallTypes.higherOccupancy
            || !hallTypes.amenties_id || !hallTypes.basePrice || !hallTypes.image){
                toast.warn("Ju lutem plotesoni te gjithe formen");
                return;
            }

            const formData=new FormData();
            formData.append("title",hallTypes.title);
            formData.append("short_code",hallTypes.short_code);
            formData.append("baseOccupancy",hallTypes.baseOccupancy);
            formData.append("higherOccupancy",hallTypes.higherOccupancy);
            formData.append("amenties_id",hallTypes.amenties_id);
            formData.append("basePrice",hallTypes.basePrice);
            formData.append("image",hallTypes.image);

            console.log(" Data : " , hallTypes);

            axios.post('http://localhost:3002/insertHallTypes',formData)
            .then(res=>{
              console.log(res.data);
                navigate('/hall-types');
                toast.success("U shtua me sukses");
            })
            .catch(err => console.log(err))
    }
    
    //ska nevoje me kriju ni api /getAmenties ne back se ekziston njo i tille
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

        const handleChange=(e)=>{
          setHallTypes({...hallTypes,[e.target.name]:e.target.value})
        }


  return (
    <div className='d-flex flex-column align-items-center pt-4'>
        <h2>Create a hall type</h2>
        <form className='row g-3 w-50' onSubmit={handleSubmit} >

            <div className='col-12'>
                <label for="inputTitle" className="form-label">Title </label>
                <input type="text" className="form-control" id="inputTitle" placeholder='Vendos Titullin' autoComplete='off'
                onChange={handleChange} name='title' />
            </div>

            <div className='col-12'>
                <label for="inputSC" className="form-label">Short Code </label>
                <input type="number" className="form-control" id="inputSC" placeholder='Vendos Short Code' autoComplete='off'
                onChange={handleChange} name='short_code' />
            </div>

            <div className='col-12'>
                <label for="inputBO" className="form-label">Base Occupancy </label>
                <input type="number" className="form-control" id="inputBO" placeholder='Base Occupancy' autoComplete='off'
                onChange={handleChange} name='baseOccupancy'/>
            </div>

            <div className='col-12'>
                <label for="inputHO" className="form-label">Higher Occupancy </label>
                <input type="number" className="form-control" id="inputHO" placeholder='Higher Occupancy' autoComplete='off'
                onChange={handleChange} name='higherOccupancy' />
            </div>

            {/**qitu lidhet me foreign key */}
            <div class="col-12">
          <label for="inputFK" class="form-label">Amenties</label>
          <select
            className="form-control"
            id="inputFK"
            onChange={handleChange} name='amenties_id'
          >
             <option value="">Choose Amenties</option>
             {amenties.map(data =>(
                <option key={data.id} value={data.id}>{data.name}</option>
             ))}
             </select>
        </div>
            
            <div className='col-12'>
                <label for="inputBP" className="form-label">Base Price</label>
                <input type="number" className="form-control" id="inputBP" placeholder='Base Price...' autoComplete='off'
                onChange={handleChange} name='basePrice' />
            </div>

            <div class="col-12 mb-3">
              <label class="form-label" for="inputGroupFile01">Select Image</label>
              <input type="file" class="form-control" id="inputGroupFile01"
                onChange={e => setHallTypes({ ...hallTypes, image: e.target.files[0] })} />
            </div>

            <div class="col-12">
                <button type="submit" class="btn btn-primary">Krijo</button>
                <Link to="/hall-types" className='btn btn-success ms-3'>Kthehu</Link>
            </div>


        </form>
    </div>
  )
}

export default ShtoHallTypes