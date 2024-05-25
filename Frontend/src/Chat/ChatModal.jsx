import React, { useState } from 'react';
import axios from 'axios';
import img from '../assets/chatbot.jpg';

const ChatModal = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [response, setResponse] = useState('');
  const [typing, setTyping] = useState(false);

  const handleOptionClick = async (option) => {
    setResponse('');
    setSelectedOption(option);
    setTyping(true); 

    let responseMessage = '';
    if (option === 'navigateRooms') {
      responseMessage = 'Ju mund të navigoni te dhomat nga menuja kryesore.';
    } else if (option === 'freeRoom') {
      responseMessage = 'Ju lutemi kontaktoni recepsionin për informacion mbi dhomat e lira.';
    } else if (option === 'bookingIssues') {
      responseMessage = 'Kontrolloni detajet e rezervimit dhe provoni përsëri.';
    }

    setTimeout(() => {
      setResponse(responseMessage);
      setTyping(false);

      try {
        axios.post('http://localhost:3002/chat', { question: option, response: responseMessage });
      } catch (error) {
        console.error('Failed to save response:', error);
      }
    }, 2000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '70px', right: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '10px', width: '400px', maxWidth: '80%', padding: '20px' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '5px', right: '5px', border: 'none', background: 'none' }}>
        <i className="bi bi-x-circle" style={{ fontSize: '20px' }}></i>
      </button>
      <h2 style={{ color: '#333', textAlign: 'center' }}>Si mund t'ju ndihmojmë?</h2>
      <button onClick={() => handleOptionClick('navigateRooms')} style={{ display: 'block', width: '100%', marginBottom: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer' }}>
        Unë dua të navigoj te dhomat
      </button>
      <button onClick={() => handleOptionClick('freeRoom')} style={{ display: 'block', width: '100%', marginBottom: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer' }}>
        Cila prej dhomave eshte e lirë
      </button>
      <button onClick={() => handleOptionClick('bookingIssues')} style={{ display: 'block', width: '100%', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer' }}>
        Nuk më bën të rezervoj dhomën
      </button>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px', color: '#007bff' }}>
        {typing && <img src={img} alt="Chatbot" style={{ width: '45px', height: '45px', marginRight: '10px' }} />}
        {typing && <p>Typing...</p>}
        {!typing && response && <img src={img} alt="Chatbot" style={{ width: '45px', height: '45px', marginRight: '10px' }} />}
        {response && <p style={{ marginTop: '20px', color: '#007bff' }}>{response}</p>}
      </div>
    </div>
  );
};

export default ChatModal;
