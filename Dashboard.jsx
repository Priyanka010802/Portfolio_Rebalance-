import React from 'react';

export default function Dashboard({ portfolio }) {
  const totalValue = portfolio.reduce((sum, asset) => sum + asset.value, 0);

  const portfolioVolatility = portfolio.reduce(
    (acc, asset) => acc + (asset.value / totalValue) * asset.volatility,
    0
  );

  const riskFreeRate = 0.02;
  const weightedReturn = portfolio.reduce(
    (acc, asset) => acc + (asset.value / totalValue) * asset.targetPercent,
    0
  );
  const sharpeRatio = portfolioVolatility > 0 ? (weightedReturn - riskFreeRate) / portfolioVolatility : 0;

  return (
    <div
      className="p-5 rounded-4 text-center"
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        color: '#a0e9fd',
        maxWidth: '600px',
        margin: 'auto',
        backdropFilter: 'blur(15px)',
        boxShadow: '0 0 40px #00d8ff88',
      }}
    >
      <h1 className="mb-4" style={{ textShadow: '0 0 15px #00d8ff' }}>
        Portfolio Dashboard
      </h1>

      <div className="mb-4">
        <h3>Total Portfolio Value</h3>
        <p style={{ fontSize: '2rem', fontWeight: '700', color: '#00e9ff' }}>
          ${totalValue.toFixed(2)}
        </p>
      </div>

      <div className="row mb-4">
        <div className="col-6">
          <h5>Estimated Volatility</h5>
          <p style={{ fontWeight: '600', fontSize: '1.2rem', color: '#2de57c' }}>
            {(portfolioVolatility * 100).toFixed(2)}%
          </p>
        </div>
        <div className="col-6">
          <h5>Sharpe Ratio</h5>
          <p style={{ fontWeight: '600', fontSize: '1.2rem', color: '#73dbff' }}>
            {sharpeRatio.toFixed(2)}
          </p>
        </div>
      </div>

      <div style={{ fontSize: '0.9rem', color: '#00e9ffcc' }}>
        Note: Risk & return estimates are simplified for demonstration.
      </div>
    </div>
  );
}
