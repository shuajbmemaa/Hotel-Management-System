import React, { useEffect, useState } from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const DoughnutChart = () => {

    const [count, setCounts] = useState({
        users: 0,
        admins: 0,
        employees: 0
    });

    const [options, setOptions] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3002/getUserCounts')
            .then(res => {
                const result = res.data.Result;
                setCounts({
                    users: result.users,
                    admins: result.admins,
                    employees: result.employees
                });

                const total = result.users + result.admins + result.employees;
                
                const userPercentage = (result.users / total) * 100;
                const adminPercentage = (result.admins / total) * 100;
                const employeePercentage = (result.employees / total) * 100;

                setOptions({
                    animationEnabled: true,
                    exportEnabled: true,
                    theme: "light1", // "light1", "dark1", "dark2"
                    title: {
                        text: "User Roles Distribution"
                    },
                    data: [{
                        type: "pie",
                        indexLabel: "{label}: {y}%",		
                        startAngle: -90,
                        dataPoints: [
                            { y: userPercentage, label: "Users" },
                            { y: adminPercentage, label: "Admins" },
                            { y: employeePercentage, label: "Employees" },	
                        ]
                    }]
                });
            }).catch(err => {
                console.log(err);
            })
    }, []);

    return (
        options && <CanvasJSChart options={options} />
    )
}

export default DoughnutChart;
