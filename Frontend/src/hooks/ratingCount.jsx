import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ratingCount = () => {

    const [ratingCount, setRatingCount] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:3002/getReviewCount')
          .then(response => {
            setRatingCount(response.data);
          })
          .catch(error => {
            console.error('There was an error retrieving the rating count!', error);
          });
      }, []);

  return ratingCount;

}

export default ratingCount