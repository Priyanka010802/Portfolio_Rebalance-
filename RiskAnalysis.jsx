import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

function RiskAnalysis({ portfolio }) {
  const totalValue = portfolio.reduce((sum, asset) => sum + asset.value, 0);

  const data = {
    labels: portfolio.map(asset => asset.name),
    datasets: [
      {
        label: 'Weighted Volatility (%)',
        data: portfolio.map(asset => ((asset.value / totalValue) * asset.volatility * 100).toFixed(2)),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...portfolio.map(asset => ((asset.value / totalValue) * asset.volatility * 100))) * 1.2 || 1,
      },
    },
  };

  return (
    <div data-aos="fade-right">
      <h2>Portfolio Risk Analysis</h2>
      <Bar data={data} options={options} />
      <ul>
        {portfolio.map(asset => (
          <li key={asset.id}>
            <strong>{asset.name}</strong>: Value ${asset.value.toFixed(2)} | Volatility {(asset.volatility * 100).toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RiskAnalysis;
