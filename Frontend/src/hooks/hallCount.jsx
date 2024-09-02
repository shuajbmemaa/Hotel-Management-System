import axios from 'axios';
import React, { useEffect, useState } from 'react'

const hallCount = () => {
    const [hallCount, setHallCount] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3002/getHallCount')
          .then(response => {
            setHallCount(response.data.count);
          })
          .catch(error => {
            console.error('There was an error retrieving the hall count!', error);
          });
      }, []);

  return hallCount;
}

export default hallCount