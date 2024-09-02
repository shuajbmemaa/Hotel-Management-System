import axios from 'axios';
import React, { useEffect, useState } from 'react'

const serviceCount = () => {
    const[serviceCount,setServiceCount]=useState();

    useEffect(()=>{
        axios.get('http://localhost:3002/getServiceCount')
        .then(response=>{
            setServiceCount(response.data.count)
        }).catch(err=>{
            console.log(err);
        })
    })

  return serviceCount;

}

export default serviceCount