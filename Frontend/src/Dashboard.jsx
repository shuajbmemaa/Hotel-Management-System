import React from 'react'
import BarChart from './Charts/BarChart'
import PieChart from './Charts/PieChart'
import DoughnutChart from './Charts/DoughnutChart'
import TotalOrdersChart from './Charts/TotalOrdersChart'

const Dashboard = () => {
  return (
    <div>
      <h6>Dashboard</h6>
      <DoughnutChart/>
      <br/>
      <BarChart/>
      <br/>
      <PieChart/>
      <br/>
      <TotalOrdersChart/>
    </div>
  )
}

export default Dashboard