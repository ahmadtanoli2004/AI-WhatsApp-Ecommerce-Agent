import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { chartData30Days } from '../../data/mockDashboardData';
import './ChartCard.css';

export default function ChartCard() {
  const [timeframe, setTimeframe] = useState('30 Days');
  
  return (
    <div className="card chart-card fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Sales Overview</h3>
          <p className="chart-subtitle">Revenue and orders over time</p>
        </div>
        
        <div className="timeframe-controls">
          {['7 Days', '30 Days', '90 Days'].map(tf => (
            <button 
              key={tf}
              className={`timeframe-btn ${timeframe === tf ? 'active' : ''}`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div className="chart-body">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData30Days} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} tickFormatter={(val) => `$${val}`} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
              itemStyle={{ color: 'var(--text-main)', fontWeight: 500 }}
            />
            <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
