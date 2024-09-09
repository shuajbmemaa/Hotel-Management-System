import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Booking = () => {
  const { roomId } = useParams();
  const [searchParams] = useSearchParams();
  const checkInDate = searchParams.get('checkindate');
  const numberOfNights = searchParams.get('nights');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timerMessage, setTimerMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [services, setServices] = useState([]);
  const [dhomat,setDhomat] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3002/getRoomT/${roomId}`)
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.Result[0]);
        } else {
          toast.error("Error");
        }
      })
      .catch(err => console.log(err));
  }, [roomId]);

  useEffect(() => {
    axios.get(`http://localhost:3002/getServicesForRoom/${roomId}`)
      .then(res => {
        if (res.data.Status === "Success") {
          setServices(res.data.Result);
        } else {
          toast.error("Error loading services");
        }
      })
      .catch(err => console.log(err));
  }, [roomId]);

  console.log(data);

  useEffect(() => {
    axios.get(`http://localhost:3002/getRoomNumber/${roomId}`)
      .then(res => {
        if (res.data.Status === "Success") {
          if (res.data.Result.length > 0) {
            setDhomat(res.data.Result[0].room_number);
          } else {
            setDhomat("Not available");
          }
        } else {
          toast.error("Error: " + (res.data.Message || "An error occurred"));
        }
      })
      .catch(err => {
        console.error(err);
        toast.error("Error fetching room number");
      });
  }, [roomId]);

  const handleCheckout = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const total = data.base_price * numberOfNights;

    setLoading(true);
    setTimerMessage('Ju lutemi prisni perpara se te vazhdoni te pagesa...');

    setTimeout(async () => {
      try {
        const response = await axios.post('http://localhost:3002/create-checkout-session', {
          userId: window.localStorage.getItem("userId"),
          total,
          name,
          email,
          phone,
          roomId,
          nights: numberOfNights,
          checkInDate,
          checkOutDate: new Date(new Date(checkInDate).getTime() + numberOfNights * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
        console.log("Checkout session response:", response.data);
        setResponseMessage(response.data);

        setTimeout(() => {
          window.location.href = response.data.url;
        }, 3000);
      } catch (error) {
        console.error("Error creating checkout session", error);
      }
    }, 4000);
  };

  const servicesTotal = services.reduce((total, service) => total + service.price, 0);

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-md-6 d-flex align-items-stretch">
          {data ? (
            <div className="card w-100">
              <img src={`http://localhost:3002/images/${data.image}`} className="card-img-top" alt="Hotel" />
              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">Room Number: {dhomat ? dhomat : "Not available"}</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Services :</li>
                  {services.length > 0 ? (
                    services.map((service) => (
                      <li key={service.id} className="list-group-item">{service.title} - {service.price} €</li>
                    ))
                  ) : (
                    <p>No services available</p>
                  )}
                </ul>
                <p className="card-text mt-2">
                  <small className="text-muted">Max Occupancy: {data.base_occupancy + data.higher_occupancy} adults</small><br />
                  <small className="text-muted">{data.kids} kids</small><br />
                  <strong>EUR €{data.base_price} / night</strong><br />
                  <strong>Service Total: EUR €{servicesTotal.toFixed(2)}</strong>
                </p>
                <p className="card-text text-danger">
                  Booking Total: €{(data.base_price * numberOfNights + servicesTotal).toFixed(2)}
                </p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="col-md-6 d-flex align-items-stretch">
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title">Enter Booking Details</h5>
              <form onSubmit={handleCheckout}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Name.." required />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input type="text" className="form-control" id="phone" placeholder="Phone Number" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="checkInDate" className="form-label">Check In Date</label>
                  <input type="date" className="form-control" id="checkInDate" value={checkInDate} readOnly />
                </div>
                <div className="mb-3">
                  <label htmlFor="checkOutDate" className="form-label">Check Out Date</label>
                  <input type="date" className="form-control" id="checkOutDate" value={new Date(new Date(checkInDate).getTime() + numberOfNights * 24 * 60 * 60 * 1000).toISOString().split('T')[0]} readOnly />
                </div>
                <div className="mb-3">
                  <label htmlFor="numberOfNights" className="form-label">No. of Nights</label>
                  <input type="number" className="form-control" id="numberOfNights" value={numberOfNights} readOnly />
                </div>
                <button type="submit" className="btn btn-success w-100" disabled={loading}>Looks Good! Checkout Now</button>
                {loading && <p className="text-warning mt-3">{timerMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
