import React, { useEffect, useState } from 'react';
import order from '../assets/orderConfirmed.jpg';
import './confirmation.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';

const Success = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get('bookingId');
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowConfirmation(false);
      setShowSpinner(true);
    }, 5000);

    const timer2 = setTimeout(() => {
      navigate('/');
    }, 8000);

    return () => {
      clearTimeout(timer1); 
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <div className="confirmation-container">
      {showConfirmation && (
        <>
          <h1>Your Vacation is Confirmed!</h1>
          <p>Your Order Number is: {bookingId}</p>
          <p>You can view all order details in your Profile.</p>
          <img 
            src={order} 
            alt="Vacation Confirmed" 
            className="confirmation-image"
          />
        </>
      )}
      {showSpinner && (
        <div style={{ display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems: 'center', height: '87vh' }}>
          <CircleLoader color="#35cc82" loading={showSpinner} size={140} />
          <p style={{ marginTop: '20px', fontSize: '18px', color: '#35cc82' }}>Navigating to the homepage...</p>

        </div>
      )}
    </div>
  );
};

export default Success;
