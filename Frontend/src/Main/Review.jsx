import React, { useState } from 'react'
import { toast } from 'react-toastify';
import './Review.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Review = () => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const userId = localStorage.getItem('userId');
    //console.log(userId);

    const navigate=useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!userId) {
            toast.warning('User nuk eshte regjistuar');
            return;
        }
        const newReview = { userId, rating, comment };
        try {
            await axios.post('http://localhost:3002/shtoReview', newReview);
            setRating('');
            setComment('');
            navigate('/');
            toast.success('Vleresimi u shtua me sukses ! Faleminderit!!!');
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Error submitting review');
        }
    };

    return (
        <div>
        <div className="navbar">
            <h1>Lotus</h1>
            <Link to='/'>Kthehu</Link>
        </div>
        <div className="review-container">
            <h2>Vleresoni Hotelin Tone</h2>
            <p>Sa jeni te kenaqur me sherbimin tone?</p>
            <form className="review-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Rating</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="form-control"
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Comment</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="form-control"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-btn">Submit Review</button>
            </form>
        </div>
    </div>
    );
};

export default Review