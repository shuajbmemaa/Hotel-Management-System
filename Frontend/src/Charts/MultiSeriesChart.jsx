import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const MultiSeriesChart = () => {
    const [dataPointsCurrentMonth, setDataPointsCurrentMonth] = useState([]);
    const [dataPointsLastMonth, setDataPointsLastMonth] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3002/getBookingsWeeklyComparison')
            .then(res => {
                const result = res.data.Result;

                const currentMonthData = [];
                const lastMonthData = [];

                result.forEach(item => {
                    if (item.period === 'current') {
                        currentMonthData.push({
                            label: `Week ${item.week}`,
                            y: item.bookings
                        });
                    } else if (item.period === 'previous') {
                        lastMonthData.push({
                            label: `Week ${item.week}`,
                            y: item.bookings
                        });
                    }
                });

                setDataPointsCurrentMonth(currentMonthData);
                setDataPointsLastMonth(lastMonthData);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const options = {
        animationEnabled: true,
        title: {
            text: "Weekly Room Bookings: Current Month vs Last Month"
        },
        axisY: {
            title: "Number of Bookings"
        },
        toolTip: {
            shared: true
        },
        data: [{
            type: "spline",
            name: "This Month",
            showInLegend: true,
            dataPoints: dataPointsCurrentMonth
        },
        {
            type: "spline",
            name: "Last Month",
            showInLegend: true,
            dataPoints: dataPointsLastMonth
        }]
    };

    return (
        <CanvasJSChart options={options} />
    );
};

export default MultiSeriesChart;
