import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const TotalOrdersChart = () => {
    const [dataPoints, setDataPoints] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3002/getMonthlyBookings')
            .then(res => {
                const result = res.data.Result;
                const formattedDataPoints = result.map(item => ({
                    label: item.month,
                    y: item.bookings
                }));
                setDataPoints(formattedDataPoints);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const options = {
        animationEnabled: true,
        title: {
            text: "Monthly Bookings"
        },
        axisX: {
            title: "Month"
        },
        axisY: {
            title: "Number of Bookings"
        },
        data: [
            {
                type: "column",
                dataPoints: dataPoints
            }
        ]
    };

    return (
        <CanvasJSChart options={options} />
    );
};

export default TotalOrdersChart;
