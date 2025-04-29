import React from 'react'
import './dashboard.css'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2'; 
  
  ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);
  

function FinancialOverview() {
    const data = {
        labels: [
          '01 Aug', '02 Aug', '03 Aug', '04 Aug', '05 Aug', '06 Aug', '07 Aug',
          '08 Aug', '09 Aug', '10 Aug', '11 Aug', '12 Aug', '13 Aug', '14 Aug', '15 Aug', '16 Aug'
        ],
        datasets: [
          {
            label: 'Daily',
            data: [65, 60, 62, 68, 75, 80, 91, 70, 60, 72, 78, 75, 68, 65, 60, 70],
            borderColor: '#6D28D9',
            backgroundColor: 'rgba(109, 40, 217, 0.2)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#6D28D9',
            pointBorderColor: '#fff',
            pointRadius: 5,
            pointHoverRadius: 7
          }
        ]
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.parsed.y}%`
            }
          }
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            ticks: {
              callback: (value) => `${value}%`
            },
            grid: {
              drawBorder: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      };
  return (
    <div className='financial-overview'>
        <h2>Financial Overview</h2>
        <p>Monthly revenue and expenses</p>
        <hr />
        <Line data={data} options={options} />
    </div>
  )
}

export default FinancialOverview