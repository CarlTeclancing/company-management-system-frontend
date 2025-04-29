import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function TaskOverview({chartData}) {
  const data = {
    labels: ['Complete', 'Pending', 'Not Start'],
    datasets: [
      {
        data: [12, 5, 3], // Example data
        backgroundColor: ['#22C55E', '#EF4444', '#FACC15'], // Green, Red, Yellow
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}`,
        },
      },
    },
  };

  return (
    <div className="task-progress" >
      <h2>Task Progress</h2>
      <p style={{ color: '#6B7280' }}>Task completion status</p>
      <div className='chart-container'>
        <Doughnut data={data || chartData} options={options} />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
        <LegendItem color="#22C55E" label="Complete" />
        <LegendItem color="#EF4444" label="Pending" />
        <LegendItem color="#FACC15" label="Not Start" />
      </div>
    </div>
  );
}

const LegendItem = ({ color, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: color }}></div>
    <span>{label}</span>
  </div>
);

export default TaskOverview;
