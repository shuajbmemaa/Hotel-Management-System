import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = () => {

    const [count,setCounts]=useState({
        completed:0,
        pending:0,
        cancelled:0
    })

    useEffect(() => {
        axios.get('http://localhost:3002/getBookingStatus')
            .then(res => {
                const result = res.data.Result;
                setCounts({
                    completed: result.completed,
                    pending: result.pending,
                    cancelled:result.cancelled
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    const options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Booking Status"
        },
        data: [{
            type: "pie",
            startAngle: 75,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}",
            dataPoints: [
                { y: count.completed, label: "Completed" },
                { y: count.pending, label: "Pending" },
                { y: count.cancelled, label: "Cancelled" },
            ]
        }]
    }

  return (
    <CanvasJSChart options={options} />
  )
}

export default PieChart