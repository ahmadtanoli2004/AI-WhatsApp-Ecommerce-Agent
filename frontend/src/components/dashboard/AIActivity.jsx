import { Bot, Headphones, HelpCircle, ShoppingBag } from 'lucide-react';
import { aiActivityData } from '../../data/mockDashboardData';
import './AIActivity.css';

export default function AIActivity() {
  const getActivityIcon = (type) => {
    switch(type) {
      case 'recommendation': return <ShoppingBag size={14} className="activity-icon-svg text-primary" />;
      case 'inquiry': return <HelpCircle size={14} className="activity-icon-svg text-warning" />;
      case 'support': return <Headphones size={14} className="activity-icon-svg text-info" />;
      default: return <Bot size={14} className="activity-icon-svg text-primary" />;
    }
  };

  return (
    <div className="card ai-activity-card fade-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="card-header">
        <h3 className="card-title">AI Activity</h3>
      </div>
      
      <div className="activity-feed">
        {aiActivityData.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-icon-container">
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <p className="activity-text">{activity.action}</p>
              <span className="activity-time">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
