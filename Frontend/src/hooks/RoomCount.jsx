import axios from 'axios';
import React, { useEffect, useState } from 'react'

const RoomCount = () => {
    const [roomCount, setRoomCount] = useState(0);

    useEffect(() => {
      axios.get('http://localhost:3002/getRoomCount')
        .then(response => {
          setRoomCount(response.data.count);
        })
        .catch(error => {
          console.error('There was an error retrieving the room count!', error);
        });
    }, []);
    
  return roomCount;
  
};

export default RoomCount