import React, { useEffect, useState } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const BarChart = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3002/getTopServices')
            .then(res => {
                const result = res.data.Result;
                setServices(result.map(service => ({
                    y: service.price,
                    label: service.title
                })));
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const addSymbols = (e) => {
        var suffixes = ["", "K", "M", "B"];
        var order = Math.max(Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)), 0);
        if (order > suffixes.length - 1)
            order = suffixes.length - 1;
        var suffix = suffixes[order];
        return CanvasJSReact.CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
    }

    const options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Top 5 Services by Price"
        },
        axisX: {
            title: "Service",
            reversed: true,
        },
        axisY: {
            title: "Price",
            includeZero: true,
            labelFormatter: addSymbols
        },
        data: [{
            type: "bar",
            dataPoints: services
        }]
    }

    return (
        <CanvasJSChart options={options} />
    )
}

export default BarChart;
