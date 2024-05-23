import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AutoResponse = ({ option }) => {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await axios.post('http://localhost:3002/chat', { question: option });
        setResponse(res.data.response);
      } catch (error) {
        setResponse('Nuk ka përgjigje për këtë pyetje.');
      }
    };

    fetchResponse();
  }, [option]);

  return <p>{response}</p>;
};

export default AutoResponse;
