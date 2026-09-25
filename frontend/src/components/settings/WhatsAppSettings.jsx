import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import StatusBadge from '../ui/StatusBadge';

export default function WhatsAppSettings({ summary }) {
  const navigate = useNavigate();

  if (!summary) return null;

  return (
    <div className="card fade-in-up">
      <div className="settings-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 className="card-title" style={{ margin: 0 }}>WhatsApp Integration</h3>
          <p className="text-muted text-sm mt-1">Summary of your current Meta Business API connection.</p>
        </div>
        <button className="btn btn-outline btn-sm" onClick={() => navigate('/whatsapp')}>
          Manage <ExternalLink size={14} style={{ marginLeft: '4px' }} />
        </button>
      </div>

      <div className="settings-card-body">
        
        <div className="wa-info-grid single-col" style={{ marginBottom: '2rem' }}>
          <div className="wa-info-item">
            <div className="wa-info-content">
              <span className="wa-info-label">Connection Status</span>
              <div style={{ marginTop: '0.25rem' }}>
                <StatusBadge status={summary.status === 'Connected' ? 'Active' : summary.status} />
              </div>
            </div>
          </div>
          
          <div className="wa-info-item">
            <div className="wa-info-content">
              <span className="wa-info-label">Business Account</span>
              <span className="wa-info-val">{summary.businessInfo.name}</span>
            </div>
          </div>

          <div className="wa-info-item">
            <div className="wa-info-content">
              <span className="wa-info-label">Phone Number</span>
              <span className="wa-info-val">{summary.businessInfo.phone}</span>
            </div>
          </div>
          
          <div className="wa-info-item">
            <div className="wa-info-content">
              <span className="wa-info-label">Webhook Status</span>
              <span className={`wa-info-val font-medium ${summary.webhookStatus === 'Connected' ? 'text-success' : 'text-danger'}`}>
                {summary.webhookStatus === 'Connected' ? 'Healthy' : 'Error'}
              </span>
            </div>
          </div>
        </div>

        <div className="info-alert" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="text-sm">To configure credentials, webhooks, and view messaging health, please visit the dedicated WhatsApp Control Center.</span>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/whatsapp')}>Go to WhatsApp</button>
        </div>

      </div>
    </div>
  );
}
