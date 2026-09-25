import { MessageCircle, Hash, Building2, Clock, Phone } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

export default function WhatsAppConnection({ config, onTest, isTesting }) {
  if (!config) return null;

  const formatDate = (isoString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit'
    }).format(new Date(isoString));
  };

  return (
    <div className="card fade-in-up wa-section-card" style={{ animationDelay: '0.1s' }}>
      <div className="wa-card-header">
        <h3 className="card-title" style={{ margin: 0 }}>Connection Overview</h3>
        <button 
          className="btn btn-primary" 
          onClick={onTest} 
          disabled={isTesting || config.status === 'Disconnected'}
        >
          {isTesting ? 'Testing...' : 'Test Connection'}
        </button>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div className="wa-status-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className={`wa-status-icon ${config.status.toLowerCase()}`}>
              <MessageCircle size={24} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.125rem' }}>WhatsApp Business</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <StatusBadge status={config.status === 'Connected' ? 'Active' : config.status} />
              </div>
            </div>
          </div>
        </div>

        <div className="wa-info-grid">
          <div className="wa-info-item">
            <Building2 size={16} className="text-muted" />
            <div className="wa-info-content">
              <span className="wa-info-label">Business Name</span>
              <span className="wa-info-val">{config.businessInfo.name}</span>
            </div>
          </div>
          <div className="wa-info-item">
            <Phone size={16} className="text-muted" />
            <div className="wa-info-content">
              <span className="wa-info-label">Phone Number</span>
              <span className="wa-info-val">{config.businessInfo.phone}</span>
            </div>
          </div>
          <div className="wa-info-item">
            <Hash size={16} className="text-muted" />
            <div className="wa-info-content">
              <span className="wa-info-label">Phone Number ID</span>
              <span className="wa-info-val" style={{ fontFamily: 'monospace' }}>••••••••••••{config.credentials.phoneNumberId.slice(-4)}</span>
            </div>
          </div>
          <div className="wa-info-item">
            <Clock size={16} className="text-muted" />
            <div className="wa-info-content">
              <span className="wa-info-label">Last Connected</span>
              <span className="wa-info-val">{formatDate(config.lastConnected)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
