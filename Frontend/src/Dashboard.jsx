import React, { useEffect, useState } from 'react'
import BarChart from './Charts/BarChart'
import PieChart from './Charts/PieChart'
import DoughnutChart from './Charts/DoughnutChart'
import TotalOrdersChart from './Charts/TotalOrdersChart'
import StatCard from './Charts/StatCard'
import RoomCount from './hooks/RoomCount'
import hallCount from './hooks/hallCount'
import ratingCount from './hooks/ratingCount'
import serviceCount from './hooks/serviceCount'
import MultiSeriesChart from './Charts/MultiSeriesChart'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Dashboard = () => {

  const roomCount=RoomCount();
  const hallCount2=hallCount();
  const ratingCount2=ratingCount();
  const totalServices=serviceCount();

  const handleDownloadPDF = () => {
    const dashboardElement = document.getElementById('dashboard-content');
    html2canvas(dashboardElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('dashboard.pdf');
    });
  };

  return (
    <div>
      <h6>Dashboard</h6>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <button onClick={handleDownloadPDF}>Download PDF</button>
      </div>
      <div id="dashboard-content">
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <StatCard color="#f44336" icon="🏨" value={roomCount} label="Total Rooms" />
          <StatCard color="#ff9800" icon="🏛️" value={hallCount2} label="Total Halls" />
          <StatCard color="#2196f3" icon="💬" value={ratingCount2} label="Total Ratings" />
          <StatCard color="#4caf50" icon="🔧" value={totalServices} label="No. of Services" />
        </div>
        <DoughnutChart/>
        <br/>
        <MultiSeriesChart/>
        <br/>
        <BarChart/>
        <br/>
        <PieChart/>
        <br/>
        <TotalOrdersChart/>
        <br/>
      </div>
    </div>
  )
}

export default Dashboard