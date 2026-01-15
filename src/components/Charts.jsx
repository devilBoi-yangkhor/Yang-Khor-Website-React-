import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registering chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Data for Bar Chart
const barData = {
labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
datasets: [
{
    label: 'Monthly Sales',
    data: [12, 19, 3, 5, 2, 3, 7],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
    borderWidth: 1,
},
],
};

// Options for Bar Chart
const barOptions = {
responsive: true,
plugins: {
legend: {
    position: 'top',
},
title: {
    display: true,
    text: 'Bar Chart Example',
},
},
};

// Data for Pie Chart
const pieData = {
labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
datasets: [
{
    label: 'Pie Chart Example',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    ],
    borderColor: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    ],
    borderWidth: 1,
},
],
};

// Options for Pie Chart
const pieOptions = {
responsive: true,
plugins: {
legend: {
    position: 'top',
},
title: {
    display: true,
    text: 'Pie Chart Example',
},
},
};

const Charts = () => {
return (
<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Performance Overview</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
        <h4 className="text-md font-semibold mb-2 text-gray-900 dark:text-white">Bar Chart</h4>
        <Bar data={barData} options={barOptions} />
    </div>
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
        <h4 className="text-md font-semibold mb-2 text-gray-900 dark:text-white">Pie Chart</h4>
        <Pie data={pieData} options={pieOptions} />
    </div>
    </div>
</div>
);
};

export default Charts;
