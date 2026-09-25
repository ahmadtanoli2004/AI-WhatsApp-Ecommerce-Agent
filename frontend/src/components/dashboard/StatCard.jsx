import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatCard.css';

export default function StatCard({ title, value, change, isPositive, icon: Icon }) {
  return (
    <div className="card stat-card fade-in-up">
      <div className="stat-header">
        <h3 className="stat-title">{title}</h3>
        <div className="stat-icon-wrapper">
          <Icon size={20} className="stat-icon" />
        </div>
      </div>
      
      <div className="stat-body">
        <h2 className="stat-value">{value}</h2>
      </div>
      
      <div className="stat-footer">
        <span className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {change}
        </span>
        <span className="stat-period">vs last month</span>
      </div>
    </div>
  );
}
