import React, { useState } from 'react';
import axios from 'axios';

const ChatModal = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [response, setResponse] = useState('');

  const handleOptionClick = async (option) => {
    let responseMessage = '';
    if (option === 'navigateRooms') {
      responseMessage = 'Ju mund të navigoni te dhomat nga menuja kryesore.';
    } else if (option === 'mapProblems') {
      responseMessage = 'Ju lutemi rifreskoni faqen ose kontrolloni lidhjen tuaj të internetit.';
    } else if (option === 'bookingIssues') {
      responseMessage = 'Kontrolloni detajet e rezervimit dhe provoni përsëri.';
    }

    setSelectedOption(option);
    setResponse(responseMessage);

    // Dërgo pyetjen dhe përgjigjen në backend
    try {
      await axios.post('http://localhost:3002/chat', { question: option, response: responseMessage });
    } catch (error) {
      console.error('Failed to save response:', error);
    }
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
      <button onClick={() => handleOptionClick('mapProblems')} style={{ display: 'block', width: '100%', marginBottom: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer' }}>
        Kam probleme me hartën
      </button>
      <button onClick={() => handleOptionClick('bookingIssues')} style={{ display: 'block', width: '100%', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer' }}>
        Nuk më bën të rezervoj dhomën
      </button>

      {selectedOption && <p style={{ marginTop: '20px', color: '#007bff' }}>{response}</p>}
    </div>
  );
};

export default ChatModal;
