import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GuestReview = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:3002/review');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, []);

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3>Reviews:</h3>
            </div>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>Rating</th>
                            <th>Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((review, index) => (
                            <tr key={index}>
                                <td>{review.userId}</td>
                                <td>{review.rating}</td>
                                <td>{review.comment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GuestReview;
