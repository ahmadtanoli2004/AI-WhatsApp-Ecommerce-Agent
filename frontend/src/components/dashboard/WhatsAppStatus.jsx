import { MessageCircle, Settings2 } from 'lucide-react';
import { whatsappStatsData } from '../../data/mockDashboardData';
import './WhatsAppStatus.css';

export default function WhatsAppStatus() {
  return (
    <div className="card wa-status-card fade-in-up" style={{ animationDelay: '0.4s' }}>
      <div className="wa-header">
        <div className="wa-brand">
          <MessageCircle size={24} className="wa-icon" />
          <h3 className="card-title">WhatsApp Business</h3>
        </div>
        <div className="wa-connection">
          <span className="status-dot green"></span>
          <span className="connection-text">{whatsappStatsData.status}</span>
        </div>
      </div>
      
      <div className="wa-stats-grid">
        <div className="wa-stat-item">
          <span className="wa-stat-label">Messages Today</span>
          <span className="wa-stat-value">{whatsappStatsData.messagesToday}</span>
        </div>
        <div className="wa-stat-item">
          <span className="wa-stat-label">AI Responses</span>
          <span className="wa-stat-value">{whatsappStatsData.aiResponses}</span>
        </div>
        <div className="wa-stat-item">
          <span className="wa-stat-label">Response Rate</span>
          <span className="wa-stat-value">{whatsappStatsData.responseRate}</span>
        </div>
      </div>
      
      <div className="wa-footer">
        <button className="btn btn-outline wa-manage-btn">
          <Settings2 size={16} />
          Manage WhatsApp
        </button>
      </div>
    </div>
  );
}
